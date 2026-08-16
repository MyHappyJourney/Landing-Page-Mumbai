import React from 'react';
import { PackageItem } from '../types';
import { ArrowRight, Star, Clock, Zap } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/tourData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface PackageCardProps {
  pkg: PackageItem;
  onViewDetails: (pkg: PackageItem) => void;
  onGetQuote: (pkg: PackageItem) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, onViewDetails, onGetQuote }) => {
  const priceInfo = 'Best Price Quote';
  const whatsappMsg = encodeURIComponent(
    `Hi MyHappyJourney, I am interested in the "${pkg.title}" (${pkg.durationBadge} - ${priceInfo}). Please share package details, itinerary, and availability.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden flex flex-col h-full border transition-all duration-300 hover:shadow-xl ${
        pkg.isPopular
          ? 'border-[#FF4B00] shadow-md ring-2 ring-[#FF4B00]/20 relative'
          : 'border-gray-200 shadow-xs hover:border-gray-300'
      }`}
    >
      {/* Most Popular Badge Banner */}
      {pkg.isPopular && (
        <div className="bg-[#FF4B00] text-white text-[11px] font-black uppercase tracking-wider text-center py-1.5 px-3 flex items-center justify-center gap-1">
          <Star className="w-3.5 h-3.5 fill-white" />
          <span>MOST POPULAR CHOICE</span>
        </div>
      )}

      {/* Card Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-gray-100">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Top-Right Speed Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-emerald-900 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-sm border border-emerald-200/80 flex items-center gap-1 z-10">
          <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600 animate-pulse" />
          <span>Get quote in 10 minutes</span>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 left-3 bg-[#0B3996] text-white text-xs font-black px-3 py-1 rounded-md shadow-md uppercase tracking-wider">
          {pkg.durationBadge}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="font-extrabold text-base sm:text-lg text-gray-900 leading-snug mb-2">
            {pkg.title}
          </h3>

          {/* Route Description */}
          <p className="text-xs sm:text-sm font-semibold text-gray-700 bg-[#F6F7F6] p-2.5 rounded-lg border border-gray-100 mb-3">
            📍 {pkg.route}
          </p>

          {/* Highlights preview */}
          <ul className="space-y-1.5 mb-4 text-xs text-gray-600">
            {pkg.highlights.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-[#0B3996] font-bold">✓</span>
                <span className="line-clamp-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card Footer: Price & CTA */}
        <div className="pt-3 border-t border-gray-100">
          
          {/* Fast Response Guarantee Pill */}
          <div className="flex items-center justify-between gap-1 text-[11px] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200/80 mb-3">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>Get quote in 10 minutes</span>
            </span>
            <span className="text-[10px] font-black uppercase text-emerald-700 bg-white px-1.5 py-0.5 rounded border border-emerald-200">
              ⚡ Instant
            </span>
          </div>

          <div className="flex items-center justify-between mb-3 py-0.5">
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400">Package Pricing</p>
              <span className="font-black text-lg sm:text-xl text-[#0B3996]">
                GET BEST QUOTE →
              </span>
            </div>
            <span className="text-[10px] text-[#0B3996] font-extrabold bg-[#EBF2FF] px-2 py-1 rounded">
              Best Rate
            </span>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onViewDetails(pkg)}
                className="w-full py-2.5 px-2 bg-[#F6F7F6] hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl border border-gray-200 transition-colors cursor-pointer"
              >
                VIEW DETAILS
              </button>
              <button
                onClick={() => onGetQuote(pkg)}
                className={`w-full py-2.5 px-2 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                  pkg.isPopular ? 'bg-[#FF4B00] hover:bg-[#e04200]' : 'bg-[#0B3996] hover:bg-[#082b75]'
                }`}
              >
                <span>GET BEST QUOTE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-extrabold rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              id={`whatsapp-btn-${pkg.id}`}
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>WHATSAPP {pkg.durationBadge}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
