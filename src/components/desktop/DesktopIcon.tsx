import { motion } from 'motion/react'
import { Icon } from '../../icons'
import { useWindowStore } from '../../store/windowStore'
import type { FileEntry } from '../../types'

interface DesktopIconProps {
  file: FileEntry
}

export function DesktopIcon({ file }: DesktopIconProps) {
  const openWindow = useWindowStore((s) => s.openWindow)

  return (
    <motion.button
      onClick={() => openWindow(file.id)}
      className="flex flex-col items-center gap-1 p-2 group outline-none text-crt-green"
      whileHover={{ scale: 1.08 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <div className="group-hover:pixel-glow-pulse transition-all">
        <Icon name={file.icon} size={32} />
      </div>
      <span
        className="font-pixel text-[7px] text-center leading-tight max-w-[80px] break-words"
        style={{
          textShadow: '1px 1px 2px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.5)',
        }}
      >
        {file.name}
      </span>
    </motion.button>
  )
}
