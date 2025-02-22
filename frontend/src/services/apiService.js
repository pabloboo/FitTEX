import { config } from '../config/config.js';

const generateToken = async () => {
  const { authUrl, clientId, clientSecret, grantType, scope } = config.inditex;

  const headers = new Headers();
  headers.append('Authorization', 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'));
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  const body = new URLSearchParams();
  body.append('grant_type', grantType);
  body.append('scope', scope);

  try {
    const response = await fetch(authUrl, {
      method: 'POST',
      headers,
      body: body.toString(),
    });

    if (!response.ok) throw new Error('Network response was not ok');
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
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return null;
  }
};

export const fetchProducts = async (imageUrl) => {
  const token = await generateToken();
  if (!token) throw new Error('Failed to generate token');

  const apiUrl = `https://api.inditex.com/pubvsearch/products?image=${encodeURIComponent(imageUrl)}`;
  return await fetchData(apiUrl, token);
};

export const searchProducts = async (query, brand) => {
  const token = await generateToken();
  if (!token) throw new Error('Failed to generate token');

  let apiUrl = `https://api.inditex.com/searchpmpa/products?query=${encodeURIComponent(query)}`;
  if (brand) apiUrl += `&brand=${encodeURIComponent(brand)}`;
  return await fetchData(apiUrl, token);
};

export const fetchOrder = async (brand, id) => {
  const token = await generateToken();
  if (!token) throw new Error('Failed to generate token');

  const apiUrl = `https://api.inditex.com/pubordtrck/${brand}/orders/${id}`;
  return await fetchData(apiUrl, token);
};