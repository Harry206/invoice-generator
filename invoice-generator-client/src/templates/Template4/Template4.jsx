import "./Template4.css";

const Template4 = ({ data }) => {
  return (
    <div className="template4">
      {/* TOP SECTION */}
      <div className="t4-top">
        {/* LEFT */}
        <div className="t4-left">
          {data.companyLogo && (
            <img src={data.companyLogo} alt="logo" className="t4-logo" />
          )}

          <h2>{data.companyName}</h2>
          <p>{data.companyAddress}</p>
          <p>{data.companyPhone}</p>

          <div className="invoice-to">
            <h4>Invoice To:</h4>
            <p className="name">{data.billingName}</p>
            <p>{data.billingAddress}</p>
            <p>{data.billingPhone}</p>
          </div>

          <div className="due-box">Due Total: ₹{data.total?.toFixed(2)}</div>
        </div>

        {/* RIGHT PANEL */}
        <div className="t4-right">
          <h1>INVOICE</h1>

          <div className="meta">
            <p>
              <strong>Invoice no:</strong> {data.invoiceNumber}
            </p>
            <p>
              <strong>Invoice Date:</strong> {data.invoiceDate}
            </p>
            <p>
              <strong>Due:</strong> {data.paymentDate}
            </p>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <table className="t4-table">
        <thead>
          <tr>
            <th>Item Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {data.items?.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>₹{Number(item.amount).toFixed(2)}</td>
              <td>{item.qty}</td>
              <td>₹{(item.qty * item.amount).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTALS */}
      <div className="t4-bottom">
        <div className="totals">
          <div>
            <span>Subtotal</span>
            <span>₹{data.subtotal?.toFixed(2)}</span>
          </div>

          {data.tax > 0 && (
            <div>
              <span>Tax ({data.tax}%)</span>
              <span>₹{data.taxAmount?.toFixed(2)}</span>
            </div>
          )}

          <div className="grand">Grand ₹{data.total?.toFixed(2)}</div>
        </div>
      </div>
      
    </div>
  );
};

export default Template4;
