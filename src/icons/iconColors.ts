import type { FileType } from '../types'

export function getIconColor(type: FileType): string {
  switch (type) {
    case 'markdown':
    case 'text':
      return 'text-crt-green'
    case 'folder':
      return 'text-crt-amber'
    case 'link':
      return 'text-crt-cyan'
    case 'pdf':
      return 'text-crt-green'
    default:
      return 'text-crt-green'
  }
}
