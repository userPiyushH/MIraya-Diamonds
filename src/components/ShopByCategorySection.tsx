import React from 'react';
import { CategoryCard } from './CategoryCard';

interface ShopByCategorySectionProps {
  onSelectCategory?: (category: string) => void;
}

export const ShopByCategorySection: React.FC<ShopByCategorySectionProps> = ({
  onSelectCategory,
}) => {
  const handleCategoryClick = (cat: string) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
  };

  return (
    <section className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 bg-white select-none">
      {/* SECTION HEADER (Matching Screenshot exactly) */}
      <div className="text-center space-y-2 pb-8 sm:pb-10">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-[40px] text-[#302326] font-normal tracking-wide">
          Shop By Category
        </h2>
        <p className="text-xs sm:text-sm text-[#75686A] tracking-normal font-sans">
          Discover the Art of Fine Jewellery
        </p>
      </div>

      {/* CATEGORY GRID: TOP ROW (2 Large) + BOTTOM ROW (4 Columns) */}
      <div className="space-y-4 sm:space-y-5">
        {/* TOP ROW: Earrings | Rings (50% / 50%) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <CategoryCard
            title="Earrings"
            image="/src/assets/images/category_earrings.png"
            fallbackUrl="https://i.ibb.co/ccW0mfNn/image-12.png"
            aspectClass="aspect-[16/10] sm:aspect-[16/9.5]"
            onClick={() => handleCategoryClick('earrings')}
          />
          <CategoryCard
            title="Rings"
            image="/src/assets/images/category_rings.png"
            fallbackUrl="https://i.ibb.co/BV0p4sN7/image-16.png"
            aspectClass="aspect-[16/10] sm:aspect-[16/9.5]"
            onClick={() => handleCategoryClick('rings')}
          />
        </div>

        {/* BOTTOM ROW: Pendant | Necklace | Bracelets | Bangles (4 Columns) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <CategoryCard
            title="Pendant"
            image="/src/assets/images/category_pendant.png"
            fallbackUrl="https://i.ibb.co/xtbwCWyY/image-19.png"
            aspectClass="aspect-[1/1] sm:aspect-[4/3.8]"
            onClick={() => handleCategoryClick('pendants')}
          />
          <CategoryCard
            title="Necklace"
            image="/src/assets/images/category_necklace.png"
            fallbackUrl="https://i.ibb.co/wZM7gFvv/image-21.png"
            aspectClass="aspect-[1/1] sm:aspect-[4/3.8]"
            onClick={() => handleCategoryClick('necklaces')}
          />
          <CategoryCard
            title="Bracelets"
            image="/src/assets/images/category_bracelets.png"
            fallbackUrl="https://i.ibb.co/Q7crnDqh/image-22.png"
            aspectClass="aspect-[1/1] sm:aspect-[4/3.8]"
            onClick={() => handleCategoryClick('bracelets')}
          />
          <CategoryCard
            title="Bangles"
            image="/src/assets/images/category_bangles.png"
            fallbackUrl="https://i.ibb.co/B26S2gjT/image-23.png"
            aspectClass="aspect-[1/1] sm:aspect-[4/3.8]"
            onClick={() => handleCategoryClick('bangles')}
          />
        </div>
      </div>
    </section>
  );
};
