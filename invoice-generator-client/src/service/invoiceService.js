import axios from "axios";

export const saveInvoice = async (baseURL, payload) => {
  return axios.post(`${baseURL}/api/invoices`, payload);
};

export const getInvoices = async (baseURL) => {
  return axios.get(`${baseURL}/api/invoices`);
};

export const deleteInvoice = async (baseURL, id) => {
  return axios.delete(`${baseURL}/api/invoices/${id}`);
};