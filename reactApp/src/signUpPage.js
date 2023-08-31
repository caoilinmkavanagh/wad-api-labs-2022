import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import { TextField, Button, Typography, Container } from '@mui/material';

const SignUpPage = props => {
  const context = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);

  const register = () => {
    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    const validPassword = passwordRegEx.test(password);

    if (validPassword && password === passwordAgain) {
      context.register(userName, password);
      setRegistered(true);
    }
  };

  if (registered === true) {
    return <Navigate to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5">Sign Up</Typography>
      <Typography variant="subtitle1">
        You must register a username and password to log in.
      </Typography>

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="User Name"
        autoFocus
        value={userName}
        onChange={e => setUserName(e.target.value)}
      />

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Confirm Password"
        type="password"
        value={passwordAgain}
        onChange={e => setPasswordAgain(e.target.value)}
      />

      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={register}
      >
        Register
      </Button>
    </Container>
  );
};

export default SignUpPage;
