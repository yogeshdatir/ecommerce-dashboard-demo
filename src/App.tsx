import Filter from './features/product-filter/components/Filter';
import { ProductFilterProvider } from './features/product-filter/contexts/ProductFilterContext';
import ProductList from './features/products/components/ProductList';
import { ThemeProvider } from './features/theme/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <main className="flex flex-col gap-6">
        <ProductFilterProvider>
          <Filter />
          <ProductList />
        </ProductFilterProvider>
      </main>
    </ThemeProvider>
  );
}

export default App;
