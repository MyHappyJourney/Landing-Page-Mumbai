import React, { useState, useEffect } from 'react';
import { CheckCircle2, Shield, MapPin, Sparkles, Send, Users, Phone, User, DollarSign, Mail, ExternalLink, Calendar, Languages } from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MSG, PACKAGES } from '../data/tourData';
import { WhatsAppIcon } from './WhatsAppIcon';
import { LeadFormData } from '../types';
import { submitLead } from '../services/leadService';

interface HeroProps {
  onQuoteClick?: () => void;
  preselectedPackageId?: string;
}

export const Hero: React.FC<HeroProps> = ({ preselectedPackageId = 'pkg-6n7d' }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    phone: '',
    email: '',
    travelDate: '',
    adults: 2,
    children: 0,
    budget: '',
    packagePreference: preselectedPackageId
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [leadId, setLeadId] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync package if prop changes
  useEffect(() => {
    if (preselectedPackageId) {
      setFormData(prev => ({ ...prev, packagePreference: preselectedPackageId }));
    }
  }, [preselectedPackageId]);

  // Calculate form completion progress percentage
  const getFormProgress = () => {
    let score = 0;
    if (formData.name.trim().length >= 2) score += 25;
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length >= 10) score += 35;
    if (formData.travelDate) score += 25;
    if ((formData.email && formData.email.includes('@')) || formData.packagePreference || formData.budget) score += 15;
    return Math.min(score, 100);
  };

  const formProgress = getFormProgress();

  // Auto redirect after submission
  useEffect(() => {
    let timer: any;
    if (submitted) {
      setCountdown(5);
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.location.href = 'https://www.myhappyjourney.com/holidays/kerala';
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic Validation
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }

    if (!formData.travelDate) {
      setErrorMessage('Please select your preferred travel date');
      return;
    }

    setLoading(true);
    const result = await submitLead(formData);
    setLoading(false);

    if (result.success) {
      setSubmitted(true);
      setLeadId(result.leadId);
    } else {
      setErrorMessage(result.message);
    }
  };

  const dynamicWhatsappMsg = encodeURIComponent(
    formData.name
      ? `नमस्कार MyHappyJourney, मी केरळ टूर पॅकेजसाठी कोटेशन विनंती पाठवली आहे. नाव: ${formData.name}, प्रवासाची तारीख: ${formData.travelDate || 'नियोजित'}, व्यक्ती: ${formData.adults}. कृपया माहिती पाठवा.`
      : WHATSAPP_DEFAULT_MSG
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${dynamicWhatsappMsg}`;

  return (
    <section id="hero-section" className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Hero Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2560&q=90"
          alt="Kerala Houseboat Backwaters Alleppey"
          className="w-full h-full object-cover object-center opacity-80 scale-105 transition-all duration-1000 brightness-105"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=2560&q=90";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-10 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start lg:items-center">
          
          {/* Left Column: Heading & Route Details */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-left">
            {/* Tagline Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 bg-[#0B3996]/90 backdrop-blur-md text-white text-xs sm:text-sm font-extrabold px-3.5 py-1.5 rounded-full border border-blue-400/30 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
                <span>EXPLORE GOD'S OWN COUNTRY 🌴</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-amber-500/95 backdrop-blur-md text-gray-950 text-xs sm:text-sm font-extrabold px-3.5 py-1.5 rounded-full border border-amber-300/40 shadow-md">
                <Languages className="w-3.5 h-3.5 text-gray-900" />
                <span>Travel Assistance in Hindi</span>
              </div>
            </div>

            {/* Main Title */}
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-md">
                KERALA <br />
                <span className="text-amber-400">TOUR PACKAGES FROM MUMBAI</span>
              </h1>
            </div>

            {/* Duration Badge */}
            <div className="inline-block bg-[#0B3996] text-white font-extrabold text-sm sm:text-lg px-4 sm:px-6 py-2 rounded-full uppercase tracking-wider shadow-lg border border-blue-400/40">
              6 NIGHTS • 7 DAYS
            </div>

            {/* Itinerary Route Pills */}
            <div className="pt-1">
              <p className="text-xs text-gray-300 font-medium mb-2 uppercase tracking-wider">Popular Included Destinations:</p>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 text-xs sm:text-sm font-semibold">
                <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg text-gray-100">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>2N Munnar</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg text-gray-100">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>1N Thekkady</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg text-gray-100">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>1N Alleppey</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg text-gray-100">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>2N Kovalam</span>
                </div>
              </div>
            </div>

            {/* Quick highlights / bottom chips */}
            <div className="flex flex-wrap items-center gap-x-5 sm:gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-200 pt-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 fill-white/10" />
                <span>Zero Hidden Fees</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 fill-white/10" />
                <span>100% Customized Trips</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 fill-white/10" />
                <span>Dedicated Driver</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 fill-white/10" />
                <span>North Indian Food Available</span>
              </div>
            </div>
          </div>

          {/* Right Column: Full Lead Quote Form */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-white text-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 shadow-2xl border border-gray-100 relative">
              
              {/* Highlight ribbon */}
              <div className="absolute top-0 right-0 bg-[#0B3996] text-white text-[10px] sm:text-xs font-black px-3.5 py-1 rounded-bl-xl uppercase tracking-wider shadow-sm">
                FREE CUSTOMIZED QUOTE
              </div>

              {submitted ? (
                /* Success State */
                <div className="text-center py-6 space-y-4 animate-fade-in">
                  <div className="w-14 h-14 bg-[#EBF2FF] text-[#0B3996] rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="bg-[#EBF2FF] text-[#0B3996] font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider">
                      ENQUIRY RECEIVED
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
                      Thank you! 🎉
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-1 max-w-sm mx-auto">
                      Our Kerala travel expert will contact you within 10 minutes with a customized itinerary & price quote!
                    </p>
                    {leadId && (
                      <p className="text-xs text-gray-400 font-mono mt-1.5">
                        Ref ID: <span className="font-bold text-gray-700">{leadId}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-2 max-w-sm mx-auto space-y-2.5">
                    <div className="bg-[#EBF2FF] border border-[#0B3996]/20 rounded-xl p-2.5 text-xs text-[#0B3996] font-medium text-center">
                      <p className="font-bold text-xs">
                        ⌛ Redirecting to MyHappyJourney in <span className="text-sm font-extrabold text-[#FF4B00]">{countdown}s</span>...
                      </p>
                    </div>

                    <a
                      href="https://www.myhappyjourney.com/holidays/kerala"
                      className="w-full h-11 bg-[#0B3996] hover:bg-[#082b75] text-white font-extrabold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all text-xs sm:text-sm"
                    >
                      <span>Go to MyHappyJourney Now</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-11 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-xs sm:text-sm"
                      id="hero-success-whatsapp-btn"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-white" />
                      <span>आत्ताच व्हॉट्सॲप करा</span>
                    </a>

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          travelDate: '',
                          adults: 2,
                          children: 0,
                          budget: '',
                          packagePreference: 'pkg-6n7d'
                        });
                      }}
                      className="text-xs text-gray-500 font-semibold underline hover:text-gray-800 pt-1"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Form View */
                <div>
                  <div className="text-left mb-3">
                    <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                      GET YOUR CUSTOMISED QUOTE
                    </h2>
                    <p className="text-xs font-semibold text-gray-600 mt-0.5">
                      Fill in your details for an instant customized quote in 10 minutes!
                    </p>
                  </div>

                  {/* Progress Indicator */}
                  <div className="mb-3.5 bg-[#F8FAFC] p-2.5 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between text-[11px] font-extrabold mb-1">
                      <span className="text-gray-800 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#FF4B00] animate-pulse" />
                        <span>Form Completion</span>
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                        formProgress === 100
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-[#EBF2FF] text-[#0B3996]'
                      }`}>
                        {formProgress}% {formProgress === 100 ? '🎉 Ready!' : 'Done'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#0B3996] via-[#2563eb] to-[#FF4B00] transition-all duration-500 rounded-full"
                        style={{ width: `${formProgress}%` }}
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="mb-3 p-2 bg-red-50 text-red-700 text-xs font-bold rounded-lg border border-red-200 text-center">
                      ⚠️ {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-3">
                    
                    {/* Row 1: Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {/* Name */}
                      <div>
                        <label className="block text-[11px] font-bold text-gray-800 uppercase tracking-wider mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Rahul Sharma"
                            className="w-full pl-9 pr-3 h-10 sm:h-11 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0B3996] focus:ring-2 focus:ring-[#0B3996]/20 transition-all outline-none font-medium"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-[11px] font-bold text-gray-800 uppercase tracking-wider mb-1">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Phone className="w-3.5 h-3.5" />
                          </div>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="10-digit Mobile No."
                            maxLength={13}
                            className="w-full pl-9 pr-3 h-10 sm:h-11 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0B3996] focus:ring-2 focus:ring-[#0B3996]/20 transition-all outline-none font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Travel Date & Package Duration */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {/* Travel Date */}
                      <div>
                        <label className="block text-[11px] font-bold text-gray-800 uppercase tracking-wider mb-1">
                          Travel Date <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Calendar className="w-3.5 h-3.5" />
                          </div>
                          <input
                            type="date"
                            required
                            value={formData.travelDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                            className="w-full pl-9 pr-3 h-10 sm:h-11 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0B3996] focus:ring-2 focus:ring-[#0B3996]/20 transition-all outline-none font-medium"
                          />
                        </div>
                      </div>

                      {/* Package Duration Select */}
                      <div>
                        <label className="block text-[11px] font-bold text-gray-800 uppercase tracking-wider mb-1">
                          Interested Duration
                        </label>
                        <select
                          value={formData.packagePreference}
                          onChange={(e) => setFormData({ ...formData, packagePreference: e.target.value })}
                          className="w-full px-3 h-10 sm:h-11 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0B3996] focus:ring-2 focus:ring-[#0B3996]/20 transition-all outline-none font-medium"
                        >
                          {PACKAGES.map((pkg) => (
                            <option key={pkg.id} value={pkg.id}>
                              {pkg.durationBadge} ({pkg.title})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Row 3: Adults & Children Counter */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {/* Adults Counter */}
                      <div>
                        <label className="block text-[11px] font-bold text-gray-800 uppercase tracking-wider mb-1">
                          Adults (12+ Yrs)
                        </label>
                        <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg h-10 sm:h-11 px-2 justify-between">
                          <span className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-gray-400" />
                            Adults
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              disabled={formData.adults <= 2}
                              onClick={() => setFormData({ ...formData, adults: Math.max(2, formData.adults - 1) })}
                              className={`w-7 h-7 rounded-md font-black text-sm flex items-center justify-center transition-colors ${
                                formData.adults <= 2
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                              }`}
                            >
                              -
                            </button>
                            <span className="font-bold text-sm text-gray-900 w-4 text-center">
                              {formData.adults}
                            </span>
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, adults: formData.adults + 1 })}
                              className="w-7 h-7 rounded-md bg-gray-200 text-gray-800 font-black text-sm flex items-center justify-center hover:bg-gray-300"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Children Counter */}
                      <div>
                        <label className="block text-[11px] font-bold text-gray-800 uppercase tracking-wider mb-1">
                          Children (&lt;12 Yrs)
                        </label>
                        <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg h-10 sm:h-11 px-2 justify-between">
                          <span className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-gray-400" />
                            Kids
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, children: Math.max(0, formData.children - 1) })}
                              className="w-7 h-7 rounded-md bg-gray-200 text-gray-800 font-black text-sm flex items-center justify-center hover:bg-gray-300"
                            >
                              -
                            </button>
                            <span className="font-bold text-sm text-gray-900 w-4 text-center">
                              {formData.children}
                            </span>
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, children: formData.children + 1 })}
                              className="w-7 h-7 rounded-md bg-gray-200 text-gray-800 font-black text-sm flex items-center justify-center hover:bg-gray-300"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Row 4: Email & Budget (Optional) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-800 uppercase tracking-wider mb-1">
                          Email <span className="text-gray-400 font-normal lowercase">(optional)</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Mail className="w-3.5 h-3.5" />
                          </div>
                          <input
                            type="email"
                            value={formData.email || ''}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="e.g. rahul@example.com"
                            className="w-full pl-9 pr-3 h-10 sm:h-11 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0B3996] focus:ring-2 focus:ring-[#0B3996]/20 transition-all outline-none font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-800 uppercase tracking-wider mb-1">
                          Hotel Category <span className="text-gray-400 font-normal lowercase">(optional)</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <DollarSign className="w-3.5 h-3.5" />
                          </div>
                          <select
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            className="w-full pl-9 pr-3 h-10 sm:h-11 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-[#0B3996] focus:ring-2 focus:ring-[#0B3996]/20 transition-all outline-none font-medium"
                          >
                            <option value="">Budget / Deluxe (Standard)</option>
                            <option value="Deluxe 3-Star">Deluxe 3-Star</option>
                            <option value="Premium 4-Star">Premium 4-Star</option>
                            <option value="Luxury 5-Star">Luxury 5-Star / Treehouse</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons: Submit Form & WhatsApp Us in Marathi */}
                    <div className="pt-1.5 space-y-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 sm:h-12 bg-[#FF4B00] hover:bg-[#e04200] text-white font-extrabold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 focus:outline-none"
                        id="hero-instant-quote-btn"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Submitting Request...</span>
                          </span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>GET INSTANT QUOTE IN 10 MINS</span>
                          </>
                        )}
                      </button>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-10 sm:h-11 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                        id="hero-whatsapp-btn"
                      >
                        <WhatsAppIcon className="w-4 h-4 fill-white" />
                        <span>आत्ताच व्हॉट्सॲप करा</span>
                      </a>
                    </div>

                    {/* Trust Subtext */}
                    <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-gray-500 font-semibold">
                      <Shield className="w-3.5 h-3.5 text-[#0B3996]" />
                      <span>100% Secure Booking • Zero Hidden Fees • Instant Callback</span>
                    </div>

                  </form>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

