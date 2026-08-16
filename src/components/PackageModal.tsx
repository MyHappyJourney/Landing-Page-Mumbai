import React from 'react';
import { PackageItem } from '../types';
import { X, CheckCircle2, Shield, MapPin, ArrowRight } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/tourData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface PackageModalProps {
  pkg: PackageItem | null;
  onClose: () => void;
  onGetQuote: (pkg: PackageItem) => void;
}

export const PackageModal: React.FC<PackageModalProps> = ({ pkg, onClose, onGetQuote }) => {
  if (!pkg) return null;

  const priceLabel = 'Best Price Quote';
  const whatsappMsg = encodeURIComponent(`Hi MyHappyJourney, I want more details regarding the "${pkg.title}" (${priceLabel}). Please contact me.`);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header with image */}
        <div className="relative h-48 sm:h-56 bg-gray-900 shrink-0">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="bg-[#0B3996] text-xs font-black px-2.5 py-1 rounded uppercase tracking-wider mb-2 inline-block">
              {pkg.durationBadge}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">{pkg.title}</h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Price Box */}
          <div className="bg-[#EBF2FF] p-4 rounded-xl border border-[#0B3996]/30 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#0B3996] uppercase">Package Special Offer</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-xl sm:text-2xl font-black text-[#0B3996]">
                  GET BEST QUOTE →
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#0B3996] bg-white px-3 py-1.5 rounded-lg border border-[#0B3996]/20 shadow-2xs">
              Customizable Itinerary
            </span>
          </div>

          {/* Route Breakdown */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#0B3996]" />
              <span>Tour Route & Destinations:</span>
            </h4>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold text-gray-800">
              {pkg.route}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-2">Key Highlights Included:</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
              {pkg.highlights.map((hl, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0B3996] shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-[11px] text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#0B3996] shrink-0" />
            <span>Fully customizable itinerary based on your flight/train schedule and preferences.</span>
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold rounded-xl text-center text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <WhatsAppIcon className="w-5 h-5 fill-white" />
            <span>WhatsApp Enquiry</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onGetQuote(pkg);
            }}
            className="w-full py-3 bg-[#FF4B00] hover:bg-[#e04200] text-white font-extrabold rounded-xl text-center text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md"
          >
            <span>Get Best Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
