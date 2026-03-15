import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const TemplateGrid = ({ onTemplateClick }) => {
  const { selectedTemplate, setSelectedTemplate } = useContext(AppContext);

  const templates = [
    { id: "modern", name: "Modern Blue" },
    { id: "minimal", name: "Minimal White" },
    { id: "dark", name: "Dark Mode" },
    { id: "classic", name: "Classic Gray" }
  ];

  return (
    <div>
      <h5 className="mb-3">Choose Template</h5>

      <div className="row g-3">
        {templates.map((template) => (
          <div key={template.id} className="col-6">
            <div
              onClick={() => onTemplateClick(template.id)}
              className={`border rounded p-3 text-center template-card ${
                selectedTemplate === template.id
                  ? "border-primary shadow"
                  : "border-light"
              }`}
              style={{ cursor: "pointer" }}
            >
              <p className="fw-semibold">{template.name}</p>

              <div
                className={`py-3 rounded ${
                  template.id === "modern"
                    ? "bg-primary text-white"
                    : template.id === "dark"
                    ? "bg-dark text-white"
                    : template.id === "classic"
                    ? "bg-secondary text-white"
                    : "bg-light border"
                }`}
              >
                Preview
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateGrid;
