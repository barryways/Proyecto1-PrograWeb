import { useMemo } from 'react'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { useHashRoute } from './app/useHashRoute'
import { routes } from './app/routes'

function App() {
  const { path } = useHashRoute()

  const currentRoute = useMemo(() => {
    return routes.find((route) => route.path === path) ?? routes[0]
  }, [path])

  const CurrentPage = currentRoute.component

  return (
    <div className="app-shell">
      <Navbar routes={routes} currentPath={currentRoute.path} />
      <main className="main-content">
        <CurrentPage />
      </main>
      <Footer />
    </div>
  )
}

export default App
