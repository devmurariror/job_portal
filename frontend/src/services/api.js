import axios from "axios";

// const process.env.REACT_APP_API_BASE_URL = "http://localhost:5000/api"; // Replace with your backend API base URL

// Get job details by ID
export const getJob = async (id) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token:", token); 
    const url = `${process.env.REACT_APP_API_BASE_URL}/jobs/${id}`;
    console.log("Request URL:", url); 

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching job:", error.response?.data || error); 
    throw error; 
  }
};

// Fetch jobs
export const getJobs = async (token) => {
  return await axios.get(`${process.env.REACT_APP_API_BASE_URL}/jobs`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const createJob = async (jobData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/jobs`, jobData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Edit existing job
export const editJob = async (id, jobData) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/jobs/${id}`, jobData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete job
export const deleteJob = async (jobId, token) => {
  return await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/jobs/${jobId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};



