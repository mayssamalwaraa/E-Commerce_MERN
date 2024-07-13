import { Box, Container, TextField, Typography, Button } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/baseURL";
import { useAuth } from "../context/Auth/authContect";

const LoginPage = () => {
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const submit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    //validate the form user data
    if (!email || !password) {
      return;
    }
    //create the API
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!response.ok) {
      return setError(
        "unable to add new user,try to user different credientials"
      );
    }
    const token = await response.json();
    if (!token) {
      setError("Incorrect token");
      return;
    }
    login(email, token);
    navigate("/");
  };
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h2">Login to your Account</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
            border: 1,
            borderColor: "#f5f5f5",
            p: 2,
          }}
        >
          <TextField inputRef={emailRef} label="Email" name="email" />
          <TextField
            inputRef={passwordRef}
            label="Password"
            name="password"
            type="password"
          />
          <Button onClick={submit} variant="contained">
            Login
          </Button>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};
export default LoginPage;
