import { useState } from "react";

interface useThrottleProps {
  delay: number
}

export function useThrottle({ delay }: useThrottleProps){
  const [ timeOutId, setTimeoutId ] = useState()

  function throttle(fn: () => void) {
    if(timeOutId)
      clearTimeout(timeOutId)

    const id = setTimeout(() => {
      fn();
    }, delay);
    setTimeoutId(id)
  }

  return {
    throttle
  }
}