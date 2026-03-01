import { getFileEntry } from '../../data/fileSystem'
import { useWindowStore } from '../../store/windowStore'
import { MarkdownViewer } from '../renderers/MarkdownViewer'
import { TextViewer } from '../renderers/TextViewer'
import { FileExplorer } from '../renderers/FileExplorer'
import { LinkLauncher } from '../renderers/LinkLauncher'
import { PdfViewer } from '../renderers/PdfViewer'

interface WindowContentProps {
  windowId: string
}

export function WindowContent({ windowId }: WindowContentProps) {
  const fileId = useWindowStore((s) => s.windows[windowId]?.fileId)
  const file = fileId ? getFileEntry(fileId) : undefined

  if (!file) {
    return (
      <div className="flex items-center justify-center h-full text-crt-green-dim font-mono text-sm">
        File not found
      </div>
    )
  }

  switch (file.type) {
    case 'markdown':
      return <MarkdownViewer file={file} />
    case 'text':
      return <TextViewer file={file} />
    case 'folder':
      return <FileExplorer file={file} />
    case 'link':
      return <LinkLauncher file={file} />
    case 'pdf':
      return <PdfViewer file={file} />
    default:
      return (
        <div className="p-4 font-mono text-sm text-crt-green-dim">
          Unknown file type
        </div>
      )
  }
}
