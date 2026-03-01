import { useCallback, useRef } from 'react'
import type { Size } from '../types'

interface UseResizeOptions {
  minSize: Size
  onResize: (size: Size) => void
  currentSize: Size
}

export function useResize({ minSize, onResize, currentSize }: UseResizeOptions) {
  const startPos = useRef({ x: 0, y: 0 })
  const startSize = useRef({ width: 0, height: 0 })

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const dx = e.clientX - startPos.current.x
      const dy = e.clientY - startPos.current.y
      onResize({
        width: Math.max(minSize.width, startSize.current.width + dx),
        height: Math.max(minSize.height, startSize.current.height + dy),
      })
    },
    [minSize, onResize]
  )

  const handleMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    document.body.style.userSelect = ''
    document.body.style.cursor = ''
  }, [handleMouseMove])

  const onResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      startPos.current = { x: e.clientX, y: e.clientY }
      startSize.current = { width: currentSize.width, height: currentSize.height }
      document.body.style.userSelect = 'none'
      document.body.style.cursor = 'nwse-resize'
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    },
    [currentSize, handleMouseMove, handleMouseUp]
  )

  return { onResizeStart }
}
