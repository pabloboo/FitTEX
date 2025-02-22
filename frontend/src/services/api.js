import express from 'express';
import fetch, { Headers } from 'node-fetch';
import { config } from '../config/config.js';

const app = express();
const port = 3000;

const generateToken = async () => {
  const { authUrl, clientId, clientSecret, grantType, scope } = config;

  const headers = new Headers();
  headers.append('Authorization', 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'));
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  const body = new URLSearchParams();
  body.append('grant_type', grantType);
  body.append('scope', scope);

  try {
    const response = await fetch(authUrl, {
      method: 'POST',
      headers: headers,
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.id_token;
  } catch (error) {
    console.error('Error fetching the token:', error);
    return null;
  }
};

const fetchData = async (url, token) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return null;
  }
};

const fetchProducts = async (token, imageUrl) => {
  const apiUrl = `https://api-sandbox.inditex.com/pubvsearch-sandbox/products?image=${encodeURIComponent(imageUrl)}`;
  return await fetchData(apiUrl, token);
};

const searchProducts = async (token, query, brand) => {
  let apiUrl = `https://api-sandbox.inditex.com/searchpmpa-sandbox/products?query=${encodeURIComponent(query)}`;
  if (brand) {
    apiUrl += `&brand=${encodeURIComponent(brand)}`;
  }
  return await fetchData(apiUrl, token);
};

const fetchOrder = async (token, brand, id) => {
  const apiUrl = `https://api-sandbox.inditex.com/pubordtrck-sandbox/${brand}/orders/${id}`;
  return await fetchData(apiUrl, token);
};

const handleRequest = async (req, res, fetchFunction, ...params) => {
  const token = await generateToken();
  if (!token) {
    return res.status(500).send('Error generating token');
  }

  const data = await fetchFunction(token, ...params);
  if (!data) {
    return res.status(500).send('Error fetching data');
  }

  res.json(data);
};

app.get('/products', (req, res) => {
  const { imageUrl } = req.query;
  if (!imageUrl) {
    return res.status(400).send('Image URL is required');
  }
  handleRequest(req, res, fetchProducts, imageUrl);
});

app.get('/search', (req, res) => {
  const { query, brand } = req.query;
  if (!query) {
    return res.status(400).send('Query parameter is required');
  }
  handleRequest(req, res, searchProducts, query, brand);
});

app.get('/order', (req, res) => {
  const { brand, id } = req.query;
  if (!brand || !id) {
    return res.status(400).send('Brand and ID parameters are required');
  }
  handleRequest(req, res, fetchOrder, brand, id);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});