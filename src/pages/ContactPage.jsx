import { useState } from 'react'
import { SectionHeader } from '../components/common/SectionHeader'
import { Spinner } from '../components/common/Spinner'
import { Alert } from '../components/common/Alert'
import { submitToGoogleSheets } from '../services/googleSheetsService'

const initialContact = {
  fullName: '',
  phone: '',
  message: '',
}

export function ContactPage() {
  const [form, setForm] = useState(initialContact)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({ type: 'info', message: '' })

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setAlert({ type: 'info', message: '' })

    try {
      await submitToGoogleSheets(form, 'Contactos')
      setAlert({
        type: 'success',
        message: 'Mensaje enviado. Pronto te contactaremos.',
      })
      setForm(initialContact)
    } catch (error) {
      setAlert({
        type: 'error',
        message:
          error?.message || 'No se pudo enviar. Intenta de nuevo en unos minutos.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page section-contact">
      <div className="container">
        <SectionHeader
          title="Contacto"
          subtitle="Pagina enfocada en conversion final, soporte y captura de leads."
        />
        <div className="two-cols">
          <form className="form-card" onSubmit={onSubmit}>
            <label>
              Nombre completo
              <input
                name="fullName"
                value={form.fullName}
                onChange={onChange}
                placeholder="Tu nombre"
                required
              />
            </label>
            <label>
              Telefono
              <input
                name="phone"
                value={form.phone}
                onChange={onChange}
                placeholder="+502 ..."
                required
              />
            </label>
            <label>
              Mensaje
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                rows={4}
                placeholder="Cuéntanos que necesitas"
                required
              />
            </label>
            <button className="btn btn-secondary" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar mensaje'}
            </button>
            {loading && <Spinner label="Enviando datos..." />}
            <Alert type={alert.type} message={alert.message} />
          </form>
          <div className="card">
            <h3>Confianza para el usuario</h3>
            <p>
              Usa este bloque para incluir canales oficiales, tiempos de
              respuesta, politicas y testimonios.
            </p>
            <ul className="list">
              <li>Atencion personalizada</li>
              <li>Proteccion de datos</li>
              <li>Respuesta en menos de 24h</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
