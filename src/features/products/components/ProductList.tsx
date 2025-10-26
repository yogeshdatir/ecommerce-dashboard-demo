import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import type { Product, ProductsData } from '../types';
import ProductCard from './ProductCard';
import Spinner from '../../../components/Spinner';
import { useProductFilter } from '../../product-filter/contexts/ProductFilterContext';

const ProductList = () => {
  const { filters } = useProductFilter();

  const { selectedCategory, searchTerm, sortOrder } = filters || {};

  const [productsData, setProductsData] = useState<ProductsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>('');

  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      const productsURL = new URL('https://dummyjson.com/products');

      if (selectedCategory) {
        productsURL.pathname += `/category/${selectedCategory}`;
      } else if (searchTerm) {
        productsURL.pathname += '/search';
        productsURL.searchParams.set('q', searchTerm);
      }

      productsURL.searchParams.set('limit', '0');

      // Add sort order
      if (sortOrder) {
        productsURL.searchParams.set('sortBy', 'price');
        productsURL.searchParams.set('order', sortOrder);
      }

      const finalURL = productsURL.toString();
      const response = await axios.get(finalURL);
      setProductsData({ ...response.data });
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchTerm, sortOrder]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[-webkit-fill-available]">
        <Spinner />
      </div>
    );
  } else if (error || !productsData?.products) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-auto">
      {productsData.products.map((product: Product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default ProductList;
