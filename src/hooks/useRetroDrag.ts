import { useCallback, useRef } from 'react'
import type { Position } from '../types'

const THROTTLE_MS = 66 // ~15fps
const GRID_SIZE = 4    // snap to 4px grid

interface UseRetroDragOptions {
  position: Position
  onMove: (pos: Position) => void
  disabled?: boolean
}

export function useRetroDrag({ position, onMove, disabled }: UseRetroDragOptions) {
  const startCursor = useRef({ x: 0, y: 0 })
  const startPos = useRef({ x: 0, y: 0 })
  const lastUpdate = useRef(0)

  const onDragStart = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return
      // Don't drag when clicking window control buttons
      if ((e.target as HTMLElement).closest('button')) return

      e.preventDefault()
      startCursor.current = { x: e.clientX, y: e.clientY }
      startPos.current = { x: position.x, y: position.y }
      lastUpdate.current = 0

      const onPointerMove = (ev: PointerEvent) => {
        const now = performance.now()
        if (now - lastUpdate.current < THROTTLE_MS) return
        lastUpdate.current = now

        const dx = ev.clientX - startCursor.current.x
        const dy = ev.clientY - startCursor.current.y

        // Quantize to grid for stepped/chunky movement
        const newX = Math.round((startPos.current.x + dx) / GRID_SIZE) * GRID_SIZE
        const newY = Math.round((startPos.current.y + dy) / GRID_SIZE) * GRID_SIZE

        onMove({ x: newX, y: newY })
      }

      const onPointerUp = () => {
        document.removeEventListener('pointermove', onPointerMove)
        document.removeEventListener('pointerup', onPointerUp)
        document.body.style.userSelect = ''
      }

      document.body.style.userSelect = 'none'
      document.addEventListener('pointermove', onPointerMove)
      document.addEventListener('pointerup', onPointerUp)
    },
    [disabled, position.x, position.y, onMove]
  )

  return { onDragStart }
}
