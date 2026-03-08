const WAIT_TIME_MS = 1200

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function submitToGoogleSheets(payload, source) {
  const endpoint = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL

  if (!endpoint) {
    await wait(WAIT_TIME_MS)
    return { ok: true, simulated: true, source, payload }
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source, ...payload }),
  })

  if (!response.ok) {
    throw new Error('No se pudo enviar la informacion al webhook')
  }

  return { ok: true, simulated: false }
}
