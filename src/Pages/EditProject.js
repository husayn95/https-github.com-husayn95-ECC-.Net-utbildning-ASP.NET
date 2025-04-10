import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Updated import

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Replacing useHistory with useNavigate
  const [project, setProject] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/projects/${id}`)
      .then((response) => setProject(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/projects/${id}`, project)
      .then(() => navigate("/")) // Use navigate to go back to the home page
      .catch((error) => console.log(error));
  };

  if (!project) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={project.name}
        onChange={handleChange}
      />
      <input
        type="date"
        name="startDate"
        value={project.startDate}
        onChange={handleChange}
      />
      <input
        type="date"
        name="endDate"
        value={project.endDate}
        onChange={handleChange}
      />
      <input
        type="text"
        name="status"
        value={project.status}
        onChange={handleChange}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default EditProject;
