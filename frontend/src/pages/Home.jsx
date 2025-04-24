import { Button, Box, Typography, Modal } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../services/api";
import { RxCross2 } from "react-icons/rx";

import { Divider } from "@mui/material";

const style = {
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
  const [openCategory, setOpenCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedJob, setSelectedJob] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedJob(null);
  };

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

  const categories = [
    "Sales & Marketing",
    "Creative",
    "Human Resource",
    "Administration",
    "Digital Marketing",
    "Development",
    "Engineering",
  ];

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <div className="container px-48 mb-10 mt-10">
      <div className="flex flex-row gap-4 items-center my-6 justify-between ">
        <Button
          variant="contained"
          color="secondary"
          style={{ borderRadius: "20px" }}
          onClick={() => navigate("/jobs")}
        >
          Go to Jobs Page
        </Button>
        <Button
        variant="contained"
        color="danger"
        style={{
          borderRadius: "20px",
          float: "right",
          background: "gray",
          color: "white",
        }}
        onClick={handleLogout}
      >
        Logout
      </Button>
      </div>
      </div>
      <div className="container px-48 mb-10 mt-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">
            BROWSE OPEN POSITIONS BY CATEGORY
          </h1>
          <p className="text-lg text-gray-500">
            We are always on the lookout for talented people
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {categories.map((category, index) => {
            const filteredJobs = jobs.filter(
              (job) => job.category === category
            );

            return (
              <div key={index} className="border border-gray-300 rounded-lg">
                <div
                  className="flex justify-between items-center p-4 cursor-pointer bg-slate-300"
                  onClick={() => toggleCategory(index)}
                >
                  <h2 className="text-lg font-semibold">{category}</h2>
                  <span className="text-2xl">
                    {openCategory === index ? "-" : "+"}
                  </span>
                </div>

                {openCategory === index && (
                  <Box
                    className=" bg-slate-300"
                    sx={{
                      px: 2,
                      pb: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      color: "black",
                    }}
                  >
                    {filteredJobs.length > 0 ? (
                      filteredJobs.map((job, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            border: "1px solid black",
                            borderRadius: "8px",
                            padding: "12px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            background: "white",
                          }}
                        >
                          <Typography variant="h6">{job.title}</Typography>
                          <Box>
                            <Button
                              variant="contained"
                              color="secondary"
                              style={{ borderRadius: "20px" }}
                              onClick={() => handleOpen(job)}
                            >
                              Apply
                            </Button>
                          </Box>
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
      {/* Apply Modal */}
      {/* <div> */}

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography
              variant="h6"
              gutterBottom
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Digital Marketing Specialist (Tech Industry Only)
              <Box
                onClick={() => handleClose()}
                style={{
                  background: "#b0edb0",
                  borderRadius: "50%",
                  height: "30px",
                  width: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                {" "}
                <RxCross2 />
              </Box>
            </Typography>

            <Typography variant="h5" gutterBottom>
              Overview:
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Clearly understand buyers’ behavior patterns (Google Analytics),
              Sales Funnel, and able to drive qualified leads. Write copy ads
              for campaigns, and email marketing, and implement automation
              across all sales funnels. Must be able to lead a small team of
              different key players like graphics designers, telemarketing, and
              SEO executive. Provide analytical reporting of campaigns to
              stakeholders.
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h5" gutterBottom>
              Requirements:
            </Typography>
            <ul>
              <li>Bachelor’s degree or equivalent</li>
              <li>
                Minimum 2 years of experience as a Digital Marketing Specialist
                in the Tech Industry
              </li>
              <li>
                Fluency in Microsoft Office suite (Outlook, Excel, Word,
                PowerPoint)
              </li>
              <li>Experience with SEM, SMM, Email Marketing, Copywriting</li>
              <li>Strong written, verbal, and collaboration skills</li>
            </ul>

            <Typography variant="body2" sx={{ mt: 2 }}>
              <strong>Location:</strong> 4th Floor, House-149, Lane-1, Baridhara
              DOHS, Dhaka-1206
              <br />
              <strong>Salary:</strong> Negotiable
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body2">
              <strong>Type:</strong> Full Time
              <br />
              <strong>Location:</strong> All_Jobs
              <br />
              <strong>Level:</strong> Mid-Level
              <br />
              <strong>Shift:</strong> Day
            </Typography>

            <Box textAlign="center" mt={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleClose()}
              >
                APPLY NOW
              </Button>
            </Box>
          </Box>
        </Modal>
      {/* </div> */}
      
    </div>
  );
};

export default Home;
