import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import { Typography, Button } from '@mui/material';

const BaseAuthHeader = (props) => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  return context.isAuthenticated ? (
    <Typography variant="body2">
      {" "}
      <Button size="small" variant="contained" color="secondary" onClick={() => context.signout()}>
        Sign out
      </Button>
    </Typography>
  ) : (
    <Typography variant="body2">
      {" "}
      <Button size="small" variant="contained" color="secondary" onClick={() => navigate('/login')}>
        Login
      </Button>
    </Typography>
  );
};

export default BaseAuthHeader;
