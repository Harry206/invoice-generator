import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { getInvoices, deleteInvoice } from "../service/invoiceService";

const Dashboard = () => {
  const { baseURL } = useContext(AppContext);
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  const fetchInvoices = async () => {
    try {
      const res = await getInvoices();
      setInvoices(res.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteInvoice(id);
      setInvoices(invoices.filter((inv) => inv.id !== id));
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div className="container mt-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Invoices</h2>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/generate")}
        >
          + Create Invoice
        </button>
      </div>

      {invoices.length === 0 ? (
        <p>No invoices found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>Preview</th>
                <th>ID</th>
                <th>Title</th>
                <th>Notes</th>
                <th>Tax</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  {/* PREVIEW IMAGE */}
                  <td>
                    {inv.thumbnailUrl ? (
                      <img
                        src={inv.thumbnailUrl}
                        alt="invoice"
                        style={{
                          width: "70px",
                          height: "90px",
                          objectFit: "cover",
                          borderRadius: "6px",
                          display: "block",
                          margin: "auto",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          navigate("/preview", { state: { invoice: inv } })
                        }
                      />
                    ) : (
                      "No Preview"
                    )}
                  </td>

                  <td>{inv.id}</td>

                  <td>{inv.title}</td>

                  <td>{inv.notes}</td>

                  <td>{inv.tax}</td>

                  {/* ACTION BUTTONS */}
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          navigate("/preview", { state: { invoice: inv } })
                        }
                      >
                        Preview
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(inv.id)}
                      >
                        Delete
                      </button>

                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() =>
                          navigate("/generate", { state: { invoice: inv } })
                        }
                      >
                        Edit
                      </button>
                      
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
