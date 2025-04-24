import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { FaArrowLeft } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/signup`,
        {
          name,
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration failed");
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
        <Box display="flex" style={{alignItems:'center',gap:'20px'}}>
          <FaArrowLeft
            style={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
          <Typography variant="h5" gutterBottom style={{width:"100%" ,fontWeight:'600'}}>
            Register
          </Typography>
        </Box>
        <form onSubmit={handleRegister}>
          <TextField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            <Typography
              variant="body2"
              color="error"
              sx={{
                marginBottom: "16px",
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                },
              }}
            >
              {errorMessage}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="secondary" fullWidth style={{borderRadius:'20px'}}>
            Register
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
