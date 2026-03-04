import { DndIcon } from './DndIcon'
import { FileTextIcon } from './FileTextIcon'
import { FolderIcon } from './FolderIcon'
import { GlobeIcon } from './GlobeIcon'
import { HalaqatIcon } from './HalaqatIcon'
import { OzkonakIcon } from './OzkonakIcon'
import { PdfIcon } from './PdfIcon'
import { TerminalIcon } from './TerminalIcon'
import { ZuCraftIcon } from './ZuCraftIcon'

const iconMap: Record<string, React.FC<{ size?: number }>> = {
  'file-text': FileTextIcon,
  folder: FolderIcon,
  globe: GlobeIcon,
  pdf: PdfIcon,
  terminal: TerminalIcon,
  dnd: DndIcon,
  ozkonak: OzkonakIcon,
  halaqat: HalaqatIcon,
  'zu-craft': ZuCraftIcon,
}

export function Icon({ name, size = 32 }: { name: string; size?: number }) {
  const Component = iconMap[name] ?? FileTextIcon
  return <Component size={size} />
}
