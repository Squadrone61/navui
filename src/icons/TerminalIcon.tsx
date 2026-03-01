export function TerminalIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="2" width="14" height="12" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="1" y="2" width="14" height="2" />
      <rect x="3" y="7" width="1" height="1" />
      <rect x="4" y="8" width="1" height="1" />
      <rect x="5" y="9" width="1" height="1" />
      <rect x="4" y="10" width="1" height="1" />
      <rect x="3" y="11" width="1" height="1" />
      <rect x="7" y="11" width="4" height="1" />
    </svg>
  )
}
