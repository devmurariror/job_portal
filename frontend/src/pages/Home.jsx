import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  Modal,
  Divider,
} from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../services/api";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const navigate = useNavigate();
  const [expandedCategoryIndex, setExpandedCategoryIndex] = useState(null);
  const [jobListings, setJobListings] = useState([]);
  const [jobFetchError, setJobFetchError] = useState("");
  const [activeJob, setActiveJob] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openJobModal = (job) => {
    setActiveJob(job);
    setModalVisible(true);
  };

  const closeJobModal = () => {
    setModalVisible(false);
    setActiveJob(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    async function fetchJobListings() {
      try {
        const token = localStorage.getItem("token");
        const response = await getJobs(token);
        setJobListings(response.data);
      } catch (error) {
        setJobFetchError(error.response?.data?.message || "Unable to load jobs.");
      }
    }
    fetchJobListings();
  }, []);

  const jobCategories = [
    "Sales & Marketing",
    "Creative",
    "Human Resource",
    "Administration",
    "Digital Marketing",
    "Development",
    "Engineering",
  ];

  const toggleCategoryVisibility = (index) => {
    setExpandedCategoryIndex(expandedCategoryIndex === index ? null : index);
  };

  return (
    <div>
      <div className="container px-48 my-10">
        <div className="flex flex-row gap-4 items-center justify-between">
          <Button
            variant="contained"
            style={{ borderRadius: "20px", backgroundColor: "#1e88e5" }}
            onClick={() => navigate("/jobs")}
          >
            Explore Jobs
          </Button>
          <Button
            variant="contained"
            style={{ borderRadius: "20px", backgroundColor: "#616161", color: "#fff" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="container px-48 mb-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">EXPLORE EXCITING CAREER OPPORTUNITIES</h1>
          <p className="text-lg text-gray-600">We're always looking for talented individuals to join our team.</p>
        </div>

        <div className="mt-10 space-y-4">
          {jobCategories.map((category, index) => {
            const jobsUnderCategory = jobListings.filter((job) => job.category === category);

            return (
              <div key={index} className="border border-gray-300 rounded-lg">
                <div
                  className="flex justify-between items-center p-4 cursor-pointer bg-gray-200"
                  onClick={() => toggleCategoryVisibility(index)}
                >
                  <h2 className="text-lg font-semibold">{category}</h2>
                  <span className="text-2xl">{expandedCategoryIndex === index ? "-" : "+"}</span>
                </div>

                {expandedCategoryIndex === index && (
                  <Box
                    className="bg-gray-100"
                    sx={{
                      px: 2,
                      pb: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      color: "black",
                      padding:"12px"
                    }}
                  >
                    {jobsUnderCategory.length > 0 ? (
                      jobsUnderCategory.map((job, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "12px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            background: "#fff",
                          }}
                        >
                          <Typography variant="h6">{job.title}</Typography>
                          <Button
                            variant="contained"
                            style={{
                              borderRadius: "20px",
                              backgroundColor: "#0a5bc5de",
                              color: "#fff",
                              boxShadow:"0px 0px 4px rgba(0,0,0,.9)",
                              padding:"2px"
                            }}
                            onClick={() => openJobModal(job)}
                          >
                            Apply
                          </Button>
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body2">
                        No jobs available for this category.
                      </Typography>
                    )}
                  </Box>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Job Detail Modal */}
      <Modal open={modalVisible} onClose={closeJobModal}>
        <Box sx={modalStyle}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {activeJob?.title || "Job Title"}
            <Box
              onClick={closeJobModal}
              sx={{
                background: "#ffcdd2",
                borderRadius: "50%",
                height: "30px",
                width: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <RxCross2 />
            </Box>
          </Typography>

          {/* Display Job Description */}
          <Typography variant="body1" paragraph>
            {activeJob?.description || "No description available."}
          </Typography>

          <Box textAlign="center" mt={3}>
            <Button variant="contained" color="primary" onClick={closeJobModal}>
              APPLY NOW
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
