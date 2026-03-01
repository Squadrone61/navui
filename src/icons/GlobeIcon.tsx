export function GlobeIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="8" cy="8" r="6" />
      <ellipse cx="8" cy="8" rx="3" ry="6" />
      <line x1="2" y1="8" x2="14" y2="8" />
      <line x1="4" y1="5" x2="12" y2="5" />
      <line x1="4" y1="11" x2="12" y2="11" />
    </svg>
  )
}
