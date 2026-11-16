import { COMPANY_INFO } from '@/lib/constants'

export function Footer() {
  return (
    <footer>
      <div className='wrap'>
        <div>
          <p className='footer-brand'>PINK LADY</p>
          <p>Premium Yachting Services</p>
        </div>
        <div>
          <p>© {new Date().getFullYear()} Pink Lady Yacht Support Services. All rights reserved.</p>
          <p>Proudly serving yacht owners and crews across Thailand's beautiful waters</p>
          <p>{COMPANY_INFO.analyticsDisclosure}</p>
        </div>
      </div>
    </footer>
  )
}
