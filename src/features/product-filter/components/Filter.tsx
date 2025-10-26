import axios from 'axios';
import { useEffect, useState, type SyntheticEvent } from 'react';
import SkeletonLoader from '../../../components/SkeletonLoader';
import { useProductFilter } from '../contexts/ProductFilterContext';

export default function Filter() {
  const { filters, setFilters } = useProductFilter();

  const { selectedCategory, searchTerm, sortOrder } = filters || {};

  const [categoryList, setCategoryList] = useState([]);
  // const [search, setSearch] = useState('');
  // const [sort, setSort] = useState('asc');

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
    setFilters((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const baseSelect =
    'appearance-none pr-8 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200';

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Category Filter */}
      <div className="relative min-w-[164px] h-full">
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
        value={searchTerm}
        name="searchTerm"
        onChange={handleFilterChange}
        placeholder="Search..."
        className="flex-1 min-w-[150px] rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
      />

      {/* Sort */}
      <div className="relative">
        <select
          name="sortOrder"
          value={sortOrder}
          onChange={handleFilterChange}
          className={baseSelect}
        >
          <option value="asc">Sort: Ascending</option>
          <option value="desc">Sort: Descending</option>
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400 rotate-90">
          {'>'}
        </span>
      </div>
    </div>
  );
}
