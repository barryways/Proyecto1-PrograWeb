const WAIT_TIME_MS = 1200

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function normalizePayload(payload, source) {
  return {
    source: source ?? 'Contactos',
    fullName: payload?.fullName?.trim() ?? '',
    phone: payload?.phone?.trim() ?? '',
    message: payload?.message?.trim() ?? '',
  }
}

export async function submitToGoogleSheets(payload, source = 'Contactos') {
  const endpoint = import.meta.env.DEV
    ? '/api/google-sheets'
    : import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL
  const data = normalizePayload(payload, source)

  if (!data.fullName || !data.phone || !data.message) {
    throw new Error('Todos los campos son obligatorios.')
  }

  if (!endpoint) {
    await wait(WAIT_TIME_MS)

    return {
      ok: true,
      simulated: true,
      message: 'Envío simulado correctamente.',
      data,
    }
  }

  let response

  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  } catch (error) {
    console.log(error)
    throw new Error(
      'No se pudo conectar con Google Sheets. Revisa CORS o la URL del webhook.'
    )
  }

  let result = null

  try {
    result = await response.json()
  } catch (error) {
    console.log(error);
    throw new Error('La respuesta del servicio no es un JSON válido.')
  }

  if (!response.ok) {
    throw new Error(result?.message || 'Error HTTP al enviar la información.')
  }

  if (!result?.ok) {
    throw new Error(result?.message || 'El servicio rechazó la información.')
  }

  return {
    ok: true,
    simulated: false,
    message: result.message || 'Datos enviados correctamente.',
    data: result,
  }
}
