export function FolderIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="3" width="5" height="2" />
      <rect x="1" y="4" width="14" height="10" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="2" y="5" width="12" height="8" opacity="0.15" />
    </svg>
  )
}
