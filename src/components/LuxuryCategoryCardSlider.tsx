import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface SlideData {
  id: string;
  image: string;
  category: string;
  title: string;
  subtitle: string;
}

interface LuxuryCategoryCardSliderProps {
  onSelectCategory?: (category: string) => void;
}

export const LuxuryCategoryCardSlider: React.FC<LuxuryCategoryCardSliderProps> = ({
  onSelectCategory,
}) => {
  // 3 Primary Category Slides using the user's provided high-resolution assets
  const BASE_SLIDES: SlideData[] = [
    {
      id: 'slide-1',
      image: '/src/assets/images/slider/slide_1.png',
      category: 'Rings',
      title: 'Timeless Beauty',
      subtitle: 'Fine Rings For Real Moments',
    },
    {
      id: 'slide-2',
      image: '/src/assets/images/slider/slide_2.png',
      category: 'Necklaces',
      title: 'Heirloom Masterpieces',
      subtitle: 'Certified 22KT Gold Atelier',
    },
    {
      id: 'slide-3',
      image: '/src/assets/images/slider/slide_3.png',
      category: 'Bracelets',
      title: 'Solitaire Brilliance',
      subtitle: 'Crafted For Modern Elegance',
    },
  ];

  const slideCount = BASE_SLIDES.length;

  // Extended virtual track for seamless continuous sliding
  // 9 repetitions = 27 items, center starts at 12 (corresponding to slide 0: Rings)
  const REPEAT_COUNT = 9;
  const EXTENDED_SLIDES: (SlideData & { virtualIndex: number })[] = [];
  for (let r = 0; r < REPEAT_COUNT; r++) {
    BASE_SLIDES.forEach((slide, idx) => {
      EXTENDED_SLIDES.push({
        ...slide,
        virtualIndex: r * slideCount + idx,
      });
    });
  }

  const INITIAL_INDEX = Math.floor(REPEAT_COUNT / 2) * slideCount; // 12
  const [currentIndex, setCurrentIndex] = useState<number>(INITIAL_INDEX);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Active slide index (0, 1, or 2)
  const activeSlideIdx = ((currentIndex % slideCount) + slideCount) % slideCount;

  // Handle slide transition next
  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [isAnimating]);

  // Handle slide transition previous
  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, [isAnimating]);

  // Seamless boundary wrap without visible jump
  useEffect(() => {
    if (!isAnimating) return;

    const timer = setTimeout(() => {
      setIsAnimating(false);

      // If we are getting close to either boundary, reset index invisibly
      if (currentIndex >= (REPEAT_COUNT - 3) * slideCount) {
        setIsTransitioning(false);
        const normalized = activeSlideIdx + Math.floor(REPEAT_COUNT / 2) * slideCount;
        setCurrentIndex(normalized);
      } else if (currentIndex <= 2 * slideCount) {
        setIsTransitioning(false);
        const normalized = activeSlideIdx + Math.floor(REPEAT_COUNT / 2) * slideCount;
        setCurrentIndex(normalized);
      }
    }, 850);

    return () => clearTimeout(timer);
  }, [currentIndex, isAnimating, activeSlideIdx, slideCount]);

  // Autoplay every 4.5 seconds (paused on hover or when animating)
  useEffect(() => {
    if (isHovered) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      handleNext();
    }, 4500);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isHovered, handleNext]);

  // Direct pagination dot click
  const handleDotClick = (targetIdx: number) => {
    if (isAnimating || targetIdx === activeSlideIdx) return;
    const diff = targetIdx - activeSlideIdx;
    setIsAnimating(true);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + diff);
  };

  return (
    <section
      className="relative w-full bg-white py-12 sm:py-18 lg:py-22 select-none overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-[1440px] mx-auto px-2 sm:px-6 lg:px-8">
        {/* ======================================================= */}
        {/* CAROUSEL VIEWPORT CONTAINER */}
        {/* Sized so that Left, Center, and Right cards are all 100% visible */}
        {/* with NO cropping of the outer rounded corners! */}
        {/* ======================================================= */}
        <div className="relative w-full h-[280px] sm:h-[380px] md:h-[450px] lg:h-[510px] flex items-center justify-center">
          {/* SLIDES STACK */}
          {EXTENDED_SLIDES.map((slide, i) => {
            const diff = i - currentIndex;

            // Render window from -3 to +3 so all moving slides are pre-mounted in the DOM
            // This prevents sudden unmounting or popping into an "unvisible strip"!
            if (Math.abs(diff) > 3) return null;

            const isCenter = diff === 0;
            const isLeft = diff === -1;
            const isRight = diff === 1;

            // Precise proportional offsets so side cards are COMPLETELY visible with full rounded corners
            // Center is at 0%.
            // Left is at -52% (fully within the container padding, no corner cropped).
            // Right is at +52% (fully within the container padding, no corner cropped).
            // Exiting cards glide outward to -95% / +95% with smooth fade out.
            let translateX = '0%';
            let scale = 1;
            let zIndex = 20;
            let opacity = 1;

            if (isCenter) {
              translateX = '0%';
              scale = 1;
              zIndex = 25;
              opacity = 1;
            } else if (isLeft) {
              translateX = '-52%';
              scale = 0.85;
              zIndex = 10;
              opacity = 0.95;
            } else if (isRight) {
              translateX = '52%';
              scale = 0.85;
              zIndex = 10;
              opacity = 0.95;
            } else if (diff <= -2) {
              translateX = '-96%';
              scale = 0.72;
              zIndex = 5;
              opacity = 0;
            } else if (diff >= 2) {
              translateX = '96%';
              scale = 0.72;
              zIndex = 5;
              opacity = 0;
            }

            return (
              <div
                key={`slide-${slide.virtualIndex}`}
                style={{
                  transform: `translate3d(${translateX}, 0, 0) scale(${scale})`,
                  zIndex,
                  opacity,
                  transition: isTransitioning
                    ? 'transform 800ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease'
                    : 'none',
                }}
                className={`absolute top-0 bottom-0 my-auto w-[82vw] sm:w-[56vw] md:w-[50vw] lg:w-[46vw] max-w-[660px] h-full flex items-center justify-center will-change-transform pointer-events-auto ${
                  // On small mobile: hide side previews, show primary active card
                  !isCenter ? 'hidden sm:flex' : 'flex'
                }`}
              >
                {/* FULL UNCLIPPED CARD FRAME */}
                <div
                  onClick={() => {
                    if (isCenter && onSelectCategory) {
                      onSelectCategory(slide.category);
                    } else if (isLeft) {
                      handlePrev();
                    } else if (isRight) {
                      handleNext();
                    }
                  }}
                  className={`w-full h-full rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-[0_10px_32px_rgba(0,0,0,0.08)] bg-white cursor-pointer relative group transition-transform duration-300 ${
                    isCenter ? 'hover:scale-[1.01]' : 'hover:opacity-100'
                  }`}
                >
                  {/* SLIDE IMAGE */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center block pointer-events-none"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}

          {/* ======================================================= */}
          {/* NAVIGATION ARROWS (Floating Cleanly Outside Side Cards) */}
          {/* ======================================================= */}
          {/* Previous Arrow (Left) */}
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className="absolute left-1 sm:left-3 md:left-6 lg:left-8 z-30 w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-white hover:bg-white text-[#2C1D20] hover:text-[#D14963] shadow-[0_6px_22px_rgba(0,0,0,0.12)] hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-[1.06] active:scale-95 cursor-pointer disabled:opacity-50"
            aria-label="Previous category slide"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
          </button>

          {/* Next Arrow (Right) */}
          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="absolute right-1 sm:right-3 md:right-6 lg:right-8 z-30 w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-white hover:bg-white text-[#2C1D20] hover:text-[#D14963] shadow-[0_6px_22px_rgba(0,0,0,0.12)] hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-[1.06] active:scale-95 cursor-pointer disabled:opacity-50"
            aria-label="Next category slide"
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
          </button>
        </div>

        {/* ======================================================= */}
        {/* PAGINATION INDICATORS (Centered Below) */}
        {/* Active: Miraya Pink Pill (32px x 5px) | Inactive: Dot (6px x 6px) */}
        {/* ======================================================= */}
        <div className="flex items-center justify-center gap-2 pt-6 sm:pt-8">
          {BASE_SLIDES.map((slide, idx) => {
            const isActive = idx === activeSlideIdx;
            return (
              <button
                key={slide.id}
                onClick={() => handleDotClick(idx)}
                className={`transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full cursor-pointer ${
                  isActive
                    ? 'w-8 sm:w-9 h-1.5 bg-[#D14963]'
                    : 'w-1.5 h-1.5 bg-[#D9D9D9] hover:bg-[#B5B5B5]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
