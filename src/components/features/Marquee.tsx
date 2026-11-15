import { SERVICES } from '@/lib/constants'

/** Pure CSS band: loops via transform, static wrapped list under reduced motion. */
export function Marquee() {
  return (
    <div className='marquee' role='group' aria-label='Services'>
      <div className='marquee-track'>
        <ul>
          {SERVICES.map((service) => (
            <li key={service.id}>{service.title}</li>
          ))}
        </ul>
        <ul aria-hidden='true'>
          {SERVICES.map((service) => (
            <li key={service.id}>{service.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
