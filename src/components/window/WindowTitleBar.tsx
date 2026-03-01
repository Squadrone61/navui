import { useWindowStore } from '../../store/windowStore'
import { WindowControls } from './WindowControls'

interface WindowTitleBarProps {
  windowId: string
}

export function WindowTitleBar({ windowId }: WindowTitleBarProps) {
  const window = useWindowStore((s) => s.windows[windowId])

  if (!window) return null

  return (
    <div
      className={`h-7 flex items-center justify-between px-2 select-none ${
        window.isFocused ? 'bg-crt-surface-light' : 'bg-crt-surface'
      }`}
      style={{ borderBottom: '1px solid #117711' }}
    >
      <span className="font-mono text-xs text-crt-green truncate flex-1 mr-2">
        {window.title}
      </span>
      <WindowControls windowId={windowId} />
    </div>
  )
}
