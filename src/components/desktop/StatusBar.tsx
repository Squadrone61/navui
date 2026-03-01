import { useClock } from '../../hooks/useClock'
import { useOnlineStatus } from '../../hooks/useOnlineStatus'

export function StatusBar() {
  const { formatted } = useClock()
  const online = useOnlineStatus()

  return (
    <div
      className="absolute bottom-2 right-3 flex items-center gap-2 px-2 py-1 font-mono text-xs text-crt-green"
      style={{ zIndex: 30, opacity: 0.7 }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" aria-label={online ? 'Online' : 'Offline'}>
        <rect x="2" y="10" width="2" height="4" fill={online ? '#33ff33' : '#ffb000'} />
        <rect x="5" y="7" width="2" height="7" fill={online ? '#33ff33' : '#ffb000'} opacity={online ? 1 : 0.3} />
        <rect x="8" y="4" width="2" height="10" fill={online ? '#33ff33' : '#ffb000'} opacity={online ? 1 : 0.3} />
        <rect x="11" y="1" width="2" height="13" fill={online ? '#33ff33' : '#ffb000'} opacity={online ? 1 : 0.3} />
      </svg>
      <span>{formatted}</span>
    </div>
  )
}
