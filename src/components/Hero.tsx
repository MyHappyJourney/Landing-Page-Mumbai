import React from 'react';
import { CheckCircle2, Shield, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MSG } from '../data/tourData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeroProps {
  onQuoteClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteClick }) => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_DEFAULT_MSG}`;

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
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-10 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Route Details */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-[#0B3996]/90 backdrop-blur-md text-white text-xs sm:text-sm font-extrabold px-3.5 py-1.5 rounded-full border border-blue-400/30 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
              <span>EXPLORE GOD'S OWN COUNTRY 🌴</span>
            </div>

            {/* Main Title */}
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-md">
                KERALA <br />
                <span className="text-amber-400">TOUR PACKAGES</span>
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

            {/* Desktop quick highlights */}
            <div className="hidden sm:flex items-center gap-6 text-xs sm:text-sm text-gray-200 pt-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0B3996] fill-white" />
                <span>Zero Hidden Fees</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0B3996] fill-white" />
                <span>100% Customized Trips</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0B3996] fill-white" />
                <span>Dedicated Driver</span>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Conversion Pricing Card */}
          <div className="lg:col-span-5">
            <div className="bg-white text-gray-900 rounded-2xl p-5 sm:p-7 shadow-2xl border border-gray-100 relative overflow-hidden">
              {/* Highlight ribbon */}
              <div className="absolute top-0 right-0 bg-[#0B3996] text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                BEST SELLER
              </div>

              {/* Price Header */}
              <div className="text-center border-b pb-4 mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  KERALA TOUR SPECIAL OFFER
                </p>
                <div className="flex items-baseline justify-center gap-1 my-1">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B3996]">
                    Get Best Quote
                  </span>
                </div>
                <p className="text-xs font-extrabold text-[#0B3996] uppercase tracking-wider">
                  100% CUSTOMIZABLE • BEST PRICE GUARANTEE
                </p>
              </div>

              {/* Inclusions List */}
              <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-gray-700 font-medium">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0B3996] shrink-0" />
                  <span>Handpicked 3-Star / 4-Star Hotels</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0B3996] shrink-0" />
                  <span>Private AC Sedan / SUV Vehicle</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0B3996] shrink-0" />
                  <span>Daily Breakfast Included</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0B3996] shrink-0" />
                  <span>Deluxe Houseboat Stay with All Meals</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0B3996] shrink-0" />
                  <span>All transfers & Complete Sightseeing</span>
                </li>
              </ul>

              {/* Primary Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={onQuoteClick}
                  className="w-full h-12 sm:h-13 bg-[#FF4B00] hover:bg-[#e04200] text-white font-extrabold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer focus:outline-none"
                  id="hero-instant-quote-btn"
                >
                  <span>GET BEST QUOTE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 sm:h-12 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  id="hero-whatsapp-btn"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                  <span>WHATSAPP US NOW</span>
                </a>
              </div>

              {/* Trust Subtext */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center gap-1.5 text-xs text-gray-500 font-semibold">
                <Shield className="w-3.5 h-3.5 text-[#0B3996]" />
                <span>100% SECURE BOOKING • NO HIDDEN FEES</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
