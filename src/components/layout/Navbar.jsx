import { useState } from 'react'

export function Navbar({ routes, currentPath }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#/" className="brand">
          AeroPaq 
        </a>

        <button
          className="menu-toggle"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Abrir menu de navegacion"
        >
          Menu
        </button>

        <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
          {routes.map((route) => (
            <a
              key={route.path}
              href={`#${route.path}`}
              className={currentPath === route.path ? 'active' : ''}
              onClick={() => setIsOpen(false)}
            >
              {route.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
