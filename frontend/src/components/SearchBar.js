import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {Box, InputBase, IconButton} from '@mui/material';

function SearchBar() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'background.paper',
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <IconButton sx={{p: '10px'}} aria-label="search">
        <SearchIcon/>
      </IconButton>
      <InputBase
        sx={{ml: 1, flex: 1}}
        placeholder="Search…"
        inputProps={{'aria-label': 'search'}}
      />
    </Box>
  );
}

export default SearchBar;
