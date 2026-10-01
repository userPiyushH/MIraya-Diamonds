import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CollectionPaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const CollectionPagination: React.FC<CollectionPaginationProps> = ({
  currentPage,
  onPageChange,
}) => {
  return (
    <div className="max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14 flex items-center justify-center">
      <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-medium">
        {/* Previous Button */}
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1 text-[#8E7E82] hover:text-[#D14963] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page 1 (Active by default in brand pink) */}
        <button
          onClick={() => onPageChange(1)}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-[6px] border flex items-center justify-center transition-all cursor-pointer ${
            currentPage === 1
              ? 'border-[#D14963] text-[#D14963] bg-white font-semibold'
              : 'border-[#E7D6D9] text-[#55484A] hover:border-[#D14963]'
          }`}
        >
          1
        </button>

        {/* Page 2 */}
        <button
          onClick={() => onPageChange(2)}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-[6px] border flex items-center justify-center transition-all cursor-pointer ${
            currentPage === 2
              ? 'border-[#D14963] text-[#D14963] bg-white font-semibold'
              : 'border-[#E7D6D9] text-[#55484A] hover:border-[#D14963]'
          }`}
        >
          2
        </button>

        {/* Page 3 */}
        <button
          onClick={() => onPageChange(3)}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-[6px] border flex items-center justify-center transition-all cursor-pointer ${
            currentPage === 3
              ? 'border-[#D14963] text-[#D14963] bg-white font-semibold'
              : 'border-[#E7D6D9] text-[#55484A] hover:border-[#D14963]'
          }`}
        >
          3
        </button>

        {/* Page 4 */}
        <button
          onClick={() => onPageChange(4)}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-[6px] border flex items-center justify-center transition-all cursor-pointer ${
            currentPage === 4
              ? 'border-[#D14963] text-[#D14963] bg-white font-semibold'
              : 'border-[#E7D6D9] text-[#55484A] hover:border-[#D14963]'
          }`}
        >
          4
        </button>

        {/* Ellipsis */}
        <span className="text-[#8E7E82] px-1 text-[11px] tracking-widest select-none">
          ..........
        </span>

        {/* Page 49 */}
        <button
          onClick={() => onPageChange(49)}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-[6px] border flex items-center justify-center transition-all cursor-pointer ${
            currentPage === 49
              ? 'border-[#D14963] text-[#D14963] bg-white font-semibold'
              : 'border-[#E7D6D9] text-[#55484A] hover:border-[#D14963]'
          }`}
        >
          49
        </button>

        {/* Next Button */}
        <button
          onClick={() => currentPage < 49 && onPageChange(currentPage + 1)}
          disabled={currentPage === 49}
          className="p-1 text-[#8E7E82] hover:text-[#D14963] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
