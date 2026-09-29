import React from 'react';
import { useAudio } from '../../context/AudioContext';
import { ArchiveItem } from '../../types';
import './ArchivalAudioPlayer.css';

interface ArchivalAudioPlayerProps {
  track: ArchiveItem;
  inline?: boolean;
  onClose?: () => void;
}

const formatSeconds = (sec: number): string => {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export const ArchivalAudioPlayer: React.FC<ArchivalAudioPlayerProps> = ({
  track,
  inline = false,
  onClose
}) => {
  const {
    activeTrack,
    isPlaying,
    playbackStatus,
    currentTime,
    duration,
    volume,
    isMuted,
    hasRealAudio,
    toggleTrack,
    seekTrack,
    setVolume,
    toggleMute
  } = useAudio();

  const isCurrentTrack = activeTrack?.id === track.id;
  const isThisPlaying = isCurrentTrack && isPlaying;
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    seekTrack(val);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
  };

  return (
    <div className={`archival-audio-player-panel ${inline ? 'player-inline' : 'player-dossier'}`}>
      {/* Archival Availability Notice Banner */}
      {(!hasRealAudio || playbackStatus === 'unavailable') && (
        <div className="audio-unavailable-banner" role="status">
          <div className="unavailable-icon-wrap" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div className="unavailable-text-group">
            <span className="unavailable-title">
              Audio file unavailable — transcript and archival metadata available
            </span>
            <span className="unavailable-subtitle">
              Physical disc in restoration (78 RPM Master Shellac). Verified verbatim archival transcript displayed below.
            </span>
          </div>
        </div>
      )}

      {/* Main Player Transport Interface */}
      <div className="audio-transport-container">
        {/* Track Info & Artwork */}
        <div className="audio-track-identity">
          <div className="audio-disc-thumb">
            <img
              src={track.thumbnailUrl || '/assets/documents/audio-broadcast-disc.svg'}
              alt={track.title}
              className={`disc-artwork ${isThisPlaying ? 'spinning-disc' : ''}`}
            />
            <div className="disc-center-hole" aria-hidden="true" />
          </div>
          <div className="audio-track-meta">
            <span className="audio-badge-live">
              {isThisPlaying ? (
                <>
                  <span className="sound-pulse-dot" />
                  PLAYING SYNTHESIZED READING
                </>
              ) : hasRealAudio ? (
                'SYNTHESIZED ARCHIVAL READING'
              ) : (
                'TRANSCRIPT & METADATA'
              )}
            </span>
            <h4 className="audio-track-title">{track.title}</h4>
            <span className="audio-source-note">
              {track.institution || 'Archival Transcript Reconstructed'} • {track.year}
            </span>
          </div>
        </div>

        {/* Central Controls: Play/Pause, Waveform & Scrubber */}
        <div className="audio-central-controls">
          <div className="audio-buttons-row">
            {/* Play/Pause Button */}
            <button
              type="button"
              className={`btn-play-pause-master ${isThisPlaying ? 'btn-state-playing' : ''} ${!hasRealAudio ? 'btn-audio-disabled' : ''}`}
              onClick={() => toggleTrack(track)}
              disabled={!hasRealAudio}
              aria-label={hasRealAudio ? (isThisPlaying ? 'Pause audio' : 'Play audio') : 'Audio unavailable'}
              title={hasRealAudio ? (isThisPlaying ? 'Pause' : 'Play') : 'Audio recording unavailable — transcript below'}
            >
              {isThisPlaying ? (
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              )}
            </button>

            {/* Sound Wave Animation Visualizer */}
            <div className={`soundwave-visualizer ${isThisPlaying ? 'animating' : ''}`} aria-hidden="true">
              <span className="wave-bar bar-1" />
              <span className="wave-bar bar-2" />
              <span className="wave-bar bar-3" />
              <span className="wave-bar bar-4" />
              <span className="wave-bar bar-5" />
              <span className="wave-bar bar-6" />
              <span className="wave-bar bar-7" />
              <span className="wave-bar bar-8" />
            </div>

            {/* Time Readout */}
            <div className="audio-time-readout">
              <span className="time-current">{formatSeconds(isCurrentTrack ? currentTime : 0)}</span>
              <span className="time-divider">/</span>
              <span className="time-total">{formatSeconds(duration || 0)}</span>
            </div>
          </div>

          {/* Progress Slider */}
          <div className="audio-progress-bar-wrap">
            <input
              type="range"
              min="0"
              max={duration || 180}
              step="1"
              value={isCurrentTrack ? currentTime : 0}
              onChange={handleSeekChange}
              className="audio-scrub-input"
              aria-label="Seek audio track"
            />
            <div
              className="audio-progress-fill"
              style={{ width: `${progressPercent}%` }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Right Controls: Volume Slider & Close if Modal */}
        <div className="audio-aux-controls">
          <div className="volume-control-group">
            <button
              type="button"
              className="btn-volume-mute"
              onClick={toggleMute}
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="volume-slider-input"
              aria-label="Volume level"
            />
          </div>

          {onClose && (
            <button
              type="button"
              className="btn-close-player"
              onClick={onClose}
              aria-label="Close audio player"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
