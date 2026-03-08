import { SectionHeader } from '../components/common/SectionHeader'

const steps = [
  {
    title: '1. El usuario completa el formulario de cotización',
    description:
      'El usuario ingresa la información básica de su envío, como origen, destino, peso del paquete y nivel de servicio. También puede agregar extras como recolección a domicilio o seguro para proteger el envío. Estos datos permiten generar una cotización rápida y personalizada.'
  },
  {
    title: '2. El sistema calcula opciones y precios estimados',
    description:
      'Con la información proporcionada, el sistema calcula automáticamente el costo estimado del envío considerando factores como el peso real o volumétrico, la distancia entre origen y destino y el tipo de servicio seleccionado (estándar o exprés). También se incluyen costos base y servicios adicionales.'
  },
  {
    title: '3. Se muestra la propuesta y se registra la solicitud',
    description:
      'El usuario recibe un resumen con el precio estimado y el tiempo aproximado de entrega. Al enviar la cotización, los datos se registran automáticamente en Google Sheets para seguimiento del equipo comercial o para futuras gestiones del envío.'
  }
]

export function HowItWorksPage() {
  return (
    <section className="page section-how">
      <div className="container">
        <SectionHeader
          title="Cómo funciona"
          subtitle="Conoce el proceso para cotizar y gestionar tu envío con AeroPaq de forma rápida y sencilla."
        />

        <div className="cards-grid">
          {steps.map((step) => (
            <article key={step.title} className="card">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}