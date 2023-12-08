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
  Pagination } from '@mui/material';

const AdminAccount = () => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  // Pagination state
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

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

  return (
  <div>
    <h1>Admin Account</h1>
    <Card>
      <CardContent>
        <h2>Products</h2>
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
      </CardContent>
    </Card>
  </div>
);

}

export default AdminAccount;
