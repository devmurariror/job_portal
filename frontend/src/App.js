import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import JobList from "./pages/JobList";
import JobForm from "./pages/JobForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/jobs"
          element={
            <PrivateRoute>
              <JobList />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-job"
          element={
            <PrivateRoute>
              <JobForm isEdit={false} />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-job/:id"
          element={
            <PrivateRoute>
              <JobForm isEdit={true} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
