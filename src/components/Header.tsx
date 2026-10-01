import React, { useState } from 'react';
import { Search, Heart, User, ShoppingBag, Menu, X, Sparkles, Phone, Compass } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenConsultation: () => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onNavigateCollection?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenConsultation,
  activeCategory,
  onSelectCategory,
  onNavigateCollection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Rings', id: 'rings' },
    { label: 'Earrings', id: 'earrings' },
    { label: 'Necklaces', id: 'necklaces' },
    { label: 'Pendants', id: 'pendants' },
    { label: 'Bracelets', id: 'bracelets' },
    { label: 'Collections', id: 'collections' },
    { label: 'About', id: 'about' },
  ];

  const handleNavClick = (id: string) => {
    onSelectCategory(id);
    setMobileMenuOpen(false);
    
    // Smooth scroll to relevant section
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'rings' || id === 'necklaces' || id === 'bracelets') {
      document.getElementById('chapters-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'collections') {
      if (onNavigateCollection) {
        onNavigateCollection();
      } else {
        document.getElementById('chapters-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (id === 'about') {
      document.getElementById('origin-heritage-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onOpenSearch();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFAFA]/95 backdrop-blur-md border-b border-[#EEDDE0] transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-[#211416] text-[#FFFAFA] py-1.5 px-4 text-center text-xs tracking-wider uppercase flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5 text-[#F9E7EA] font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#D14963]" />
          Complimentary Worldwide Insured Delivery & Lifetime Care
        </span>
        <span className="hidden md:inline text-white/40">|</span>
        <button
          onClick={onOpenConsultation}
          className="hidden md:inline-flex items-center gap-1 text-[#F9E7EA] hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
        >
          Book Atelier Appointment
        </button>
      </div>

      {/* Main Top Header */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-4">
        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-[#302326] hover:text-[#D14963] focus:outline-none transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#302326] hover:text-[#D14963] focus:outline-none transition-colors"
            aria-label="Open search modal"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Brand Logo */}
        <div className="flex-1 lg:flex-none text-center lg:text-left">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-block group focus:outline-none"
          >
            <div className="flex flex-col items-center lg:items-start">
              <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.18em] text-[#302326] group-hover:text-[#D14963] transition-colors uppercase">
                Miraya
              </span>
              <span className="text-[9px] tracking-[0.38em] text-[#75686A] uppercase font-medium -mt-1 group-hover:text-[#302326] transition-colors">
                Diamonds
              </span>
            </div>
          </a>
        </div>

        {/* Center: Large Search Bar (Desktop) */}
        <div className="hidden lg:flex flex-1 max-w-lg mx-8">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={onOpenSearch}
              placeholder="Search by collection, diamond cut, carat weight..."
              className="w-full bg-[#FFFFFF] border border-[#EEDDE0] focus:border-[#D14963] rounded-full py-2 pl-11 pr-4 text-xs tracking-wide text-[#302326] placeholder-[#75686A]/70 focus:outline-none focus:ring-1 focus:ring-[#D14963]/30 transition-all shadow-xs"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#75686A]" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#75686A] hover:text-[#302326]"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {/* Right: Utility Icons */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Atelier Consultation Contact button */}
          <button
            onClick={onOpenConsultation}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#75686A] hover:text-[#D14963] rounded-full border border-transparent hover:border-[#EEDDE0] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#D14963]" />
            <span>Consult Atelier</span>
          </button>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-[#302326] hover:text-[#D14963] transition-colors rounded-full hover:bg-[#FDF1F3]"
            aria-label="View Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute 0 top-1 right-1 bg-[#D14963] text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Account/Profile */}
          <button
            onClick={onOpenConsultation}
            className="p-2 text-[#302326] hover:text-[#D14963] transition-colors rounded-full hover:bg-[#FDF1F3]"
            aria-label="Atelier Profile"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Cart Bag */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-[#302326] hover:text-[#D14963] transition-colors rounded-full hover:bg-[#FDF1F3]"
            aria-label="View Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute 0 top-1 right-1 bg-[#D14963] text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* SECONDARY NAVIGATION: Slim pink navigation bar */}
      <div className="hidden lg:block bg-[#FDF1F3] border-t border-[#EEDDE0] py-2">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center space-x-8 text-xs font-medium tracking-[0.08em] text-[#302326]">
            {navItems.map((item) => {
              const isActive = activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`py-1 transition-colors relative uppercase cursor-pointer ${
                    isActive
                      ? 'text-[#D14963] font-semibold'
                      : 'text-[#302326] hover:text-[#D14963]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D14963] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FFFAFA] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#EEDDE0]">
                <div>
                  <span className="font-serif text-xl font-semibold tracking-widest text-[#302326]">
                    MIRAYA
                  </span>
                  <span className="block text-[9px] tracking-widest text-[#75686A]">
                    DIAMONDS
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#75686A] hover:text-[#302326]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search Input */}
              <div className="mt-4">
                <div
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="flex items-center gap-2 bg-white border border-[#EEDDE0] rounded-full px-4 py-2 text-xs text-[#75686A] cursor-pointer"
                >
                  <Search className="w-4 h-4 text-[#D14963]" />
                  <span>Search jewellery & solitaires...</span>
                </div>
              </div>

              {/* Navigation items */}
              <nav className="mt-6 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="w-full text-left py-2.5 px-3 text-sm font-medium text-[#302326] hover:text-[#D14963] hover:bg-[#FDF1F3] rounded-lg transition-colors flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-[#75686A]">→</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Mobile Drawer Bottom */}
            <div className="pt-6 border-t border-[#EEDDE0] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-2.5 bg-[#D14963] text-white rounded-full text-xs font-medium uppercase tracking-wider hover:bg-[#b83852] transition-colors"
              >
                Book Atelier Appointment
              </button>
              <div className="text-center text-xs text-[#75686A]">
                Concierge: +91 (0) 800 456 7890
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
