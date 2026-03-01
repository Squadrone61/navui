import { create } from 'zustand'
import type { WindowState, Position, Size } from '../types'
import { getFileEntry } from '../data/fileSystem'

interface WindowStore {
  windows: Record<string, WindowState>
  windowOrder: string[]
  nextZIndex: number
  openWindow: (fileId: string) => void
  requestClose: (windowId: string) => void
  closeWindow: (windowId: string) => void
  minimizeWindow: (windowId: string) => void
  maximizeWindow: (windowId: string) => void
  restoreWindow: (windowId: string) => void
  focusWindow: (windowId: string) => void
  updatePosition: (windowId: string, position: Position) => void
  updateSize: (windowId: string, size: Size) => void
}

function getDefaultPosition(index: number): Position {
  const offset = index * 30
  return { x: 120 + offset, y: 60 + offset }
}

export const useWindowStore = create<WindowStore>()((set, get) => ({
  windows: {},
  windowOrder: [],
  nextZIndex: 1,

  openWindow: (fileId: string) => {
    const state = get()
    // If already open, focus + restore instead of duplicate
    const existing = Object.values(state.windows).find((w) => w.fileId === fileId)
    if (existing) {
      get().focusWindow(existing.id)
      if (existing.isMinimized) {
        get().restoreWindow(existing.id)
      }
      return
    }

    const file = getFileEntry(fileId)
    if (!file) return

    const windowId = `window-${fileId}-${Date.now()}`
    const openCount = Object.keys(state.windows).length
    let position = getDefaultPosition(openCount)
    let size = file.defaultSize ?? { width: 500, height: 400 }
    const minSize = { width: 300, height: 200 }
    const isMobile = window.innerWidth <= 768
    let isMaximized = false

    if (isMobile) {
      position = { x: 0, y: 0 }
      size = { width: window.innerWidth, height: window.innerHeight }
      isMaximized = true
    }

    set((s) => ({
      windows: {
        ...s.windows,
        [windowId]: {
          id: windowId,
          fileId,
          title: file.name,
          position,
          size,
          minSize,
          isMinimized: false,
          isMaximized,
          isClosing: false,
          isFocused: true,
          zIndex: s.nextZIndex,
        },
      },
      windowOrder: [...s.windowOrder, windowId],
      nextZIndex: s.nextZIndex + 1,
    }))

    // Unfocus other windows
    set((s) => {
      const updated = { ...s.windows }
      for (const id of Object.keys(updated)) {
        if (id !== windowId) {
          updated[id] = { ...updated[id], isFocused: false }
        }
      }
      return { windows: updated }
    })
  },

  requestClose: (windowId: string) => {
    set((s) => ({
      windows: {
        ...s.windows,
        [windowId]: { ...s.windows[windowId], isClosing: true },
      },
    }))
  },

  closeWindow: (windowId: string) => {
    set((s) => {
      const { [windowId]: _, ...rest } = s.windows
      return {
        windows: rest,
        windowOrder: s.windowOrder.filter((id) => id !== windowId),
      }
    })
  },

  minimizeWindow: (windowId: string) => {
    set((s) => ({
      windows: {
        ...s.windows,
        [windowId]: { ...s.windows[windowId], isMinimized: true, isFocused: false },
      },
    }))
  },

  maximizeWindow: (windowId: string) => {
    set((s) => {
      const win = s.windows[windowId]
      if (!win) return s
      return {
        windows: {
          ...s.windows,
          [windowId]: {
            ...win,
            isMaximized: true,
            preMaximizeState: { position: win.position, size: win.size },
            position: { x: 0, y: 0 },
            size: {
              width: window.innerWidth,
              height: window.innerHeight,
            },
          },
        },
      }
    })
  },

  restoreWindow: (windowId: string) => {
    set((s) => {
      const win = s.windows[windowId]
      if (!win) return s
      if (win.isMaximized && win.preMaximizeState) {
        return {
          windows: {
            ...s.windows,
            [windowId]: {
              ...win,
              isMaximized: false,
              isMinimized: false,
              position: win.preMaximizeState.position,
              size: win.preMaximizeState.size,
              preMaximizeState: undefined,
            },
          },
        }
      }
      return {
        windows: {
          ...s.windows,
          [windowId]: { ...win, isMinimized: false },
        },
      }
    })
    get().focusWindow(windowId)
  },

  focusWindow: (windowId: string) => {
    set((s) => {
      const updated: Record<string, WindowState> = {}
      for (const [id, win] of Object.entries(s.windows)) {
        updated[id] = { ...win, isFocused: id === windowId }
      }
      if (updated[windowId]) {
        updated[windowId] = { ...updated[windowId], zIndex: s.nextZIndex }
      }
      return {
        windows: updated,
        nextZIndex: s.nextZIndex + 1,
        windowOrder: [
          ...s.windowOrder.filter((id) => id !== windowId),
          windowId,
        ],
      }
    })
  },

  updatePosition: (windowId: string, position: Position) => {
    set((s) => ({
      windows: {
        ...s.windows,
        [windowId]: { ...s.windows[windowId], position },
      },
    }))
  },

  updateSize: (windowId: string, size: Size) => {
    set((s) => ({
      windows: {
        ...s.windows,
        [windowId]: { ...s.windows[windowId], size },
      },
    }))
  },
}))
