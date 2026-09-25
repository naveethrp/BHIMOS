import React from 'react';
import './Buttons.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  size?: 'standard' | 'large';
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  icon,
  size = 'standard',
  className = '',
  ...props
}) => {
  return (
    <button
      className={`btn-archival-primary btn-${size} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon ? <span className="btn-icon">{icon}</span> : <span className="btn-arrow">→</span>}
    </button>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({
  children,
  icon,
  size = 'standard',
  className = '',
  ...props
}) => {
  return (
    <button
      className={`btn-archival-secondary btn-${size} ${className}`}
      {...props}
    >
      {icon && <span className="btn-icon-prefix">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
