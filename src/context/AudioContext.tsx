import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { ArchiveItem } from '../types';

export type PlaybackStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'unavailable';

interface AudioContextType {
  activeTrack: ArchiveItem | null;
  isPlaying: boolean;
  playbackStatus: PlaybackStatus;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  hasRealAudio: boolean;
  playTrack: (track: ArchiveItem) => void;
  pauseTrack: () => void;
  toggleTrack: (track: ArchiveItem) => void;
  stopTrack: () => void;
  seekTrack: (seconds: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTrack, setActiveTrack] = useState<ArchiveItem | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackStatus, setPlaybackStatus] = useState<PlaybackStatus>('idle');
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasRealAudio, setHasRealAudio] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize single singleton HTML5 Audio instance
  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(Math.floor(audio.duration));
      }
      setHasRealAudio(true);
      setPlaybackStatus('playing');
      setIsPlaying(true);
    };

    const handleCanPlay = () => {
      setHasRealAudio(true);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setPlaybackStatus('paused');
      setCurrentTime(0);
    };

    const handleError = () => {
      // Physical file not found or failed to load.
      // NEVER fake playback; accurately set status to unavailable.
      setHasRealAudio(false);
      setIsPlaying(false);
      setPlaybackStatus('unavailable');
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Update volume on audio element
  const setVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : clamped;
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.volume = next ? 0 : volume;
      }
      return next;
    });
  }, [volume]);

  const stopTrack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setPlaybackStatus('idle');
    setCurrentTime(0);
    setActiveTrack(null);
  }, []);

  const pauseTrack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setPlaybackStatus('paused');
  }, []);

  const playTrack = useCallback((track: ArchiveItem) => {
    // 1. Immediately halt and reset any previously playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setActiveTrack(track);
    setCurrentTime(0);

    // 2. Check if an actual source URL exists
    const audioSrc = track.mediaUrl;
    if (!audioSrc) {
      // No real physical audio deposit exists.
      // Strictly do NOT fake playback. Accurately report unavailable status.
      setHasRealAudio(false);
      setIsPlaying(false);
      setPlaybackStatus('unavailable');
      setDuration(0);
      return;
    }

    // 3. Attempt genuine playback via HTML5 Audio
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
      setPlaybackStatus('loading');
      audioRef.current.play()
        .then(() => {
          setHasRealAudio(true);
          setIsPlaying(true);
          setPlaybackStatus('playing');
        })
        .catch(() => {
          // File failed to decode or returned 404
          setHasRealAudio(false);
          setIsPlaying(false);
          setPlaybackStatus('unavailable');
        });
    } else {
      setHasRealAudio(false);
      setIsPlaying(false);
      setPlaybackStatus('unavailable');
    }
  }, []);

  const toggleTrack = useCallback((track: ArchiveItem) => {
    if (activeTrack?.id === track.id) {
      if (isPlaying) {
        pauseTrack();
      } else if (hasRealAudio && audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setPlaybackStatus('playing');
          })
          .catch(() => {
            setHasRealAudio(false);
            setIsPlaying(false);
            setPlaybackStatus('unavailable');
          });
      } else {
        // Track has no real audio file; cannot play.
        setIsPlaying(false);
        setPlaybackStatus('unavailable');
      }
    } else {
      // Switching to a new track automatically stops the previous one
      playTrack(track);
    }
  }, [activeTrack, isPlaying, hasRealAudio, pauseTrack, playTrack]);

  const seekTrack = useCallback((seconds: number) => {
    if (audioRef.current && hasRealAudio) {
      const clamped = Math.max(0, Math.min(seconds, duration));
      audioRef.current.currentTime = clamped;
      setCurrentTime(clamped);
    }
  }, [duration, hasRealAudio]);

  return (
    <AudioContext.Provider
      value={{
        activeTrack,
        isPlaying,
        playbackStatus,
        currentTime,
        duration,
        volume,
        isMuted,
        hasRealAudio,
        playTrack,
        pauseTrack,
        toggleTrack,
        stopTrack,
        seekTrack,
        setVolume,
        toggleMute,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
