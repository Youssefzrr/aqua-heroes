import React from 'react';

interface FlagProps {
  width?: number;
  height?: number;
  className?: string;
}

export const EnglishFlag: React.FC<FlagProps> = ({ width = 24, height = 16, className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 24 16" className={className}>
    <rect width="24" height="16" fill="#012169"/>
    <g stroke="#fff" strokeWidth="1.6">
      <path d="m0 0 24 16M0 16 24 0"/>
    </g>
    <g stroke="#fff" strokeWidth="0.8">
      <path d="M12 0v16M0 8h24"/>
    </g>
    <g stroke="#C8102E" strokeWidth="0.53">
      <path d="m0 0 24 16M0 16 24 0"/>
    </g>
    <path stroke="#C8102E" strokeWidth="0.27" d="M12 0v16M0 8h24"/>
  </svg>
);

export const FrenchFlag: React.FC<FlagProps> = ({ width = 24, height = 16, className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 24 16" className={className}>
    <rect width="8" height="16" fill="#002654"/>
    <rect x="8" width="8" height="16" fill="#fff"/>
    <rect x="16" width="8" height="16" fill="#CE1126"/>
  </svg>
);

export const ArabicFlag: React.FC<FlagProps> = ({ width = 24, height = 16, className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 24 16" className={className}>
    <rect width="24" height="16" fill="#006C35"/>
    <g fill="#fff" transform="translate(4, 5)">
      <text fontSize="6" fontFamily="Arial, sans-serif" textAnchor="middle" x="8" y="4">
        لا إله إلا الله محمد رسول الله
      </text>
    </g>
    <g fill="#fff" transform="translate(4, 8)">
      <path d="M0 2 C0 0.9 0.9 0 2 0 C3.1 0 4 0.9 4 2 C4 3.1 3.1 4 2 4 C0.9 4 0 3.1 0 2 Z M2 0.5 C2.8 0.5 3.5 1.2 3.5 2 C3.5 2.8 2.8 3.5 2 3.5 C1.2 3.5 0.5 2.8 0.5 2 C0.5 1.2 1.2 0.5 2 0.5 Z"/>
      <path d="M8 1 L10 3 L8 4 L6 3 Z"/>
    </g>
  </svg>
);

// Simplified Arabic flag (green background with simple white elements)
export const ArabicFlagSimple: React.FC<FlagProps> = ({ width = 24, height = 16, className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 24 16" className={className}>
    <rect width="24" height="16" fill="#006C35"/>
    <g fill="#fff">
      <rect x="4" y="6" width="16" height="1"/>
      <circle cx="6" cy="10" r="1"/>
      <path d="M18 8 L20 10 L18 12 L16 10 Z"/>
    </g>
  </svg>
); 