import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Link,
} from "@mui/material";
import { useMutation } from "react-query";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";

const loginApi = async ({ email, password }) => {
  const res = await fetch(
    "https://bullet-assignment-backend-1.onrender.com/api/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
};

const signupApi = async ({ username, email, password }) => {
  const res = await fetch(
    "https://bullet-assignment-backend-1.onrender.com/api/auth/register",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    }
  );
  if (!res.ok) throw new Error("Signup failed");
  const data = await res.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
};

function AuthForm({ login }) {
  const [type, setType] = useState("login"); // <-- Internal type state
  const [fields, setFields] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const loginMutation = useMutation(loginApi, {
    onSuccess: (data) => {
      if (data.token) {
        login(data.token);
        navigate("/list");
      }
    },
  });
  const signupMutation = useMutation(signupApi, {
    onSuccess: (data) => {
      if (data.token) {
        login(data.token);
        navigate("/list");
      }
    },
  });

  const handleChange = (e) => {
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "login") {
      loginMutation.mutate({ email: fields.email, password: fields.password });
    } else {
      signupMutation.mutate(fields);
    }
  };

  const handleSwitch = () => {
    setType(type === "login" ? "signup" : "login");
    setFields({ username: "", email: "", password: "" }); // Optionally reset fields
    loginMutation.reset(); // Clear login errors
    signupMutation.reset();
  };

  return (
    <Paper
      elevation={6}
      sx={{ width: 380, mx: "auto", p: 4, mt: 10, bgcolor: "#23293A" }}
    >
      <Stack alignItems="center" spacing={2}>
        <LockIcon
          fontSize="large"
          color="primary"
          sx={{ bgcolor: "#23293A", color: "#FFD700" }}
        />
        <Typography variant="h5" fontWeight={600} color="white">
          {type === "login" ? "Login" : "Sign Up"}
        </Typography>
      </Stack>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        {type === "signup" && (
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={fields.username}
            onChange={handleChange}
            required
            sx={{
              mb: 2,
              input: { color: "white" },
              label: { color: "#bdbdbd" },
            }}
          />
        )}
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={fields.email}
          onChange={handleChange}
          required
          sx={{ mb: 2, input: { color: "white" }, label: { color: "#bdbdbd" } }}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={fields.password}
          onChange={handleChange}
          required
          sx={{ mb: 2, input: { color: "white" }, label: { color: "#bdbdbd" } }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            py: 1.5,
            fontWeight: 700,
            bgcolor: "#FFD700",
            color: "#23293A",
            mt: 2,
          }}
          disabled={loginMutation.isLoading || signupMutation.isLoading}
        >
          {type === "login" ? "Sign In" : "Sign Up"}
        </Button>
        <Box mt={3} textAlign="center">
          <Link
            component="button"
            type="button"
            variant="body2"
            color="inherit"
            onClick={handleSwitch}
            sx={{ color: "#FFD700" }}
          >
            {type === "login"
              ? "Don't have an account? Sign Up"
              : "Already have an account? Log In"}
          </Link>
        </Box>
        {(loginMutation.error || signupMutation.error) && (
          <Typography color="error" mt={2}>
            {loginMutation.error?.message || signupMutation.error?.message}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

export default AuthForm;
