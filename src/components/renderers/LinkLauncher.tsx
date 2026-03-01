import { motion } from 'motion/react'
import { Icon } from '../../icons'
import type { FileEntry } from '../../types'

interface LinkLauncherProps {
  file: FileEntry
}

export function LinkLauncher({ file }: LinkLauncherProps) {
  const handleOpen = () => {
    if (file.url) {
      window.open(file.url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-6">
      <div className="text-crt-cyan">
        <Icon name="globe" size={48} />
      </div>

      <div className="text-center">
        <h2 className="font-pixel text-[10px] text-crt-green-bright mb-2">
          {file.name}
        </h2>
        {file.description && (
          <p className="font-mono text-xs text-crt-green-dim mb-1">
            {file.description}
          </p>
        )}
        <p className="font-mono text-[10px] text-crt-cyan">
          {file.url}
        </p>
      </div>

      <motion.button
        onClick={handleOpen}
        className="px-4 py-2 border border-crt-cyan text-crt-cyan font-mono text-sm hover:bg-crt-cyan hover:text-crt-bg transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Open in new tab →
      </motion.button>
    </div>
  )
}
