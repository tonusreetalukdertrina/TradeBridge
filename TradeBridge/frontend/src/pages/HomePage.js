import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

const HomePage = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Product Catalog</h1>
      <ProductForm />
      <ProductList />
    </div>
  );
};

export default HomePage;
