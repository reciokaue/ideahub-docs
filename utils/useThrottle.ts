import { useState } from 'react';

type useThrottleProps = {
  delay: number;
};

export function useThrottle({ delay }: useThrottleProps) {
  const [timeOutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  function throttle(fn: () => void) {
    if (timeOutId) clearTimeout(timeOutId);

    const id = setTimeout(() => {
      fn();
    }, delay);

    setTimeoutId(id);
  }

  return {
    throttle,
  };
}
