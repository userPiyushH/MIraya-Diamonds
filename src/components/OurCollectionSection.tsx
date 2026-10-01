import React, { useState, useRef, useMemo } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  COLLECTION_PRODUCTS,
  CollectionProduct,
} from '../data/collectionProducts';

interface OurCollectionSectionProps {
  onViewAll: () => void;
  onSelectProduct: (product: CollectionProduct) => void;
}

type CategoryFilter = 'all' | 'rings' | 'necklaces' | 'bracelets' | 'earrings' | 'bangles';

interface CategoryPill {
  id: CategoryFilter;
  label: string;
}

const CATEGORY_PILLS: CategoryPill[] = [
  { id: 'all', label: 'All' },
  { id: 'rings', label: 'Rings' },
  { id: 'necklaces', label: 'Necklace' },
  { id: 'bracelets', label: 'Bracelets' },
  { id: 'earrings', label: 'Earrings' },
  { id: 'bangles', label: 'Bangels' }, // Kept label as in screenshot 'Bangels'
];

export const OurCollectionSection: React.FC<OurCollectionSectionProps> = ({
  onViewAll,
  onSelectProduct,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [isCategoryTransitioning, setIsCategoryTransitioning] = useState<boolean>(false);

  // Filtered raw product list
  const baseProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return COLLECTION_PRODUCTS;
    }
    return COLLECTION_PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Ensure there are at least 8 items for continuous carousel cycling
  const productsForCarousel = useMemo(() => {
    if (baseProducts.length >= 8) return baseProducts;
    // Repeat items to ensure a rich infinite loop
    let duplicated = [...baseProducts];
    while (duplicated.length < 8) {
      duplicated = [...duplicated, ...baseProducts];
    }
    return duplicated;
  }, [baseProducts]);

  // Carousel items state
  const [items, setItems] = useState<CollectionProduct[]>(productsForCarousel);
  const [translateX, setTranslateX] = useState<number>(0);
  const [useTransition, setUseTransition] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync items when activeCategory changes with smooth opacity + translateY fade
  const handleCategoryChange = (cat: CategoryFilter) => {
    if (cat === activeCategory || isAnimating) return;
    setIsCategoryTransitioning(true);

    setTimeout(() => {
      setActiveCategory(cat);
      const filtered =
        cat === 'all'
          ? COLLECTION_PRODUCTS
          : COLLECTION_PRODUCTS.filter((p) => p.category === cat);

      let pool = [...filtered];
      while (pool.length < 8) {
        pool = [...pool, ...filtered];
      }
      setItems(pool);
      setUseTransition(false);
      setTranslateX(0);

      setTimeout(() => {
        setIsCategoryTransitioning(false);
      }, 50);
    }, 250);
  };

  // Calculate dynamic step (card width + gap)
  const getStep = () => {
    if (!carouselContainerRef.current) return 240;
    const containerWidth = carouselContainerRef.current.clientWidth;
    // Desktop: 5 cards visible with 4 gaps of 16px
    if (window.innerWidth >= 1024) {
      return (containerWidth - 64) / 5 + 16;
    }
    // Tablet: 3 cards
    if (window.innerWidth >= 640) {
      return (containerWidth - 32) / 3 + 16;
    }
    // Mobile: 1.5 cards
    return (containerWidth - 16) / 1.5 + 16;
  };

  // NEXT SLIDE (Cards move LEFT)
  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const step = getStep();

    setUseTransition(true);
    setTranslateX(-step);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      // Reorder items
      setItems((prev) => [...prev.slice(1), prev[0]]);
      setUseTransition(false);
      setTranslateX(0);

      requestAnimationFrame(() => {
        setIsAnimating(false);
      });
    }, 750);
  };

  // PREVIOUS SLIDE (Cards move RIGHT)
  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const step = getStep();

    // Pre-shift array backward
    setItems((prev) => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]);
    setUseTransition(false);
    setTranslateX(-step);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setUseTransition(true);
        setTranslateX(0);

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setIsAnimating(false);
        }, 750);
      });
    });
  };

  return (
    <section className="relative w-full bg-[#FFFBF2] py-14 sm:py-20 lg:py-24 select-none overflow-hidden border-t border-[#F5EFE3]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ======================================================= */}
        {/* 1. SECTION HEADING & SUBHEADING (Matching Screenshot) */}
        {/* ======================================================= */}
        <div className="text-center space-y-2 pb-6 sm:pb-8">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[44px] text-[#302326] font-normal tracking-wide">
            Our Collection
          </h2>
          <p className="text-xs sm:text-sm text-[#75686A] font-sans tracking-normal">
            Explore the latest range of products
          </p>
        </div>

        {/* ======================================================= */}
        {/* 2. CATEGORY FILTER PILLS (Centered, Pill-shaped) */}
        {/* ======================================================= */}
        <div className="flex items-center justify-center overflow-x-auto no-scrollbar py-2 px-2 gap-2 sm:gap-2.5 mb-8 sm:mb-12">
          {CATEGORY_PILLS.map((pill) => {
            const isActive = activeCategory === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => handleCategoryChange(pill.id)}
                className={`px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer shadow-xs whitespace-nowrap ${
                  isActive
                    ? 'bg-[#D14963] text-white shadow-sm scale-[1.02]'
                    : 'bg-white text-[#302326] hover:bg-[#FAF4EB] border border-[#EADBDE]'
                }`}
                aria-label={`Filter by ${pill.label}`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* ======================================================= */}
        {/* 3. CAROUSEL STAGE (5 Cards on Desktop + Arrows Outside) */}
        {/* ======================================================= */}
        <div className="relative flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
          {/* FAR LEFT ARROW BUTTON (52px Circular White) */}
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className="z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white hover:bg-white text-[#302326] hover:text-[#D14963] shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-[1.04] active:scale-95 cursor-pointer shrink-0 disabled:opacity-50"
            aria-label="Previous products"
          >
            <ArrowLeft className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2]" />
          </button>

          {/* VIEWPORT CONTAINER */}
          <div
            ref={carouselContainerRef}
            className={`flex-1 overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isCategoryTransitioning
                ? 'opacity-0 translate-y-3'
                : 'opacity-100 translate-y-0'
            }`}
          >
            {/* CAROUSEL TRACK */}
            <div
              className="flex items-center gap-4 sm:gap-4.5 py-3 will-change-transform"
              style={{
                transform: `translate3d(${translateX}px, 0, 0)`,
                transition: useTransition
                  ? 'transform 750ms cubic-bezier(0.22, 1, 0.36, 1)'
                  : 'none',
              }}
            >
              {items.map((product, idx) => (
                <div
                  key={`${product.id}-${idx}`}
                  onClick={() => onSelectProduct(product)}
                  className="w-[calc((100%-16px)/1.5)] sm:w-[calc((100%-32px)/3)] lg:w-[calc((100%-64px)/5)] shrink-0 cursor-pointer select-none group"
                >
                  {/* Product Image Stage (Clean White Box, Hover Crossfade & Scale) */}
                  <div className="relative w-full aspect-square bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex items-center justify-center border border-[#EFEAE2] shadow-xs overflow-hidden">
                    {/* Primary Image */}
                    <img
                      src={product.primaryImage}
                      alt={product.name}
                      className="w-full h-full object-contain object-center absolute inset-0 p-4 sm:p-5 opacity-100 group-hover:opacity-0 scale-100 group-hover:scale-95 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none drop-shadow-xs"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />

                    {/* Secondary Image (Smooth crossfade on hover) */}
                    {product.secondaryImage ? (
                      <img
                        src={product.secondaryImage}
                        alt={`${product.name} perspective`}
                        className="w-full h-full object-contain object-center absolute inset-0 p-4 sm:p-5 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-[1.02] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none drop-shadow-xs"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    ) : null}
                  </div>

                  {/* Product Meta & Pricing */}
                  <div className="pt-3 px-1 space-y-0.5 text-left">
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold text-sm sm:text-base text-[#302326]">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-[#9E8E92] line-through font-normal">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-[13px] text-[#55484A] font-normal truncate group-hover:text-[#D14963] transition-colors">
                      {product.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAR RIGHT ARROW BUTTON (52px Circular White) */}
          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white hover:bg-white text-[#302326] hover:text-[#D14963] shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-[1.04] active:scale-95 cursor-pointer shrink-0 disabled:opacity-50"
            aria-label="Next products"
          >
            <ArrowRight className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2]" />
          </button>
        </div>

        {/* ======================================================= */}
        {/* 4. VIEW ALL BUTTON (Centered, Miraya Pink #D14963, Pill-Shaped) */}
        {/* ======================================================= */}
        <div className="flex justify-center pt-10 sm:pt-14">
          <button
            onClick={onViewAll}
            className="w-[180px] sm:w-[200px] h-[50px] sm:h-[54px] rounded-full bg-[#D14963] hover:bg-[#BE3F58] text-white text-sm sm:text-base font-medium tracking-wide shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center justify-center"
          >
            View All
          </button>
        </div>
      </div>
    </section>
  );
};
