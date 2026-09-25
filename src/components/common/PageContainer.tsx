import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = '',
  maxWidth = 'var(--max-content-width)'
}) => {
  return (
    <main
      className={`page-container ${className}`}
      style={{
        width: '100%',
        maxWidth: maxWidth,
        margin: '0 auto',
        padding: '32px 32px 64px 32px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {children}
    </main>
  );
};
