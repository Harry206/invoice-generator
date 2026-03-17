import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

export const saveInvoice = async (payload) => {
  return axios.post(`${API_BASE}/api/invoices`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getInvoices = async () => {
  return axios.get(`${API_BASE}/api/invoices`);
};

export const deleteInvoice = async (id) => {
  return axios.delete(`${API_BASE}/api/invoices/${id}`);
};
