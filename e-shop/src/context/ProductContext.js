import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { productsAPI } from '../services/api';
import { toast } from 'react-hot-toast';

const ProductContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload, loading: false };
    case 'SET_FEATURED_PRODUCTS':
      return { ...state, featuredProducts: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.payload.id ? action.payload : p
        )
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload)
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, {
    products: [],
    featuredProducts: [],
    loading: false,
    error: null,
  });

  const fetchProducts = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await productsAPI.getAll();
      const products = response.data;
      
      dispatch({ type: 'SET_PRODUCTS', payload: products });
      
      // Set featured products (first 8 products for demo)
      const featured = products.slice(0, 8);
      dispatch({ type: 'SET_FEATURED_PRODUCTS', payload: featured });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Failed to load products');
    }
  };

  const createProduct = async (productData) => {
    try {
      const response = await productsAPI.create(productData);
      dispatch({ type: 'ADD_PRODUCT', payload: response.data });
      toast.success('Product created successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create product';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const response = await productsAPI.update(id, productData);
      dispatch({ type: 'UPDATE_PRODUCT', payload: response.data });
      toast.success('Product updated successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update product';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const deleteProduct = async (id) => {
    try {
      await productsAPI.delete(id);
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
      toast.success('Product deleted successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete product';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const getProductById = (id) => {
    return state.products.find(product => product.id === parseInt(id));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    products: state.products,
    featuredProducts: state.featuredProducts,
    loading: state.loading,
    error: state.error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};