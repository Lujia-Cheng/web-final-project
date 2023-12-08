import React, { useEffect, useState } from 'react';
import { Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Card, 
  CardContent, 
  TextField, 
  Button,
  Pagination,
  Tabs,
  Tab } from '@mui/material';

const AdminAccount = () => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editableProductId, setEditableProductId] = useState(null);
  const [tab, setTab] = useState(0);
  // Pagination state
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  
  const [editableCustomerId, setEditableCustomerId] = useState(null);
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');
  const [customerPage, setCustomerPage] = useState(1);

  useEffect(() => {
    fetchProducts();
    fetchCustomers();
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

  const handleEdit = (productId) => {
    setEditableProductId(productId);
  };

  const handleCancel = () => {
    setEditableProductId(null);
    // Optionally reset product changes
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleUpdate = async (productId, updatedProduct) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/products/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setProducts(products.map(product => (product._id === productId ? data : product)));
      setEditableProductId(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleChange = (event, productId) => {
    const { name, value } = event.target;
    setProducts(products.map(product => (
      product._id === productId ? { ...product, [name]: value } : product
    )));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to first page on search change
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination calculation based on filtered products
  const indexOfLastProduct = page * rowsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - rowsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  // customers related functions
  // Customer Handlers
  const handleCustomerEdit = (customerId) => {
    setEditableCustomerId(customerId);
  };

  const handleCustomerCancel = () => {
    setEditableCustomerId(null);
  };

  const handleCustomerUpdate = async (customerId, updatedCustomer) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/user/${customerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: updatedCustomer.email,
          address: updatedCustomer.address,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setCustomers(customers.map(customer => (customer._id === customerId ? data : customer)));
      setEditableCustomerId(null);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };
  

  const handleCustomerChange = (event, customerId) => {
    const { name, value } = event.target;
    setCustomers(customers.map(customer => (
      customer._id === customerId ? { ...customer, [name]: value } : customer
    )));
  };

  const handleCustomerChangePage = (event, newPage) => {
    setCustomerPage(newPage);
  };

  const handleCustomerSearchChange = (event) => {
    setCustomerSearchQuery(event.target.value);
    setCustomerPage(1);
  };

  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(customerSearchQuery.toLowerCase())
  );

  // Pagination calculation for customers
  const indexOfLastCustomer = customerPage * rowsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - rowsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  return (
  <div>
    <h1>Admin Account</h1>
    <Card>
      <CardContent>
        <Tabs value={tab} onChange={handleTabChange} centered>
            <Tab label="Products" />
            <Tab label="Customers" />
          </Tabs>
        
        {tab === 0 && ( 
          <>
            <TextField
            label="Search Products"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="product table">
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">Inventory Amount</TableCell>
                <TableCell align="right">Cost Price</TableCell>
                <TableCell align="right">Selling Price</TableCell>
                <TableCell align="right">Profit</TableCell>
                <TableCell align="right">Selling Amount</TableCell>
                <TableCell align="right">Kind</TableCell>
                <TableCell align="right">Created At</TableCell>
                <TableCell align="right">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentProducts.map((product) => (
                <TableRow key={product._id}>
                  {editableProductId === product._id ? (
                    <>
                      <TableCell component="th" scope="row">
                        <TextField
                          name="name"
                          value={product.name}
                          onChange={(e) => handleChange(e, product._id)}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          name="inventory_amount"
                          type="number"
                          value={product.inventory_amount}
                          onChange={(e) => handleChange(e, product._id)}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          name="single_cost_price"
                          type="number"
                          value={product.single_cost_price}
                          onChange={(e) => handleChange(e, product._id)}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          name="single_selling_price"
                          type="number"
                          value={product.single_selling_price}
                          onChange={(e) => handleChange(e, product._id)}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          name="profit"
                          type="number"
                          value={product.profit}
                          onChange={(e) => handleChange(e, product._id)}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          name="selling_amount"
                          type="number"
                          value={product.selling_amount}
                          onChange={(e) => handleChange(e, product._id)}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          name="kind"
                          value={product.kind}
                          onChange={(e) => handleChange(e, product._id)}
                        />
                      </TableCell>
                      <TableCell align="right">
                        {new Date(product.create_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="right">
                        <Button 
                          variant="contained" 
                          color="primary" 
                          onClick={() => handleUpdate(product._id, product)}
                        >
                          Update
                        </Button>
                      </TableCell>
                    </>
                  ): (
                    // Render text if the product is not being edited
                  <>
                    <TableCell>{product.name}</TableCell>
                    <TableCell align="right">{product.inventory_amount}</TableCell>
                    <TableCell align="right">{product.single_cost_price}</TableCell>
                    <TableCell align="right">{product.single_selling_price}</TableCell>
                    <TableCell align="right">{product.profit}</TableCell>
                    <TableCell align="right">{product.selling_amount}</TableCell>
                    <TableCell align="right">{product.kind}</TableCell>
                    <TableCell align="right">
                      {new Date(product.create_at).toLocaleDateString()}
                    </TableCell>
                  </>
                  )}
                  <TableCell align="right">
                    {editableProductId === product._id ? (
                      <>
                        {/* <Button variant="contained" color="primary" onClick={() => handleUpdate(product._id, product)}>Update</Button> */}
                        <Button variant="contained" onClick={handleCancel}>Cancel</Button>
                      </>
                    ) : (
                      <Button variant="contained" onClick={() => handleEdit(product._id)}>Edit</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
            count={Math.ceil(filteredProducts.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
            style={{ padding: '20px 0' }}
          />
          </>
        )}
        {tab === 1 && (
          <>
            <TextField
              label="Search Customers"
              variant="outlined"
              fullWidth
              margin="normal"
              value={customerSearchQuery}
              onChange={handleCustomerSearchChange}
            />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="customer table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentCustomers.map((customer) => (
                    <TableRow key={customer._id}>
                      {editableCustomerId === customer._id ? (
                        <>
                          <TableCell component="th" scope="row">
                            <TextField
                              name="name"
                              value={customer.name}
                              onChange={(e) => handleCustomerChange(e, customer._id)}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              name="email"
                              value={customer.email}
                              onChange={(e) => handleCustomerChange(e, customer._id)}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              name="address"
                              value={customer.address}
                              onChange={(e) => handleCustomerChange(e, customer._id)}
                            />
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>{customer.name}</TableCell>
                          <TableCell align="right">{customer.email}</TableCell>
                          <TableCell align="right">{customer.address}</TableCell>
                        </>
                      )}
                      <TableCell align="right">
                        {editableCustomerId === customer._id ? (
                          <>
                            <Button 
                              variant="contained" 
                              color="primary" 
                              onClick={() => handleCustomerUpdate(customer._id, customer)}
                            >
                              Update
                            </Button>
                            <Button 
                              variant="contained" 
                              onClick={handleCustomerCancel}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <Button 
                            variant="contained" 
                            onClick={() => handleCustomerEdit(customer._id)}
                          >
                            Edit
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              count={Math.ceil(filteredCustomers.length / rowsPerPage)}
              page={customerPage}
              onChange={handleCustomerChangePage}
              color="primary"
              style={{ padding: '20px 0' }}
            />
          </>
        )}

      </CardContent>
    </Card>
  </div>
);

}

export default AdminAccount;
