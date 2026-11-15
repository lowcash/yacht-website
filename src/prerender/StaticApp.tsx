import App from '../App'
import { buildOrganizationJsonLd } from '../lib/constants'

export const ORGANIZATION_JSON_LD = buildOrganizationJsonLd()

/** Build-time prerender renders the real app tree so the static HTML matches what hydrates visually. */
export function StaticApp() {
  return <App />
}
