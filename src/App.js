import React from "react";

import { Routes, Route } from "react-router-dom"; // Updated import

import ProjectsList from "./Pages/ProjectList";
import EditProject from "./Pages/EditProject";
import ProjectForm from "./Pages/ProjectForm";
import CustomerList from "./Pages/CustomerList";
import CustomerForm from "./Pages/CustomerForm";
import { BrowserRouter as Router, Navigate } from "react-router-dom";
import Navbar from "./Pages/Navbar";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="py-4">
          <Routes>
            {/* Project Routes */}
            <Route path="/" element={<ProjectsList />} />
            <Route path="/projects/:id" element={<EditProject />} />
            <Route path="/projects/create" element={<ProjectForm />} />
            <Route path="/projects/edit/:id" element={<ProjectForm />} />

            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/create" element={<CustomerForm />} />
            <Route path="/customers/edit/:id" element={<CustomerForm />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
