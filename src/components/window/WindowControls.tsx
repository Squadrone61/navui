import { useWindowStore } from '../../store/windowStore'
import { useIsMobile } from '../../hooks/useIsMobile'

interface WindowControlsProps {
  windowId: string
}

export function WindowControls({ windowId }: WindowControlsProps) {
  const isMaximized = useWindowStore((s) => s.windows[windowId]?.isMaximized)
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow)
  const maximizeWindow = useWindowStore((s) => s.maximizeWindow)
  const restoreWindow = useWindowStore((s) => s.restoreWindow)
  const requestClose = useWindowStore((s) => s.requestClose)
  const isMobile = useIsMobile()

  const btnClass =
    'w-4 h-4 flex items-center justify-center text-crt-green hover:text-crt-bg hover:bg-crt-green font-mono text-xs leading-none transition-colors'

  return (
    <div className="flex items-center gap-px">
      {!isMobile && (
        <>
          <button
            className={btnClass}
            onClick={(e) => { e.stopPropagation(); minimizeWindow(windowId) }}
            title="Minimize"
          >
            _
          </button>
          <button
            className={btnClass}
            onClick={(e) => {
              e.stopPropagation()
              isMaximized ? restoreWindow(windowId) : maximizeWindow(windowId)
            }}
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            {isMaximized ? '◱' : '□'}
          </button>
        </>
      )}
      <button
        className={`${btnClass} hover:bg-red-600 hover:text-white`}
        onClick={(e) => { e.stopPropagation(); requestClose(windowId) }}
        title="Close"
      >
        ×
      </button>
    </div>
  )
}
