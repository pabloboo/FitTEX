import React, { useState, useEffect } from 'react';
import './ProductItem.css';

// SVG icons for social media platforms
const SocialIcons = {
  twitter: (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M22.23 5.924a8.212 8.212 0 01-2.357.646 4.115 4.115 0 001.804-2.27 8.221 8.221 0 01-2.606.996 4.103 4.103 0 00-7.097 2.808 4.103 4.103 0 00.105.936 11.648 11.648 0 01-8.457-4.287 4.103 4.103 0 001.27 5.478 4.103 4.103 0 01-1.858-.513v.052a4.103 4.103 0 003.292 4.023 4.103 4.103 0 01-1.853.07 4.103 4.103 0 003.833 2.85 8.233 8.233 0 01-5.096 1.756c-.332 0-.658-.02-.979-.057a11.616 11.616 0 006.29 1.843c7.547 0 11.673-6.252 11.673-11.673 0-.178-.004-.355-.012-.531a8.298 8.298 0 002.047-2.123z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
};

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

  // Function to share the product link on social media
  const shareOnSocialMedia = (platform: string) => {
    const productName = encodeURIComponent(product.name);
    const productLink = encodeURIComponent(product.link);
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=Check%20out%20this%20product:%20${productName}&url=${productLink}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${productLink}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${productLink}`;
        break;
      default:
        console.warn('Unsupported platform:', platform);
        return;
    }

    window.open(shareUrl, '_blank');
  };

  return (
    <li className="product-item">
      <h3>{product.name}</h3>
      <button
        className={`wishlist-button ${isInWishlist ? 'in-wishlist' : ''}`}
        onClick={toggleWishlist}
        title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}>
        {isInWishlist ? '❤️' : '🤍'}
      </button>
      <div>
        <p>
          Price: {product.price.value.current} {product.price.currency}
        </p>
        <a href={product.link} target="_blank" rel="noopener noreferrer">
          See product
        </a>
        <div className="social-share-buttons">
          <button
            className="social-button twitter"
            onClick={() => shareOnSocialMedia('twitter')}
            title="Share on Twitter">
            {SocialIcons.twitter}
          </button>
          <button
            className="social-button facebook"
            onClick={() => shareOnSocialMedia('facebook')}
            title="Share on Facebook">
            {SocialIcons.facebook}
          </button>
          <button
            className="social-button linkedin"
            onClick={() => shareOnSocialMedia('linkedin')}
            title="Share on LinkedIn">
            {SocialIcons.linkedin}
          </button>
        </div>
      </div>
    </li>
  );
};

export default ProductItem;