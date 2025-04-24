import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJob, createJob, editJob } from "../services/api";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

const categories = [
  "Sales & Marketing",
  "Creative",
  "Human Resource",
  "Administration",
  "Digital Marketing",
  "Development",
  "Engineering",
];

const JobForm = ({ isEdit }) => {
  const { id } = useParams();
  const [job, setJob] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    category: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && id) {
      async function fetchJob() {
        try {
          const response = await getJob(id);
          setJob(response);
        } catch (error) {
          setErrorMessage(
            error.response?.data?.message || "Error fetching job details"
          );
        }
      }
      fetchJob();
    }
  }, [isEdit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await editJob(id, job);
      } else {
        await createJob(job);
      }
      navigate("/jobs");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error occurred");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      {errorMessage && (
        <Typography variant="body1" color="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Typography>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <TextField
          label="Job Title"
          variant="outlined"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
          required
          fullWidth
        />
        <TextField
          label="Company"
          variant="outlined"
          value={job.company}
          onChange={(e) => setJob({ ...job, company: e.target.value })}
          required
          fullWidth
        />
        <TextField
          label="Location"
          variant="outlined"
          value={job.location}
          onChange={(e) => setJob({ ...job, location: e.target.value })}
          required
          fullWidth
        />

        <FormControl fullWidth required>
          <InputLabel>Category</InputLabel>
          <Select
            value={job.category}
            onChange={(e) => setJob({ ...job, category: e.target.value })}
            label="Category"
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Job Description"
          variant="outlined"
          multiline
          rows={4}
          value={job.description}
          onChange={(e) => setJob({ ...job, description: e.target.value })}
          fullWidth
        />

        <Button type="submit" variant="contained" color="secondary" fullWidth style={{borderRadius:"20px"}}>
          {isEdit ? "Edit Job" : "Create Job"}
        </Button>
      </form>
    </Box>
  );
};

export default JobForm;
