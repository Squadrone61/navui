import { useState, useEffect } from 'react'

export function useClock() {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    // Sync to the next minute boundary
    const now = new Date()
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds()

    const timeout = setTimeout(() => {
      setTime(new Date())
      // Then update every 60s
      const interval = setInterval(() => setTime(new Date()), 60_000)
      return () => clearInterval(interval)
    }, msUntilNextMinute)

    return () => clearTimeout(timeout)
  }, [])

  const formatted = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  const formatted24 = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return { formatted, formatted24, time }
}
