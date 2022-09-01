import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useState, useContext } from "react";
import authContext from "../Context/Auth/authContext";
import { Navigate } from "react-router-dom";

const SignUp = () => {
  const { registerUser, isAuth, token } = useContext(authContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
    terms: true,
  });

  const [alert, setAlert] = useState(null);

  const handleInputChange = (e) => {
    if (e.target.type === "checkbox") {
      return setFormData({
        ...formData,
        [e.target.name]: !formData[e.target.name],
      });
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPass } = formData;
    if (password !== confirmPass) {
      return setAlert({
        type: "error",
        msg: "Password & Confirm Password do not match",
      });
    }
    registerUser(name, email, password);
  };

  if (isAuth && token) {
    return <Navigate to="/user/dashboard" />;
  }
  return (
    <div>
      {alert && <Alert severity={alert.type}>{alert.msg}</Alert>}
      <Typography component="h1" variant="h5" align="center">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name="name"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              onChange={handleInputChange}
              value={formData.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleInputChange}
              value={formData.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirmPass"
              label="Confirm Password"
              type="password"
              id="confirmPass"
              autoComplete="new-password"
              onChange={handleInputChange}
              value={formData.confirmPass}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  value="allowExtraEmails"
                  color="primary"
                  checked={formData.terms}
                  onChange={handleInputChange}
                  name="terms"
                />
              }
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={!formData.terms}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/signin" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SignUp;
