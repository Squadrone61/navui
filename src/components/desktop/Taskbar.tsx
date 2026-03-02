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
        <a href="https://github.com/Squadrone61/navui" rel="noopener noreferrer" className="flex items-center hover:opacity-100 opacity-70 transition-opacity">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="#33ff33" aria-label="GitHub">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
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
