import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import type { FileEntry } from '../../types'

interface MarkdownViewerProps {
  file: FileEntry
}

export function MarkdownViewer({ file }: MarkdownViewerProps) {
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
    <div className="p-4 font-mono text-sm leading-relaxed overflow-auto h-full markdown-content">
      <Markdown
        components={{
          h1: ({ children }) => (
            <h1 className="font-pixel text-base text-crt-amber mb-4 crt-glow">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-pixel text-[10px] text-crt-amber mb-3 mt-6">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-pixel text-[9px] text-crt-amber mb-2 mt-4">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-crt-green mb-3">{children}</p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-crt-cyan hover:crt-aberration underline underline-offset-2"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="text-crt-green-bright font-bold">{children}</strong>
          ),
          ul: ({ children }) => (
            <ul className="list-none mb-3 space-y-1">{children}</ul>
          ),
          li: ({ children }) => (
            <li className="text-crt-green before:content-['>_'] before:text-crt-green-dim before:mr-2">
              {children}
            </li>
          ),
          hr: () => (
            <hr className="border-crt-green-dim my-4" />
          ),
          em: ({ children }) => (
            <em className="text-crt-green-dim italic">{children}</em>
          ),
          code: ({ children }) => (
            <code className="bg-crt-surface px-1 text-crt-cyan text-xs">
              {children}
            </code>
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  )
}
