export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface WindowState {
  id: string
  fileId: string
  title: string
  position: Position
  size: Size
  minSize: Size
  isMinimized: boolean
  isMaximized: boolean
  isFocused: boolean
  zIndex: number
  isClosing: boolean
  preMaximizeState?: { position: Position; size: Size }
}

export type FileType = 'markdown' | 'text' | 'folder' | 'link' | 'pdf'

export interface FileEntry {
  id: string
  name: string
  type: FileType
  path: string
  parentId?: string
  icon: string
  content?: string
  contentModule?: () => Promise<{ default: string }>
  children?: string[]
  url?: string
  description?: string
  defaultSize?: Size
  showOnDesktop?: boolean
  desktopOrder?: number
}
