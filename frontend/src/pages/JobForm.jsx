// 

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
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJob, createJob, editJob } from "../services/api";
import { FaArrowLeft } from "react-icons/fa";

const jobCategories = [
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
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    category: "",
  });

  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (isEdit && id) {
      async function loadJobDetails() {
        try {
          const res = await getJob(id);
          setFormData(res);
        } catch (err) {
          setFormError(err.response?.data?.message || "Failed to fetch job info.");
        }
      }
      loadJobDetails();
    }
  }, [isEdit, id]);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await editJob(id, formData);
      } else {
        await createJob(formData);
      }
      navigate("/jobs");
    } catch (err) {
      setFormError(err.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      {formError && (
        <Typography variant="body1" color="error" sx={{ mb: 2 }}>
          {formError}
        </Typography>
      )}
      <FaArrowLeft style={{ cursor: "pointer" }} onClick={() => navigate(-1)} />
      <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: 16, marginTop:"10px" }}>
        <TextField
          label="Job Title"
          variant="outlined"
          value={formData.title}
          onChange={handleChange("title")}
          required
          fullWidth
        />
        <TextField
          label="Company"
          variant="outlined"
          value={formData.company}
          onChange={handleChange("company")}
          required
          fullWidth
        />
        <TextField
          label="Location"
          variant="outlined"
          value={formData.location}
          onChange={handleChange("location")}
          required
          fullWidth
        />

        <FormControl fullWidth required>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={handleChange("category")}
            label="Category"
          >
            {jobCategories.map((cat) => (
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
          value={formData.description}
          onChange={handleChange("description")}
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            borderRadius: "20px",
            backgroundColor: "#3498DB", // custom green shade
            "&:hover": {
              backgroundColor: "#3498DB",
            },
          }}
        >
          {isEdit ? "Update Job" : "Post Job"}
        </Button>
      </form>
    </Box>
  );
};

export default JobForm;
