import { COMPANY_INFO, SERVICES, buildOrganizationJsonLd } from '../lib/constants'

export const ORGANIZATION_JSON_LD = buildOrganizationJsonLd()

export function StaticApp() {
  return (
    <div className='min-h-screen'>
      <main>
        <section id='hero'>
          <h1>
            PINK LADY
            <br />
            YACHTING SERVICES
          </h1>
          <p>{COMPANY_INFO.tagline}</p>
          <a href='#contact'>CONTACT NOW</a>
        </section>

        <section id='services'>
          <h2>
            COMPREHENSIVE
            <br />
            YACHTING SUPPORT SERVICES
          </h2>
          <p>Your one-stop solution for professional yachting operations in Thailand</p>
          <ul>
            {SERVICES.map((service) => (
              <li key={service.id}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <p>{service.details}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id='about'>
          <h2>
            AT PINK LADY
            <br />
            YACHT SUPPORT SERVICES
          </h2>
          <p>
            We pride ourselves on exceptional service, professionalism, and discretion. Every yacht. Every crew. Every
            journey expertly managed.
          </p>
          <p>Enjoy Thailand's stunning waters knowing your vessel is in expert hands.</p>
        </section>

        <section id='contact'>
          <h2>READY TO SET SAIL?</h2>
          <p>Contact us today for personalized yachting assistance anywhere in Thailand.</p>
          <p>{COMPANY_INFO.locationName}</p>
          <p>{COMPANY_INFO.address}</p>
          <p>
            <a href={`tel:${COMPANY_INFO.phone}`}>{COMPANY_INFO.phoneDisplay}</a>
          </p>
          <p>
            <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
          </p>
          <footer>
            <p>PINK LADY</p>
            <p>© {new Date().getFullYear()} Pink Lady Yacht Support Services. All rights reserved.</p>
            <p>{COMPANY_INFO.analyticsDisclosure}</p>
          </footer>
        </section>
      </main>
    </div>
  )
}
