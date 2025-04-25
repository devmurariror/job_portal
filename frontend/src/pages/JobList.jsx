//

import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getJobs, deleteJob } from "../services/api";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const JobListing = () => {
  const [jobList, setJobList] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchJobListings() {
      try {
        const token = localStorage.getItem("token");
        const response = await getJobs(token);
        setJobList(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching jobs.");
      }
    }

    fetchJobListings();
  }, []);

  const handleJobDeletion = async (id) => {
    try {
      await deleteJob(id);
      setJobList(jobList.filter((job) => job._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete job.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        minHeight: "100vh",
      }}
    >
      <Box sx={{
        display:"flex",
        gap:"20px",
        alignItems:"center"
      }}>
      <FaArrowLeft style={{ cursor: "pointer" }} onClick={() => navigate("/")} />
      <Button
        onClick={() => navigate("/create-job")}
        variant="contained"
        sx={{
          borderRadius: "20px",
          backgroundColor: "#3498db", // Light Blue
          "&:hover": {
            backgroundColor: "#2980b9", // Darker Blue
          },
        }}
      >
        Add New Job
      </Button>
      </Box>
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          width: "100%",
          maxWidth: "900px",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Available Job Listings
        </Typography>

        {error && (
          <Typography
            variant="body2"
            color="error"
            sx={{ marginBottom: "16px" }}
          >
            {error}
          </Typography>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Job Title</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobList.map((job) => (
                <TableRow key={job._id}>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/edit-job/${job._id}`)}
                      sx={{
                        marginRight: "8px",
                        borderRadius: "20px",
                        backgroundColor: "#f39c12", // Light Orange
                        "&:hover": {
                          backgroundColor: "#e67e22", // Darker Orange
                        },
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleJobDeletion(job._id)}
                      sx={{
                        borderRadius: "20px",
                        backgroundColor: "#e74c3c", // Light Red
                        "&:hover": {
                          backgroundColor: "#c0392b", // Darker Red
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default JobListing;
