import axios from 'axios';

// Create an axios instance with the base URL of your backend
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Product Endpoints
export const fetchProducts = () => API.get('/products');
export const fetchProductDetails = (id) => API.get(`/products/${id}`);

// User Endpoints
export const login = (formData) => API.post('/users/login', formData);
export const register = (formData) => API.post('/users', formData);

export default API;