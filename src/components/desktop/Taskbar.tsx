import { useWindowStore } from '../../store/windowStore'
import { useShallow } from 'zustand/shallow'
import { useClock } from '../../hooks/useClock'
import { useOnlineStatus } from '../../hooks/useOnlineStatus'

export function Taskbar() {
  const windows = useWindowStore((s) => s.windows)
  const windowIds = useWindowStore(useShallow((s) => Object.keys(s.windows)))
  const focusWindow = useWindowStore((s) => s.focusWindow)
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow)
  const restoreWindow = useWindowStore((s) => s.restoreWindow)
  const { formatted } = useClock()
  const online = useOnlineStatus()

  const handleClick = (id: string) => {
    const win = windows[id]
    if (!win) return
    if (win.isMinimized) {
      restoreWindow(id)
    } else if (win.isFocused) {
      minimizeWindow(id)
    } else {
      focusWindow(id)
    }
  }

  return (
    <div
      className="flex items-center h-7 px-1 bg-crt-surface select-none shrink-0"
      style={{
        borderTop: '1px solid #33ff33',
        boxShadow: 'inset 0 1px 0 #55ff55',
        zIndex: 9000,
      }}
    >
      {/* Window buttons */}
      <div className="flex items-center gap-px flex-1 overflow-hidden">
        {windowIds.map((id) => {
          const win = windows[id]
          if (!win) return null
          return (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className={`h-5 px-2 font-mono text-[10px] truncate max-w-[140px] border transition-colors ${
                win.isFocused && !win.isMinimized
                  ? 'bg-crt-surface-light text-crt-green border-crt-green-dim'
                  : 'bg-crt-bg text-crt-green-dim border-crt-green-dim hover:text-crt-green'
              }`}
              title={win.title}
            >
              {win.title}
            </button>
          )
        })}
      </div>

      {/* System tray */}
      <div className="flex items-center gap-2 px-1 font-mono text-[10px] text-crt-green" style={{ opacity: 0.7 }}>
        <svg width="12" height="12" viewBox="0 0 16 16" aria-label={online ? 'Online' : 'Offline'}>
          <rect x="2" y="10" width="2" height="4" fill={online ? '#33ff33' : '#ffb000'} />
          <rect x="5" y="7" width="2" height="7" fill={online ? '#33ff33' : '#ffb000'} opacity={online ? 1 : 0.3} />
          <rect x="8" y="4" width="2" height="10" fill={online ? '#33ff33' : '#ffb000'} opacity={online ? 1 : 0.3} />
          <rect x="11" y="1" width="2" height="13" fill={online ? '#33ff33' : '#ffb000'} opacity={online ? 1 : 0.3} />
        </svg>
        <span>{formatted}</span>
      </div>
    </div>
  )
}
