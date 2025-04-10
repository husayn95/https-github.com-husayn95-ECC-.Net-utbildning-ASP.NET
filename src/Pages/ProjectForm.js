import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { projectService, customerService } from "./api";

function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    projectManager: "",
    service: "",
    totalPrice: 0,
    status: 0,
    customerId: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersData = await customerService.getAll();
        setCustomers(customersData);

        if (isEditing) {
          const projectData = await projectService.getById(id);
          setFormData({
            name: projectData.name,
            startDate: new Date(projectData.startDate)
              .toISOString()
              .split("T")[0],
            endDate: new Date(projectData.endDate).toISOString().split("T")[0],
            projectManager: projectData.projectManager,
            service: projectData.service,
            totalPrice: projectData.totalPrice,
            status: projectData.status,
            customerId: projectData.customerId,
          });
        }
      } catch (error) {
        console.error("Error loading form data:", error);
        setError("Could not load required data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "customerId" || name === "status" || name === "totalPrice"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (isEditing) {
        await projectService.update(id, formData);
      } else {
        await projectService.create(formData);
      }
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(
        "Failed to save project. Please check your input and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border"></div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h3>{isEditing ? "Edit Project" : "Create New Project"}</h3>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Project Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="customerId" className="form-label">
                    Customer
                  </label>
                  <select
                    className="form-select"
                    id="customerId"
                    name="customerId"
                    value={formData.customerId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a customer</option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="startDate" className="form-label">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="endDate" className="form-label">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="projectManager" className="form-label">
                    Project Manager
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="projectManager"
                    name="projectManager"
                    value={formData.projectManager}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="0">Not Started</option>
                    <option value="1">In Progress</option>
                    <option value="2">Completed</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="service" className="form-label">
                    Service
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="totalPrice" className="form-label">
                    Total Price
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      className="form-control"
                      id="totalPrice"
                      name="totalPrice"
                      value={formData.totalPrice}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Saving...
                  </>
                ) : (
                  "Save Project"
                )}
              </button>
              <Link to="/" className="btn btn-secondary">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;
