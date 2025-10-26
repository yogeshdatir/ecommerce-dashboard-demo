import ErrorBoundary, { ErrorTrigger } from './components/ErrorBoundary';
import Filter from './features/product-filter/components/Filter';
import { ProductFilterProvider } from './features/product-filter/contexts/ProductFilterContext';
import ProductList from './features/products/components/ProductList';
import { ThemeProvider } from './features/theme/ThemeContext';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <main className="flex flex-col gap-6">
          {import.meta.env.MODE === 'development' && <ErrorTrigger />}
          <ProductFilterProvider>
            <Filter />
            <ProductList />
          </ProductFilterProvider>
        </main>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
