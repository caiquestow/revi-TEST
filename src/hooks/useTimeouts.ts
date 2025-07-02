import { useRef, useEffect } from 'react';

export function useTimeouts() {
  const timeoutRefs = useRef<(number | NodeJS.Timeout)[]>([]);
  const confettiTimeoutRef = useRef<number | NodeJS.Timeout | null>(null);

  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach(timeoutId => {
      clearTimeout(timeoutId);
    });
    timeoutRefs.current = [];
    
    if (confettiTimeoutRef.current) {
      clearTimeout(confettiTimeoutRef.current);
      confettiTimeoutRef.current = null;
    }
  };

  const addTimeout = (timeoutId: number | NodeJS.Timeout) => {
    timeoutRefs.current.push(timeoutId);
  };

  const setConfettiTimeout = (timeoutId: number | NodeJS.Timeout) => {
    confettiTimeoutRef.current = timeoutId;
  };

  // Cleanup ao desmontar o componente
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

  return { clearAllTimeouts, addTimeout, setConfettiTimeout };
} 