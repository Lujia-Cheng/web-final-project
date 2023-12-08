import React, { useEffect, useState } from 'react';

const AdminAccount = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/admin/customers`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/admin/products`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div>
      <h1>Admin Account</h1>
      <h2>Customers</h2>
      <ul>
        {customers.map(customer => (
          <li key={customer._id}>{customer.name} - {customer.email}</li>
        ))}
      </ul>

      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product._id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminAccount;
