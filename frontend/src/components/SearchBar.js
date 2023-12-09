import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function SearchBar() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const fetchAllProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch products from server');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
      fetchAllProducts().then(r => console.log(r));
    }, []
  )
  const handleAutocompleteChange = (event, value) => {
    if (value && value._id) {
      navigate(`/product/${value._id}`);
    }
  };

   return (
    <Autocomplete
      sx={{ ml: 1, flex: 1 }}
      autoHighlight
      disablePortal
      options={products}
      getOptionLabel={(option) => option.name} // Assuming each product has a 'name' property
      onChange={handleAutocompleteChange}
      renderInput={(params) => <TextField {...params} label="Search" />}
    />
  );
}

export default SearchBar;
