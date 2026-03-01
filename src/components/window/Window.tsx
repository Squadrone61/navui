import { useWindowStore } from '../../store/windowStore'
import { WindowTitleBar } from './WindowTitleBar'
import { WindowContent } from './WindowContent'
import { useResize } from '../../hooks/useResize'
import { useRetroDrag } from '../../hooks/useRetroDrag'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useCallback } from 'react'
import type { Position, Size } from '../../types'

interface WindowProps {
  windowId: string
}

export function Window({ windowId }: WindowProps) {
  const win = useWindowStore((s) => s.windows[windowId])
  const focusWindow = useWindowStore((s) => s.focusWindow)
  const updatePosition = useWindowStore((s) => s.updatePosition)
  const updateSize = useWindowStore((s) => s.updateSize)
  const closeWindow = useWindowStore((s) => s.closeWindow)
  const isMobile = useIsMobile()

  const onResize = useCallback(
    (size: Size) => updateSize(windowId, size),
    [windowId, updateSize]
  )

  const onDragMove = useCallback(
    (pos: Position) => updatePosition(windowId, pos),
    [windowId, updatePosition]
  )

  const { onResizeStart } = useResize({
    minSize: win?.minSize ?? { width: 300, height: 200 },
    onResize,
    currentSize: win?.size ?? { width: 500, height: 400 },
  })

  const { onDragStart } = useRetroDrag({
    position: win?.position ?? { x: 100, y: 100 },
    onMove: onDragMove,
    disabled: win?.isMaximized,
  })

  const handleAnimationEnd = useCallback(() => {
    if (win?.isClosing) {
      closeWindow(windowId)
    }
  }, [win?.isClosing, windowId, closeWindow])

  if (!win || win.isMinimized) return null

  const mobileStyle = isMobile
    ? { left: 0, top: 0, width: '100vw', height: '100vh' }
    : { left: win.position.x, top: win.position.y, width: win.size.width, height: win.size.height }

  return (
    <div
      className={win.isClosing ? 'window-close' : 'window-open'}
      onAnimationEnd={handleAnimationEnd}
      style={{
        position: 'absolute',
        ...mobileStyle,
        zIndex: win.zIndex,
        border: '1px solid #33ff33',
        boxShadow: 'inset 1px 1px 0 #55ff55, inset -1px -1px 0 #117711',
        display: 'flex',
        flexDirection: 'column',
        background: '#0a0a0a',
        pointerEvents: win.isClosing ? 'none' : 'auto',
      }}
      onPointerDown={() => !win.isClosing && focusWindow(windowId)}
    >
      {/* Drag handle — title bar */}
      <div
        onPointerDown={isMobile ? undefined : onDragStart}
        style={{ touchAction: 'none' }}
      >
        <WindowTitleBar windowId={windowId} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <WindowContent windowId={windowId} />
      </div>

      {/* Resize handle */}
      {!win.isMaximized && !isMobile && (
        <div
          onMouseDown={onResizeStart}
          className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize"
          style={{
            background:
              'linear-gradient(135deg, transparent 50%, #33ff33 50%, #33ff33 60%, transparent 60%, transparent 70%, #33ff33 70%)',
          }}
        />
      )}
    </div>
  )
}
