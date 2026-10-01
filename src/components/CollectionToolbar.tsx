import React from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

interface CollectionToolbarProps {
  totalCount: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CollectionToolbar: React.FC<CollectionToolbarProps> = ({
  totalCount,
  sortBy,
  onSortChange,
  showFilters,
  onToggleFilters,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 py-3 sm:py-4">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#F4E8EA]/60">
        {/* LEFT: Pink Filter Button + Count */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onToggleFilters}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#D14963] hover:bg-[#b83852] text-white rounded-[6px] text-xs font-medium tracking-wide shadow-2xs transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>

          <span className="text-xs sm:text-[13px] font-medium text-[#302326]">
            Collections ({totalCount.toLocaleString()} Products)
          </span>
        </div>

        {/* RIGHT: Sort By Dropdown */}
        <div className="flex items-center gap-2 text-xs sm:text-[13px] text-[#55484A]">
          <span className="text-[#8E7E82]">Sort by:</span>
          <div className="relative inline-block">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-transparent pr-7 pl-1 py-1 font-medium text-[#302326] cursor-pointer focus:outline-none hover:text-[#D14963] transition-colors"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
            <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8E7E82] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Expandable Filter Drawer / Chips Bar */}
      {showFilters && (
        <div className="pt-3 pb-2 flex flex-wrap items-center gap-2 animate-fadeIn">
          <span className="text-xs text-[#8E7E82] mr-2">Filter by category:</span>
          {['all', 'rings', 'earrings', 'necklaces', 'bracelets'].map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#D14963] text-white shadow-xs'
                  : 'bg-[#F9ECEF] text-[#55484A] hover:bg-[#F0DDE2]'
              }`}
            >
              {cat === 'all' ? 'All Jewellery' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
