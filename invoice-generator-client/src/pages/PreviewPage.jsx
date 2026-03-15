import { useContext, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../context/AppContext.jsx";
import InvoicePreview from "../components/InvoicePreview.jsx";
import { saveInvoice, deleteInvoice } from "../service/invoiceService.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PreviewPage = () => {
  const previewRef = useRef();
  const location = useLocation();
  const invoiceFromDashboard = location.state?.invoice;

  const { selectedTemplate, setSelectedTemplate, invoiceData, baseURL } =
    useContext(AppContext);

  const finalInvoiceData = invoiceFromDashboard || invoiceData;

  const templates = [
    { id: "modern", name: "Modern Blue" },
    { id: "minimal", name: "Minimal White" },
    { id: "dark", name: "Dark Mode" },
    { id: "classic", name: "Classic Gray" },
  ];

  // console.log("Invoice Data in Preview:", invoiceData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveAndExit = async () => {
    try {
      setLoading(true);

      const canvas = await html2canvas(previewRef.current);
      const thumbnail = canvas.toDataURL("image/png");

      const payload = {
        id: invoiceData.id ?? null,
        title: invoiceData.title ?? "",

        company: invoiceData.company ?? { name: "", address: "", phone: "" },
        billing: invoiceData.billing ?? { name: "", address: "", phone: "" },
        shipping: invoiceData.shipping ?? { name: "", address: "", phone: "" },

        invoice: invoiceData.invoice ?? { number: "", date: "", dueDate: "" },

        items: (invoiceData.items ?? []).map((item) => ({
          name: item.name ?? "",
          description: item.description ?? "",
          qty: item.qty ?? 0,
          amount: item.amount ?? 0,
        })),

        notes: invoiceData.notes ?? "",
        logo: invoiceData.logo ?? "",
        tax: invoiceData.tax ?? 0,
        template: selectedTemplate ?? "",

        thumbnailUrl: thumbnail, // ✅ THIS is the fix
      };

      const response = await saveInvoice(baseURL, payload);

      if (response.status === 200) {
        if (payload.id) {
          toast.success("Invoice updated successfully!");
        } else {
          toast.success("Invoice saved successfully!");
        }

        navigate("/dashboard");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error saving invoice:", error);
      toast.error(error.message || "Failed to save invoice.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const element = previewRef.current;

      const canvas = await html2canvas(element, {
        scale: 1.5,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 5, 5, imgWidth - 10, imgHeight);

      pdf.save("invoice.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handleSendEmail = async () => {
    try {
      const element = previewRef.current;

      const canvas = await html2canvas(element, { scale: 1.5 });

      const imageData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight);

      const pdfBlob = pdf.output("blob");

      const formData = new FormData();
      formData.append("file", pdfBlob, "invoice.pdf");

      const email = prompt("Enter client email:");

      formData.append("email", email);

      const response = await fetch(`${baseURL}/api/invoices/send-email`, {
        method: "POST",
        body: formData,
      });

      const message = await response.text();

      alert(message);
    } catch (error) {
      console.error(error);
      alert("Email simulation failed.");
    }
  };

  const handleDeleteInvoice = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this invoice?",
    );

    if (!confirmDelete) return;

    try {
      await deleteInvoice(baseURL, invoiceData.id);

      toast.success("Invoice deleted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete invoice.");
    }
  };

  // console.log("Invoice Data:", invoiceData);
  // console.log("Selected Template:", selectedTemplate);
  if (!finalInvoiceData) {
    return (
      <div className="container text-center mt-5">
        <h4>No invoice data found</h4>
        <p>Please create an invoice first.</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }
  return (
    <div className="previewpage container-fluid d-flex flex-column p-3">
      {/* action buttons */}
      <div className="d-flex flex-column align-items-center mb-4 gap-3">
        {/* list of templates */}
        <div className="d-flex gap-2 flex-wrap justify-content-center">
          {templates.map((template) => (
            <button
              key={template.id}
              style={{ minWidth: "100px", height: "38px" }}
              className={`btn rounded-pill ${
                selectedTemplate === template.id
                  ? "btn-primary"
                  : "btn-outline-secondary"
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              {template.name}
            </button>
          ))}
        </div>

        {/* list of action buttons */}
        <div className="d-flex flex-wrap justify-content-center gap-2">
          <button
            className="btn btn-primary d-flex align-items-center justify-content-center"
            onClick={handleSaveAndExit}
            disabled={loading}
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm me-2"
                size={18}
              />
            )}
            {loading
              ? "Saving..."
              : location.state?.editMode
                ? "Update Invoice"
                : "Save & Exit"}
          </button>

          <button className="btn btn-danger" onClick={handleDeleteInvoice}>
            Delete Invoice
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>

          <button className="btn btn-info" onClick={handleSendEmail}>
            Send Email
          </button>

          <button
            className="btn btn-success d-flex align-items-center justify-content-center"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* display the invoice preview */}
      <div className="overflow-auto d-flex justify-content-center align-items-start bg-light py-3">
        <div ref={previewRef} className="invoice-preview">
          <InvoicePreview
            invoiceData={finalInvoiceData}
            template={selectedTemplate}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
