import { useState, useEffect } from "react";
import { getJobs, deleteJob } from "../services/api"; 
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  console.log(jobs,"jobs")

  useEffect(() => {
    async function fetchJobs() {
      try {
        const token = localStorage.getItem("token");
        const response = await getJobs(token);
        setJobs(response.data);
      } catch (error) {
        setErrorMessage(error.response?.data?.message || "Error fetching jobs");
      }
    }

    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      setJobs(jobs.filter((job) => job._id !== id)); 
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to delete job");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection:"column",
        gap:"20px"
      }}
    >
      <Button onClick={() => navigate("/create-job")} variant="contained" color="success" style={{borderRadius:"20px"}}>Create New Job</Button>
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
          Job Listings
        </Typography>

        {errorMessage && (
          <Typography variant="body2" color="error" sx={{ marginBottom: "16px" }}>
            {errorMessage}
          </Typography>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs && jobs.map((job) => (
                <TableRow key={job._id}>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => navigate(`/edit-job/${job._id}`)}
                      sx={{ marginRight: "8px",borderRadius:"20px"} }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(job._id)}
                      style={{borderRadius:"20px"}}
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

export default JobList;
