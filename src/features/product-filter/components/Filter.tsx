import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Filter() {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('asc');

  useEffect(() => {
    const fetchCategoryList = async () => {
      const response = await axios.get(
        'https://dummyjson.com/products/category-list'
      );
      setCategoryList(response.data);
    };

    fetchCategoryList();
  }, []);

  const baseSelect =
    'appearance-none pr-8 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200';

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Category Filter */}
      <div className="relative">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
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
      </div>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="flex-1 min-w-[150px] rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
      />

      {/* Sort */}
      <div className="relative">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
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
