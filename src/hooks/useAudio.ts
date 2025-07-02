import { useRef, useEffect } from 'react';

export function useAudio() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const playSound = async (type: 'attack' | 'victory') => {
    try {
      const audioContext = getAudioContext();
      
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      if (type === 'attack') {
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.1;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
      } else if (type === 'victory') {
        oscillator.frequency.value = 523;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.1;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
      }
      
      console.log(`Som tocado: ${type}`);
    } catch (error) {
      console.warn('Erro ao tocar som:', error);
    }
  };

  // Inicializa o contexto de áudio na primeira interação
  useEffect(() => {
    const handleUserInteraction = () => {
      const audioContext = getAudioContext();
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  return { playSound };
} 