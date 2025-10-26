import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import ProductList from './ProductList';
import { useProductFilter } from '../../product-filter/contexts/ProductFilterContext';
import type { ProductsData } from '../types';

// Mock dependencies
vi.mock('axios');
vi.mock('../../product-filter/contexts/ProductFilterContext');
vi.mock('./ProductCard', () => ({
  default: ({ product }: { product: { id: number; title: string } }) => (
    <div data-testid={`product-card-${product.id}`}>{product.title}</div>
  ),
}));
vi.mock('../../../components/Spinner', () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

const mockProductsData: ProductsData = {
  products: [
    {
      id: 1,
      title: 'Product 1',
      description: 'Description 1',
      price: 100,
      category: 'electronics',
      thumbnail: 'image1.jpg',
      rating: 4.5,
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Description 2',
      price: 200,
      category: 'electronics',
      thumbnail: 'image2.jpg',
      rating: 4.0,
    },
  ],
  total: 2,
  skip: 0,
  limit: 0,
};

describe('ProductList', () => {
  const mockAxiosGet = vi.mocked(axios.get);
  const mockUseProductFilter = vi.mocked(useProductFilter);

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseProductFilter.mockReturnValue({
      filters: {
        selectedCategory: '',
        searchTerm: '',
        sortOrder: undefined,
      },
      setFilters: vi.fn(),
    });
    // Default mock for successful responses
    mockAxiosGet.mockResolvedValue({ data: mockProductsData });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render loading spinner initially', () => {
    mockAxiosGet.mockImplementation(() => new Promise(() => {}));

    render(<ProductList />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should fetch and display products successfully', async () => {
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByTestId('product-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('product-card-2')).toBeInTheDocument();
    });

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('should call API with correct base URL when no filters applied', async () => {
    render(<ProductList />);

    await waitFor(() => {
      expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://dummyjson.com/products?limit=0'
      );
    });
  });

  it('should call API with category filter', async () => {
    mockUseProductFilter.mockReturnValue({
      filters: {
        selectedCategory: 'electronics',
        searchTerm: '',
        sortOrder: undefined,
      },
      setFilters: vi.fn(),
    });

    render(<ProductList />);

    await waitFor(() => {
      expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://dummyjson.com/products/category/electronics?limit=0'
      );
    });
  });

  it('should call API with search term', async () => {
    mockUseProductFilter.mockReturnValue({
      filters: {
        selectedCategory: '',
        searchTerm: 'phone',
        sortOrder: undefined,
      },
      setFilters: vi.fn(),
    });

    render(<ProductList />);

    await waitFor(() => {
      expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://dummyjson.com/products/search?q=phone&limit=0'
      );
    });
  });

  it('should call API with sort order', async () => {
    mockUseProductFilter.mockReturnValue({
      filters: {
        selectedCategory: '',
        searchTerm: '',
        sortOrder: 'asc',
      },
      setFilters: vi.fn(),
    });

    render(<ProductList />);

    await waitFor(() => {
      expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://dummyjson.com/products?limit=0&sortBy=price&order=asc'
      );
    });
  });

  it('should call API with multiple filters combined', async () => {
    mockUseProductFilter.mockReturnValue({
      filters: {
        selectedCategory: 'electronics',
        searchTerm: '',
        sortOrder: 'desc',
      },
      setFilters: vi.fn(),
    });

    render(<ProductList />);

    await waitFor(() => {
      expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://dummyjson.com/products/category/electronics?limit=0&sortBy=price&order=desc'
      );
    });
  });

  it('should display error message when API call fails', async () => {
    mockAxiosGet.mockRejectedValueOnce(new Error('Network error'));

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
    });
  });

  it('should render empty grid when products data is empty', async () => {
    mockAxiosGet.mockResolvedValueOnce({ data: { products: [] } });

    render(<ProductList />);

    await waitFor(() => {
      const grid = document.querySelector('.grid');
      expect(grid).toBeInTheDocument();
      expect(grid?.children).toHaveLength(0);
    });
  });

  it('should display error message when products is null', async () => {
    mockAxiosGet.mockResolvedValueOnce({ data: { products: null } });

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
    });
  });

  it('should refetch products when filters change', async () => {
    const { rerender } = render(<ProductList />);

    mockAxiosGet.mockResolvedValueOnce({ data: mockProductsData });

    await waitFor(() => {
      expect(mockAxiosGet).toHaveBeenCalledTimes(1);
    });

    // Change filters
    mockUseProductFilter.mockReturnValue({
      filters: {
        selectedCategory: 'furniture',
        searchTerm: '',
        sortOrder: undefined,
      },
      setFilters: vi.fn(),
    });

    mockAxiosGet.mockResolvedValueOnce({ data: mockProductsData });

    rerender(<ProductList />);

    await waitFor(() => {
      expect(mockAxiosGet).toHaveBeenCalledTimes(2);
      expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://dummyjson.com/products/category/furniture?limit=0'
      );
    });
  });

  it('should render correct number of product cards', async () => {
    render(<ProductList />);

    await waitFor(() => {
      const productCards = screen.getAllByTestId(/product-card-/);
      expect(productCards).toHaveLength(2);
    });
  });

  it('should prioritize category over search term', async () => {
    mockUseProductFilter.mockReturnValue({
      filters: {
        selectedCategory: 'electronics',
        searchTerm: 'phone',
        sortOrder: undefined,
      },
      setFilters: vi.fn(),
    });

    render(<ProductList />);

    await waitFor(() => {
      expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://dummyjson.com/products/category/electronics?limit=0'
      );
    });
  });
});
