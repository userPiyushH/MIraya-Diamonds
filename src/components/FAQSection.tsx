import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'all' | 'rings' | 'necklace' | 'bracelets' | 'earrings' | 'bangels';
}

export const FAQSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [openId, setOpenId] = useState<number | null>(null);

  const categories = [
    'All',
    'Rings',
    'Necklace',
    'Bracelets',
    'Earrings',
    'Bangels',
  ];

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: 'What materials are your jewellery pieces made from?',
      answer:
        'All Miraya Diamonds jewellery is handcrafted in certified 18KT and 22KT BIS-hallmarked solid gold, adorned with VVS-clarity conflict-free certified lab-grown and natural diamonds, as well as genuine royal gemstones sourced ethically.',
      category: 'all',
    },
    {
      id: 2,
      question: 'How do I choose the right ring/bracelet/necklace size?',
      answer:
        'We offer a comprehensive interactive Size Guide with printable measurement charts for ring sizes (US/India scales), wrist circumferences for bangles/bracelets, and standard collarbone lengths for necklaces. You can also book a complimentary video consultation with our concierge.',
      category: 'rings',
    },
    {
      id: 3,
      question: 'How should I care for and maintain my jewellery?',
      answer:
        'Store your jewellery in the individual Miraya velvet pouches provided to prevent scratching. Clean gently using lukewarm water, mild organic soap, and a soft-bristled brush. Avoid direct contact with perfumes, chlorinated water, and harsh domestic chemicals. We also offer lifetime complimentary cleaning and inspection at any of our boutique salons.',
      category: 'all',
    },
    {
      id: 4,
      question: 'Do you offer returns, exchanges, or refunds?',
      answer:
        'Yes, we provide a 15-day no-questions-asked return and exchange policy on all standard unworn pieces with security tags and certificates intact. Custom-engraved and bespoke bridal creations are eligible for lifetime exchange and buyback guarantees.',
      category: 'all',
    },
    {
      id: 5,
      question: 'How long does delivery take, and can I track my order?',
      answer:
        'Domestic orders within India are dispatched via fully insured tamper-evident express couriers (Blue Dart / Sequel Logistics) and typically arrive within 3 to 5 business days. Once dispatched, an SMS and email with live GPS tracking coordinates and OTP delivery security will be sent to you.',
      category: 'all',
    },
  ];

  const toggleAccordion = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative w-full bg-white py-18 sm:py-24 lg:py-28 select-none">
      <div className="max-w-[1060px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ======================================================= */}
        {/* 1. HEADER (Sophisticated Serif Title + Sans Subtitle) */}
        {/* ======================================================= */}
        <div className="text-center space-y-2.5 pb-8 sm:pb-10">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[46px] text-[#2C1D20] font-normal tracking-wide">
            Frequently Asked Question
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6C70] font-sans tracking-normal font-light">
            Know the answer for your questions
          </p>
        </div>

        {/* ======================================================= */}
        {/* 2. CATEGORY FILTER TABS (Pill Buttons Centered) */}
        {/* Active: Solid dark rose-pink (#C84B66) with white text */}
        {/* Inactive: Soft light-pink (#FDEAF0) with dark rose text */}
        {/* ======================================================= */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pb-10 sm:pb-12">
          {categories.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer shadow-xs ${
                  isActive
                    ? 'bg-[#C84B66] text-white shadow-sm scale-100'
                    : 'bg-[#FDEAF0] hover:bg-[#FCD8E3] text-[#C84B66]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ======================================================= */}
        {/* 3. ACCORDION LIST LAYOUT (Pill-Shaped Rounded Cards) */}
        {/* Thin dark rose-pink border, numbered 1-5, right-aligned arrow */}
        {/* ======================================================= */}
        <div className="space-y-4 sm:space-y-4.5">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="w-full rounded-full border-[1.5px] border-[#C84B66] bg-white transition-all duration-300 hover:shadow-xs overflow-hidden"
                style={{
                  borderRadius: isOpen ? '28px' : '9999px',
                }}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-6 sm:px-8 py-4 sm:py-4.5 flex items-center justify-between gap-4 text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-[15px] font-sans text-[#332427]">
                    <span className="font-medium text-[#C84B66] shrink-0">
                      {faq.id}.
                    </span>
                    <span className="font-normal leading-snug group-hover:text-[#C84B66] transition-colors">
                      {faq.question}
                    </span>
                  </div>

                  {/* Right-aligned downward arrow icon */}
                  <ChevronDown
                    className={`w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#C84B66] shrink-0 transition-transform duration-300 ease-out ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>

                {/* Collapsible Answer Body */}
                <div
                  className={`grid transition-all duration-300 ease-in-out px-6 sm:px-8 ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100 pb-5 sm:pb-6 pt-1'
                      : 'grid-rows-[0fr] opacity-0 pb-0'
                  }`}
                >
                  <div className="overflow-hidden border-t border-[#F5D5DC] pt-3 text-xs sm:text-[13.5px] text-[#635357] leading-relaxed pl-5 sm:pl-6">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
