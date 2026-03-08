import { useEffect, useState } from 'react'

function normalizeHashPath(rawHash) {
  if (!rawHash || rawHash === '#') {
    return '/'
  }

  const next = rawHash.replace(/^#/, '')
  return next.startsWith('/') ? next : `/${next}`
}

export function useHashRoute() {
  const [path, setPath] = useState(() => normalizeHashPath(window.location.hash))

  useEffect(() => {
    const onHashChange = () => {
      setPath(normalizeHashPath(window.location.hash))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return { path }
}
