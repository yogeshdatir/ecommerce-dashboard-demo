export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  thumbnail: string;
}

export interface ProductsData {
  products: Product[];
  limit: number;
  total: number;
  skip: number;
}
