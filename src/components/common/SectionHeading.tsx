import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  eyebrow,
  align = 'left',
  className = ''
}) => {
  return (
    <div
      className={`section-heading ${className}`}
      style={{
        textAlign: align,
        marginBottom: '28px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        gap: '6px'
      }}
    >
      {eyebrow && (
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--color-gold)'
          }}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className="font-display"
        style={{
          fontSize: '2.25rem',
          lineHeight: 1.15,
          color: 'var(--color-text-primary)'
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.05rem',
            color: 'var(--color-text-secondary)',
            maxWidth: '680px',
            lineHeight: 1.5,
            marginTop: '4px'
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
