import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import BaseAuthHeader from '../../authHeader';

const SiteHeader = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          MERN Stack
        </Typography>
        <Button color="inherit">
          <Link to="/movies" style={{ textDecoration: 'none', color: 'white' }}>
            Movies
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/movies/tmdb/popular" style={{ textDecoration: 'none', color: 'white' }}>
            Popular People
          </Link>
        </Button>
        <Box sx={{ marginLeft: 'auto' }}>
          <BaseAuthHeader />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default SiteHeader;
