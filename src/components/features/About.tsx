export function About() {
  return (
    <section id='about' className='section about'>
      <div className='wrap about-grid'>
        <div className='reveal'>
          <p className='eyebrow'>02 — About</p>
          <h2 className='display' style={{ marginTop: 'var(--s-4)' }}>
            ABOUT <em>PINK LADY</em> YACHT SUPPORT SERVICES
          </h2>
          <div className='copy'>
            <p>
              We pride ourselves on exceptional service, professionalism, and discretion, from the first provisioning
              order to the last departure.
            </p>
            <p>Enjoy Thailand’s stunning waters knowing your vessel is in expert hands.</p>
          </div>
        </div>

        <blockquote className='pull reveal' style={{ margin: 0 }}>
          <span>Every yacht.</span>
          <span>Every crew.</span>
          <span>Every journey expertly managed.</span>
        </blockquote>
      </div>
    </section>
  )
}
