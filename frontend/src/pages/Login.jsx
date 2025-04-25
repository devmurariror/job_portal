import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/signin`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      navigate("/");

    } catch (error) {
      const status = error.response?.status;

      if (status === 404) {
        alert("User not found. Please sign up.");
        navigate("/register");
      } else {
        setErrorMessage(error.response?.data?.message || "Login failed");
        alert(error.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
           borderRadius:'20px',
          boxShadow:'0 0 10px black'
        }}
      >
        <Typography variant="h5" gutterBottom style={{fontWeight:'600'}}>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            sx={{
              marginBottom: "16px",
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            sx={{
              marginBottom: "16px",
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
              },
            }}
          />
          {errorMessage && (
            <Typography variant="body2" color="error"  sx={{
              marginBottom: "16px",
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
              },
            }}>
              {errorMessage}
            </Typography>
          )}
          <Box style={{display:'flex',gap:'10px'}}>
          <Button
            type="submit"
            variant="contained"
            
            sx={{
              backgroundColor: "#1e90ff",
              "&:hover": {
                backgroundColor: "#4682b4",
              },
              borderRadius: "20px",
              // flex: 1,
            }}
            fullWidth

            
          >
            Login
          </Button>
          <Button
            type="submit"
            variant="outlined"
            sx={{
              borderColor: "#1e90ff",
              "&:hover": {
                borderColor: "#4682b4",
              },
              borderRadius: "20px",
              // flex: 1,
            }}
            fullWidth
          >
            <Link to="/register">Register now</Link>
          </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
