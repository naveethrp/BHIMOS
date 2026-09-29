import React, { useEffect, useState, useCallback, useRef } from 'react';
import { PrimaryButton, SecondaryButton } from './Buttons';
import './KioskInactivityModal.css';

interface KioskInactivityModalProps {
  onTimeoutReturnHome: () => void;
  inactivityThresholdSeconds?: number;
  countdownSeconds?: number;
}

export const KioskInactivityModal: React.FC<KioskInactivityModalProps> = ({
  onTimeoutReturnHome,
  inactivityThresholdSeconds = 75,
  countdownSeconds = 15
}) => {
  // Only activate in explicit kiosk installations. On normal web, do not interrupt readers.
  const isKioskEnabled = import.meta.env.VITE_ENABLE_KIOSK_MODE === 'true';
  const effectiveTimeout = Number(import.meta.env.VITE_KIOSK_TIMEOUT_SECONDS) || inactivityThresholdSeconds;

  const [showWarning, setShowWarning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(countdownSeconds);
  const warningTimerRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const resetInactivityTimer = useCallback(() => {
    if (!isKioskEnabled || showWarning) return;

    if (warningTimerRef.current) {
      window.clearTimeout(warningTimerRef.current);
    }

    warningTimerRef.current = window.setTimeout(() => {
      setShowWarning(true);
      setRemainingTime(countdownSeconds);
    }, effectiveTimeout * 1000);
  }, [isKioskEnabled, effectiveTimeout, countdownSeconds, showWarning]);

  // Activity listeners
  useEffect(() => {
    const handleActivity = () => resetInactivityTimer();
    window.addEventListener('pointerdown', handleActivity);
    window.addEventListener('keydown', handleActivity);

    resetInactivityTimer();

    return () => {
      window.removeEventListener('pointerdown', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      if (warningTimerRef.current) window.clearTimeout(warningTimerRef.current);
    };
  }, [resetInactivityTimer]);

  // Countdown timer when warning is shown
  useEffect(() => {
    if (!showWarning) return;

    countdownIntervalRef.current = window.setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          if (countdownIntervalRef.current) window.clearInterval(countdownIntervalRef.current);
          setShowWarning(false);
          onTimeoutReturnHome();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownIntervalRef.current) window.clearInterval(countdownIntervalRef.current);
    };
  }, [showWarning, onTimeoutReturnHome]);

  // Focus management for modal
  useEffect(() => {
    if (showWarning && modalRef.current) {
      modalRef.current.focus();
    }
  }, [showWarning]);

  const handleContinueExploring = () => {
    setShowWarning(false);
    resetInactivityTimer();
  };

  const handleReturnHomeNow = () => {
    setShowWarning(false);
    onTimeoutReturnHome();
  };

  if (!isKioskEnabled || !showWarning) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="kiosk-idle-title"
      aria-describedby="kiosk-idle-desc"
      className="kiosk-inactivity-modal-backdrop"
      tabIndex={-1}
    >
      <div className="kiosk-inactivity-modal-card">
        <span className="kiosk-idle-eyebrow" id="kiosk-idle-eyebrow">
          Kiosk Session Idle
        </span>
        <h3 className="font-display" id="kiosk-idle-title">
          Still Exploring?
        </h3>
        <p id="kiosk-idle-desc" className="kiosk-idle-desc">
          To prepare for the next visitor, the kiosk will return to the home screen in
          <strong className="kiosk-idle-countdown">{remainingTime}s</strong>.
        </p>

        <div className="kiosk-idle-actions">
          <PrimaryButton onClick={handleContinueExploring} size="large">
            Continue Exploring
          </PrimaryButton>
          <SecondaryButton onClick={handleReturnHomeNow} size="large">
            Reset to Home
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};