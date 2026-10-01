import React from 'react';
import { ArrowRight, Sparkles, Award, Star } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onBookConsultation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  onBookConsultation,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FFFAFA] pt-8 sm:pt-12 pb-16 lg:py-20 border-b border-[#EEDDE0]">
      {/* Subtle background ambient warmth */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FDF1F3] rounded-full filter blur-3xl opacity-60 pointer-events-none -z-10" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT COLUMN: Editorial copy */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-px bg-[#D14963]" />
              <span className="text-[11px] sm:text-xs tracking-[0.25em] font-semibold text-[#D14963] uppercase">
                THE MIRAYA SIGNATURE
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[58px] leading-[1.1] text-[#302326] font-medium tracking-tight">
              Where Every{' '}
              <span className="text-[#D14963] italic font-normal">Diamond</span>{' '}
              Tells a Story
            </h1>

            {/* Concise Editorial Copy */}
            <p className="text-[#75686A] text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              At Miraya Diamonds, our master artisans curate peerless, ethically sourced solitaires. 
              Each creation honors ancestral benchcraft, microscopic precision, and the quiet 
              resonance of your life’s most cherished celebrations.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onExplore}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#D14963] hover:bg-[#b83852] text-white rounded-full text-xs font-medium tracking-[0.08em] uppercase transition-all duration-200 shadow-sm cursor-pointer group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onBookConsultation}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-[#FDF1F3] text-[#302326] rounded-full text-xs font-medium tracking-[0.08em] uppercase border border-[#EEDDE0] hover:border-[#D14963] transition-all duration-200 cursor-pointer"
              >
                <span>Book Consultation</span>
              </button>
            </div>

            {/* Trust / Statistic Row */}
            <div className="pt-6 border-t border-[#EEDDE0] flex flex-wrap items-center gap-6 text-[#302326]">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#D14963] text-[#D14963]"
                    />
                  ))}
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-serif font-semibold text-[#302326] leading-none">
                    25K+
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#75686A] tracking-normal mt-0.5">
                    Celebrated Patrons Across India & Beyond
                  </div>
                </div>
              </div>

              <div className="hidden sm:block h-8 w-px bg-[#EEDDE0]" />

              <div className="flex items-center gap-2 text-xs text-[#75686A]">
                <Award className="w-4 h-4 text-[#D14963] shrink-0" />
                <span>100% Conflict-Free GIA & IGI Solitaires</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Luxury jewellery model image with floating badges */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative subtle border frame */}
              <div className="absolute -inset-2 rounded-[22px] border border-[#EEDDE0]/60 pointer-events-none hidden sm:block" />

              {/* Main Image Container */}
              <div className="relative rounded-[16px] overflow-hidden bg-[#FDF1F3] shadow-md border border-[#EEDDE0]">
                <img
                  src="/src/assets/images/hero_jewellery_model_1790703049237.jpg"
                  alt="Miraya Diamonds luxury jewellery model wearing fine diamond necklace and solitaire earrings"
                  className="w-full h-[420px] sm:h-[500px] lg:h-[540px] object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle gradient overlay at bottom for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#211416]/30 via-transparent to-transparent pointer-events-none" />

                {/* Floating Badge / Card: CRAFTED WITH PRECISION */}
                <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-[12px] border border-[#EEDDE0] shadow-sm flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#FDF1F3] flex items-center justify-center shrink-0 border border-[#EEDDE0]">
                    <Sparkles className="w-5 h-5 text-[#D14963]" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.16em] uppercase font-semibold text-[#D14963]">
                      CRAFTED WITH PRECISION
                    </div>
                    <div className="text-xs text-[#302326] font-medium mt-0.5">
                      Micro-Pavé Setting & Hand-Polished 18K Gold
                    </div>
                  </div>
                </div>

                {/* Floating Top-Right Mini Badge */}
                <div className="absolute top-4 right-4 bg-[#FFFAFA]/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-[#EEDDE0] shadow-2xs hidden sm:flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-medium text-[#302326]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D14963]" />
                  Atelier Collection 2026
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
