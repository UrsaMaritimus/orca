import { useRef, useEffect } from 'react'

export const useIsMountedRef = () => {
  const isMounted = useRef<boolean>(true)

  useEffect(
    () => () => {
      isMounted.current = false
    },
    [],
  )

  return isMounted
}
