import { useEffect, useRef } from 'react'

export function CRTOverlay() {
  const turbRef = useRef<SVGFETurbulenceElement>(null)

  // Vary the displacement pattern every 2s for organic tearing
  useEffect(() => {
    const interval = setInterval(() => {
      if (turbRef.current) {
        turbRef.current.setAttribute('seed', String(Math.floor(Math.random() * 1000)))
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9999 }}>
      {/* SVG displacement filter — shifts content pixels horizontally per-scanline */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="crt-tear" x="-5%" y="0" width="110%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.0001 0.2"
              numOctaves="2"
              seed="42"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="10"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <div className="crt-tear" />
      <div className="absolute inset-0 crt-scanlines" />
      <div className="absolute inset-0 crt-vignette" />
      <div className="absolute inset-0 crt-glitch" />
    </div>
  )
}
