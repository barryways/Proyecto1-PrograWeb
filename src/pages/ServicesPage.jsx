import { SectionHeader } from '../components/common/SectionHeader'
import { PlaceholderImage } from '../components/common/PlaceholderImage'

const serviceCards = [
  {
    title: 'Envíos nacionales',
    description:
      'Realiza envíos rápidos y seguros a cualquier departamento del país. Ideal para documentos, paquetes personales y envíos comerciales con seguimiento en tiempo real.',
  },
  {
    title: 'Envíos internacionales',
    description:
      'Conecta Guatemala con el mundo. Enviamos tus paquetes a múltiples destinos internacionales con procesos de aduana simplificados y rastreo completo.',
  },
  {
    title: 'Recolección a domicilio',
    description:
      'Solicita que recojamos tu paquete directamente en tu casa u oficina. Nuestro equipo se encarga del transporte sin que tengas que salir.',
  },
  {
    title: 'Entrega express',
    description:
      'Servicio prioritario para entregas urgentes. Tus paquetes llegan en el menor tiempo posible con manejo especial y prioridad logística.',
  },
]

export function ServicesPage() {
  return (
    <section className="page section-services">
      <div className="container">
        <SectionHeader
          title="Servicios de AeroPaq"
          subtitle="Soluciones logísticas diseñadas para envíos rápidos, seguros y confiables dentro y fuera del país."
        />

        <div className="cards-grid">
          {serviceCards.map((service) => (
            <article key={service.title} className="card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="#/contacto" className="link">
                Solicitar información
              </a>
            </article>
          ))}
        </div>

        <div className="two-cols mt-32">
          <img
          src="/servicios-imagen.avif"
          alt="Servicio de envíos"
          className="hero-image"
          style={{
            width: "75%",
            borderRadius: "16px",
            objectFit: "cover"
          }}
        />
          
          <div className="card">
            <h3>Soluciones logísticas integrales</h3>
            <p>
              AeroPaq ofrece servicios de transporte de paquetes diseñados para
              personas y empresas. Gestionamos cada envío con procesos seguros,
              seguimiento en línea y atención personalizada para garantizar que
              tus paquetes lleguen a su destino de forma rápida y confiable.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}