import React, { useState } from 'react';
import { Search, Heart, User, ShoppingBag, ChevronDown, Menu, X } from 'lucide-react';

interface CollectionHeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onNavigateHome: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CollectionHeader: React.FC<CollectionHeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onNavigateHome,
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navCategories = [
    { label: 'Rings', id: 'rings' },
    { label: 'Earrings', id: 'earrings' },
    { label: 'Bracelet', id: 'bracelets' },
    { label: 'Bangles', id: 'bangles' },
    { label: 'Pendant', id: 'pendants' },
    { label: 'Necklace', id: 'necklaces' },
    { label: 'Gifting', id: 'gifting' },
    { label: 'Bridal', id: 'bridal' },
    { label: 'Collection', id: 'all' },
  ];

  return (
    <header className="w-full bg-white z-40 sticky top-0 shadow-xs">
      {/* ROW 1: White Row with Logo, Large Search, and Utility Icons */}
      <div className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 py-3.5 flex items-center justify-between gap-4 sm:gap-8">
        {/* Mobile Hamburger toggle */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 text-[#302326] hover:text-[#D14963] focus:outline-none"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* LEFT: MIRAYA DIAMONDS Brand Lockup with Gold Mandala */}
        <div
          onClick={onNavigateHome}
          className="cursor-pointer flex items-center gap-2.5 sm:gap-3 group shrink-0"
        >
          {/* Gold Mandala Monogram with "M" */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 relative flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-[#C8943E]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <circle cx="50" cy="50" r="44" stroke="#D49D42" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.6" />
              <circle cx="50" cy="50" r="38" stroke="#F6D38B" strokeWidth="1.4" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <g key={deg} transform={`rotate(${deg} 50 50)`}>
                  <path
                    d="M50 12 C44 26 44 34 50 42 C56 34 56 26 50 12 Z"
                    stroke="#D49D42"
                    fill="rgba(246, 211, 139, 0.12)"
                    strokeWidth="1.2"
                  />
                  <circle cx="50" cy="20" r="1.5" fill="#C8943E" />
                </g>
              ))}
              <circle cx="50" cy="50" r="19" stroke="#C8943E" strokeWidth="1.2" fill="#FFFFFF" />
              <text
                x="50"
                y="57"
                textAnchor="middle"
                fill="#C8943E"
                fontFamily="Cormorant Garamond, serif"
                fontSize="22"
                fontWeight="600"
              >
                M
              </text>
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-semibold tracking-[0.14em] text-[#C8943E] uppercase leading-tight group-hover:text-[#D14963] transition-colors">
              MIRAYA DIAMONDS
            </span>
            <span className="font-serif italic text-[11px] sm:text-xs text-[#C8943E]/85 tracking-wide -mt-0.5">
              Elevating Love with Diamonds
            </span>
          </div>
        </div>

        {/* CENTER: Large Rounded Search Field */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4 lg:mx-8">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for rings"
              className="w-full bg-white border border-[#E7D6D9] focus:border-[#D14963] rounded-full py-2 sm:py-2.5 pl-6 pr-12 text-xs sm:text-sm text-[#302326] placeholder-[#8E7E82] focus:outline-none focus:ring-1 focus:ring-[#D14963]/30 transition-all shadow-2xs"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D14963] pointer-events-none">
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />
            </div>
          </div>
        </div>

        {/* RIGHT: Wishlist, Account, Shopping Bag */}
        <div className="flex items-center gap-3 sm:gap-5 text-[#302326]">
          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative p-1.5 text-[#302326] hover:text-[#D14963] transition-colors cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[1.6]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D14963] text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Account */}
          <button
            onClick={onNavigateHome}
            className="p-1.5 text-[#302326] hover:text-[#D14963] transition-colors cursor-pointer"
            aria-label="Account"
          >
            <User className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[1.6]" />
          </button>

          {/* Shopping Bag */}
          <button
            onClick={onOpenCart}
            className="relative p-1.5 text-[#302326] hover:text-[#D14963] transition-colors cursor-pointer"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[1.6]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D14963] text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Row (visible on small mobile) */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for rings"
            className="w-full bg-[#FAF5F6] border border-[#E7D6D9] rounded-full py-2 pl-4 pr-10 text-xs text-[#302326] placeholder-[#8E7E82] focus:outline-none"
          />
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D14963]" />
        </div>
      </div>

      {/* ROW 2: Full-Width Primary Pink Navigation Bar (#D14963) */}
      <div className="w-full bg-[#D14963] text-white shadow-xs">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12">
          <nav className="flex items-center justify-center space-x-6 sm:space-x-8 lg:space-x-10 py-2 sm:py-2.5 overflow-x-auto no-scrollbar">
            {navCategories.map((item) => {
              const isActive = activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectCategory(item.id)}
                  className={`flex items-center gap-1 text-xs sm:text-[13px] font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer hover:opacity-100 ${
                    isActive
                      ? 'text-white font-semibold underline underline-offset-4'
                      : 'text-white/95 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronDown className="w-3 h-3 text-white/80 shrink-0" />
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F0E4E6]">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-lg font-semibold tracking-wider text-[#C8943E]">
                    MIRAYA DIAMONDS
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#302326]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-1">
                {navCategories.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectCategory(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2.5 px-3 text-sm font-medium text-[#302326] hover:text-[#D14963] hover:bg-[#FDF1F3] rounded-lg transition-colors flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-4 h-4 text-[#8E7E82] -rotate-90" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#F0E4E6]">
              <button
                onClick={() => {
                  onNavigateHome();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-[#D14963] text-white rounded-full text-xs font-semibold uppercase tracking-wider text-center"
              >
                Back to Atelier Home
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
