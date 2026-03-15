import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <header id="hero" className="hero-section text-white text-center">
        <div className="container py-5 d-flex flex-column justify-content-center">
          <div className="row py-lg-5">
            <div className="col-lg-9 col-md-10 mx-auto">
              <h1 className="display-3 fw-bold mb-4">
                Effortless Invoicing. Professional Results.
              </h1>

              <p className="lead mb-5" style={{ fontSize: "1.3rem" }}>
                Stop wrestling with spreadsheets. QuickInvoice helps you create
                and manage invoices in seconds.
              </p>

              <button
                className="btn btn-lg btn-warning fw-bold rounded-pill px-4"
                onClick={() => navigate("/generate")}
              >
                Generate Your First Invoice
              </button>

            </div>
          </div>
        </div>
      </header>

      <footer className="footer-section text-white text-center py-4">
        <div className="container">
          <p className="mb-1 fw-semibold">QuickInvoice</p>
          <p className="mb-0 small">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;