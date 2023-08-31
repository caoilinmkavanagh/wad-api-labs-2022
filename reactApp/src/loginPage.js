import React, { useContext, useState } from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from './authContext';
import { TextField, Button, Typography, Container } from '@mui/material';

const LoginPage = props => {
  const context = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    context.authenticate(userName, password);
  };

  let location = useLocation();
  
  // Set 'from' to path where browser is redirected after a successful login - either / or the protected path user requested
  const { from } = location.state ? { from: location.state.from.pathname } : { from: "/movies" };

  if (context.isAuthenticated === true) {
    return <Navigate to={from} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5">Login</Typography>
      <Typography variant="subtitle1">
        You must log in to view the protected pages.
      </Typography>

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="User Name"
        autoFocus
        onChange={e => setUserName(e.target.value)}
      />
      
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        onChange={e => setPassword(e.target.value)}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={login}
      >
        Log in
      </Button>

      <Typography variant="body2">
        Not Registered? <Link to="/signup">Sign Up!</Link>
      </Typography>
    </Container>
  );
};

export default LoginPage;
