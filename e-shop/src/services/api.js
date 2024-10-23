// src/services/api.js

const API_BASE_URL = 'http://localhost:5000/api';

// Utility function to handle fetch calls
const fetchWithAuth = async (endpoint, options = {}) => {
    // Get token from localStorage if it exists
    const token = localStorage.getItem('token');
    
    const defaultHeaders = {
        'Content-Type': 'application/json',
        // Add Authorization header if token exists
        ...(token && { 'Authorization': `Bearer ${token}` })
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};

// API service object with all the endpoints
const apiService = {
    // Auth endpoints
    login: async (credentials) => {
        const response = await fetchWithAuth('/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
        if (response.token) {
            localStorage.setItem('token', response.token);
        }
        return response;
    },

    register: (userData) => {
        return fetchWithAuth('/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },

    // Product endpoints
    getProducts: (category = '', search = '') => {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (search) params.append('search', search);
        
        return fetchWithAuth(`/products?${params.toString()}`);
    },

    // Cart endpoints
    getCart: () => {
        return fetchWithAuth('/cart');
    },

    addToCart: (productId, quantity) => {
        return fetchWithAuth('/cart', {
            method: 'POST',
            body: JSON.stringify({ product_id: productId, quantity })
        });
    },

    removeFromCart: (productId) => {
        return fetchWithAuth('/cart', {
            method: 'DELETE',
            body: JSON.stringify({ product_id: productId })
        });
    },

    // Logout utility
    logout: () => {
        localStorage.removeItem('token');
    }
};

export default apiService;