import { useWindowStore } from '../../store/windowStore'
import { useHashSync } from '../../hooks/useHashSync'
import { Window } from './Window'

export function WindowManager() {
  useHashSync()
  const windows = useWindowStore((s) => s.windows)

  // Use stable key order — z-index handles visual stacking.
  // Avoid ordering by windowOrder, which changes on focus and
  // causes React to reorder DOM nodes, restarting CSS animations.
  const visibleIds = Object.keys(windows).filter((id) => !windows[id].isMinimized)

  return (
    <>
      {visibleIds.map((id) => (
        <Window key={id} windowId={id} />
      ))}
    </>
  )
}
