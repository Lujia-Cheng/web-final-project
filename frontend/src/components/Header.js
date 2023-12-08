import React from 'react';
import {AppBar, Grid, Toolbar} from "@mui/material";
import SearchBar from './SearchBar';
import Logo from './Logo';
import NavBarLinks from './NavBarLinks';
import ActionButtons from "./ActionButtons";

function Header() {
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Logo/>
          </Grid>
          <Grid item xs>
            <SearchBar/>
          </Grid>
          <Grid item>
            <ActionButtons/>
          </Grid>
        </Grid>
      </Toolbar>
      <NavBarLinks/>
    </AppBar>
  );
}

export default Header;
