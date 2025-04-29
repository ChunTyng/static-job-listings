import { Transition } from '@headlessui/react';
import { cn } from '../utils/cn';
import { useEffect } from 'react';

import iconRemove from '../assets/images/icon-remove.svg';

type FilterProps = {
  filters: string[];
  clearFilter: () => void;
  addandRemoveTagToFilter: (tag: string) => void;
  removingTags: string[];
};

const Filter = ({
  filters,
  clearFilter,
  addandRemoveTagToFilter,
  removingTags,
}: FilterProps) => {
  useEffect(() => {
    sessionStorage.setItem('active-filters', JSON.stringify(filters));
  }, [filters]);

  return (
    <section
      className={cn(
        `py-6 px-6 bg-white rounded-md shadow-xl border-(--color-primary) -mt-24 mb-3 
         z-10 flex gap-5 justify-between min-h-[80px] transition-all duration-200`,
        filters.length > 0 ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div className="flex gap-4 flex-wrap">
        {filters.map((item) => (
          <Transition
            key={item}
            appear
            show={!removingTags.includes(item)}
            unmount={false}
            enter="transition-all duration-150 ease-out transform"
            enterFrom="opacity-0 scale-0"
            enterTo="opacity-100 scale-100"
            leave="transition-all duration-100 ease-in transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-0"
          >
            <div
              className="filter-btn flex items-center justify-center p-0 
                     hover:bg-(--color-surface) hover:text-(--color-primary)"
            >
              <span className="px-2 pl-3">{item}</span>
              <img
                src={iconRemove}
                alt="icon-remove"
                className="w-full h-full bg-(--color-primary) p-2 rounded-r-sm
                  hover:bg-black hover:cursor-pointer"
                onClick={() => {
                  addandRemoveTagToFilter(item);
                }}
              />
            </div>
          </Transition>
        ))}
      </div>

      {/* ClearAll */}
      <button
        className="text-(--color-text-secondary) text-lg hover:underline 
                   hover:text-(--color-primary) hover:cursor-pointer"
        onClick={clearFilter}
      >
        Clear
      </button>
    </section>
  );
};

export default Filter;
