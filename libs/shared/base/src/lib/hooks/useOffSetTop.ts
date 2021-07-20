import { useState, useEffect } from 'react'

// Sets the window page offset
export const useOffSetTop = (top?: number) => {
  const [offsetTop, setOffSetTop] = useState<boolean>(false)
  const isTop = top ? top : 100

  useEffect(() => {
    window.onscroll = function () {
      if (window.pageYOffset > isTop) {
        setOffSetTop(true)
      } else {
        setOffSetTop(false)
      }
    }
    return () => {
      window.onscroll = null
    }
  }, [isTop])

  return offsetTop
}
