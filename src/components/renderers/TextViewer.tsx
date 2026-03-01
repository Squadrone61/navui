import { useEffect, useState } from 'react'
import type { FileEntry } from '../../types'

interface TextViewerProps {
  file: FileEntry
}

export function TextViewer({ file }: TextViewerProps) {
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (file.content) {
      setContent(file.content)
      setLoading(false)
    } else if (file.contentModule) {
      file.contentModule().then((mod) => {
        setContent(mod.default)
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [file])

  if (loading) {
    return (
      <div className="p-4 font-mono text-sm text-crt-green-dim animate-pulse">
        Loading...
      </div>
    )
  }

  return (
    <div className="p-4 h-full overflow-auto">
      <pre className="font-mono text-sm text-crt-green whitespace-pre-wrap leading-relaxed">
        {content}
      </pre>
    </div>
  )
}
