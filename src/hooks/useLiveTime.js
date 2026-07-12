import { useState, useEffect } from 'react'

export function useLiveTime(timezone = 'Asia/Colombo') {
  const [time, setTime] = useState('')

  useEffect(() => {
    function update() {
      const t = new Date().toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
      })
      setTime(t)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [timezone])

  return time
}
