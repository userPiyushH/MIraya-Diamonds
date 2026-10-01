import React, { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface NewArrivalProduct {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  image: string;
}

interface NewArrivalsSectionProps {
  onShopNow?: () => void;
  onSelectProduct?: (product: NewArrivalProduct) => void;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({
  onShopNow,
  onSelectProduct,
}) => {
  // Initial products matching the screenshot
  const initialProducts: NewArrivalProduct[] = [
    {
      id: 'na-1',
      name: 'Bhivita 22KT Earring',
      price: '₹38,255',
      originalPrice: '₹40,255',
      image: '/src/assets/images/bhivita_earrings_1790761788020.jpg',
    },
    {
      id: 'na-2',
      name: '22KT Gold Ring',
      price: '₹38,255',
      originalPrice: '₹40,255',
      image: '/src/assets/images/gold_ring_1790761801673.jpg',
    },
    {
      id: 'na-3',
      name: 'Bhivita 22KT Bracelet',
      price: '₹38,255',
      originalPrice: '₹40,255',
      image: '/src/assets/images/bhivita_bracelet_1790761828857.jpg',
    },
    {
      id: 'na-4',
      name: 'Bhivita 22KT Necklace',
      price: '₹38,255',
      originalPrice: '₹40,255',
      image: '/src/assets/images/bhivita_necklace_1790761816007.jpg',
    },
    {
      id: 'na-5',
      name: 'Solitaire Pendant 22KT',
      price: '₹34,800',
      originalPrice: '₹37,500',
      image: '/src/assets/images/circle_pendant_thumb_1790764103077.jpg',
    },
    {
      id: 'na-6',
      name: 'Bhivita Floral Studs',
      price: '₹29,900',
      originalPrice: '₹32,000',
      image: '/src/assets/images/floral_earrings_thumb_1790764074763.jpg',
    },
  ];

  const [products, setProducts] = useState<NewArrivalProduct[]>(initialProducts);
  const [translateX, setTranslateX] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [useTransition, setUseTransition] = useState<boolean>(true);
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Card width + gap step (210px card width + 16px gap = 226px on desktop)
  const getStep = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 196; // 180 + 16
      if (window.innerWidth < 1024) return 226; // 210 + 16
    }
    return 236; // 220 + 16 on desktop
  };

  // NEXT: Slides LEFT, product enters behind hero image
  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const step = getStep();

    setUseTransition(true);
    setTranslateX(-step);

    if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
    animationTimerRef.current = setTimeout(() => {
      // Reorder products array: first item goes to end
      setProducts((prev) => [...prev.slice(1), prev[0]]);
      // Reset translate instantly without animation
      setUseTransition(false);
      setTranslateX(0);

      // Re-enable transition for next click
      requestAnimationFrame(() => {
        setIsAnimating(false);
      });
    }, 750);
  };

  // PREV: Slides RIGHT, previous product emerges from behind hero image
  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const step = getStep();

    // 1. Move last item to front immediately at -step offset without transition
    setProducts((prev) => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]);
    setUseTransition(false);
    setTranslateX(-step);

    // 2. Animate from -step to 0 in next frame (emerging from behind hero)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setUseTransition(true);
        setTranslateX(0);

        if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
        animationTimerRef.current = setTimeout(() => {
          setIsAnimating(false);
        }, 750);
      });
    });
  };

  return (
    <section className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14 bg-white select-none">
      {/* SECTION HEADER */}
      <div className="text-center space-y-1.5 pb-6 sm:pb-8">
        <h2 className="font-serif text-3xl sm:text-4xl text-[#302326] font-normal tracking-wide">
          New Arrivals
        </h2>
        <p className="text-xs sm:text-sm text-[#75686A]">
          Explore the latest range of products
        </p>
      </div>

      {/* MAIN SECTION BANNER & CAROUSEL CONTAINER */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#962A3F] via-[#FCE9ED] to-[#FCE9ED] shadow-xs border border-[#F3DEE3]">
        <div className="relative flex flex-col lg:flex-row min-h-[380px] sm:min-h-[410px] lg:min-h-[440px]">
          {/* ======================================================= */}
          {/* LEFT: HERO PROMOTIONAL IMAGE (z-20 HIGHER STACKING CONTEXT) */}
          {/* Using user-provided link image: https://ibb.co/zWm0hZRY */}
          {/* Acts as fixed visual boundary / mask for entering products */}
          {/* ======================================================= */}
          <div className="relative z-20 w-full lg:w-[440px] xl:w-[480px] shrink-0 bg-[#912A3E] overflow-hidden min-h-[240px] sm:min-h-[290px] lg:min-h-full shadow-[6px_0_20px_-3px_rgba(0,0,0,0.18)]">
            <img
              src="/src/assets/images/new_arrivals_promo_banner_user.png"
              alt="New Arrivals"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://i.ibb.co/dsfz0D2q/image-37.png';
              }}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* ======================================================= */}
          {/* RIGHT: PINK AREA (Contains carousel cards + bottom controls) */}
          {/* Stacking context z-10 slides underneath hero image */}
          {/* ======================================================= */}
          <div className="relative z-10 flex-1 flex flex-col justify-between bg-[#FCE9ED] py-6 sm:py-7 pl-4 lg:pl-6 pr-4 sm:pr-6 overflow-hidden">
            {/* CAROUSEL TRACK VIEWPORT */}
            <div className="overflow-hidden w-full py-1">
              <div
                className="flex items-center gap-4 sm:gap-4.5 will-change-transform"
                style={{
                  transform: `translate3d(${translateX}px, 0, 0)`,
                  transition: useTransition
                    ? 'transform 750ms cubic-bezier(0.22, 1, 0.36, 1)'
                    : 'none',
                }}
              >
                {products.map((product, idx) => (
                  <div
                    key={`${product.id}-${idx}`}
                    onClick={() => onSelectProduct && onSelectProduct(product)}
                    className="group w-[180px] sm:w-[205px] md:w-[220px] shrink-0 cursor-pointer select-none"
                  >
                    {/* Card Image Container with Miraya Pink Border on Hover */}
                    <div className="relative w-full aspect-square bg-white rounded-2xl p-3 sm:p-4 flex items-center justify-center border-2 border-transparent transition-colors duration-300 ease-out group-hover:border-[#D14963] shadow-xs overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Product Details (Price & Title) */}
                    <div className="pt-2.5 px-0.5 space-y-0.5 text-left">
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-sm sm:text-base text-[#D14963]">
                          {product.price}
                        </span>
                        <span className="text-xs text-[#9E8E92] line-through font-normal">
                          {product.originalPrice}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm text-[#302326] font-normal truncate">
                        {product.name}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTROLS INSIDE PINK AREA DIRECTLY BENEATH CARDS: */}
            {/* ONE CORNER: ARROWS (LEFT), OPPOSITE CORNER: SHOP NOW BUTTON (RIGHT) */}
            <div className="flex items-center justify-between pt-4 sm:pt-5 border-t border-[#F5D5DC]/60 mt-2">
              {/* Corner 1: Circular White Arrow Buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handlePrev}
                  disabled={isAnimating}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-white text-[#302326] hover:text-[#D14963] shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-md flex items-center justify-center transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer disabled:opacity-50"
                  aria-label="Previous products"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />
                </button>

                <button
                  onClick={handleNext}
                  disabled={isAnimating}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-white text-[#302326] hover:text-[#D14963] shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-md flex items-center justify-center transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer disabled:opacity-50"
                  aria-label="Next products"
                >
                  <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />
                </button>
              </div>

              {/* Corner 2: Shop Now Button (Pill Shaped rounded-full) */}
              <button
                onClick={onShopNow}
                className="px-7 sm:px-8 py-2.5 rounded-full bg-[#C84B66] hover:bg-[#B73D57] text-white text-xs sm:text-sm font-medium tracking-wide shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-98 cursor-pointer"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
