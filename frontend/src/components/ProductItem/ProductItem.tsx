import React from 'react';
import './ProductItem.css';

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

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <li className="product-item">
      <h3>{product.name}</h3>
      <p>
        Price: {product.price.value.current} {product.price.currency}
      </p>
      <a href={product.link} target="_blank" rel="noopener noreferrer">
        See product
      </a>
    </li>
  );
};

export default ProductItem;