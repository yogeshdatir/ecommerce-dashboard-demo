import { createContext, useContext, useState, type ReactNode } from 'react';

export type Filters = {
  selectedCategory?: string;
  searchTerm?: string;
  sortOrder?: 'asc' | 'desc';
};

type ProductFilterContextType = {
  filters: Filters | null;
  setFilters: React.Dispatch<React.SetStateAction<Filters | null>>;
};

const ProductFilterContext = createContext<
  ProductFilterContextType | undefined
>(undefined);

export function ProductFilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<Filters | null>(null);

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
