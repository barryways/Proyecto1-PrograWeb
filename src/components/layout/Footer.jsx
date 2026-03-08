export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <section>
          <h3>AeroPaq </h3>
          <p>
            Landing corporativa responsive preparada para conectar formularios,
            cotizador y procesos con Google Sheets.
          </p>
        </section>
        <section>
          <h3>Enlaces</h3>
          <a href="#/servicios">Servicios</a>
          <a href="#/cotizador">Cotizador</a>
          <a href="#/contacto">Contacto</a>
        </section>
        <section>
          <h3>Confianza</h3>
          <p>Espacio para logos de aliados, certificaciones y casos de exito.</p>
          <div className="trust-mini">
            <span>SSL</span>
            <span>24/7</span>
            <span>Soporte</span>
          </div>
        </section>
      </div>
    </footer>
  )
}
