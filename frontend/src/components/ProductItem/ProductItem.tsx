import React, { useState, useEffect } from 'react';
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
  // State to track if the product is in the wishlist
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Load wishlist status from localStorage on component mount
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || "[]");
    const isProductInWishlist = wishlist.includes(product.link);
    setIsInWishlist(isProductInWishlist);
  }, [product.link]);

  // Function to toggle the product in the wishlist
  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || "[]");
    const isProductInWishlist = wishlist.includes(product.link);

    if (isProductInWishlist) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter((url: string) => url !== product.link);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
    } else {
      // Add to wishlist
      const updatedWishlist = [...wishlist, product.link];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsInWishlist(true);
    }
  };

  return (
    <li className="product-item">
      <h3>{product.name}</h3>
      <p>
        Price: {product.price.value.current} {product.price.currency}
      </p>
      <a href={product.link} target="_blank" rel="noopener noreferrer">
        See product
      </a>
      <button
        className={`wishlist-button ${isInWishlist ? 'in-wishlist' : ''}`}
        onClick={toggleWishlist}
        title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {isInWishlist ? '❤️' : '🤍'}
      </button>
    </li>
  );
};

export default ProductItem;