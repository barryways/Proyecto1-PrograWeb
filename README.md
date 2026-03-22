# Proyecto1-PrograWeb

Proyecto de frontend en React con Vite, creado como base para una web de cotizaciones de envíos/servicios.

## 1. Tecnologías y versiones

- React: 18.x (vía `react` y `react-dom`)
- Vite: 5.x
- JavaScript moderno (ES6+)
- CSS modular con archivos en `src/styles/`
- ESLint: configuración extendida del template React + Vite
- Navegación cliente: React Router 

Para ver versiones exactas, revisar `package.json`:
- `react`
- `react-dom`
- `vite`
- `@vitejs/plugin-react`

## 2. Cómo ejecutar el proyecto

### Requisitos previos

- Node.js 18+ (recomendado)
- npm 10+ (o yarn/pnpm compatibles)

### Instalación

```bash
cd c:/Usuario/GitHub/Proyecto1-PrograWeb
npm install
```

### Modo desarrollo

```bash
npm run dev
```

Abrir `http://localhost:5173` (o la URL que muestre Vite).

### Compilar para producción

```bash
npm run build
```

### Previsualizar build de producción

```bash
npm run preview
```

## 3. Decisiones técnicas relevantes

### Estructura general

- `src/main.jsx`: punto de entrada que monta `<App />` y carga estilos globales.
- `src/App.jsx`: componente raíz que define layout general y router.
- `src/app/routes.js`: rutas de la app (Home, Servicios, Cotización, FAQ, etc.).
- `src/app/useHashRoute.js`: hook personalizado para enrutamiento hash. Mantiene compatibilidad simple sin dependencias externas pesadas o configuración compleja.

### Componentes

- Componentes de layout globales (Navbar, Footer).
- Componentes reutilizables (Alert, PlaceholderImage, SectionHeader, Spinner).
- Páginas de alto nivel.

### Servicio de datos

- `src/services/googleSheetsService.js`: integración / lógica de comunicación para envío de datos (formulario a Google Sheets o API compatible).

### Estilos

- `src/styles/` contiene:
  - `tokens.css`: variables de diseño (colores, tipografía, espacios)
  - `base.css`: resets y base global
  - `components.css`: reglas específicas para componentes
  - `layout.css`, `pages.css`: organización por responsabilidad

### Enrutamiento

- Rutas definidas en `app/routes.js` y renderizadas con lógica en `App.jsx`.
- `useHashRoute.js` permite navegación en hash (ej: `#/services`) con un enfoque simple y sin server-side routes.



