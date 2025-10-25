import { createContext, useContext, useState, type ReactNode } from 'react';

type ProductFilterContextType = {
  filters: any;
  setFilters: React.Dispatch<any>;
};

const ProductFilterContext = createContext<
  ProductFilterContextType | undefined
>(undefined);

export function ProductFilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<any>(null);

  const value = { filters, setFilters };

  return (
    <ProductFilterContext.Provider value={value}>
      {children}
    </ProductFilterContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProductFilter() {
  const context = useContext(ProductFilterContext);
  if (!context) {
    throw new Error(
      'useProductFilterContext must be used within an ProductFilterProvider'
    );
  }
  return context;
}
