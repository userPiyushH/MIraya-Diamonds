import React, { useState } from 'react';
import {
  Heart,
  Share2,
  Sparkles,
  ShieldCheck,
  Award,
  Truck,
  RotateCw,
  Video,
  Check,
  ChevronRight,
  Maximize2,
  Eye,
  Star,
  ArrowRight,
  Info,
  Calendar,
} from 'lucide-react';
import { CollectionHeader } from './CollectionHeader';
import { CollectionProductCard } from './CollectionProductCard';
import { Footer } from './Footer';
import {
  CollectionProduct,
  PDP_SOLITAIRE_PRODUCT,
  COLLECTION_PRODUCTS,
} from '../data/collectionProducts';

interface ProductDetailPageProps {
  product?: CollectionProduct;
  onNavigateHome: () => void;
  onNavigateCollection: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  cartCount: number;
  wishlistCount: number;
  wishlistItems: string[];
  onToggleWishlist: (product: CollectionProduct) => void;
  onAddToCart: (product: CollectionProduct) => void;
  onSelectProduct: (product: CollectionProduct) => void;
  onOpenConsultation: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product = PDP_SOLITAIRE_PRODUCT,
  onNavigateHome,
  onNavigateCollection,
  onOpenCart,
  onOpenWishlist,
  cartCount,
  wishlistCount,
  wishlistItems,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onOpenConsultation,
}) => {
  // Gallery state
  const gallery = product.galleryImages || [
    product.primaryImage,
    product.secondaryImage,
  ];
  const [selectedImage, setSelectedImage] = useState<string>(gallery[0]);

  // Product configurations
  const [selectedMetal, setSelectedMetal] = useState<'rose' | 'yellow' | 'platinum'>('rose');
  const [diamondQuality, setDiamondQuality] = useState<'si' | 'vvs'>('vvs');
  const [selectedCarat, setSelectedCarat] = useState<string>('18K');
  const [selectedRingSize, setSelectedRingSize] = useState<string>('12');
  const [addEngraving, setAddEngraving] = useState<boolean>(false);
  const [engravingText, setEngravingText] = useState<string>('');

  // Pincode check
  const [pincode, setPincode] = useState<string>('302020');
  const [pincodeVerified, setPincodeVerified] = useState<boolean>(true);

  // Search state for header
  const [searchQuery, setSearchQuery] = useState('');

  // Complete the suite recommendations (first 5 collection products)
  const suiteRecommendations = COLLECTION_PRODUCTS.slice(0, 5);

  const isWishlisted = wishlistItems.includes(product.id);

  return (
    <div className="min-h-screen bg-white text-[#302326] flex flex-col font-sans selection:bg-[#FDF1F3] selection:text-[#D14963]">
      {/* 1. HEADER (Same Miraya Header) */}
      <CollectionHeader
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onOpenCart={onOpenCart}
        onOpenWishlist={onOpenWishlist}
        onNavigateHome={onNavigateHome}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory="rings"
        onSelectCategory={(cat) => {
          onNavigateCollection();
        }}
      />

      <main className="flex-1 bg-white">
        {/* 2. BREADCRUMB */}
        <div className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 pt-4 pb-3">
          <nav className="flex items-center space-x-2 text-xs text-[#8E7E82] font-sans overflow-x-auto no-scrollbar py-1">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#D14963] transition-colors cursor-pointer shrink-0"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#BDB0B2] shrink-0" />
            <button
              onClick={onNavigateCollection}
              className="hover:text-[#D14963] transition-colors cursor-pointer shrink-0"
            >
              Collection
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#BDB0B2] shrink-0" />
            <button
              onClick={onNavigateCollection}
              className="hover:text-[#D14963] transition-colors cursor-pointer shrink-0"
            >
              Rings
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#BDB0B2] shrink-0" />
            <span className="text-[#D14963] font-medium truncate max-w-xs sm:max-w-md">
              {product.name}
            </span>
          </nav>
        </div>

        {/* 3. MAIN PRODUCT AREA (Two-Column Layout Matching Reference 2) */}
        <section className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 py-4 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* ================= LEFT: PRODUCT IMAGE GALLERY (~52%) ================= */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-4">
              <div className="flex flex-col-reverse sm:flex-row gap-4">
                {/* Vertical Thumbnails */}
                <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg p-1.5 bg-[#FAF6F7] border transition-all cursor-pointer overflow-hidden ${
                        selectedImage === img
                          ? 'border-[#D14963] ring-1 ring-[#D14963]/30 shadow-xs'
                          : 'border-[#EADEE0] hover:border-[#D14963]/60'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-contain object-center"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>

                {/* Main Product Image Container */}
                <div className="flex-1 relative bg-[#FAF6F7] rounded-2xl p-6 sm:p-10 flex items-center justify-center min-h-[380px] sm:min-h-[460px] md:min-h-[500px] border border-[#F2E5E8] overflow-hidden group">
                  {/* Top-Left Badge: NATURAL SOLITAIRE */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-xs border border-[#E8D4D8] text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-[#302326] rounded-full shadow-2xs">
                      Natural Solitaire
                    </span>
                  </div>

                  {/* Top-Right Tools: Wishlist & Share */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                    <button
                      onClick={() => onToggleWishlist(product)}
                      className={`w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs border border-[#E8D4D8] flex items-center justify-center transition-colors shadow-2xs cursor-pointer ${
                        isWishlisted
                          ? 'text-[#D14963]'
                          : 'text-[#55484A] hover:text-[#D14963]'
                      }`}
                      aria-label="Wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isWishlisted ? 'fill-[#D14963]' : ''
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: product.name,
                            url: window.location.href,
                          });
                        }
                      }}
                      className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs border border-[#E8D4D8] text-[#55484A] hover:text-[#D14963] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                      aria-label="Share"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Main Displayed Jewellery Image */}
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-full max-h-[420px] object-contain object-center transform group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] drop-shadow-md select-none"
                    referrerPolicy="no-referrer"
                  />

                  {/* Bottom Interactive Tool Capsules */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-center gap-2">
                    <button
                      onClick={onOpenConsultation}
                      className="px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full border border-[#E7D3D7] text-[10px] sm:text-[11px] font-medium text-[#302326] hover:text-[#D14963] hover:border-[#D14963] flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#D14963]" />
                      <span>LIVE ART TRY-ON</span>
                    </button>

                    <button
                      onClick={() => {
                        const nextIdx = (gallery.indexOf(selectedImage) + 1) % gallery.length;
                        setSelectedImage(gallery[nextIdx]);
                      }}
                      className="px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full border border-[#E7D3D7] text-[10px] sm:text-[11px] font-medium text-[#302326] hover:text-[#D14963] hover:border-[#D14963] flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <RotateCw className="w-3.5 h-3.5 text-[#D14963]" />
                      <span>360° VIEW</span>
                    </button>

                    <div className="hidden sm:flex px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full border border-[#E7D3D7] text-[10px] sm:text-[11px] font-medium text-[#75686A] items-center gap-1.5 shadow-xs">
                      <Maximize2 className="w-3.5 h-3.5 text-[#D14963]" />
                      <span>HOVER TO ZOOM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom 3 Trust Badge Capsules Under Gallery */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                <div className="bg-[#FAF6F7] border border-[#F0E2E5] rounded-xl p-3 flex items-center gap-2.5 text-left">
                  <div className="w-8 h-8 rounded-full bg-[#FDF1F3] border border-[#D14963]/30 flex items-center justify-center text-[#D14963] shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold text-[#302326] tracking-wide">
                      100% CERTIFIED
                    </span>
                    <span className="block text-[10px] text-[#8E7E82]">
                      IGI & SGL Authenticated
                    </span>
                  </div>
                </div>

                <div className="bg-[#FAF6F7] border border-[#F0E2E5] rounded-xl p-3 flex items-center gap-2.5 text-left">
                  <div className="w-8 h-8 rounded-full bg-[#FDF1F3] border border-[#D14963]/30 flex items-center justify-center text-[#D14963] shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold text-[#302326] tracking-wide">
                      BIS HALLMARKED
                    </span>
                    <span className="block text-[10px] text-[#8E7E82]">
                      750 (18K) Gold Purity
                    </span>
                  </div>
                </div>

                <div className="bg-[#FAF6F7] border border-[#F0E2E5] rounded-xl p-3 flex items-center gap-2.5 text-left">
                  <div className="w-8 h-8 rounded-full bg-[#FDF1F3] border border-[#D14963]/30 flex items-center justify-center text-[#D14963] shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold text-[#302326] tracking-wide">
                      INSURED TRANSIT
                    </span>
                    <span className="block text-[10px] text-[#8E7E82]">
                      All India Doorstep Delivery
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= RIGHT: PRODUCT INFORMATION (~48%) ================= */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-5">
              {/* Eyebrow & SKU */}
              <div className="flex items-center justify-between text-xs text-[#8E7E82] tracking-wider uppercase font-medium">
                <span className="text-[#D14963]">
                  {product.collection || 'BESPOKE ARTIST · THE SOLITAIRE COLLECTION'}
                </span>
                <span>SKU: {product.sku}</span>
              </div>

              {/* Title (Cormorant Garamond) */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#302326] leading-tight tracking-[0.02em]">
                {product.name}
              </h1>

              {/* Rating Row */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-0.5 text-[#E5B25D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-[#302326]">
                  {product.rating} / 5.0
                </span>
                <span className="text-[#8E7E82]">
                  ({product.reviewsCount || 148} Person Reviews)
                </span>
              </div>

              {/* Price & Discount */}
              <div className="space-y-1 pt-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-semibold text-[#302326]">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-sm sm:text-base text-[#9A8B8E] line-through font-normal">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="px-2 py-0.5 bg-[#FDF1F3] text-[#D14963] border border-[#D14963]/30 rounded-md text-[11px] font-semibold tracking-wider uppercase">
                    {product.discount || '11% OFF'}
                  </span>
                </div>
                <p className="text-[11px] text-[#8E7E82]">
                  Prices inclusive of all taxes. Free lifetime insured shipping all over India.
                </p>
                <p className="text-xs text-[#55484A] font-medium pt-0.5">
                  Or pay ₹18,852/mo with interest-free 3-month EMI.
                </p>
              </div>

              <div className="border-t border-[#F2E5E8] my-2" />

              {/* METAL SELECTOR */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-[#302326]">
                    SELECTED METAL:{' '}
                    <span className="text-[#D14963]">
                      {selectedMetal === 'rose'
                        ? '18KT ROSE GOLD'
                        : selectedMetal === 'yellow'
                        ? '18KT YELLOW GOLD'
                        : 'PLATINUM 950'}
                    </span>
                  </span>
                  <button className="text-[11px] text-[#8E7E82] hover:text-[#D14963] underline">
                    Customized Gold
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    onClick={() => setSelectedMetal('rose')}
                    className={`py-2 px-3 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                      selectedMetal === 'rose'
                        ? 'border-[#D14963] bg-[#FDF1F3]/60 ring-1 ring-[#D14963]/30'
                        : 'border-[#EADEE0] hover:border-[#D14963]/50'
                    }`}
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-[#E5A19B] border border-black/10 shrink-0" />
                    <div className="text-left">
                      <span className="block text-[11px] font-semibold text-[#302326] leading-tight">
                        ROSE GOLD
                      </span>
                      <span className="block text-[9px] text-[#8E7E82]">18KT</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedMetal('yellow')}
                    className={`py-2 px-3 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                      selectedMetal === 'yellow'
                        ? 'border-[#D14963] bg-[#FDF1F3]/60 ring-1 ring-[#D14963]/30'
                        : 'border-[#EADEE0] hover:border-[#D14963]/50'
                    }`}
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-[#F3D17A] border border-black/10 shrink-0" />
                    <div className="text-left">
                      <span className="block text-[11px] font-semibold text-[#302326] leading-tight">
                        YELLOW GOLD
                      </span>
                      <span className="block text-[9px] text-[#8E7E82]">18KT</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedMetal('platinum')}
                    className={`py-2 px-3 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                      selectedMetal === 'platinum'
                        ? 'border-[#D14963] bg-[#FDF1F3]/60 ring-1 ring-[#D14963]/30'
                        : 'border-[#EADEE0] hover:border-[#D14963]/50'
                    }`}
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-[#D6DCE5] border border-black/10 shrink-0" />
                    <div className="text-left">
                      <span className="block text-[11px] font-semibold text-[#302326] leading-tight">
                        PLATINUM
                      </span>
                      <span className="block text-[9px] text-[#8E7E82]">950 Pure</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* DIAMOND QUALITY TIER */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-[#302326]">
                    DIAMOND QUALITY TIER
                  </span>
                  <span className="text-[11px] text-[#D14963] font-medium">
                    NATURAL SOLITAIRE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setDiamondQuality('si')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      diamondQuality === 'si'
                        ? 'border-[#D14963] bg-[#FDF1F3]/60 ring-1 ring-[#D14963]/30'
                        : 'border-[#EADEE0] hover:border-[#D14963]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-[#302326]">
                        SI + IJ
                      </span>
                      <span className="text-[9px] text-[#8E7E82] uppercase">
                        Standard
                      </span>
                    </div>
                    <span className="block text-[10px] text-[#8E7E82] leading-tight">
                      Slightly Included, Warm Sparkle
                    </span>
                  </button>

                  <button
                    onClick={() => setDiamondQuality('vvs')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      diamondQuality === 'vvs'
                        ? 'border-[#D14963] bg-[#FDF1F3]/60 ring-1 ring-[#D14963]/30'
                        : 'border-[#EADEE0] hover:border-[#D14963]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-[#302326]">
                        VVS + EF
                      </span>
                      <span className="text-[9px] text-[#D14963] font-medium uppercase">
                        Selected
                      </span>
                    </div>
                    <span className="block text-[10px] text-[#8E7E82] leading-tight">
                      Very Very Slight, Colorless White
                    </span>
                  </button>
                </div>
              </div>

              {/* CARAT SELECTOR */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-[#302326]">
                    CARAT: <span className="text-[#D14963]">{selectedCarat}</span>
                  </span>
                  <button className="text-[11px] text-[#8E7E82] hover:text-[#D14963] underline">
                    SIZE GUIDE
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {['14K', '16K', '18K', '20K', '22K'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCarat(c)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        selectedCarat === c
                          ? 'border-[#D14963] bg-[#D14963] text-white shadow-2xs'
                          : 'border-[#EADEE0] text-[#55484A] hover:border-[#D14963]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* INDIAN RING SIZE */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-[#302326]">
                    INDIAN RING SIZE:{' '}
                    <span className="text-[#D14963]">{selectedRingSize}</span>
                  </span>
                  <button className="text-[11px] text-[#8E7E82] hover:text-[#D14963] underline">
                    SIZE GUIDE
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {['10', '12', '14', '16', '18', 'BESPOKE SIZE'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedRingSize(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        selectedRingSize === s
                          ? 'border-[#D14963] bg-[#D14963] text-white shadow-2xs'
                          : 'border-[#EADEE0] text-[#55484A] hover:border-[#D14963]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* ENGRAVING CUSTOMIZATION */}
              <div className="pt-1">
                <label className="flex items-center gap-2 text-xs text-[#55484A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addEngraving}
                    onChange={(e) => setAddEngraving(e.target.checked)}
                    className="accent-[#D14963] w-4 h-4 rounded-sm cursor-pointer"
                  />
                  <span>ADD FREE LASER ATELIER ENGRAVING</span>
                </label>
                {addEngraving && (
                  <div className="mt-2 pl-6">
                    <input
                      type="text"
                      value={engravingText}
                      onChange={(e) => setEngravingText(e.target.value)}
                      placeholder="e.g. Forever & Always · 24.12.26"
                      maxLength={24}
                      className="w-full text-xs px-3 py-2 border border-[#E7D3D7] rounded-lg focus:outline-none focus:border-[#D14963]"
                    />
                  </div>
                )}
              </div>

              {/* PRIMARY ACTION BUTTONS: Add to Bag & Buy Now */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => onAddToCart(product)}
                  className="flex-1 py-3 px-6 bg-[#D14963] hover:bg-[#b83852] text-white rounded-full text-xs font-semibold tracking-wider uppercase shadow-md transition-all cursor-pointer text-center"
                >
                  Add to Bag
                </button>
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onOpenCart();
                  }}
                  className="flex-1 py-3 px-6 bg-[#211416] hover:bg-black text-white rounded-full text-xs font-semibold tracking-wider uppercase shadow-md transition-all cursor-pointer text-center"
                >
                  Buy Now
                </button>
              </div>

              {/* VIRTUAL ATELIER CONSULTATION */}
              <button
                onClick={onOpenConsultation}
                className="w-full py-2.5 px-4 bg-[#FDF1F3] hover:bg-[#fae7eb] border border-[#D14963]/30 rounded-xl text-xs font-medium text-[#D14963] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Video className="w-4 h-4" />
                <span>BOOK 1-ON-1 VIRTUAL ATELIER CONSULTATION</span>
              </button>

              {/* ESTIMATED DELIVERY & COD AVAILABILITY */}
              <div className="bg-[#FAF6F7] border border-[#F0E2E5] rounded-xl p-4 space-y-3">
                <span className="block text-[11px] font-semibold text-[#302326] tracking-wider uppercase">
                  ESTIMATED DELIVERY & COD AVAILABILITY
                </span>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit Pincode"
                    className="flex-1 bg-white border border-[#EADEE0] rounded-lg px-3 py-1.5 text-xs text-[#302326] focus:outline-none focus:border-[#D14963]"
                  />
                  <button
                    onClick={() => setPincodeVerified(true)}
                    className="px-4 py-1.5 bg-[#D14963] hover:bg-[#b83852] text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
                  >
                    Verify
                  </button>
                </div>

                {pincodeVerified && (
                  <div className="flex items-center gap-2 text-xs text-[#D14963] pt-0.5">
                    <Check className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
                    <span>
                      Delivery by <strong>Tomorrow, 2:00 PM</strong> to Jaipur ({pincode}) via Sequel Armored Logistics.
                    </span>
                  </div>
                )}
              </div>

              {/* SPECIFICATION SUMMARY ROW */}
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#F2E5E8] text-center">
                <div className="py-2">
                  <span className="block text-[10px] text-[#8E7E82] uppercase tracking-wider">
                    DIAMOND WT
                  </span>
                  <span className="block text-xs font-semibold text-[#302326] mt-0.5">
                    0.65 Carat
                  </span>
                </div>
                <div className="py-2 border-x border-[#F2E5E8]">
                  <span className="block text-[10px] text-[#8E7E82] uppercase tracking-wider">
                    GROSS WT
                  </span>
                  <span className="block text-xs font-semibold text-[#302326] mt-0.5">
                    4.82 Grams
                  </span>
                </div>
                <div className="py-2">
                  <span className="block text-[10px] text-[#8E7E82] uppercase tracking-wider">
                    GUARANTEE
                  </span>
                  <span className="block text-xs font-semibold text-[#D14963] mt-0.5">
                    Lifetime Buyback
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. UNVEILING THE CRAFT & PURITY SECTION */}
        <section className="bg-[#FFF8F9] py-16 sm:py-20 border-t border-[#F2E5E8]">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 text-center space-y-3">
            <span className="text-[11px] font-semibold text-[#D14963] uppercase tracking-[0.2em] block">
              ABSOLUTE INTEGRITY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#302326] font-normal tracking-wide">
              Unveiling the Craft & Purity
            </h2>
            <p className="text-xs sm:text-sm text-[#75686A] max-w-xl mx-auto leading-relaxed">
              Every gram of gold accounted for, every facet certified by the world's strictest laboratories.
            </p>

            {/* 3 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-left">
              {/* CARD 01: Product Specifications Table */}
              <div className="bg-white rounded-2xl p-6 border border-[#F2E5E8] shadow-xs space-y-3">
                <h3 className="font-serif text-base font-semibold text-[#302326] pb-2 border-b border-[#F4E8EA]">
                  Product Specifications
                </h3>
                <div className="space-y-2 text-xs">
                  {[
                    { label: 'Product Type', val: 'Ring' },
                    { label: 'Metal', val: '18KT Rose Gold' },
                    { label: 'Net Weight', val: '4.820 g' },
                    { label: 'Gross Weight', val: '4.950 g' },
                    { label: 'Diamond Weight', val: '0.65 ct' },
                    { label: 'Diamond Colour', val: 'E - F' },
                    { label: 'Diamond Clarity', val: 'VVS1' },
                    { label: 'Diamond Shape', val: 'Round Brilliant' },
                    { label: 'Setting Type', val: 'Prong & Pavé' },
                    { label: 'Finish', val: 'High Polish' },
                    { label: 'Occasion', val: 'Engagement, Wedding, Gifting' },
                  ].map((row, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-1 border-b border-[#FAF3F4] text-[11px]"
                    >
                      <span className="text-[#8E7E82]">{row.label}</span>
                      <span className="font-medium text-[#302326]">{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CARD 02: Ring Dimension & Measurement Illustration */}
              <div className="bg-white rounded-2xl p-6 border border-[#F2E5E8] shadow-xs flex flex-col justify-between items-center text-center">
                <div className="w-full">
                  <h3 className="font-serif text-base font-semibold text-[#302326] pb-2 border-b border-[#F4E8EA]">
                    Proportions & Calibration
                  </h3>
                  <div className="py-6 flex flex-col items-center justify-center">
                    <span className="text-xs font-semibold text-[#D14963] tracking-widest block mb-2">
                      6.2 mm
                    </span>
                    {/* Ring Diagram SVG */}
                    <div className="w-36 h-36 relative flex items-center justify-center">
                      <svg viewBox="0 0 120 120" className="w-full h-full text-[#E5A19B]">
                        <line x1="20" y1="20" x2="100" y2="20" stroke="#D14963" strokeWidth="1" strokeDasharray="2 2" />
                        <circle cx="60" cy="70" r="38" fill="none" stroke="currentColor" strokeWidth="4" />
                        <circle cx="60" cy="70" r="32" fill="none" stroke="#D14963" strokeWidth="1" strokeOpacity="0.4" />
                        {/* Solitaire Diamond on top */}
                        <polygon points="60,24 68,34 52,34" fill="#FFFFFF" stroke="#D14963" strokeWidth="1.5" />
                      </svg>
                    </div>
                    <p className="text-[11px] text-[#8E7E82] max-w-xs mt-3">
                      Calibrated for optimal optical light return and ergonomic all-day comfort.
                    </p>
                  </div>
                </div>

                <button
                  onClick={onOpenConsultation}
                  className="w-full py-2.5 bg-[#D14963] hover:bg-[#b83852] text-white rounded-xl text-xs font-medium transition-colors cursor-pointer"
                >
                  View Size on Hand
                </button>
              </div>

              {/* CARD 03: IGI Certified Natural Diamond */}
              <div className="bg-white rounded-2xl p-6 border border-[#F2E5E8] shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FDF1F3] border border-[#D14963]/30 flex items-center justify-center text-[#D14963] shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-[#302326]">
                        IGI Certified Natural Diamond
                      </h4>
                      <span className="text-[10px] text-[#8E7E82]">
                        International Gemological Institute
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#75686A] leading-relaxed">
                    Comes with an international certificate ensuring authenticity, quality and peace of mind.
                  </p>

                  <button
                    onClick={() => window.open('https://www.igi.org', '_blank')}
                    className="w-full py-2 border border-[#D14963] text-[#D14963] hover:bg-[#FDF1F3] rounded-xl text-xs font-medium transition-colors cursor-pointer text-center"
                  >
                    View Certificate
                  </button>

                  <div className="space-y-2 pt-2 border-t border-[#F4E8EA] text-xs text-[#55484A]">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#D14963]" />
                      <span>100% Natural Diamonds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#D14963]" />
                      <span>BIS Hallmarked Gold</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#D14963]" />
                      <span>Lifetime Exchange & Buyback</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#D14963]" />
                      <span>Free & Insured Delivery Across India</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CUSTOMER STORIES SECTION */}
        <section className="py-14 sm:py-18 bg-white border-b border-[#F2E5E8]">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#F4E8EA]">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#302326] font-normal tracking-wide">
                  Customer Stories
                </h2>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="font-semibold text-[#302326]">4.8 out of 5</span>
                <div className="flex items-center gap-0.5 text-[#E5B25D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[#8E7E82]">(148 Reviews)</span>
                <button className="text-[#D14963] font-medium hover:underline ml-2">
                  View All →
                </button>
              </div>
            </div>

            {/* 3 Review Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="bg-[#FAF6F7] p-6 rounded-2xl border border-[#F0E2E5] space-y-3">
                <div className="flex items-center gap-1 text-[#E5B25D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-[#55484A] leading-relaxed italic">
                  “The ring is even more beautiful in person. The craftsmanship is exceptional!”
                </p>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#F2E5E8]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#D14963] text-white flex items-center justify-center text-[10px] font-semibold">
                      A
                    </div>
                    <span className="font-medium text-[#302326]">Aditi S.</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Verified Purchase
                  </span>
                </div>
              </div>

              <div className="bg-[#FAF6F7] p-6 rounded-2xl border border-[#F0E2E5] space-y-3">
                <div className="flex items-center gap-1 text-[#E5B25D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-[#55484A] leading-relaxed italic">
                  “Absolutely loved it! Elegant, timeless and perfect for my engagement.”
                </p>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#F2E5E8]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#D14963] text-white flex items-center justify-center text-[10px] font-semibold">
                      R
                    </div>
                    <span className="font-medium text-[#302326]">Riya M.</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Verified Purchase
                  </span>
                </div>
              </div>

              <div className="bg-[#FAF6F7] p-6 rounded-2xl border border-[#F0E2E5] space-y-3">
                <div className="flex items-center gap-1 text-[#E5B25D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-[#55484A] leading-relaxed italic">
                  “Such fine detailing. The filigree work makes it truly special.”
                </p>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#F2E5E8]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#D14963] text-white flex items-center justify-center text-[10px] font-semibold">
                      S
                    </div>
                    <span className="font-medium text-[#302326]">Sneha K.</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Verified Purchase
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. THE MIRAYA LEGACY SECTION (Matching Reference 2) */}
        <section className="py-16 sm:py-22 bg-[#FAF3F3] relative overflow-hidden">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-5">
                <span className="text-xs font-semibold text-[#8E7E82] tracking-[0.2em] uppercase">
                  THE MIRAYA LEGACY
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#302326] leading-tight">
                  Crafted for{' '}
                  <span className="text-[#D14963]">Life's Brightest Moments</span>
                </h2>

                <p className="font-serif italic text-base sm:text-lg text-[#5D4E51]">
                  “A celebration of love, craftsmanship and timeless beauty.”
                </p>

                <p className="text-xs sm:text-sm text-[#75686A] leading-relaxed max-w-xl">
                  At Miraya Diamonds, every piece is a reflection of rare artistry and uncompromising quality. Handcrafted by skilled artisans, our jewellery brings together modern elegance and timeless craftsmanship — designed to be a part of your most precious moments.
                </p>

                {/* 3 Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#EADCE0]">
                  <div>
                    <span className="block font-serif text-xl sm:text-2xl font-bold text-[#D14963]">
                      34 Hours
                    </span>
                    <span className="block text-[10px] sm:text-[11px] text-[#8E7E82] uppercase tracking-wider mt-0.5">
                      HANDCRAFTED PRECISION
                    </span>
                  </div>
                  <div>
                    <span className="block font-serif text-xl sm:text-2xl font-bold text-[#D14963]">
                      0.65 Ct
                    </span>
                    <span className="block text-[10px] sm:text-[11px] text-[#8E7E82] uppercase tracking-wider mt-0.5">
                      TIMELESS BRILLIANCE
                    </span>
                  </div>
                  <div>
                    <span className="block font-serif text-xl sm:text-2xl font-bold text-[#D14963]">
                      18KT
                    </span>
                    <span className="block text-[10px] sm:text-[11px] text-[#8E7E82] uppercase tracking-wider mt-0.5">
                      PURE & AUTHENTIC
                    </span>
                  </div>
                </div>

                {/* Handwritten Accent */}
                <div className="pt-2 text-sm sm:text-base font-serif italic text-[#D14963]">
                  More than jewellery. A feeling.
                  <span className="block text-[10px] uppercase font-sans tracking-widest text-[#8E7E82] not-italic mt-0.5">
                    CRAFTED FOR A BRIGHTER TOMORROW
                  </span>
                </div>
              </div>

              {/* Right Image Composition in Arch Frame */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-[4/5] rounded-t-full rounded-b-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="/src/assets/images/pdp_ring_on_hand_1790762989836.jpg"
                    alt="Miraya Diamonds Ring on Hand"
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Floating Seal Badge */}
                <div className="absolute -bottom-4 -left-4 sm:left-4 bg-white/95 backdrop-blur-md rounded-full p-4 border border-[#E7D3D7] shadow-xl text-center flex flex-col items-center justify-center w-28 h-28">
                  <Sparkles className="w-5 h-5 text-[#D14963] mb-1" />
                  <span className="text-[9px] font-semibold tracking-wider text-[#302326] uppercase">
                    FINE DIAMONDS
                  </span>
                  <span className="text-[8px] text-[#8E7E82] uppercase tracking-widest">
                    LASTING STORIES
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. COMPLETE THE BHIVITA SUITE SECTION */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#F4E8EA]">
              <div>
                <span className="text-xs font-semibold text-[#D14963] tracking-[0.2em] uppercase block">
                  HARMONIOUS ENSEMBLES
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#302326] font-normal tracking-wide mt-1">
                  Complete the Bhivita Suite
                </h2>
              </div>
              <button
                onClick={onNavigateCollection}
                className="text-xs font-medium text-[#D14963] hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <span>EXPLORE ALL CURATED SETS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Reusing CollectionProductCard with Smooth Hover Crossfade! */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
              {suiteRecommendations.map((item) => (
                <CollectionProductCard
                  key={item.id}
                  product={item}
                  isWishlisted={wishlistItems.includes(item.id)}
                  onToggleWishlist={onToggleWishlist}
                  onAddToCart={onAddToCart}
                  onSelectProduct={(p) => {
                    onSelectProduct(p);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 8. FOOTER (Exact existing Footer with Macro Ring visual) */}
      <Footer
        onSelectCategory={(cat) => {
          onNavigateCollection();
        }}
        onOpenConsultation={onOpenConsultation}
      />
    </div>
  );
};
