import React, {useEffect, useState} from 'react';
import {Autocomplete} from '@mui/material';
import TextField from "@mui/material/TextField";

function SearchBar() {
  const [products, setProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.map(e => e.name));
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

  return (
    <Autocomplete sx={{ml: 1, flex: 1}}
                  autoHighlight
                  disablePortal
                  options={products}
                  renderInput={(params) => <TextField {...params} label="Search"/>}
    />


  );
}

export default SearchBar;
