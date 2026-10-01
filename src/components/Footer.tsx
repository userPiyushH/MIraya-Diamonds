import React from 'react';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { FooterRingAnimation } from './FooterRingAnimation';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenConsultation,
}) => {
  const shopLinks = [
    { label: 'Rings', id: 'rings' },
    { label: 'Earrings', id: 'earrings' },
    { label: 'Bracelets', id: 'bracelets' },
    { label: 'Necklaces', id: 'necklaces' },
    { label: 'Bangels', id: 'bracelets' },
    { label: 'Collections', id: 'collections' },
  ];

  const aboutLinks = [
    { label: 'Our Story', href: '#origin-heritage-section' },
    { label: 'Testimonials', href: '#difference-section' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Warranty', href: '#' },
  ];

  const policyLinks = [
    { label: 'FAQs', href: '#' },
    { label: 'Shipping & Delivery', href: '#' },
    { label: 'Returns & Exchange', href: '#' },
    { label: 'Track Order', href: '#' },
    { label: 'Contact Us', href: '#' },
  ];

  return (
    <footer className="bg-[#211416] text-[#FFFAFA] pt-14 sm:pt-18 lg:pt-20 overflow-hidden border-t border-[#302326]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Content Row: Brand | SHOP | ABOUT | POLICIES | CONTACT US (All in one line) */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-3 xl:gap-6 pb-12">
          {/* LEFT: Ornate Monogram Logo, Brand Title, Description, Socials */}
          <div className="w-full lg:w-[28%] xl:w-[27%] shrink-0 space-y-5 lg:pr-2">
            <div className="flex items-center gap-3.5">
              {/* Ornate Gold Filigree Mandala Monogram with "M" */}
              <div className="w-14 h-14 shrink-0 relative flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-[#E5B25D] drop-shadow-sm"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <circle cx="50" cy="50" r="44" stroke="#D49D42" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.6" />
                  <circle cx="50" cy="50" r="38" stroke="#F6D38B" strokeWidth="1.4" />
                  {/* Decorative Petals */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                    <g key={deg} transform={`rotate(${deg} 50 50)`}>
                      <path
                        d="M50 12 C44 26 44 34 50 42 C56 34 56 26 50 12 Z"
                        stroke="#F6D38B"
                        fill="rgba(246, 211, 139, 0.08)"
                        strokeWidth="1.2"
                      />
                      <circle cx="50" cy="20" r="1.5" fill="#E5B25D" />
                    </g>
                  ))}
                  <circle cx="50" cy="50" r="19" stroke="#E5B25D" strokeWidth="1.2" fill="rgba(33, 20, 22, 0.9)" />
                  {/* Central "M" Monogram */}
                  <text
                    x="50"
                    y="57"
                    textAnchor="middle"
                    fill="#F6D38B"
                    fontFamily="Cormorant Garamond, serif"
                    fontSize="22"
                    fontWeight="600"
                  >
                    M
                  </text>
                </svg>
              </div>

              {/* Brand Title & Tagline */}
              <div>
                <span className="font-serif text-xl sm:text-2xl font-semibold tracking-[0.12em] text-[#D14963] uppercase block leading-tight">
                  MIRAYA DIAMONDS
                </span>
                <span className="font-serif italic text-xs sm:text-sm text-[#F9E7EA]/90 tracking-wide block mt-0.5">
                  Elevating Love with Diamonds
                </span>
              </div>
            </div>

            {/* Description Text */}
            <p className="text-[#F9E7EA]/75 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
              Crafting timeless diamond heirlooms, ethically sourced solitaires, and bespoke jewellery 
              engineered to celebrate your deepest personal milestones with eternal light.
            </p>

            {/* Social Icons (Instagram, Facebook, X) */}
            <div className="flex items-center gap-3.5 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 hover:border-[#D14963] hover:text-[#D14963] flex items-center justify-center text-white/90 transition-all hover:scale-105"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 hover:border-[#D14963] hover:text-[#D14963] flex items-center justify-center text-white/90 transition-all hover:scale-105"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 hover:border-[#D14963] hover:text-[#D14963] flex items-center justify-center text-white/90 transition-all hover:scale-105"
                aria-label="X (formerly Twitter)"
              >
                {/* Clean X Logo */}
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Vertical Divider 1 */}
          <div className="hidden lg:block w-px h-44 bg-gradient-to-b from-transparent via-[#D14963]/40 to-transparent shrink-0 self-center" />

          {/* COL: SHOP */}
          <div className="space-y-4 shrink-0 min-w-[95px]">
            <h4 className="font-serif text-sm font-semibold tracking-[0.16em] text-[#D14963] uppercase">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F9E7EA]/80 font-normal">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onSelectCategory(link.id)}
                    className="hover:text-white hover:translate-x-0.5 transition-all cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COL: ABOUT */}
          <div className="space-y-4 shrink-0 min-w-[105px]">
            <h4 className="font-serif text-sm font-semibold tracking-[0.16em] text-[#D14963] uppercase">
              ABOUT
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F9E7EA]/80 font-normal">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white hover:translate-x-0.5 transition-all inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COL: POLICIES */}
          <div className="space-y-4 shrink-0 min-w-[115px]">
            <h4 className="font-serif text-sm font-semibold tracking-[0.16em] text-[#D14963] uppercase">
              POLICIES
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F9E7EA]/80 font-normal">
              {policyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white hover:translate-x-0.5 transition-all inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Vertical Divider 2 */}
          <div className="hidden lg:block w-px h-44 bg-gradient-to-b from-transparent via-[#D14963]/40 to-transparent shrink-0 self-center" />

          {/* COL: CONTACT US */}
          <div className="w-full lg:w-[26%] xl:w-[25%] shrink-0 space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-[0.16em] text-[#D14963] uppercase">
              CONTACT US
            </h4>
            <p className="text-xs text-[#F9E7EA]/75 leading-relaxed">
              We’re here to make your shopping experience easier.
            </p>
            <div className="space-y-3 text-xs text-[#F9E7EA]/85 pt-1">
              <a
                href="mailto:miraya.diamond23@gmail.com"
                className="flex items-center gap-3 hover:text-white transition-colors group"
              >
                <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D14963] group-hover:border-[#D14963]">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="break-all font-sans text-xs">miraya.diamond23@gmail.com</span>
              </a>

              <a
                href="tel:+919869698984"
                className="flex items-center gap-3 hover:text-white transition-colors group"
              >
                <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D14963] group-hover:border-[#D14963]">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="font-sans text-xs">+91 9869698984</span>
              </a>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D14963] shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="font-sans text-xs leading-relaxed">23,24 Paradise Heights, Bangalore</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ULTRA SMOOTH SCROLL-DRIVEN RING ANIMATION SECTION */}
      {/* (First img scales down as user scrolls, second img rises from down side into final assembled look) */}
      <FooterRingAnimation onOpenConsultation={onOpenConsultation} />
    </footer>
  );
};
