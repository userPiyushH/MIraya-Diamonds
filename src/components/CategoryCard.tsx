import React from 'react';

interface CategoryCardProps {
  title: string;
  image: string;
  fallbackUrl?: string;
  onClick?: () => void;
  aspectClass?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  image,
  fallbackUrl,
  onClick,
  aspectClass = 'aspect-[16/10]',
}) => {
  return (
    <div
      onClick={onClick}
      className={`group relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer select-none bg-[#F7EFEF] border border-black/5 ${aspectClass}`}
    >
      {/* 1. Zoomable Image Container (Strictly overflow: hidden, scale 1 -> 1.04) */}
      <div className="w-full h-full overflow-hidden">
        <img
          src={image}
          alt={title}
          onError={(e) => {
            if (fallbackUrl) {
              (e.currentTarget as HTMLImageElement).src = fallbackUrl;
            }
          }}
          className="w-full h-full object-cover object-center transform transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] will-change-transform motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* 2. Soft Bottom Shadow Overlay for Text Legibility (As seen in screenshot) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

      {/* 3. Category Title with Animated Miraya Pink Underline (LEFT -> RIGHT) */}
      <div className="absolute bottom-4 left-5 sm:bottom-6 sm:left-7 z-10 pointer-events-none">
        <div className="relative inline-block">
          <span className="font-serif text-lg sm:text-xl md:text-2xl text-white font-normal tracking-wide drop-shadow-sm select-none">
            {title}
          </span>

          {/* Underline animating from LEFT to RIGHT on group-hover */}
          <span
            className="absolute left-0 -bottom-1.5 h-[1.5px] bg-[#D14963] w-0 transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full motion-reduce:transition-none"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};
