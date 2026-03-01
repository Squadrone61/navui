import { useEffect } from 'react'
import { useWindowStore } from '../store/windowStore'
import { getFileEntry } from '../data/fileSystem'

export function useHashSync() {
  const openWindow = useWindowStore((s) => s.openWindow)
  const windows = useWindowStore((s) => s.windows)

  // On mount: read hash and open matching window
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && getFileEntry(hash)) {
      openWindow(hash)
    }
  }, [openWindow])

  // Update hash when focus changes
  useEffect(() => {
    const focused = Object.values(windows).find((w) => w.isFocused && !w.isMinimized)
    if (focused) {
      window.location.hash = focused.fileId
    } else if (Object.values(windows).length === 0) {
      history.replaceState(null, '', window.location.pathname)
    }
  }, [windows])

  // Listen for hashchange (back/forward)
  useEffect(() => {
    const handler = () => {
      const hash = window.location.hash.slice(1)
      if (hash && getFileEntry(hash)) {
        openWindow(hash)
      }
    }
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [openWindow])
}
