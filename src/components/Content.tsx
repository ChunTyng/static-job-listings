import { useState } from 'react';
import { cn } from '../utils/cn';
import Filter from './Filter';
import { GoDotFill } from 'react-icons/go';

// type
import { fetchDataProps } from '../types/fetchDataProps';
import { statusProps } from '../types/statusProps';

type ContentProps = {
  data: fetchDataProps[];
  status: statusProps;
};

const Content = ({ data, status }: ContentProps) => {
  //useState
  const [filters, setFilters] = useState<string[]>([]);

  // loading && error
  if (status.loading) return <div className="text-3xl">Loading...</div>;
  if (status.error) return <div>Error: {status.error}</div>;

  // function
  const addandRemoveTagToFilter = (tag: string) => {
    if (!filters.includes(tag)) {
      setFilters((prev) => [...prev, tag]);
    } else if (filters.includes(tag)) {
      setFilters((prev) => prev.filter((selectedTag) => selectedTag != tag));
    }
  };
  const clearFilter = () => {
    setFilters([]);
  };

  return (
    <main
      className="px-6 py-15 bg-(--color-bg) relative flex flex-col gap-12
                     md:px-25
    "
    >
      {/* filter */}
      {filters.length > 0 && (
        <Filter
          filters={filters}
          setFilters={setFilters}
          clearFilter={clearFilter}
          addandRemoveTagToFilter={addandRemoveTagToFilter}
        />
      )}

      {/* job listings */}
      {data
        .filter((item) => {
          if (filters.length === 0) return true;

          const propertiesToCheck = [
            item.role,
            item.level,
            ...item.languages,
            ...item.tools,
          ];

          return filters.every((filter) => propertiesToCheck.includes(filter));
        })
        .map((item, index) => {
          // order
          let labels: string[] = [];
          switch (index) {
            case 2:
            case 9:
              labels = [...item.tools, ...item.languages];
              break;
            case 4:
            case 6:
            case 8:
              labels = [
                ...item.languages.slice(0, 1),
                ...item.tools,
                ...item.languages.slice(1),
              ];
              break;
            case 7:
              labels = [
                ...item.tools.slice(0, 1),
                ...item.languages,
                ...item.tools.slice(1),
              ];
              break;
            default:
              labels = [...item.languages, ...item.tools];
          }

          return (
            <section
              key={item.id}
              className={cn(
                `p-6 bg-white relative rounded-md shadow-xl
             border-(--color-primary) flex flex-col max-h-120
               md:items-center md:flex-row md:gap-5 
               `,
                item.new && item.featured ? 'border-l-5' : '',
              )}
            >
              <img
                src={item.logo}
                alt={`{item.company} logo`}
                className="w-13 h-13 absolute -top-7 md:relative md:top-0
                         md:w-17 md:h-17 
              "
              />

              {/* info-section */}
              <div
                className="border-b border-(--color-text-secondary) md:border-b-0
                         md:flex-1/2
"
              >
                <div className="flex items-center gap-4 my-2">
                  <a>
                    <h1 className="text-primary text-lg font-bold">
                      {item.company}
                    </h1>
                  </a>
                  <div className="flex flex-row justify-center gap-2 flex-wrap md:flex-nowrap">
                    {item.new && (
                      <span
                        className="bg-primary text-white text-md px-2 rounded-full 
                                   uppercase"
                      >
                        New!
                      </span>
                    )}
                    {item.featured && (
                      <span
                        className="bg-black text-white text-md px-2 rounded-full 
                                   uppercase"
                      >
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                <h2 className="font-(--weight-700) text-(--color-text-primary)">
                  {item.position}
                </h2>
                <ul
                  className="flex flex-row items-center gap-2 text-(--color-text-secondary)
                           font-(--weight-500) mt-1 mb-3"
                >
                  <li className="pt-2">{item.postedAt}</li>
                  <li>
                    <div className="flex flex-row items-center gap-2 ">
                      <GoDotFill size={7} color="var(--color-text-secondary)" />
                      <ul className="pt-1">
                        <li className="pt-0">{item.contract}</li>
                      </ul>
                      <GoDotFill size={7} color="var(--color-text-secondary)" />
                    </div>
                  </li>

                  <li className="pt-2">{item.location}</li>
                </ul>
              </div>

              {/* filter-btn-section */}
              <div
                className="flex flex-row flex-wrap gap-5 mt-5 md:flex-1/2 place-content-end
                         md:mt-0 justify-center xl:justify-end
            "
              >
                <button
                  className="filter-btn"
                  onClick={() => addandRemoveTagToFilter(item.role)}
                >
                  {item.role}
                </button>
                <button
                  className="filter-btn"
                  onClick={() => addandRemoveTagToFilter(item.level)}
                >
                  {item.level}
                </button>
                {labels.map((label, filterIndex) => (
                  <button
                    className="filter-btn"
                    key={filterIndex}
                    onClick={() => addandRemoveTagToFilter(label)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </section>
          );
        })}
    </main>
  );
};

export default Content;
