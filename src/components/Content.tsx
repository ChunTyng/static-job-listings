import { useState } from 'react';
import Filter from './Filter';
import { motion, AnimatePresence } from 'framer-motion';
import JobListings from './JobListings';

// types
import { fetchDataProps } from '../types/fetchDataProps';
import { statusProps } from '../types/statusProps';

type ContentProps = {
  data: fetchDataProps[];
  status: statusProps;
};

const Content = ({ data, status }: ContentProps) => {
  // useState
  const [filters, setFilters] = useState<string[]>(() => {
    const saved = sessionStorage.getItem('active-filters');
    return saved ? JSON.parse(saved) : [];
  });
  const [removingTags, setRemovingTags] = useState<string[]>([]);

  if (status.loading)
    return (
      <div className="text-3xl" role="status" aria-live="polite">
        Loading...
      </div>
    );
  if (status.error)
    return (
      <div role="alert" aria-live="assertive">
        Error: {status.error}
      </div>
    );

  // function
  const addAndRemoveTagToFilter = (tag: string) => {
    if (!filters.includes(tag)) {
      setFilters((prev) => [...prev, tag]);
    } else {
      setRemovingTags((prev) => [...prev, tag]);
      setTimeout(() => {
        setFilters((prev) => prev.filter((t) => t !== tag));
        setRemovingTags((prev) => prev.filter((t) => t !== tag));
      }, 100);
    }
  };
  const clearFilter = () => setFilters([]);
  const filteredJobs = data.filter((item) => {
    if (filters.length === 0) return true;
    const propsToCheck = [
      item.role,
      item.level,
      ...item.languages,
      ...item.tools,
    ];
    return filters.every((f) => propsToCheck.includes(f));
  });

  return (
    <main className="px-6 py-15 bg-(--color-bg) flex flex-col gap-12 md:px-25">
      {/* Filter bar */}
      <Filter
        filters={filters}
        clearFilter={clearFilter}
        addandRemoveTagToFilter={addAndRemoveTagToFilter}
        removingTags={removingTags}
      />

      <AnimatePresence>
        {filteredJobs.map((item, index) => (
          <motion.section
            key={item.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            role="listitem"
          >
            <JobListings
              item={item}
              index={index}
              addandRemoveTagToFilter={addAndRemoveTagToFilter}
            />
          </motion.section>
        ))}
      </AnimatePresence>
    </main>
  );
};

export default Content;
