import { SectionHeader } from '../components/common/SectionHeader'

const coverageData = [
  {
    zone: 'Ciudad de Guatemala (zona urbana)',
    type: 'Misma ciudad',
    standard: '24 horas',
    express: '4 a 8 horas',
    service: 'Cobertura completa',
  },
  {
    zone: 'Mixco, Villa Nueva, San Miguel Petapa',
    type: 'Misma ciudad / area metropolitana',
    standard: '24 horas',
    express: '8 a 12 horas',
    service: 'Cobertura extendida',
  },
  {
    zone: 'Sacatepequez (Antigua Guatemala)',
    type: 'Otro departamento',
    standard: '2 a 3 dias habiles',
    express: '1 dia habil',
    service: 'Cobertura regional',
  },
  {
    zone: 'Quetzaltenango',
    type: 'Otro departamento',
    standard: '2 a 3 dias habiles',
    express: '1 a 2 dias habiles',
    service: 'Cobertura departamental',
  },
  {
    zone: 'Escuintla',
    type: 'Otro departamento',
    standard: '2 a 3 dias habiles',
    express: '1 dia habil',
    service: 'Cobertura departamental',
  },
  {
    zone: 'Peten, Izabal, Alta Verapaz',
    type: 'Cobertura nacional parcial',
    standard: '3 a 5 dias habiles',
    express: '2 a 4 dias habiles',
    service: 'Validacion previa',
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

        <div className="coverage-intro-grid">
          <article className="card">
            <h3>Cobertura nacional sin API</h3>
            <p>
              Esta seccion usa una matriz de cobertura gratuita con informacion
              por zona de Guatemala. No requiere Google Maps ni APIs externas.
            </p>
            <ul className="list">
              <li>Capital y area metropolitana con atencion prioritaria</li>
              <li>Departamentos con entregas estandar y expres</li>
              <li>Zonas de acceso especial con validacion previa</li>
            </ul>
          </article>

          <article className="card">
            <h3>Como se conecta al cotizador</h3>
            <p>
              Los tiempos mostrados estan alineados con tus opciones de destino
              y nivel de servicio. Puedes ampliar esta tabla sin cambiar la
              arquitectura.
            </p>
            <ul className="list">
              <li>Misma ciudad: tiempos mas rapidos</li>
              <li>Otro departamento: ventana de 1 a 3 dias</li>
              <li>Cobertura parcial: sujeto a ruta y clima</li>
            </ul>
          </article>
        </div>

        <div className="card coverage-table-card">
          <h3>Matriz de cobertura Guatemala</h3>
          <div className="coverage-table-wrap">
            <table className="coverage-table">
              <thead>
                <tr>
                  <th>Zona</th>
                  <th>Tipo</th>
                  <th>Estandar</th>
                  <th>Expres</th>
                  <th>Disponibilidad</th>
                </tr>
              </thead>
              <tbody>
                {coverageData.map((item) => (
                  <tr key={item.zone}>
                    <td>{item.zone}</td>
                    <td>{item.type}</td>
                    <td>{item.standard}</td>
                    <td>{item.express}</td>
                    <td>{item.service}</td>
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
