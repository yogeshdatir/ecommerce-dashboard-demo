import axios from 'axios';
import { useEffect, useState, type SyntheticEvent } from 'react';
import SkeletonLoader from '../../../components/SkeletonLoader';
import { useDebounce } from '../../../hooks/useDebounce';
import { useProductFilter } from '../contexts/ProductFilterContext';
import ThemeToggle from '../../theme/ThemeToggle';

export default function Filter() {
  const { filters, setFilters } = useProductFilter();

  const { selectedCategory, searchTerm, sortOrder } = filters || {};

  const [categoryList, setCategoryList] = useState([]);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '');
  const debouncedSearchTerm = useDebounce(localSearchTerm, 500);

  // Update filters when debounced search term changes
  useEffect(() => {
    setFilters((prevState) => ({
      ...prevState,
      searchTerm: debouncedSearchTerm,
    }));
  }, [debouncedSearchTerm, setFilters]);

  useEffect(() => {
    const fetchCategoryList = async () => {
      const response = await axios.get(
        'https://dummyjson.com/products/category-list'
      );
      setCategoryList(response.data);
    };

    fetchCategoryList();
  }, []);

  const handleFilterChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    if (target.name === 'searchTerm') {
      setLocalSearchTerm(target.value);
    } else {
      setFilters((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const baseSelect =
    'max-md:w-full appearance-none pr-8 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200';

  return (
    <div className="flex flex-col flex-wrap items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:flex-row">
      {/* Category Filter */}
      <div className="relative max-md:w-full min-w-[164px] h-[37px]">
        {categoryList.length ? (
          <>
            <select
              name="selectedCategory"
              value={selectedCategory}
              onChange={handleFilterChange}
              className={baseSelect}
            >
              <option value="">All Categories</option>
              {categoryList.map((selectedCategory, index) => {
                return (
                  <option key={`category-${index}`} value={selectedCategory}>
                    {selectedCategory}
                  </option>
                );
              })}
            </select>

            <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400 rotate-90">
              {'>'}
            </span>
          </>
        ) : (
          <SkeletonLoader />
        )}
      </div>

      {/* Search */}
      <input
        type="text"
        value={localSearchTerm}
        name="searchTerm"
        onChange={handleFilterChange}
        placeholder="Search..."
        className="w-full md:flex-1 min-w-[150px] rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
      />

      {/* Sort */}
      <div className="relative max-md:w-full">
        <select
          name="sortOrder"
          value={sortOrder}
          onChange={handleFilterChange}
          className={baseSelect}
        >
          <option value="">Select sorting order</option>
          <option value="asc">Sort by price low to high</option>
          <option value="desc">Sort by price high to low</option>
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400 rotate-90">
          {'>'}
        </span>
      </div>

      <ThemeToggle />
    </div>
  );
}
