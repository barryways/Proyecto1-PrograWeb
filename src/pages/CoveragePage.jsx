import { SectionHeader } from '../components/common/SectionHeader'

const coverageData = [
  {
    region: 'Ciudad de Guatemala',
    coverage: 'Cobertura completa',
    time: 'Mismo día o 24 horas',
    note: 'Disponible para entregas estándar y exprés.',
  },
  {
    region: 'Mixco, Villa Nueva y San Miguel Petapa',
    coverage: 'Cobertura extendida',
    time: '24 horas',
    note: 'Incluye zonas metropolitanas seleccionadas.',
  },
  {
    region: 'Antigua Guatemala y Sacatepéquez',
    coverage: 'Cobertura regional',
    time: '24 a 48 horas',
    note: 'Aplican cargos según distancia y nivel de servicio.',
  },
  {
    region: 'Quetzaltenango',
    coverage: 'Cobertura departamental',
    time: '24 a 48 horas',
    note: 'Disponible para envíos estándar y exprés.',
  },
  {
    region: 'Escuintla',
    coverage: 'Cobertura departamental',
    time: '24 a 48 horas',
    note: 'Sujeto a validación de zona exacta.',
  },
  {
    region: 'Petén, Izabal y Alta Verapaz',
    coverage: 'Cobertura nacional parcial',
    time: '2 a 4 días hábiles',
    note: 'La entrega depende del acceso y condiciones de ruta.',
  },
]

export function CoveragePage() {
  return (
    <section className="page section-coverage">
      <div className="container">
        <SectionHeader
          title="Cobertura"
          subtitle="Consulta las áreas donde AeroPaq ofrece servicio y los tiempos estimados de entrega según la región."
        />

        <div className="two-cols">
          <iframe
          title="Mapa de cobertura en Guatemala"
          width="100%"
          height="320"
          style={{ border: 0, borderRadius: '16px' }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=Guatemala`}
        ></iframe>

          <article className="card">
            <h3>Áreas incluidas</h3>
            <p>
              Nuestra cobertura incluye la ciudad capital, áreas metropolitanas
              y departamentos seleccionados. Los tiempos de entrega pueden
              variar según la distancia, el tipo de servicio y la accesibilidad
              de la zona.
            </p>

            <ul className="list">
              <li>Ciudad de Guatemala y área metropolitana</li>
              <li>Cobertura en cabeceras departamentales seleccionadas</li>
              <li>Entregas estándar y exprés según disponibilidad</li>
              <li>Validación previa para zonas de difícil acceso</li>
            </ul>
          </article>
        </div>

        <div className="coverage-table card mt-32">
          <h3>Matriz de cobertura</h3>

          <div style={{ overflowX: 'auto' }}>
            <table className="coverage-table-element">
              <thead>
                <tr>
                  <th>Región</th>
                  <th>Cobertura</th>
                  <th>Tiempo estimado</th>
                  <th>Observaciones</th>
                </tr>
              </thead>
              <tbody>
                {coverageData.map((item) => (
                  <tr key={item.region}>
                    <td>{item.region}</td>
                    <td>{item.coverage}</td>
                    <td>{item.time}</td>
                    <td>{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}