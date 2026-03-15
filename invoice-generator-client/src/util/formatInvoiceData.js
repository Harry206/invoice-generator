import { Workflow } from "lucide-react";

export const formatInvoiceData = (invoiceData) => {
  if (!invoiceData) return {};

  const {
    title = "",
    company,
    invoice,
    account,
    billing,
    shipping,
    tax = 0,
    notes = "",
    items = [],
    logo = "",
  } = invoiceData;

  // Safe objects (handle null from DB)
  const safeCompany = company || {};
  const safeInvoice = invoice || {};
  const safeAccount = account || {};
  const safeBilling = billing || {};
  const safeShipping = shipping || {};
  const safeItems = items || [];

  const currencySymbol = "₹";

  const subtotal = safeItems.reduce(
    (acc, item) =>
      acc + Number(item?.qty || 0) * Number(item?.amount || 0),
    0
  );

  const taxAmount = subtotal * (tax / 100);
  const total = subtotal + taxAmount;

  return {
    title,

    // Company
    companyName: safeCompany.name || "",
    companyAddress: safeCompany.address || "",
    companyPhone: safeCompany.phone || "",
    companyLogo: logo || "",

    // Invoice
    invoiceNumber: safeInvoice.number || "",
    invoiceDate: safeInvoice.date || "",
    paymentDate: safeInvoice.dueDate || "",

    // Account
    accountName: safeAccount.name || "",
    accountNumber: safeAccount.number || "",
    accountIfscCode: safeAccount.ifscCode || "",

    // Billing
    billingName: safeBilling.name || "",
    billingAddress: safeBilling.address || "",
    billingPhone: safeBilling.phone || "",

    // Shipping
    shippingName: safeShipping.name || "",
    shippingAddress: safeShipping.address || "",
    shippingPhone: safeShipping.phone || "",

    // Items
    items: safeItems,

    // Totals
    currencySymbol,
    tax,
    notes,
    subtotal,
    taxAmount,
    total,
  };
};
