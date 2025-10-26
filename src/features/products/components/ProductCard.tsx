import type { Product } from '../types';

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const { title, price, thumbnail } = product;
  return (
    <div className="flex flex-col max-w-sm rounded-2xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-white">
      <img
        className="h-48 w-full rounded-t-2xl object-cover"
        src={thumbnail}
        alt="Card image"
      />

      <div className="flex flex-col flex-1 p-5">
        <h5 className="mb-2 text-xl font-semibold tracking-tight">{title}</h5>
        <p className="mt-auto">Rs. {price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
