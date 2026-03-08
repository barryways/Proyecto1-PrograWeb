import { useMemo, useState } from "react";
import { SectionHeader } from "../components/common/SectionHeader";
import { Spinner } from "../components/common/Spinner";
import { Alert } from "../components/common/Alert";
import { submitToGoogleSheets } from "../services/googleSheetsService";

const initialForm = {
  fullName: "",
  email: "",
  originCountry: "usa",
  destinationType: "misma_ciudad",
  weight: "",
  length: "",
  width: "",
  height: "",
  serviceLevel: "estandar",
  homePickup: false,
  insurance: false,
};

export function QuotePage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "info", message: "" });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validationMessage = useMemo(() => {
    const weight = parseFloat(form.weight) || 0;
    const length = form.length === "" ? null : parseFloat(form.length);
    const width = form.width === "" ? null : parseFloat(form.width);
    const height = form.height === "" ? null : parseFloat(form.height);

    if (!form.fullName.trim()) {
      return "Ingresa tu nombre completo.";
    }

    if (!form.email.trim()) {
      return "Ingresa tu correo electrónico.";
    }

    if (weight <= 0) {
      return "El peso debe ser mayor a 0.";
    }

    if (weight > 100) {
      return "Para este cotizador académico, el peso máximo permitido es de 100 kg.";
    }

    const someDimensionFilled =
      form.length !== "" || form.width !== "" || form.height !== "";

    const allDimensionsFilled =
      form.length !== "" && form.width !== "" && form.height !== "";

    if (someDimensionFilled && !allDimensionsFilled) {
      return "Si ingresas dimensiones, debes completar largo, ancho y alto.";
    }

    if (
      allDimensionsFilled &&
      ((length ?? 0) <= 0 || (width ?? 0) <= 0 || (height ?? 0) <= 0)
    ) {
      return "Las dimensiones deben ser mayores a 0.";
    }

    return "";
  }, [form]);

  const results = useMemo(() => {
    const weight = parseFloat(form.weight) || 0;
    const length = parseFloat(form.length) || 0;
    const width = parseFloat(form.width) || 0;
    const height = parseFloat(form.height) || 0;

    const hasDimensions = length > 0 && width > 0 && height > 0;

    const volumetricWeight = hasDimensions
      ? (length * width * height) / 5000
      : 0;

    const chargeableWeight = Math.max(weight, volumetricWeight);

    let baseCost = 0;
    let distanceCost = 0;
    let weightRate = 0;
    let estimatedTime = "";

    switch (form.destinationType) {
      case "misma_ciudad":
        baseCost = 25;
        distanceCost = 10;
        weightRate = 8;
        estimatedTime = form.serviceLevel === "express" ? "4 a 8 horas" : "1 día hábil";
        break;

      case "otro_departamento":
        baseCost = 35;
        distanceCost = 25;
        weightRate = 10;
        estimatedTime = form.serviceLevel === "express" ? "1 día hábil" : "2 a 3 días hábiles";
        break;

      case "internacional":
        baseCost = 60;
        distanceCost = 80;
        weightRate = 18;

        if (form.originCountry === "usa") {
          estimatedTime = form.serviceLevel === "express" ? "7 a 10 días" : "15 días";
        } else if (form.originCountry === "espana") {
          estimatedTime = form.serviceLevel === "express" ? "10 a 14 días" : "21 días";
        } else {
          estimatedTime = form.serviceLevel === "express" ? "8 a 12 días" : "18 días";
        }
        break;

      default:
        baseCost = 25;
        distanceCost = 10;
        weightRate = 8;
        estimatedTime = "1 día hábil";
        break;
    }

    const serviceMultiplier = form.serviceLevel === "express" ? 1.35 : 1;
    const weightCost = chargeableWeight * weightRate;

    const homePickupCost = form.homePickup ? 20 : 0;
    const insuranceCost = form.insurance ? 15 : 0;

    const subtotal = baseCost + distanceCost + weightCost;
    const serviceAdjustment = subtotal * (serviceMultiplier - 1);
    const totalEstimate =
      subtotal + serviceAdjustment + homePickupCost + insuranceCost;

    return {
      hasDimensions,
      volumetricWeight,
      chargeableWeight,
      baseCost,
      distanceCost,
      weightCost,
      serviceAdjustment,
      homePickupCost,
      insuranceCost,
      totalEstimate,
      estimatedTime,
    };
  }, [form]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validationMessage) {
      setAlert({
        type: "error",
        message: validationMessage,
      });
      return;
    }

    setLoading(true);
    setAlert({ type: "info", message: "" });

    try {
      await submitToGoogleSheets(
        {
          ...form,
          volumetricWeight: results.volumetricWeight.toFixed(2),
          chargeableWeight: results.chargeableWeight.toFixed(2),
          baseCost: results.baseCost.toFixed(2),
          distanceCost: results.distanceCost.toFixed(2),
          weightCost: results.weightCost.toFixed(2),
          serviceAdjustment: results.serviceAdjustment.toFixed(2),
          homePickupCost: results.homePickupCost.toFixed(2),
          insuranceCost: results.insuranceCost.toFixed(2),
          totalEstimate: results.totalEstimate.toFixed(2),
          estimatedTime: results.estimatedTime,
        },
        "cotizador"
      );

      setAlert({
        type: "success",
        message: "Cotización enviada con éxito.",
      });

      setForm(initialForm);
    } catch (error) {
      setAlert({
        type: "error",
        message:
          "Error al enviar la cotización. Verifica tu conexión con Google Sheets.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <div className="container">
        <SectionHeader
          title="Cotizador"
          subtitle="Calcula un estimado de tu envío según origen, destino, peso, nivel de servicio y extras seleccionados."
        />

        <div className="two-cols">
          <form className="form-card" onSubmit={handleSubmit}>
            <label>
              Nombre completo
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                required
              />
            </label>

            <label>
              Correo electrónico
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
              />
            </label>

            <label>
              Origen
              <select
                name="originCountry"
                value={form.originCountry}
                onChange={handleChange}
              >
                <option value="usa">Estados Unidos</option>
                <option value="mexico">México</option>
                <option value="espana">España</option>
              </select>
            </label>

            <label>
              Destino
              <select
                name="destinationType"
                value={form.destinationType}
                onChange={handleChange}
              >
                <option value="misma_ciudad">Misma ciudad</option>
                <option value="otro_departamento">Otro departamento</option>
                <option value="internacional">Internacional</option>
              </select>
            </label>

            <label>
              Peso (kg)
              <input
                type="number"
                min="0.1"
                max="100"
                step="0.01"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                placeholder="Ej. 2.50"
                required
              />
            </label>

            <label>
              Nivel de servicio
              <select
                name="serviceLevel"
                value={form.serviceLevel}
                onChange={handleChange}
              >
                <option value="estandar">Estándar</option>
                <option value="express">Exprés</option>
              </select>
            </label>

            <div>
              <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
                Dimensiones (opcional)
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: "0.75rem",
                }}
              >
                <label>
                  Largo (cm)
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="length"
                    value={form.length}
                    onChange={handleChange}
                    placeholder="40"
                  />
                </label>

                <label>
                  Ancho (cm)
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="width"
                    value={form.width}
                    onChange={handleChange}
                    placeholder="30"
                  />
                </label>

                <label>
                  Alto (cm)
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="height"
                    value={form.height}
                    onChange={handleChange}
                    placeholder="20"
                  />
                </label>
              </div>
            </div>

            <div>
              <p style={{ marginBottom: "0.5rem", fontWeight: 600 }}>Extras</p>

              <label style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input
                  type="checkbox"
                  name="homePickup"
                  checked={form.homePickup}
                  onChange={handleChange}
                />
                Recolección a domicilio
              </label>

              <label style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input
                  type="checkbox"
                  name="insurance"
                  checked={form.insurance}
                  onChange={handleChange}
                />
                Seguro contra pérdida y accidentes
              </label>
            </div>

            <button className="btn btn-primary" disabled={loading || !!validationMessage}>
              {loading ? "Enviando..." : "Enviar cotización"}
            </button>

            {loading && (
              <Spinner label="Registrando cotización en Google Sheets..." />
            )}

            <Alert
              type={validationMessage ? "error" : alert.type}
              message={validationMessage || alert.message}
            />
          </form>

          <div className="result-card">
            <h3>Resultado del cotizador</h3>
            <p>
              Estimado calculado con base en costo base, peso, distancia, nivel
              de servicio y extras seleccionados.
            </p>

            <ul className="list">
              <li>
                <strong>Peso real ingresado:</strong> {form.weight || "0.00"} kg
              </li>
              <li>
                <strong>Peso volumétrico:</strong>{" "}
                {results.volumetricWeight.toFixed(2)} kg
              </li>
              <li>
                <strong>Peso cobrable:</strong>{" "}
                {results.chargeableWeight.toFixed(2)} kg
              </li>
              <li>
                <strong>Costo base:</strong> Q {results.baseCost.toFixed(2)}
              </li>
              <li>
                <strong>Costo por distancia:</strong> Q{" "}
                {results.distanceCost.toFixed(2)}
              </li>
              <li>
                <strong>Costo por peso:</strong> Q {results.weightCost.toFixed(2)}
              </li>
              <li>
                <strong>Ajuste por servicio:</strong> Q{" "}
                {results.serviceAdjustment.toFixed(2)}
              </li>
              <li>
                <strong>Recolección a domicilio:</strong> Q{" "}
                {results.homePickupCost.toFixed(2)}
              </li>
              <li>
                <strong>Seguro:</strong> Q {results.insuranceCost.toFixed(2)}
              </li>
              <li>
                <strong>Tiempo estimado:</strong> {results.estimatedTime}
              </li>
              <li>
                <strong>Total estimado:</strong> Q{" "}
                {results.totalEstimate.toFixed(2)}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}