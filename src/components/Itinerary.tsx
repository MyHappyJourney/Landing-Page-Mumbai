import React, { useState } from 'react';
import { ITINERARY_DAYS } from '../data/tourData';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';

export const Itinerary: React.FC = () => {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  const toggleDay = (dayNumber: number) => {
    setExpandedDay(expandedDay === dayNumber ? null : dayNumber);
  };

  return (
    <section id="itinerary-section" className="py-12 sm:py-16 bg-white border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-[#0B3996] font-bold text-xs uppercase tracking-widest bg-[#EBF2FF] px-3.5 py-1 rounded-full border border-[#0B3996]/20">
            FLAGSHIP 6N / 7D PLAN
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 mt-2 tracking-tight">
            YOUR 6 NIGHTS 7 DAYS TOUR ITINERARY 🌴
          </h2>
          <p className="text-xs sm:text-base text-gray-600 mt-2">
            Perfectly paced day-by-day travel plan covering mountains, wildlife, backwaters & beaches.
          </p>
        </div>

        {/* DESKTOP HORIZONTAL TIMELINE VIEW (lg:block) */}
        <div className="hidden lg:block relative py-6">
          {/* Connecting dashed line behind day circles */}
          <div className="absolute top-[38px] left-[6%] right-[6%] h-[2px] border-t-2 border-dashed border-[#0B3996]/40 z-0" />

          {/* 7 Days Grid */}
          <div className="grid grid-cols-7 gap-3 relative z-10">
            {ITINERARY_DAYS.map((day) => (
              <div key={day.dayNumber} className="flex flex-col items-center text-center group">
                {/* Day Badge Circle */}
                <div className="w-14 h-14 rounded-full bg-white border-2 border-[#0B3996] text-[#0B3996] font-black text-xs flex flex-col items-center justify-center shadow-md group-hover:bg-[#0B3996] group-hover:text-white transition-colors mb-3">
                  <span className="text-[9px] uppercase font-bold tracking-wider">DAY</span>
                  <span className="text-base leading-none">{day.dayNumber}</span>
                </div>

                {/* Day Image Thumbnail */}
                <div className="w-full h-24 rounded-xl overflow-hidden mb-3 shadow-xs border border-gray-200">
                  <img
                    src={day.image}
                    alt={day.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>

                {/* Destination Title */}
                <h3 className="font-extrabold text-sm text-gray-900 leading-snug mb-1">
                  {day.title}
                </h3>

                {/* Key Bullet Highlights */}
                <ul className="text-[11px] text-gray-600 text-left space-y-1 w-full bg-[#F6F7F6] p-2 rounded-lg border border-gray-100 flex-1">
                  {day.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-[#0B3996] font-bold">•</span>
                      <span className="line-clamp-2">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE VERTICAL TIMELINE VIEW (lg:hidden) */}
        <div className="lg:hidden relative pl-10 sm:pl-12 space-y-4">
          {/* Vertical Connecting Line */}
          <div className="absolute top-5 bottom-5 left-[18px] sm:left-[22px] w-[2px] bg-gradient-to-b from-[#0B3996] via-[#0B3996]/60 to-gray-200 z-0" />

          {ITINERARY_DAYS.map((day) => {
            const isExpanded = expandedDay === day.dayNumber;

            return (
              <div
                key={day.dayNumber}
                className="relative bg-white rounded-2xl border border-gray-200 shadow-xs transition-all"
              >
                {/* Timeline Circle Badge on left - fully visible */}
                <div className="absolute -left-[38px] sm:-left-[46px] top-3.5 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0B3996] text-white border-2 border-white font-black text-xs flex flex-col items-center justify-center shadow-md shrink-0">
                  <span className="text-[8px] leading-none uppercase font-bold">DAY</span>
                  <span className="text-xs sm:text-sm font-black leading-tight">{day.dayNumber}</span>
                </div>

                {/* Inner Card Container */}
                <div className="overflow-hidden rounded-2xl">
                  {/* Day Header Bar */}
                  <button
                    onClick={() => toggleDay(day.dayNumber)}
                    className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 focus:outline-none cursor-pointer bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={day.image}
                        alt={day.title}
                        className="w-12 h-12 rounded-lg object-cover shrink-0 border border-gray-100 shadow-xs"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                      <div>
                        <h3 className="font-extrabold text-sm sm:text-base text-gray-900 leading-snug">
                          {day.title}
                        </h3>
                        <p className="text-xs text-[#0B3996] font-semibold flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span>{day.route}</span>
                        </p>
                      </div>
                    </div>

                    <div className="p-1.5 rounded-full bg-gray-100 text-gray-600 shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Expandable Day Details */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 sm:px-6 border-t border-gray-100 bg-gray-50/70 space-y-3">
                      {day.description && (
                        <p className="text-xs text-gray-600 leading-relaxed pt-1">
                          {day.description}
                        </p>
                      )}

                      <div>
                        <p className="text-[11px] font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                          Day Highlights:
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-gray-700 font-medium">
                          {day.highlights.map((hl, idx) => (
                            <li key={idx} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-200/80">
                              <span className="w-2 h-2 rounded-full bg-[#0B3996] shrink-0" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {day.stayLocation && (
                        <div className="text-[11px] font-semibold text-gray-500 flex items-center gap-1.5 pt-1">
                          <span>Night Stay:</span>
                          <span className="font-bold text-[#0B3996]">{day.stayLocation}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
