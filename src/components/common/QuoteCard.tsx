import React from 'react';
import './QuoteCard.css';

interface QuoteCardProps {
  quote: string;
  author?: string;
  variant?: 'paper' | 'navy' | 'ochre';
  className?: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  author = 'Dr. B. R. Ambedkar',
  variant = 'paper',
  className = ''
}) => {
  return (
    <figure className={`quote-card quote-card-${variant} ${className}`}>
      <span className="quote-mark" aria-hidden="true">“</span>
      <blockquote className="quote-text font-display">
        {quote}
      </blockquote>
      <figcaption className="quote-author">
        — {author}
      </figcaption>
    </figure>
  );
};
