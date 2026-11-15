import { SERVICES } from '@/lib/constants'

export function Services() {
  return (
    <section id='services' className='section services on-dark'>
      <div className='wrap'>
        <div className='sec-head reveal'>
          <p className='eyebrow'>01 — Services</p>
          <h2 className='display'>
            COMPREHENSIVE <em>YACHTING SUPPORT SERVICES</em>
          </h2>
          <p>Your one-stop solution for professional yachting operations in Thailand</p>
        </div>

        <ul className='cards'>
          {SERVICES.map((service, index) => {
            const Icon = service.icon
            return (
              <li key={service.id} className='card reveal'>
                <div className='card-top'>
                  <span className='card-no'>{String(index + 1).padStart(2, '0')}</span>
                  <Icon aria-hidden='true' />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <details>
                  <summary>Details</summary>
                  <p>{service.details}</p>
                </details>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
