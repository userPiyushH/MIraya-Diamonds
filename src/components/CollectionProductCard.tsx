import React from 'react';
import { Heart } from 'lucide-react';
import { CollectionProduct } from '../data/collectionProducts';

interface CollectionProductCardProps {
  product: CollectionProduct;
  isWishlisted: boolean;
  onToggleWishlist: (product: CollectionProduct) => void;
  onAddToCart: (product: CollectionProduct) => void;
  onSelectProduct?: (product: CollectionProduct) => void;
}

export const CollectionProductCard: React.FC<CollectionProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  const handleClickCard = () => {
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#F2E5E8] p-2.5 sm:p-3 flex flex-col justify-between hover:shadow-[0_4px_20px_rgba(209,73,99,0.08)] hover:border-[#E8D1D6] transition-all duration-300 group">
      {/* Product Image Stage with Smooth Hover Crossfade & Scale */}
      <div
        onClick={handleClickCard}
        className="w-full bg-[#FBF8F9] rounded-xl p-3 sm:p-4 h-[165px] sm:h-[185px] md:h-[195px] flex items-center justify-center overflow-hidden cursor-pointer relative select-none"
      >
        {/* Primary Product Image (default visible, gently fades out on hover) */}
        <img
          src={product.primaryImage}
          alt={product.name}
          className="w-full h-full object-contain object-center absolute inset-0 p-3 sm:p-4 opacity-100 group-hover:opacity-0 scale-100 group-hover:scale-98 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none drop-shadow-xs"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Secondary Product Image (alternate angle/lifestyle, fades in with subtle 1.02 scale) */}
        {product.secondaryImage ? (
          <img
            src={product.secondaryImage}
            alt={`${product.name} alternate perspective`}
            className="w-full h-full object-contain object-center absolute inset-0 p-3 sm:p-4 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-[1.02] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none drop-shadow-xs"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        ) : null}
      </div>

      {/* Product Meta & Pricing */}
      <div
        onClick={handleClickCard}
        className="pt-2.5 sm:pt-3 pb-2 space-y-0.5 cursor-pointer"
      >
        {/* Price Row: Current Price + Strikethrough Original Price */}
        <div className="flex items-baseline">
          <span className="font-semibold text-xs sm:text-[13px] md:text-sm text-[#302326]">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-[10px] sm:text-[11px] text-[#9A8B8E] line-through ml-1.5 font-normal">
            ₹{product.originalPrice.toLocaleString()}
          </span>
        </div>

        {/* Product Name */}
        <div className="text-xs sm:text-[13px] text-[#55484A] font-normal truncate tracking-tight group-hover:text-[#D14963] transition-colors">
          {product.name}
        </div>
      </div>

      {/* Action Row: Add to Bag + Wishlist Heart Button */}
      <div className="pt-1 flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="flex-1 py-1.5 px-2 sm:px-3 text-center border border-[#D14963] text-[#D14963] hover:bg-[#D14963] hover:text-white rounded-full text-[11px] sm:text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer"
        >
          Add to Bag
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#D14963] flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer ${
            isWishlisted
              ? 'bg-[#D14963] text-white'
              : 'text-[#D14963] hover:bg-[#FDF1F3]'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
              isWishlisted ? 'fill-current' : 'stroke-[1.8]'
            }`}
          />
        </button>
      </div>
    </div>
  );
};
