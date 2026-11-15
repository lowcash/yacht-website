import { SERVICES } from '@/lib/constants'

/** Static pink band listing the services. No animation. */
export function ServiceStrip() {
  return (
    <div className='strip' role='group' aria-label='Services'>
      <ul>
        {SERVICES.map((service) => (
          <li key={service.id}>{service.title}</li>
        ))}
      </ul>
    </div>
  )
}
