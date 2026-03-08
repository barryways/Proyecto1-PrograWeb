import { SectionHeader } from "../components/common/SectionHeader";

const trustBadges = ["+10,000 envíos gestionados", "98% satisfacción de clientes", "Soporte especializado"];

export function HomePage() {
  return (
    <section className="page">
      <div className="container hero-grid">
        <div>
          <SectionHeader
            title="Envía tus paquetes con seguridad y control total"
            subtitle="AeroPaq te permite cotizar, gestionar y dar seguimiento a tus envíos de forma rápida y transparente. Calcula costos estimados, selecciona servicios y obtén tiempos de entrega en segundos."
          />

          <div className="button-row">
            <a href="#/cotizador" className="btn btn-primary">
              Ir al cotizador
            </a>

            <a href="#/contacto" className="btn btn-outline">
              Hablar con asesoría
            </a>
          </div>

          <div className="trust-strip">
            {trustBadges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </div>

        <img
          src="/home-page-aeropaq.jpg"
          alt="Servicio de envíos"
          className="hero-image"
          style={{
            width: "100%",
            borderRadius: "16px",
            objectFit: "cover"
          }}
        />
      </div>

      <div className="section section-alt">
        <div className="container cards-grid">

          <article className="card">
            <h3>Proceso rápido</h3>
            <p>
              Cotiza tu envío en pocos pasos. Solo ingresa el origen, destino,
              peso y tipo de servicio, y el sistema calculará automáticamente
              el costo estimado y el tiempo de entrega.
            </p>
          </article>

          <article className="card">
            <h3>Confianza total</h3>
            <p>
              Nuestro sistema utiliza reglas claras de cálculo y estimaciones
              basadas en peso, distancia y nivel de servicio para ofrecer
              resultados confiables y fáciles de entender.
            </p>
          </article>

          <article className="card">
            <h3>Resultados claros</h3>
            <p>
              Visualiza el desglose del costo de tu envío, incluyendo tarifa
              base, costo por peso, distancia y servicios adicionales, para
              tomar decisiones informadas antes de confirmar tu envío.
            </p>
          </article>

        </div>
      </div>
    </section>
  );
}