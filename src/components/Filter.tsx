import { cn } from '../utils/cn';
import { Dispatch, SetStateAction } from 'react';

import iconRemove from '../assets/images/icon-remove.svg';

type FilterProps = {
  filters: string[];
  setFilters: Dispatch<SetStateAction<string[]>>;
  clearFilter: () => void;
  addandRemoveTagToFilter: (tag: string) => void;
};

const Filter = ({
  filters,
  clearFilter,
  addandRemoveTagToFilter,
}: FilterProps) => {
  const opacity = false;
  return (
    <section
      className={cn(
        `py-6 px-6 bg-white rounded-md shadow-xl border-(--color-primary) max-h-120
         -mt-24 mb-3 z-10 flex gap-5 justify-between`,
        opacity ? 'opacity-0 hidden' : 'opacity-100 flex',
      )}
    >
      <div className="flex gap-4 flex-wrap">
        {filters.map((item, index) => (
          <div
            className="filter-btn flex items-center justify-center p-0"
            key={index}
          >
            <span className="px-2">{item}</span>
            <img
              src={iconRemove}
              alt="icon-remove"
              className="w-full h-full bg-(--color-primary) p-2 rounded-r-sm"
              onClick={() => addandRemoveTagToFilter(item)}
            />
          </div>
        ))}
      </div>
      <button
        className="text-(--color-text-secondary) text-lg"
        onClick={clearFilter}
      >
        Clear
      </button>
    </section>
  );
};

export default Filter;
