import logo192Png from '@/assets/logo/pink-lady-logo-192.png'
import logo192 from '@/assets/logo/pink-lady-logo-192.webp'
import logo384Png from '@/assets/logo/pink-lady-logo-384.png'
import logo384 from '@/assets/logo/pink-lady-logo-384.webp'

type BrandLogoProps = {
  className?: string
  alt?: string
  /** Rendered CSS width hint for srcset selection. */
  sizes?: string
}

export function BrandLogo({ className, alt = 'Pink Lady', sizes = '48px' }: BrandLogoProps) {
  return (
    <picture>
      <source type='image/webp' srcSet={`${logo192} 192w, ${logo384} 384w`} sizes={sizes} />
      <img
        src={logo384Png}
        srcSet={`${logo192Png} 192w, ${logo384Png} 384w`}
        sizes={sizes}
        width={384}
        height={384}
        alt={alt}
        className={className}
        decoding='async'
      />
    </picture>
  )
}
