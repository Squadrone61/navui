const iconMeta: Record<string, { file: string; alt: string; filter?: string }> = {
  'file-text': { file: 'file-text.svg', alt: 'File' },
  folder: { file: 'folder.svg', alt: 'Folder' },
  globe: { file: 'globe.svg', alt: 'Link' },
  pdf: { file: 'pdf.svg', alt: 'PDF' },
  terminal: { file: 'terminal.svg', alt: 'Terminal' },
  dnd: {
    file: 'unseen-servant.svg',
    alt: 'Unseen Servant',
    filter: 'sepia(1) hue-rotate(90deg) saturate(6)',
  },
  ozkonak: { file: 'ozkonak.svg', alt: 'Ozkonak Elektrik' },
  halaqat: { file: 'halaqat.svg', alt: 'Halaqat' },
  'zu-craft': { file: 'zu-craft.svg', alt: 'Zu Craft' },
}

const fallback = iconMeta['file-text']

export function Icon({ name, size = 32 }: { name: string; size?: number }) {
  const meta = iconMeta[name] ?? fallback
  return (
    <img
      src={`/icons/${meta.file}`}
      width={size}
      height={size}
      alt={meta.alt}
      style={meta.filter ? { filter: meta.filter } : undefined}
    />
  )
}
