import { useContext, useEffect } from "react";
import uploadIcon from "../assets/upload.png";
import { Trash2 } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const InvoiceForm = () => {
  const { invoiceData, setInvoiceData } = useContext(AppContext);

  const data = {
    company: {},
    billing: {},
    shipping: {},
    account: {},
    invoice: {},
    items: [],
    ...invoiceData,
  };

  const navigate = useNavigate();

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { name: "", qty: "", amount: "", description: "", total: 0 },
      ],
    }));
  };

  const deleteItem = (index) => {
    const items = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData((prev) => ({
      ...prev,
      items,
    }));
  };

  const itemChange = (section, field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSameAsBilling = () => {
    setInvoiceData((prev) => ({
      ...prev,
      shipping: { ...prev.billing },
    }));
  };

  const handleItemChange = (index, field, value) => {
    const items = [...invoiceData.items];
    items[index][field] =
      field === "qty" || field === "amount" ? Number(value) : value;

    if (field === "qty" || field === "amount") {
      items[index].total =
        (items[index].qty || 0) * (items[index].amount || 0);
    }
    setInvoiceData((prev) => ({
      ...prev,
      items,
    }));
  };

  const calculateTotals = () => {
    const subtotal = invoiceData.items.reduce(
      (sum, item) => sum + (item.total || 0),
      0,
    );
    const taxRate = Number(invoiceData.tax || 0);
    const taxAmount = (subtotal * taxRate) / 100;
    const grandTotal = subtotal + taxAmount;

    return { subtotal, taxAmount, grandTotal };
  };

  const { subtotal, taxAmount, grandTotal } = calculateTotals();

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInvoiceData((prev) => ({
          ...prev,
          logo: reader.result,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!invoiceData.invoice.number) {
      const randomNumber = `INV-${Math.floor(1000000 + Math.random() * 9000000)}`;
      setInvoiceData((prev) => ({
        ...prev,
        invoice: {
          ...prev.invoice,
          number: randomNumber,
        },
      }));
    }
  }, []);

  // const handleSubmit = () => {
  //     console.log("Invoice Data Submitted:", invoiceData);
  // }

  return (
    <div className="invoiceform container py-4">
      {/* company logo */}
      <div className="mb-4">
        <h5>Company Logo</h5>
        <div className="d-flex align-items-center gap-3">
          <label htmlFor="image" className="form-label">
            <img src={invoiceData.logo || uploadIcon} alt="upload" width={30} />
          </label>
          <input
            type="file"
            name="logo"
            id="image"
            hidden
            className="form-control"
            accept="image/*"
            onChange={handleLogoUpload}
          />
        </div>
      </div>
      {/* company information */}
      <div className="mb-4">
        <h5>Your Company</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Company Name"
              onChange={(e) => itemChange("company", "name", e.target.value)}
              value={invoiceData.company.name || ""}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Company Phone"
              onChange={(e) => itemChange("company", "phone", e.target.value)}
              value={invoiceData.company.phone}
            />
          </div>
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              placeholder="Company Address"
              onChange={(e) => itemChange("company", "address", e.target.value)}
              value={invoiceData.company.address}
            />
          </div>
        </div>
      </div>
      {/* bill to */}
      <div className="mb-4">
        <h5>Bill To</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={(e) => itemChange("billing", "name", e.target.value)}
              value={invoiceData.billing.name}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number"
              onChange={(e) => itemChange("billing", "phone", e.target.value)}
              value={invoiceData.billing.phone}
            />
          </div>
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              onChange={(e) => itemChange("billing", "address", e.target.value)}
              value={invoiceData.billing.address || ""}
            />
          </div>
        </div>
      </div>
      {/* ship to */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Ship To</h5>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="sameAsBilling"
              onChange={handleSameAsBilling}
            />
            <label htmlFor="sameAsBilling" className="form-check-label">
              {" "}
              Same as billing address
            </label>
          </div>
        </div>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={invoiceData.shipping.name}
              onChange={(e) => itemChange("shipping", "name", e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number"
              value={invoiceData.shipping.phone}
              onChange={(e) => itemChange("shipping", "phone", e.target.value)}
            />
          </div>
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              value={invoiceData.shipping.address}
              onChange={(e) =>
                itemChange("shipping", "address", e.target.value)
              }
            />
          </div>
        </div>
      </div>
      {/* invoice info */}
      <div className="mb-4">
        <h5>Invoice Information</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <label htmlFor="invoiceNumber" className="form-label">
              Invoice Number
            </label>
            <input
              type="text"
              disabled
              className="form-control"
              id="invoiceNumber"
              value={invoiceData.invoice.number}
              onChange={(e) => itemChange("invoice", "number", e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="invoiceDate" className="form-label">
              Invoice Date
            </label>
            <input
              type="date"
              className="form-control"
              id="invoiceDate"
              value={invoiceData.invoice.date}
              onChange={(e) => itemChange("invoice", "date", e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="invoiceDueDate" className="form-label">
              Invoice Due Date
            </label>
            <input
              type="date"
              className="form-control"
              id="invoiceDueDate"
              value={invoiceData.invoice.dueDate}
              onChange={(e) => itemChange("invoice", "dueDate", e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* item dets */}
      <div className="mb-4">
        <h5>Item Details</h5>

        {invoiceData.items.map((item, index) => (
          <div key={index} className="card p-3 mb-3">
            <div className="row g-3 mb-2">
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Item Name"
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(index, "name", e.target.value)
                  }
                />
              </div>

              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Quantity"
                  value={item.qty}
                  onChange={(e) =>
                    handleItemChange(index, "qty", e.target.value)
                  }
                />
              </div>

              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  value={item.amount}
                  onChange={(e) =>
                    handleItemChange(index, "amount", e.target.value)
                  }
                />
              </div>

              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Total"
                  value={item.total}
                  disabled
                />
              </div>
            </div>

            <div className="d-flex gap-2">
              <textarea
                className="form-control"
                placeholder="Description"
                value={item.description}
                onChange={(e) =>
                  handleItemChange(index, "description", e.target.value)
                }
              />

              {invoiceData.items.length > 1 && (
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => deleteItem(index)}
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          </div>
        ))}

        <button className="btn btn-primary" type="button" onClick={addItem}>
          Add Item
        </button>
      </div>
      {/* bank account details */}
      <div className="mb-4">
        <h5>Bank Account Details</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Account Name"
              value={invoiceData.account.name}
              onChange={(e) => itemChange("account", "name", e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Account Number"
              value={invoiceData.account.number}
              onChange={(e) => itemChange("account", "number", e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Branch/IFSC code"
              value={invoiceData.account.ifscCode}
              onChange={(e) =>
                itemChange("account", "ifscCode", e.target.value)
              }
            />
          </div>
        </div>
      </div>
      {/* totals*/}
      <div className="mb-4">
        <h5>Totals</h5>
        <div className="d-flex justify-content-end">
          <div className="w-100 w-mb-50">
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center my-2">
              <label htmlFor="taxInput" className="me-2">
                Tax Rate(%)
              </label>
              <input
                type="number"
                id="taxInput"
                className="form-control w-50 text-end"
                placeholder="2"
                value={invoiceData.tax}
                onChange={(e) =>
                  setInvoiceData((prev) => ({ ...prev, tax: e.target.value }))
                }
              />
            </div>
            <div className="d-flex justify-content-between">
              <span>Tax Amount</span>
              <span>₹{taxAmount.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold mt-2">
              <span>Grand Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      {/*  notes */}
      <div className="mb-4">
        <h5>Notes</h5>
        <div className="w-100">
          <textarea
            className="form-control"
            rows={3}
            value={invoiceData.notes}
            onChange={(e) =>
              setInvoiceData((prev) => ({
                ...prev,
                notes: e.target.value,
              }))
            }
          />
        </div>
      </div>
      {/* <button onClick={handleSubmit}>Submit</button> */}
      <div className="text-end mt-4">
        <button
          type="button"
          className="btn btn-success px-4"
          onClick={() => navigate("/preview")}
        >
          Generate Invoice
        </button>
      </div>
    </div>
  );
};

export default InvoiceForm;
