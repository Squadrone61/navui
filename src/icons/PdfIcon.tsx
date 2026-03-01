export function PdfIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <rect x="2" y="1" width="10" height="14" fill="none" stroke="currentColor" strokeWidth="1" />
      <polygon points="12,1 14,3 12,3" />
      <rect x="12" y="3" width="2" height="12" fill="none" stroke="currentColor" strokeWidth="1" />
      <text x="4" y="10" fontSize="4" fontFamily="monospace" fill="currentColor">PDF</text>
    </svg>
  )
}
