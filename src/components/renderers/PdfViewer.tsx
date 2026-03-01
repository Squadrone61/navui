import { motion } from 'motion/react'
import { Icon } from '../../icons'
import type { FileEntry } from '../../types'

interface PdfViewerProps {
  file: FileEntry
}

export function PdfViewer({ file }: PdfViewerProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-6">
      <div className="text-crt-green">
        <Icon name="pdf" size={48} />
      </div>

      <div className="text-center">
        <h2 className="font-pixel text-[10px] text-crt-green-bright mb-2">
          {file.name}
        </h2>
        <p className="font-mono text-xs text-crt-green-dim">
          PDF document
        </p>
      </div>

      <div className="flex gap-3">
        <motion.a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 border border-crt-green text-crt-green font-mono text-sm hover:bg-crt-green hover:text-crt-bg transition-colors inline-block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Open PDF →
        </motion.a>
        <motion.a
          href="/resume.pdf"
          download
          className="px-4 py-2 border border-crt-green-dim text-crt-green-dim font-mono text-sm hover:border-crt-green hover:text-crt-green transition-colors inline-block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Download
        </motion.a>
      </div>
    </div>
  )
}
