import { useState } from 'react'
import { getChildren, getFileEntry } from '../../data/fileSystem'
import { useWindowStore } from '../../store/windowStore'
import { Icon } from '../../icons'
import { getIconColor } from '../../icons/iconColors'
import type { FileEntry } from '../../types'

interface FileExplorerProps {
  file: FileEntry
}

export function FileExplorer({ file }: FileExplorerProps) {
  const [currentFolderId, setCurrentFolderId] = useState(file.id)
  const openWindow = useWindowStore((s) => s.openWindow)

  const currentFolder = getFileEntry(currentFolderId)
  const children = getChildren(currentFolderId)

  const handleOpen = (entry: FileEntry) => {
    if (entry.type === 'folder') {
      setCurrentFolderId(entry.id)
    } else {
      openWindow(entry.id)
    }
  }

  const handleBack = () => {
    if (currentFolder?.parentId) {
      setCurrentFolderId(currentFolder.parentId)
    } else if (currentFolderId !== file.id) {
      setCurrentFolderId(file.id)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Address bar */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-crt-surface border-b border-crt-green-dim">
        <button
          onClick={handleBack}
          disabled={currentFolderId === file.id}
          className="font-mono text-xs text-crt-green hover:text-crt-green-bright disabled:text-crt-green-dim disabled:cursor-not-allowed"
        >
          {'<-'}
        </button>
        <span className="font-mono text-xs text-crt-green-dim flex-1 truncate">
          {currentFolder?.path ?? '/'}
        </span>
      </div>

      {/* File grid */}
      <div className="flex-1 p-4 overflow-auto">
        {children.length === 0 ? (
          <div className="text-crt-green-dim font-mono text-sm text-center mt-8">
            Empty folder
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {children.map((entry) => (
              <button
                key={entry.id}
                onClick={() => handleOpen(entry)}
                className={`flex flex-col items-center gap-1 p-3 hover:bg-crt-surface-light transition-colors group ${getIconColor(entry.type)}`}
              >
                <div className="group-hover:pixel-glow-pulse">
                  <Icon name={entry.icon} size={28} />
                </div>
                <span className="font-mono text-[10px] text-center truncate max-w-full">
                  {entry.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
