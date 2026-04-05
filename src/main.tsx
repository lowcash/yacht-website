import { Analytics } from '@vercel/analytics/react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element #root not found')
}

const isLocalHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
const shouldRenderAnalytics = import.meta.env.PROD && !isLocalHost

createRoot(rootElement).render(
  <>
    <App />
    {shouldRenderAnalytics ? <Analytics /> : null}
  </>,
)
