import { useEffect, useMemo, useState } from 'react'
import { SectionHeader } from '../components/common/SectionHeader'
import { Alert } from '../components/common/Alert'

const initialForm = {
  fullName: '',
  email: '',
  originCountry: 'usa',
  destinationType: 'misma_ciudad',
  weight: '',
  length: '',
  width: '',
  height: '',
  serviceLevel: 'estandar',
  homePickup: false,
  insurance: false,
}

const initialTouched = {
  fullName: false,
  email: false,
  weight: false,
  length: false,
  width: false,
  height: false,
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function getFieldErrors(form) {
  const errors = {}
  const weight = parseFloat(form.weight)
  const length = form.length === '' ? null : parseFloat(form.length)
  const width = form.width === '' ? null : parseFloat(form.width)
  const height = form.height === '' ? null : parseFloat(form.height)

  if (!form.fullName.trim()) {
    errors.fullName = 'Ingresa tu nombre completo.'
  } else if (form.fullName.trim().length < 3) {
    errors.fullName = 'El nombre debe tener al menos 3 caracteres.'
  }

  if (!form.email.trim()) {
    errors.email = 'Ingresa tu correo electronico.'
  } else if (!isValidEmail(form.email.trim())) {
    errors.email = 'Ingresa un correo electronico valido.'
  }

  if (form.weight === '') {
    errors.weight = 'Ingresa el peso del paquete.'
  } else if (Number.isNaN(weight) || weight <= 0) {
    errors.weight = 'El peso debe ser mayor a 0.'
  } else if (weight > 100) {
    errors.weight = 'El peso maximo permitido es de 100 kg.'
  }

  const someDimensionFilled =
    form.length !== '' || form.width !== '' || form.height !== ''
  const allDimensionsFilled =
    form.length !== '' && form.width !== '' && form.height !== ''

  if (someDimensionFilled && !allDimensionsFilled) {
    if (form.length === '') errors.length = 'Completa largo, ancho y alto.'
    if (form.width === '') errors.width = 'Completa largo, ancho y alto.'
    if (form.height === '') errors.height = 'Completa largo, ancho y alto.'
  }

  if (form.length !== '' && ((length ?? 0) <= 0 || Number.isNaN(length))) {
    errors.length = 'El largo debe ser mayor a 0.'
  }

  if (form.width !== '' && ((width ?? 0) <= 0 || Number.isNaN(width))) {
    errors.width = 'El ancho debe ser mayor a 0.'
  }

  if (form.height !== '' && ((height ?? 0) <= 0 || Number.isNaN(height))) {
    errors.height = 'El alto debe ser mayor a 0.'
  }

  return errors
}

export function QuotePage() {
  const [form, setForm] = useState(initialForm)
  const [touched, setTouched] = useState(initialTouched)
  const [alert, setAlert] = useState({ type: 'info', message: '' })
  const [wasQuoted, setWasQuoted] = useState(false)

  const errors = useMemo(() => getFieldErrors(form), [form])
  const hasErrors = Object.keys(errors).length > 0

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    if (name in initialTouched) {
      setTouched((prev) => ({ ...prev, [name]: true }))
    }
  }

  const handleBlur = (event) => {
    const { name } = event.target
    if (name in initialTouched) {
      setTouched((prev) => ({ ...prev, [name]: true }))
    }
  }

  const results = useMemo(() => {
    const weight = parseFloat(form.weight) || 0
    const length = parseFloat(form.length) || 0
    const width = parseFloat(form.width) || 0
    const height = parseFloat(form.height) || 0

    const hasDimensions = length > 0 && width > 0 && height > 0

    const volumetricWeight = hasDimensions
      ? (length * width * height) / 5000
      : 0

    const chargeableWeight = Math.max(weight, volumetricWeight)

    let baseCost = 0
    let distanceCost = 0
    let weightRate = 0
    let estimatedTime = ''

    switch (form.destinationType) {
      case 'misma_ciudad':
        baseCost = 25
        distanceCost = 10
        weightRate = 8
        estimatedTime = form.serviceLevel === 'express' ? '4 a 8 horas' : '1 dia habil'
        break

      case 'otro_departamento':
        baseCost = 35
        distanceCost = 25
        weightRate = 10
        estimatedTime = form.serviceLevel === 'express' ? '1 dia habil' : '2 a 3 dias habiles'
        break

      case 'internacional':
        baseCost = 60
        distanceCost = 80
        weightRate = 18

        if (form.originCountry === 'usa') {
          estimatedTime = form.serviceLevel === 'express' ? '7 a 10 dias' : '15 dias'
        } else if (form.originCountry === 'espana') {
          estimatedTime = form.serviceLevel === 'express' ? '10 a 14 dias' : '21 dias'
        } else {
          estimatedTime = form.serviceLevel === 'express' ? '8 a 12 dias' : '18 dias'
        }
        break

      default:
        baseCost = 25
        distanceCost = 10
        weightRate = 8
        estimatedTime = '1 dia habil'
        break
    }

    const serviceMultiplier = form.serviceLevel === 'express' ? 1.35 : 1
    const weightCost = chargeableWeight * weightRate

    const homePickupCost = form.homePickup ? 20 : 0
    const insuranceCost = form.insurance ? 15 : 0

    const subtotal = baseCost + distanceCost + weightCost
    const serviceAdjustment = subtotal * (serviceMultiplier - 1)
    const totalEstimate =
      subtotal + serviceAdjustment + homePickupCost + insuranceCost

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
    }
  }, [form])

  const handleSubmit = (event) => {
    event.preventDefault()

    setTouched({
      fullName: true,
      email: true,
      weight: true,
      length: true,
      width: true,
      height: true,
    })

    if (hasErrors) {
      setAlert({
        type: 'error',
        message: 'Corrige los campos marcados para poder enviar la cotizacion.',
      })
      return
    }

    setWasQuoted(true)
    setAlert({
      type: 'success',
      message: `Cotizacion lista. Total estimado: Q ${results.totalEstimate.toFixed(
        2
      )} con tiempo aproximado de ${results.estimatedTime}.`,
    })
  }

  useEffect(() => {
    if (!wasQuoted) return

    if (hasErrors) {
      setAlert({
        type: 'error',
        message: 'Hay cambios pendientes con error. Corrige campos para recotizar.',
      })
      return
    }

    setAlert({
      type: 'success',
      message: `Cotizacion actualizada. Nuevo total: Q ${results.totalEstimate.toFixed(
        2
      )} con tiempo aproximado de ${results.estimatedTime}.`,
    })
  }, [
    wasQuoted,
    hasErrors,
    results.totalEstimate,
    results.estimatedTime,
    results.volumetricWeight,
    results.chargeableWeight,
  ])

  const getInputClass = (field) =>
    touched[field] && errors[field] ? 'input-invalid' : ''

  const showFieldError = (field) => touched[field] && errors[field]

  return (
    <section className="page">
      <div className="container">
        <SectionHeader
          title="Cotizador"
          subtitle="Calcula un estimado de tu envío según origen, destino, peso, nivel de servicio y extras seleccionados."
        />

        <div className="two-cols">
          <form className="form-card quote-form" onSubmit={handleSubmit} noValidate>
            <label>
              Nombre completo
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tu nombre completo"
                className={getInputClass('fullName')}
              />
              {showFieldError('fullName') && (
                <span className="field-error">{errors.fullName}</span>
              )}
            </label>

            <label>
              Correo electrónico
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="tu@email.com"
                className={getInputClass('email')}
              />
              {showFieldError('email') && (
                <span className="field-error">{errors.email}</span>
              )}
            </label>

            <div className="field-grid field-grid-2">
              <label>
                Origen
                <select
                  name="originCountry"
                  value={form.originCountry}
                  onChange={handleChange}
                >
                  <option value="usa">Estados Unidos</option>
                  <option value="mexico">Mexico</option>
                  <option value="espana">Espana</option>
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
            </div>

            <div className="field-grid field-grid-2">
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
                  onBlur={handleBlur}
                  placeholder="Ej. 2.50"
                  className={getInputClass('weight')}
                />
                {showFieldError('weight') && (
                  <span className="field-error">{errors.weight}</span>
                )}
              </label>

              <label>
                Nivel de servicio
                <select
                  name="serviceLevel"
                  value={form.serviceLevel}
                  onChange={handleChange}
                >
                  <option value="estandar">Estandar</option>
                  <option value="express">Expres</option>
                </select>
              </label>
            </div>

            <div className="form-group">
              <p className="group-title">Dimensiones (opcional)</p>

              <div className="field-grid field-grid-3">
                <label>
                  Largo (cm)
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="length"
                    value={form.length}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="40"
                    className={getInputClass('length')}
                  />
                  {showFieldError('length') && (
                    <span className="field-error">{errors.length}</span>
                  )}
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
                    onBlur={handleBlur}
                    placeholder="30"
                    className={getInputClass('width')}
                  />
                  {showFieldError('width') && (
                    <span className="field-error">{errors.width}</span>
                  )}
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
                    onBlur={handleBlur}
                    placeholder="20"
                    className={getInputClass('height')}
                  />
                  {showFieldError('height') && (
                    <span className="field-error">{errors.height}</span>
                  )}
                </label>
              </div>
            </div>

            <div className="form-group">
              <p className="group-title">Extras</p>

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  name="homePickup"
                  checked={form.homePickup}
                  onChange={handleChange}
                />
                Recoleccion a domicilio
              </label>

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  name="insurance"
                  checked={form.insurance}
                  onChange={handleChange}
                />
                Seguro contra perdida y accidentes
              </label>
            </div>

            <button className="btn btn-primary quote-submit" disabled={hasErrors}>
              Calcular cotizacion
            </button>

            <Alert type={alert.type} message={alert.message} />
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
                <strong>Peso volumetrico:</strong>{' '}
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
                <strong>Tiempo estimado:</strong> {results.estimatedTime || 'Pendiente'}
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
  )
}
