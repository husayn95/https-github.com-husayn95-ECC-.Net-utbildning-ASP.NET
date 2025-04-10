import axios from "axios";

const API_URL = "http://localhost:5206/api/customers"; // Change to correct backend port

export const customerService = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/customers`);
    return response.data;
  },
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/customers/${id}`);
    return response.data;
  },
  create: async (customer) => {
    const response = await axios.post(`${API_URL}/customers`, customer);
    return response.data;
  },
  update: async (id, customer) => {
    const response = await axios.put(`${API_URL}/customers/${id}`, customer);
    return response.data;
  },
  delete: async (id) => {
    await axios.delete(`${API_URL}/customers/${id}`);
    return true;
  },
};

export const projectService = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
  },
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/projects/${id}`);
    return response.data;
  },
  create: async (project) => {
    const response = await axios.post(`${API_URL}/projects`, project);
    return response.data;
  },
  update: async (id, project) => {
    const response = await axios.put(`${API_URL}/projects/${id}`, project);
    return response.data;
  },
  delete: async (id) => {
    await axios.delete(`${API_URL}/projects/${id}`);
    return true;
  },
};
