import logo192Png from '@/assets/logo/pink-lady-logo-192.png'
import logo384Png from '@/assets/logo/pink-lady-logo-384.png'
import logo192 from '@/assets/logo/pink-lady-logo-192.webp'
import logo384 from '@/assets/logo/pink-lady-logo-384.webp'

type BrandLogoProps = {
  className?: string
  style?: React.CSSProperties
  alt?: string
}

export function BrandLogo({ className, style, alt = 'Pink Lady' }: BrandLogoProps) {
  return (
    <picture>
      <source type='image/webp' srcSet={`${logo192} 192w, ${logo384} 384w`} sizes='(max-width: 1023px) 128px, 192px' />
      <img
        src={logo384Png}
        srcSet={`${logo192Png} 192w, ${logo384Png} 384w`}
        sizes='(max-width: 1023px) 128px, 192px'
        width={384}
        height={384}
        alt={alt}
        className={className}
        style={style}
        decoding='async'
      />
    </picture>
  )
}
