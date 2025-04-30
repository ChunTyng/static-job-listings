import { cn } from '../utils/cn';
import { fetchDataProps } from '../types/fetchDataProps';
import { GoDotFill } from 'react-icons/go';

type JobListings = {
  item: fetchDataProps;
  index: number;
  addandRemoveTagToFilter: (tag: string) => void;
};

const JobListings = ({ item, index, addandRemoveTagToFilter }: JobListings) => {
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
      className={cn(
        `p-6 bg-white relative rounded-md shadow-[0_1px_5px_1px_var(--color-primary)] 
       border-(--color-primary) flex flex-col max-h-120 md:items-center md:flex-row md:gap-5`,
        item.new && item.featured ? 'border-l-5' : '',
      )}
      role="region"
      aria-label={`Job listing for ${item.position} at ${item.company}`}
    >
      {/* logo */}
      <img
        src={item.logo}
        alt={`${item.company} logo`}
        loading="lazy"
        className="w-13 h-13 absolute -top-7 md:relative md:top-0
                 md:w-17 md:h-17 
      "
      />

      {/* info-section */}
      <div
        className="border-b border-(--color-text-secondary) md:border-b-0
                 md:flex-1/2"
      >
        <div className="flex items-center gap-4 my-2">
          <h2 className="text-primary text-lg font-bold" aria-level={2}>
            {item.company}
          </h2>
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

        <h3
          className="font-(--weight-700) text-(--color-text-primary) hover:text-(--color-primary)
                       hover:cursor-pointer"
          aria-label={`View more about the position: ${item.position}`}
          aria-level={3}
        >
          {item.position}
        </h3>
        <ul
          className="flex flex-row items-center gap-2 text-(--color-text-secondary)
                   font-(--weight-500) mt-1 mb-3"
        >
          <li className="pt-2">{item.postedAt}</li>
          <li className="flex items-center gap-2">
            <GoDotFill size={7} color="var(--color-text-secondary)" />
            {item.contract}
          </li>
          <li className="flex items-center gap-2">
            <GoDotFill size={7} color="var(--color-text-secondary)" />
            {item.location}
          </li>
        </ul>
      </div>

      {/* filter-btn-section */}
      <div
        className="flex flex-row flex-wrap gap-5 mt-5 md:flex-1/2 place-content-end
                 md:mt-0 justify-center xl:justify-end"
        role="group"
        aria-label="Filter tags for this job"
      >
        <button
          className="filter-btn"
          onClick={() => {
            addandRemoveTagToFilter(item.role);
          }}
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
            aria-label={`Filter jobs by ${label}`}
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default JobListings;
