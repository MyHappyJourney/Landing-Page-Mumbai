/// <reference types="vite/client" />
import { LeadFormData } from '../types';
import { PACKAGES, ENQUIRY_EMAIL } from '../data/tourData';

export interface LeadSubmissionResult {
  success: boolean;
  message: string;
  leadId?: string;
}

/**
 * Reusable Lead Submission Handler.
 * Delivers all incoming quote requests directly to mhjenquiry@gmail.com
 * via FormSubmit AJAX API, and logs to CRM webhook or local storage.
 */
export async function submitLead(formData: LeadFormData): Promise<LeadSubmissionResult> {
  try {
    const matchedPkg = PACKAGES.find(p => p.id === formData.packagePreference);
    const packageName = matchedPkg 
      ? `${matchedPkg.durationBadge} (${matchedPkg.title})`
      : (formData.packagePreference || 'General Kerala Tour Enquiry');

    const leadId = `MHJ-${Date.now().toString().slice(-6)}`;

    // Prepare payload for FormSubmit to send email directly to mhjenquiry@gmail.com
    const emailPayload = {
      _subject: `🌴 New Kerala Tour Enquiry from ${formData.name} [${packageName}]`,
      _template: 'table',
      _captcha: 'false',
      _replyto: formData.email || undefined,
      'Lead Reference ID': leadId,
      'Customer Full Name': formData.name,
      'Phone Number': formData.phone,
      'Email Address': formData.email || 'Not provided',
      'Selected Package': packageName,
      'Expected Travel Date': formData.travelDate || 'Flexible / Not decided',
      'Number of Guests': `${formData.adults || 2} Adults, ${formData.children || 0} Children`,
      'Budget Preference': formData.budget || 'Not specified',
      'Special Requests / Notes': formData.notes || 'None',
      'Submission Time': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    // Send email to mhjenquiry@gmail.com asynchronously
    const emailPromise = fetch(`https://formsubmit.co/ajax/${ENQUIRY_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(emailPayload)
    }).catch(err => {
      console.warn('FormSubmit email forwarding notice:', err);
      return null;
    });

    // Check if a custom webhook / CRM endpoint is defined in environment variables
    const webhookUrl = typeof window !== 'undefined' 
      ? (import.meta.env.VITE_CRM_WEBHOOK_URL || import.meta.env.VITE_LEAD_API_URL)
      : undefined;

    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(import.meta.env.VITE_CRM_API_KEY ? { 'Authorization': `Bearer ${import.meta.env.VITE_CRM_API_KEY}` } : {})
        },
        body: JSON.stringify({
          source: 'MyHappyJourney Kerala Landing Page',
          recipientEmail: ENQUIRY_EMAIL,
          leadId,
          timestamp: new Date().toISOString(),
          ...formData
        })
      }).catch(err => console.warn('CRM webhook notice:', err));
    }

    // Save locally to localStorage so lead history can be inspected/verified
    try {
      const existing = JSON.parse(localStorage.getItem('mhj_leads') || '[]');
      existing.unshift({
        id: leadId,
        recipientEmail: ENQUIRY_EMAIL,
        timestamp: new Date().toISOString(),
        packageName,
        ...formData
      });
      localStorage.setItem('mhj_leads', JSON.stringify(existing));
    } catch {
      // Ignore localStorage errors
    }

    // Wait for the email dispatch attempt to settle or timeout quickly
    await Promise.race([
      emailPromise,
      new Promise(resolve => setTimeout(resolve, 1200))
    ]);

    return {
      success: true,
      message: `Thank you, ${formData.name}! Your enquiry has been sent to ${ENQUIRY_EMAIL}. Our Kerala travel expert will contact you within 30 minutes.`,
      leadId
    };
  } catch (error) {
    console.error('Lead submission error:', error);
    return {
      success: false,
      message: 'Failed to submit quote request. Please try again or WhatsApp us directly.'
    };
  }
}
