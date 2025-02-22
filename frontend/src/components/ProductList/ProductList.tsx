import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import './ProductList.css';

interface Product {
  id: string;
  name: string;
  price: {
    value: {
      current: number;
    };
    currency: string;
  };
  link: string;
}

interface ProductListProps {
  products: Product[];
  showResults: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, showResults }) => {
  return (
    <div className={`results-container ${showResults ? "show" : ""}`}>
      <ul>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;