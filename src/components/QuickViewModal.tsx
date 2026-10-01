import React from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { ProductItem } from '../data/jewelleryData';

interface QuickViewModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem) => void;
  onToggleWishlist: (product: ProductItem) => void;
  isWishlisted: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white max-w-3xl w-full rounded-[20px] shadow-2xl border border-[#EEDDE0] overflow-hidden z-10">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 border border-[#EEDDE0] flex items-center justify-center text-[#75686A] hover:text-[#302326] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Product Image */}
            <div className="relative bg-[#FDF1F3] aspect-[4/3] md:aspect-auto">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider text-[#D14963] uppercase border border-[#EEDDE0]">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Right: Specifications & Actions */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#D14963]">
                  {product.category} · CERTIFIED SOLITAIRE
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#302326] mt-1">
                  {product.name}
                </h3>

                <div className="text-xl sm:text-2xl font-semibold text-[#302326] font-sans mt-2">
                  {formatPrice(product.price)}
                </div>

                <p className="text-xs sm:text-sm text-[#75686A] mt-3 leading-relaxed">
                  {product.description}
                </p>

                {/* Technical Diamond Specifications Table */}
                <div className="mt-5 pt-4 border-t border-[#EEDDE0] grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-[#FDF1F3] rounded-[8px] border border-[#EEDDE0]">
                    <span className="text-[#75686A] block text-[10px] uppercase font-medium">Carat Weight</span>
                    <span className="font-semibold text-[#302326]">{product.carat}</span>
                  </div>
                  <div className="p-2 bg-[#FDF1F3] rounded-[8px] border border-[#EEDDE0]">
                    <span className="text-[#75686A] block text-[10px] uppercase font-medium">Precious Metal</span>
                    <span className="font-semibold text-[#302326]">{product.metal}</span>
                  </div>
                  <div className="p-2 bg-[#FDF1F3] rounded-[8px] border border-[#EEDDE0]">
                    <span className="text-[#75686A] block text-[10px] uppercase font-medium">Diamond Cut</span>
                    <span className="font-semibold text-[#302326]">{product.cut}</span>
                  </div>
                  <div className="p-2 bg-[#FDF1F3] rounded-[8px] border border-[#EEDDE0]">
                    <span className="text-[#75686A] block text-[10px] uppercase font-medium">Color & Clarity</span>
                    <span className="font-semibold text-[#302326]">{product.color} / {product.clarity}</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3 pt-4 border-t border-[#EEDDE0]">
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                    className="flex-1 py-3 bg-[#D14963] hover:bg-[#b83852] text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Bag</span>
                  </button>

                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`p-3 rounded-full border transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'bg-[#FDF1F3] border-[#D14963] text-[#D14963]'
                        : 'border-[#EEDDE0] text-[#75686A] hover:text-[#D14963] hover:bg-[#FDF1F3]'
                    }`}
                    aria-label="Save to Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#D14963]' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#75686A]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D14963]" />
                  <span>Complimentary Insured Delivery & Lifetime Care</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
