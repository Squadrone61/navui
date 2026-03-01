import { FileTextIcon } from './FileTextIcon'
import { FolderIcon } from './FolderIcon'
import { GlobeIcon } from './GlobeIcon'
import { PdfIcon } from './PdfIcon'
import { TerminalIcon } from './TerminalIcon'

const iconMap: Record<string, React.FC<{ size?: number }>> = {
  'file-text': FileTextIcon,
  folder: FolderIcon,
  globe: GlobeIcon,
  pdf: PdfIcon,
  terminal: TerminalIcon,
}

export function Icon({ name, size = 32 }: { name: string; size?: number }) {
  const Component = iconMap[name] ?? FileTextIcon
  return <Component size={size} />
}
