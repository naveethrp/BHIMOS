import React, { useEffect, useState, useCallback, useRef } from 'react';
import { PrimaryButton, SecondaryButton } from './Buttons';

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
  const [showWarning, setShowWarning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(countdownSeconds);
  const warningTimerRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (showWarning) return; // Warning already active, do not cancel via background movement

    if (warningTimerRef.current) {
      window.clearTimeout(warningTimerRef.current);
    }

    warningTimerRef.current = window.setTimeout(() => {
      setShowWarning(true);
      setRemainingTime(countdownSeconds);
    }, inactivityThresholdSeconds * 1000);
  }, [inactivityThresholdSeconds, countdownSeconds, showWarning]);

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

  const handleContinueExploring = () => {
    setShowWarning(false);
    resetInactivityTimer();
  };

  const handleReturnHomeNow = () => {
    setShowWarning(false);
    onTimeoutReturnHome();
  };

  if (!showWarning) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(6, 29, 43, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--color-paper-light)',
          border: '2px solid var(--color-gold)',
          borderRadius: 'var(--border-radius-xl)',
          padding: '36px',
          maxWidth: '520px',
          width: '100%',
          boxShadow: '0 16px 36px rgba(0, 0, 0, 0.4)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--color-gold)'
          }}
        >
          Kiosk Session Idle
        </span>
        <h3
          className="font-display"
          style={{
            fontSize: '1.75rem',
            color: 'var(--color-text-primary)',
            margin: 0
          }}
        >
          Still Exploring?
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.05rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.5,
            margin: 0
          }}
        >
          To prepare for the next visitor, the kiosk will return to the home screen in{' '}
          <strong style={{ color: 'var(--color-navy)', fontSize: '1.2rem' }}>
            {remainingTime}s
          </strong>.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '12px',
            width: '100%',
            justifyContent: 'center'
          }}
        >
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
