import "./Template2.css";

const Template2 = ({ data }) => {
  return (
    <div className="template2">

      {/* HEADER */}
      <div className="t2-header">
        <div className="t2-company">
          {data.companyLogo && (
            <img src={data.companyLogo} alt="logo" className="t2-logo" />
          )}
          <h2>{data.companyName}</h2>
          <p>{data.companyAddress}</p>
          <p>{data.companyPhone}</p>
        </div>

        <div className="t2-invoice">
          <h1>INVOICE</h1>
          <p><strong>#</strong> {data.invoiceNumber}</p>
          <p><strong>Date</strong> {data.invoiceDate}</p>
          <p><strong>Due</strong> {data.paymentDate}</p>
        </div>
      </div>

      {/* BILLING */}
      <div className="t2-billing">

        {data.shippingName && (
          <div className="t2-box">
            <h4>Ship To</h4>
            <p className="t2-name">{data.shippingName}</p>
            <p>{data.shippingAddress}</p>
            <p>{data.shippingPhone}</p>
          </div>
        )}

        <div className="t2-box">
          <h4>Bill To</h4>
          <p className="t2-name">{data.billingName}</p>
          <p>{data.billingAddress}</p>
          <p>{data.billingPhone}</p>
        </div>

      </div>

      {/* ITEMS TABLE */}
      <table className="t2-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th className="right">Amount</th>
          </tr>
        </thead>

        <tbody>
          {data.items?.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>₹{Number(item.amount).toFixed(2)}</td>
              <td className="right">
                ₹{(Number(item.qty) * Number(item.amount)).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTALS */}
      <div className="t2-totals">

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

        <div className="t2-grand">
          <span>Total</span>
          <span>₹{data.total?.toFixed(2)}</span>
        </div>

      </div>

      {/* BANK DETAILS */}
      {(data.accountName || data.accountNumber || data.accountIfscCode) && (
        <div className="t2-section">
          <h4>Bank Details</h4>
          {data.accountName && <p>Account Name: {data.accountName}</p>}
          {data.accountNumber && <p>Account Number: {data.accountNumber}</p>}
          {data.accountIfscCode && <p>IFSC: {data.accountIfscCode}</p>}
        </div>
      )}

      {/* NOTES */}
      {data.notes && (
        <div className="t2-section">
          <h4>Notes</h4>
          <p>{data.notes}</p>
        </div>
      )}

    </div>
  );
};

export default Template2;