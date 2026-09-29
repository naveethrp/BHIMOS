import React from 'react';
import './Buttons.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  size?: 'standard' | 'large';
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
  loadingText?: string;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  icon,
  size = 'standard',
  className = '',
  isLoading = false,
  loadingText = 'Processing…',
  disabled,
  ...props
}) => {
  const isDisabled = disabled || isLoading;
  return (
    <button
      className={`btn-archival-primary btn-${size} ${className}`}
      disabled={isDisabled}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="btn-spinner" aria-hidden="true" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          <span>{children}</span>
          {icon ? <span className="btn-icon">{icon}</span> : <span className="btn-arrow">→</span>}
        </>
      )}
    </button>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({
  children,
  icon,
  size = 'standard',
  className = '',
  isLoading = false,
  loadingText = 'Processing…',
  disabled,
  ...props
}) => {
  const isDisabled = disabled || isLoading;
  return (
    <button
      className={`btn-archival-secondary btn-${size} ${className}`}
      disabled={isDisabled}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="btn-spinner" aria-hidden="true" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          {icon && <span className="btn-icon-prefix">{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

export const GhostButton: React.FC<ButtonProps> = ({
  children,
  icon,
  size = 'standard',
  className = '',
  isLoading = false,
  loadingText = 'Processing…',
  disabled,
  ...props
}) => {
  const isDisabled = disabled || isLoading;
  return (
    <button
      className={`btn-archival-ghost btn-${size} ${className}`}
      disabled={isDisabled}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="btn-spinner" aria-hidden="true" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          {icon && <span className="btn-icon-prefix">{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};