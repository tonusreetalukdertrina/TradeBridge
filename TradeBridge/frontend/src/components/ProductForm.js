import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductForm.css';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name.trim() || !formData.price) {
      setError('Please fill in all required fields.');
      return;
    }

    const productData = {
      ...formData,
      price: Number(formData.price),
    };

    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || 'Failed to create product');
      }

      const result = await res.json();
      setSuccess('Product created successfully!');
      setFormData({ name: '', price: '', description: '', image: '' });
      console.log('Product created:', result);

      setTimeout(() => {
        navigate('/homepage');
      }, 1000);
    } catch (err) {
      setError(err.message || 'Error creating product');
      console.error('Error creating product:', err);
    }
  };

  return (
    <div className="product-form-container">
      <button className="toggle-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add New Product'}
      </button>

      {showForm && (
        <div className="product-form">
          <h2>Add New Product</h2>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Product Name *"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              name="price"
              type="number"
              placeholder="Price *"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
            />
            <input
              name="description"
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
            <input
              name="image"
              type="text"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
            />
            <button type="submit">Submit Product</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductForm;
