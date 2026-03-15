import "./Template1.css";

const Template1 = ({ data }) => {
  return (
    <div className="template1">

      {/* HEADER */}
      <div className="t1-header">

        <div className="header-left">
          <p>{data.companyPhone}</p>
          <p>{data.companyAddress}</p>
        </div>

        <div className="header-center">
          <h1>{data.companyName}</h1>
          <h2>Invoice</h2>
        </div>

        <div className="header-right">
          <p>{data.companyAddress}</p>
        </div>

      </div>

      {/* INFO SECTION */}
      <div className="t1-info">

        <div>
          <h3>Invoice To</h3>
          <p><strong>{data.billingName}</strong></p>
          <p>{data.billingAddress}</p>
          <p>{data.billingPhone}</p>
        </div>

        <div>
          <h3>Invoice Details</h3>
          <p>Invoice #: {data.invoiceNumber}</p>
          <p>Date: {data.invoiceDate}</p>
          <p>Due: {data.paymentDate}</p>
        </div>

      </div>

      {/* TABLE */}
      <table className="t1-table">

        <thead>
          <tr>
            <th>Item</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Unit Cost</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>

          {data.items?.map((item,index)=>(
            <tr key={index}>
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>₹{Number(item.amount).toFixed(2)}</td>
              <td>₹{(item.qty * item.amount).toFixed(2)}</td>
            </tr>
          ))}

          <tr className="subtotal">
            <td colSpan="4">SUBTOTAL</td>
            <td>₹{data.subtotal?.toFixed(2)}</td>
          </tr>

          {data.tax > 0 && (
            <tr className="tax">
              <td colSpan="4">TAX ({data.tax}%)</td>
              <td>₹{data.taxAmount?.toFixed(2)}</td>
            </tr>
          )}

          <tr className="total">
            <td colSpan="4">TOTAL AMOUNT DUE</td>
            <td>₹{data.total?.toFixed(2)}</td>
          </tr>

        </tbody>

      </table>

      {/* PAYMENT INFO */}
      {(data.accountName || data.accountNumber || data.accountIfscCode) && (
        <div className="t1-payment">

          <div>
            <h3>Payment Information</h3>
            {data.accountName && <p>Account Name: {data.accountName}</p>}
            {data.accountNumber && <p>Account Number: {data.accountNumber}</p>}
            {data.accountIfscCode && <p>IFSC Code: {data.accountIfscCode}</p>}
          </div>

        </div>
      )}

      {/* NOTES */}
      {data.notes && (
        <div className="t1-notes">
          <h3>Notes</h3>
          <p>{data.notes}</p>
        </div>
      )}

    </div>
  );
};

export default Template1;