import { createContext, useState } from "react";

export const AppContext = createContext();

export const initialInvoiceData = {
  title: "New Invoice",
  billing: { name: "", phone: "", address: "" },
  shipping: { name: "", phone: "", address: "" },
  invoice: { number: "", date: "", dueDate: "" },
  account: { name: "", number: "", ifscCode: "" },
  company: { name: "", phone: "", address: "" },
  tax: 0,
  notes: "",
  items: [{ name: "", quantity: "", amount: "", description: "", total: 0 }],
  logo: "",
};

export const AppContextProvider = ({ children }) => {
  const [invoiceTitle, setInvoiceTitle] = useState("New Invoice");
  const [invoiceData, setInvoiceData] = useState({
    title: "Invoice",

    company: {
      name: "",
      address: "",
      phone: "",
    },

    billing: {
      name: "",
      address: "",
      phone: "",
    },

    shipping: {
      name: "",
      address: "",
      phone: "",
    },

    invoice: {
      number: "",
      date: "",
      dueDate: "",
    },

    account: {
      name: "",
      number: "",
      ifscCode: "",
    },

    items: [
      {
        name: "",
        qty: "",
        amount: "",
        description: "",
      },
    ],

    tax: 0,
    notes: "",
    logo: "",
    template: "",
  });
  const [selectedTemplate, setSelectedTemplate] = useState("modern");

  const baseURL = "http://localhost:8080";

  const contextValue = {
    invoiceTitle,
    setInvoiceTitle,
    invoiceData,
    setInvoiceData,
    selectedTemplate,
    setSelectedTemplate,
    initialInvoiceData,
    baseURL,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
