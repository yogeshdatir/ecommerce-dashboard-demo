import './App.css';
import Filter from './features/product-filter/components/Filter';
import { ProductFilterProvider } from './features/product-filter/contexts/ProductFilterContext';
import ProductList from './features/products/components/ProductList';

function App() {
  return (
    <main className="flex flex-col gap-6">
      <ProductFilterProvider>
        <Filter />
        <ProductList />
      </ProductFilterProvider>
    </main>
  );
}

export default App;
