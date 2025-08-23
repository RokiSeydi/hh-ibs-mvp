// Simple React hook for playing a sound
import { useRef } from "react";

export function useSimpleSound(url: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function play() {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(url);
      }
      // Only try to play if the audio is successfully loaded
      if (audioRef.current.readyState > 0) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(err => {
          console.log('Sound playback failed:', err);
        });
      }
    } catch (err) {
      console.log('Sound initialization failed:', err);
    }
  }

  return play;
}
