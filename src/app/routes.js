import { HomePage } from '../pages/HomePage'
import { ServicesPage } from '../pages/ServicesPage'
import { HowItWorksPage } from '../pages/HowItWorksPage'
import { CoveragePage } from '../pages/CoveragePage'
import { QuotePage } from '../pages/QuotePage'
import { FAQPage } from '../pages/FAQPage'
import { ContactPage } from '../pages/ContactPage'

export const routes = [
  { path: '/', label: 'Inicio', component: HomePage },
  { path: '/servicios', label: 'Servicios', component: ServicesPage },
  { path: '/como-funciona', label: 'Como funciona', component: HowItWorksPage },
  { path: '/cobertura', label: 'Cobertura', component: CoveragePage },
  { path: '/cotizador', label: 'Cotizador', component: QuotePage },
  { path: '/faq', label: 'FAQ', component: FAQPage },
  { path: '/contacto', label: 'Contacto', component: ContactPage },
]
