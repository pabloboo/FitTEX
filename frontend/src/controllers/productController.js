import { fetchProducts, searchProducts, fetchOrder } from '../services/apiService.js';

export const getProducts = async (req, res, next) => {
  const { imageUrl } = req.query;
  if (!imageUrl) {
    return res.status(400).json({ message: 'Image URL is required.' });
  }

  try {
    const products = await fetchProducts(imageUrl);
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const search = async (req, res, next) => {
  const { query, brand } = req.query;
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required.' });
  }

  try {
    const products = await searchProducts(query, brand);
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req, res, next) => {
  const { brand, id } = req.query;
  if (!brand || !id) {
    return res.status(400).json({ message: 'Brand and ID parameters are required.' });
  }

  try {
    const order = await fetchOrder(brand, id);
    res.json(order);
  } catch (error) {
    next(error);
  }
};