import React from 'react';
import { SymbolType, SymbolDef } from '../types';

export const SYMBOL_DEFINITIONS: Record<SymbolType, SymbolDef> = {
  modak: {
    id: 'modak',
    name: 'Modak',
    color: '#D97706',
  },
  diya: {
    id: 'diya',
    name: 'Diya',
    color: '#EA580C',
  },
  flower: {
    id: 'flower',
    name: 'Flower',
    color: '#E11D48',
  },
  durva: {
    id: 'durva',
    name: 'Durva Grass',
    color: '#16A34A',
  },
  dhol: {
    id: 'dhol',
    name: 'Dhol',
    color: '#9333EA',
  },
  kalash: {
    id: 'kalash',
    name: 'Kalash',
    color: '#CA8A04',
  },
  coconut: {
    id: 'coconut',
    name: 'Coconut',
    color: '#854D0E',
  },
  laddu: {
    id: 'laddu',
    name: 'Laddu',
    color: '#EA580C',
  },
  lotus: {
    id: 'lotus',
    name: 'Lotus',
    color: '#EC4899',
  },
  mushak: {
    id: 'mushak',
    name: 'Mushak',
    color: '#4B5563',
  },
  ganesh: {
    id: 'ganesh',
    name: 'Ganesha Symbol',
    color: '#B91C1C',
  },
  pomegranate: {
    id: 'pomegranate',
    name: 'Pomegranate',
    color: '#BE123C',
  },
  mango: {
    id: 'mango',
    name: 'Mango',
    color: '#EAB308',
  },
  lamp: {
    id: 'lamp',
    name: 'Festival Lamp',
    color: '#D97706',
  },
};

interface IconProps {
  symbol: SymbolType;
  className?: string;
  size?: number;
}

export const FestiveIcon: React.FC<IconProps> = ({ symbol, className = 'w-10 h-10', size = 40 }) => {
  switch (symbol) {
    case 'modak':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="modakGrad" x1="16" y1="56" x2="48" y2="12" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="45%" stopColor="#FBBF24" />
              <stop offset="85%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#FFFBEB" />
            </linearGradient>
            <linearGradient id="modakShade" x1="32" y1="12" x2="32" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#B45309" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#92400E" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <ellipse cx="32" cy="56" rx="20" ry="4" fill="#B45309" fillOpacity="0.25" />
          <path
            d="M32 10C32 10 18 26 16 40C14 51 22 56 32 56C42 56 50 51 48 40C46 26 32 10 32 10Z"
            fill="url(#modakGrad)"
            stroke="#B45309"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M32 10V56" stroke="url(#modakShade)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M32 11C28 22 23 35 22 53" stroke="url(#modakShade)" strokeWidth="2" strokeLinecap="round" />
          <path d="M32 11C36 22 41 35 42 53" stroke="url(#modakShade)" strokeWidth="2" strokeLinecap="round" />
          <path d="M32 14C23 27 17 38 17 48" stroke="url(#modakShade)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M32 14C41 27 47 38 47 48" stroke="url(#modakShade)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="32" cy="11" r="2.5" fill="#DC2626" />
        </svg>
      );

    case 'diya':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="flameGrad" x1="32" y1="30" x2="32" y2="8" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="40%" stopColor="#F97316" />
              <stop offset="75%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#FEF08A" />
            </linearGradient>
            <linearGradient id="diyaPot" x1="12" y1="36" x2="52" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#B45309" />
              <stop offset="50%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
          </defs>
          <ellipse cx="32" cy="54" rx="20" ry="3.5" fill="#78350F" fillOpacity="0.25" />
          <path
            d="M12 36C12 48 20 54 32 54C44 54 52 48 52 36C46 39 38 40 32 40C26 40 18 39 12 36Z"
            fill="url(#diyaPot)"
            stroke="#78350F"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <ellipse cx="32" cy="36" rx="20" ry="4" fill="#F59E0B" stroke="#78350F" strokeWidth="2" />
          <ellipse cx="32" cy="36" rx="16" ry="2.5" fill="#B45309" />
          <path
            d="M32 8C32 8 23 20 23 27C23 32 27 35 32 35C37 35 41 32 41 27C41 20 32 8 32 8Z"
            fill="url(#flameGrad)"
          />
          <path
            d="M32 16C32 16 27 23 27 27C27 30 29 32 32 32C35 32 37 30 37 27C37 23 32 16 32 16Z"
            fill="#FFFBEB"
          />
        </svg>
      );

    case 'flower':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="petalGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="60%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#9F1239" />
            </linearGradient>
            <radialGradient id="flowerCenter" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="70%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </radialGradient>
          </defs>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <g key={angle} transform={`rotate(${angle} 32 32)`}>
              <path
                d="M32 10C27 18 26 26 32 32C38 26 37 18 32 10Z"
                fill="url(#petalGrad)"
                stroke="#881337"
                strokeWidth="1.5"
              />
            </g>
          ))}
          {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
            <g key={angle} transform={`rotate(${angle} 32 32)`}>
              <path d="M32 16C29 22 29 28 32 32C35 28 35 22 32 16Z" fill="#F43F5E" />
            </g>
          ))}
          <circle cx="32" cy="32" r="7.5" fill="url(#flowerCenter)" stroke="#92400E" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="3" fill="#FFFBEB" />
        </svg>
      );

    case 'durva':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grassGrad" x1="16" y1="56" x2="48" y2="12" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#15803D" />
              <stop offset="60%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#86EFAC" />
            </linearGradient>
          </defs>
          <path
            d="M32 52C26 44 14 36 12 18C20 22 28 32 32 46"
            fill="url(#grassGrad)"
            stroke="#14532D"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M32 52C38 44 50 36 52 18C44 22 36 32 32 46"
            fill="url(#grassGrad)"
            stroke="#14532D"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M30 52C30 38 29 24 32 10C35 24 34 38 34 52Z"
            fill="url(#grassGrad)"
            stroke="#14532D"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <rect x="27" y="48" width="10" height="5" rx="2.5" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
          <line x1="32" y1="48" x2="32" y2="53" stroke="#FEF08A" strokeWidth="1" />
        </svg>
      );

    case 'dhol':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="drumWood" x1="12" y1="20" x2="52" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#9A3412" />
              <stop offset="50%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#7C2D12" />
            </linearGradient>
            <linearGradient id="drumLeather" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          <path
            d="M16 20C24 16 40 16 48 20C54 28 54 36 48 44C40 48 24 48 16 44C10 36 10 28 16 20Z"
            fill="url(#drumWood)"
            stroke="#5A1A05"
            strokeWidth="2"
          />
          <ellipse cx="16" cy="32" rx="4.5" ry="12" fill="url(#drumLeather)" stroke="#5A1A05" strokeWidth="1.5" />
          <ellipse cx="16" cy="32" rx="2" ry="5" fill="#451A03" />
          <ellipse cx="48" cy="32" rx="4.5" ry="12" fill="url(#drumLeather)" stroke="#5A1A05" strokeWidth="1.5" />
          <ellipse cx="48" cy="32" rx="2" ry="5" fill="#451A03" />
          <path
            d="M18 22L28 46L36 18L44 46L48 22"
            stroke="#FEF3C7"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="32" y1="17" x2="32" y2="47" stroke="#FBBF24" strokeWidth="2.5" strokeDasharray="2 2" />
        </svg>
      );

    case 'kalash':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="kalashPot" x1="16" y1="28" x2="48" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
            <linearGradient id="coconutGrad" x1="24" y1="12" x2="40" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#451A03" />
            </linearGradient>
          </defs>
          <ellipse cx="32" cy="56" rx="14" ry="3" fill="#78350F" fillOpacity="0.3" />
          <path d="M22 28C18 20 16 14 14 10C22 14 26 22 26 28Z" fill="#16A34A" stroke="#14532D" strokeWidth="1" />
          <path d="M42 28C46 20 48 14 50 10C42 14 38 22 38 28Z" fill="#16A34A" stroke="#14532D" strokeWidth="1" />
          <path d="M27 26C25 16 26 12 28 8C32 14 31 20 30 26Z" fill="#22C55E" stroke="#14532D" strokeWidth="1" />
          <path d="M37 26C39 16 38 12 36 8C32 14 33 20 34 26Z" fill="#22C55E" stroke="#14532D" strokeWidth="1" />
          <ellipse cx="32" cy="18" rx="8" ry="9" fill="url(#coconutGrad)" stroke="#291102" strokeWidth="1.5" />
          <ellipse cx="32" cy="28" rx="11" ry="3" fill="#FBBF24" stroke="#78350F" strokeWidth="1.5" />
          <path
            d="M21 28C17 34 16 42 18 48C21 53 26 55 32 55C38 55 43 53 46 48C48 42 47 34 43 28Z"
            fill="url(#kalashPot)"
            stroke="#78350F"
            strokeWidth="2"
          />
          <path
            d="M32 36V46M27 41H37M27 36H32M37 46H32M37 36V41M27 46V41"
            stroke="#DC2626"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'coconut':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cocoShell" x1="12" y1="20" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#92400E" />
              <stop offset="60%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#451A03" />
            </linearGradient>
            <linearGradient id="cocoWhite" x1="20" y1="20" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FEF3C7" />
            </linearGradient>
          </defs>
          <ellipse cx="32" cy="54" rx="18" ry="4" fill="#451A03" fillOpacity="0.2" />
          {/* Whole coconut behind */}
          <ellipse cx="26" cy="30" rx="15" ry="18" fill="url(#cocoShell)" stroke="#451A03" strokeWidth="2" />
          {/* Natural fiber texture lines */}
          <path d="M22 18C20 28 20 38 23 44" stroke="#B45309" strokeWidth="1.25" strokeLinecap="round" opacity="0.6" />
          <path d="M27 16C28 26 27 36 29 44" stroke="#B45309" strokeWidth="1.25" strokeLinecap="round" opacity="0.6" />
          <circle cx="23" cy="20" r="1.5" fill="#291102" />
          <circle cx="26" cy="18" r="1.5" fill="#291102" />
          <circle cx="29" cy="21" r="1.5" fill="#291102" />

          {/* Cut half coconut in front */}
          <ellipse cx="38" cy="38" rx="16" ry="16" fill="url(#cocoShell)" stroke="#451A03" strokeWidth="2" />
          {/* Inner white fleshy kernel */}
          <ellipse cx="38" cy="38" rx="13" ry="13" fill="url(#cocoWhite)" stroke="#D97706" strokeWidth="1.25" />
          {/* Fresh water center hollow */}
          <ellipse cx="38" cy="38" rx="8" ry="8" fill="#BAE6FD" fillOpacity="0.6" stroke="#7DD3FC" strokeWidth="1" />
          <ellipse cx="36" cy="36" rx="3" ry="1.5" fill="#FFFFFF" fillOpacity="0.8" />
        </svg>
      );

    case 'laddu':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="ladduGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="35%" stopColor="#FBBF24" />
              <stop offset="70%" stopColor="#F59E0B" />
              <stop offset="95%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#B45309" />
            </radialGradient>
          </defs>
          <ellipse cx="32" cy="54" rx="18" ry="4" fill="#B45309" fillOpacity="0.25" />
          {/* Main Round Laddu Sphere */}
          <circle cx="32" cy="32" r="21" fill="url(#ladduGrad)" stroke="#B45309" strokeWidth="2" />
          {/* Motichoor pearls / textures */}
          <circle cx="24" cy="24" r="2" fill="#FEF08A" opacity="0.8" />
          <circle cx="29" cy="20" r="2.2" fill="#FEF08A" opacity="0.9" />
          <circle cx="37" cy="23" r="2" fill="#FEF08A" opacity="0.8" />
          <circle cx="21" cy="31" r="2.2" fill="#FDE68A" opacity="0.7" />
          <circle cx="28" cy="33" r="2.5" fill="#FBBF24" />
          <circle cx="36" cy="31" r="2.2" fill="#F59E0B" />
          <circle cx="43" cy="33" r="2.5" fill="#D97706" />
          <circle cx="26" cy="40" r="2.5" fill="#D97706" />
          <circle cx="34" cy="42" r="2.5" fill="#B45309" />
          <circle cx="39" cy="39" r="2.2" fill="#B45309" />
          {/* Pistachio & Cashew pieces */}
          <ellipse cx="31" cy="26" rx="3" ry="1.5" fill="#16A34A" stroke="#14532D" strokeWidth="0.75" transform="rotate(-20 31 26)" />
          <ellipse cx="38" cy="27" rx="2.5" ry="1.2" fill="#15803D" transform="rotate(25 38 27)" />
          <ellipse cx="25" cy="27" rx="2.5" ry="1.5" fill="#FEF3C7" stroke="#CA8A04" strokeWidth="0.75" />
          {/* Silver Vark (edible silver leaf touch) */}
          <polygon points="31,18 34,21 32,24 29,21" fill="#FFFFFF" fillOpacity="0.85" />
        </svg>
      );

    case 'lotus':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lotusPetal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#DB2777" />
            </linearGradient>
            <linearGradient id="lotusBack" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBCFE8" />
              <stop offset="100%" stopColor="#BE185D" />
            </linearGradient>
          </defs>
          <ellipse cx="32" cy="54" rx="18" ry="3.5" fill="#831843" fillOpacity="0.25" />
          {/* Back side petals */}
          <path d="M12 42C12 42 12 26 22 18C24 28 28 38 32 46" fill="url(#lotusBack)" stroke="#9D174D" strokeWidth="1.5" />
          <path d="M52 42C52 42 52 26 42 18C40 28 36 38 32 46" fill="url(#lotusBack)" stroke="#9D174D" strokeWidth="1.5" />
          <path d="M22 38C22 38 24 20 32 12C40 20 42 38 42 38" fill="url(#lotusBack)" stroke="#9D174D" strokeWidth="1.5" />
          {/* Mid petals */}
          <path d="M16 46C14 36 20 24 30 22C28 32 30 42 32 50C24 50 18 48 16 46Z" fill="url(#lotusPetal)" stroke="#831843" strokeWidth="1.5" />
          <path d="M48 46C50 36 44 24 34 22C36 32 34 42 32 50C40 50 46 48 48 46Z" fill="url(#lotusPetal)" stroke="#831843" strokeWidth="1.5" />
          {/* Center primary blooming petal */}
          <path d="M32 14C27 24 26 38 32 50C38 38 37 24 32 14Z" fill="url(#lotusPetal)" stroke="#831843" strokeWidth="1.5" />
          {/* Golden pollen center */}
          <ellipse cx="32" cy="46" rx="6" ry="3" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
          <circle cx="32" cy="45" r="1.5" fill="#FEF08A" />
        </svg>
      );

    case 'mushak':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="mouseBody" x1="18" y1="20" x2="46" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6B7280" />
              <stop offset="60%" stopColor="#4B5563" />
              <stop offset="100%" stopColor="#374151" />
            </linearGradient>
          </defs>
          <path d="M18 42C12 40 8 32 10 24C11 19 15 18 17 21" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="32" cy="38" rx="14" ry="10" fill="url(#mouseBody)" stroke="#1F2937" strokeWidth="1.5" />
          <circle cx="28" cy="24" r="6.5" fill="#4B5563" stroke="#1F2937" strokeWidth="1.5" />
          <circle cx="28" cy="24" r="3.5" fill="#F472B6" />
          <circle cx="36" cy="24" r="5.5" fill="#374151" stroke="#1F2937" strokeWidth="1.5" />
          <circle cx="36" cy="24" r="2.5" fill="#F472B6" />
          <path d="M34 32L46 36C47 37 47 39 45 40L34 42Z" fill="url(#mouseBody)" stroke="#1F2937" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="47" cy="38" r="2" fill="#F43F5E" />
          <circle cx="37" cy="32" r="2" fill="#111827" />
          <circle cx="37.5" cy="31.5" r="0.75" fill="#FFFFFF" />
          <line x1="43" y1="36" x2="52" y2="33" stroke="#D1D5DB" strokeWidth="1.25" strokeLinecap="round" />
          <line x1="43" y1="39" x2="52" y2="42" stroke="#D1D5DB" strokeWidth="1.25" strokeLinecap="round" />
          <ellipse cx="40" cy="44" rx="2" ry="2.5" fill="#9CA3AF" />
          <path d="M44 43C44 41 42 39 40 39C38 39 37 41 38 43C38 45 44 45 44 43Z" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
        </svg>
      );

    case 'ganesh':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ganeshGrad" x1="16" y1="12" x2="48" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#DC2626" />
              <stop offset="40%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="26" stroke="#FBBF24" strokeWidth="2.5" strokeDasharray="4 3" opacity="0.8" />
          <path d="M26 20L32 10L38 20H26Z" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
          <circle cx="32" cy="14" r="1.5" fill="#DC2626" />
          <path d="M26 23C30 25 34 25 38 23" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
          <circle cx="32" cy="21" r="1.5" fill="#FBBF24" />
          <path
            d="M27 24C27 24 23 30 23 37C23 44 28 48 33 48C37 48 40 45 40 42C40 39 37 38 34 40C32 41 31 43 32 44"
            stroke="url(#ganeshGrad)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path d="M25 34L20 35" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="43" cy="40" r="3.5" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
        </svg>
      );

    case 'pomegranate':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="pomGrad" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#FB7185" />
              <stop offset="40%" stopColor="#E11D48" />
              <stop offset="80%" stopColor="#BE123C" />
              <stop offset="100%" stopColor="#881337" />
            </radialGradient>
            <linearGradient id="seedGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FDA4AF" />
              <stop offset="100%" stopColor="#BE123C" />
            </linearGradient>
          </defs>
          <ellipse cx="32" cy="54" rx="17" ry="4" fill="#881337" fillOpacity="0.25" />
          {/* Calyx Crown at top */}
          <path d="M25 18L23 11L28 15L32 9L36 15L41 11L39 18" fill="#9F1239" stroke="#4C0519" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Main Pomegranate Round Body */}
          <circle cx="32" cy="34" r="20" fill="url(#pomGrad)" stroke="#4C0519" strokeWidth="2" />
          {/* Cutaway window revealing glistening ruby seeds */}
          <path d="M30 24C38 24 45 29 45 38C45 45 38 47 30 45C27 41 27 28 30 24Z" fill="#FFF1F2" stroke="#BE123C" strokeWidth="1.25" />
          {/* Jewel Seeds inside */}
          <circle cx="34" cy="30" r="2.2" fill="url(#seedGrad)" />
          <circle cx="39" cy="32" r="2.2" fill="url(#seedGrad)" />
          <circle cx="33" cy="36" r="2.5" fill="url(#seedGrad)" />
          <circle cx="38" cy="37" r="2.4" fill="url(#seedGrad)" />
          <circle cx="35" cy="42" r="2.2" fill="url(#seedGrad)" />
          <circle cx="41" cy="41" r="2" fill="url(#seedGrad)" />
          {/* Seed glimmer highlights */}
          <circle cx="33.5" cy="29.5" r="0.7" fill="#FFFFFF" />
          <circle cx="32.5" cy="35.5" r="0.8" fill="#FFFFFF" />
        </svg>
      );

    case 'mango':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="mangoGrad" x1="16" y1="16" x2="48" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FACC15" />
              <stop offset="45%" stopColor="#F59E0B" />
              <stop offset="85%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
            <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>
          </defs>
          <ellipse cx="33" cy="54" rx="16" ry="4" fill="#9A3412" fillOpacity="0.25" />
          {/* Alphonso Mango curved shape */}
          <path
            d="M32 18C38 18 47 23 48 33C49 43 42 52 32 52C22 52 16 44 16 35C16 25 24 18 32 18Z"
            fill="url(#mangoGrad)"
            stroke="#9A3412"
            strokeWidth="2"
          />
          {/* Mango beak curve accent */}
          <path d="M20 40C24 49 32 51 38 49" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          {/* Stem */}
          <path d="M32 18C32 14 34 11 36 9" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
          {/* Fresh green leaf */}
          <path
            d="M35 12C43 10 49 14 51 16C47 22 41 21 35 15Z"
            fill="url(#leafGrad)"
            stroke="#14532D"
            strokeWidth="1.25"
          />
          <path d="M36 13C42 14 47 16 50 16" stroke="#BBF7D0" strokeWidth="0.8" />
          {/* Rosy blush highlight */}
          <ellipse cx="26" cy="28" rx="5" ry="7" fill="#FEF08A" fillOpacity="0.4" />
        </svg>
      );

    case 'lamp':
      return (
        <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="brassGrad" x1="16" y1="12" x2="48" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="40%" stopColor="#F59E0B" />
              <stop offset="85%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
            <linearGradient id="lampFlame" x1="32" y1="28" x2="32" y2="12" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FEF08A" />
            </linearGradient>
          </defs>
          <ellipse cx="32" cy="56" rx="16" ry="3" fill="#78350F" fillOpacity="0.3" />
          {/* Ornate Base */}
          <path d="M22 55C22 51 26 49 32 49C38 49 42 51 42 55Z" fill="url(#brassGrad)" stroke="#78350F" strokeWidth="1.5" />
          {/* Central Pillar Stem */}
          <path d="M30 49V37H34V49H30Z" fill="url(#brassGrad)" stroke="#78350F" strokeWidth="1" />
          <circle cx="32" cy="43" r="3" fill="#FDE68A" stroke="#92400E" strokeWidth="1" />
          {/* Deepam Oil Bowl / Tier */}
          <path
            d="M16 33C16 38 23 40 32 40C41 40 48 38 48 33C42 35 36 36 32 36C28 36 22 35 16 33Z"
            fill="url(#brassGrad)"
            stroke="#78350F"
            strokeWidth="1.5"
          />
          <ellipse cx="32" cy="33" rx="16" ry="3.5" fill="#FDE68A" stroke="#78350F" strokeWidth="1.5" />
          {/* Hanging Bell / Ornamental Droplets */}
          <circle cx="20" cy="38" r="2" fill="#FBBF24" stroke="#78350F" strokeWidth="0.75" />
          <circle cx="44" cy="38" r="2" fill="#FBBF24" stroke="#78350F" strokeWidth="0.75" />
          <circle cx="32" cy="41" r="2" fill="#FBBF24" stroke="#78350F" strokeWidth="0.75" />
          {/* Central Bright Flame */}
          <path
            d="M32 14C32 14 26 22 26 27C26 31 29 33 32 33C35 33 38 31 38 27C38 22 32 14 32 14Z"
            fill="url(#lampFlame)"
          />
          <path d="M32 20C32 20 29 25 29 27C29 29 30 30 32 30C34 30 35 29 35 27C35 25 32 20 32 20Z" fill="#FFFBEB" />
          {/* Hanging chain at top */}
          <path d="M32 14V6" stroke="#CA8A04" strokeWidth="1.5" strokeDasharray="1.5 1.5" />
          <circle cx="32" cy="5" r="2" stroke="#CA8A04" strokeWidth="1.5" fill="none" />
        </svg>
      );

    default:
      return null;
  }
};

/**
 * Cute, friendly, respectful Ganesha illustration for the JUDAM home screen
 */
export const GaneshaHero: React.FC<{ size?: number; className?: string }> = ({
  size = 140,
  className = '',
}) => {
  return (
    <svg
      viewBox="0 0 160 160"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Soft Aura / Halo */}
        <radialGradient id="divineHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#FDE047" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
        {/* Warm Golden Mukut (Crown) */}
        <linearGradient id="mukutGrad" x1="60" y1="20" x2="100" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="40%" stopColor="#FBBF24" />
          <stop offset="85%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        {/* Cute Ganesha Face Gradient */}
        <linearGradient id="faceGrad" x1="60" y1="45" x2="100" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FED7AA" />
          <stop offset="60%" stopColor="#FDBA74" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>
        {/* Ear Inner Soft Pink */}
        <linearGradient id="earInner" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="100%" stopColor="#FB7185" />
        </linearGradient>
      </defs>

      {/* Divine Golden Aura */}
      <circle cx="80" cy="80" r="76" fill="url(#divineHalo)" />

      {/* Big, Cute Elephant Ears */}
      {/* Left Ear */}
      <g>
        <ellipse
          cx="44"
          cy="75"
          rx="26"
          ry="30"
          fill="url(#faceGrad)"
          stroke="#C2410C"
          strokeWidth="2.5"
          transform="rotate(-8 44 75)"
        />
        <ellipse
          cx="44"
          cy="75"
          rx="17"
          ry="21"
          fill="url(#earInner)"
          fillOpacity="0.5"
          transform="rotate(-8 44 75)"
        />
        {/* Ear jewelry / earring */}
        <circle cx="34" cy="98" r="4.5" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
        <circle cx="34" cy="98" r="2" fill="#DC2626" />
      </g>

      {/* Right Ear */}
      <g>
        <ellipse
          cx="116"
          cy="75"
          rx="26"
          ry="30"
          fill="url(#faceGrad)"
          stroke="#C2410C"
          strokeWidth="2.5"
          transform="rotate(8 116 75)"
        />
        <ellipse
          cx="116"
          cy="75"
          rx="17"
          ry="21"
          fill="url(#earInner)"
          fillOpacity="0.5"
          transform="rotate(8 116 75)"
        />
        {/* Ear jewelry / earring */}
        <circle cx="126" cy="98" r="4.5" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
        <circle cx="126" cy="98" r="2" fill="#DC2626" />
      </g>

      {/* Main Cute Rounded Head */}
      <circle cx="80" cy="82" r="38" fill="url(#faceGrad)" stroke="#C2410C" strokeWidth="2.5" />

      {/* Sacred Golden Mukut / Crown */}
      <path
        d="M60 56L66 26L80 16L94 26L100 56H60Z"
        fill="url(#mukutGrad)"
        stroke="#9A3412"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Crown Inset Detailing */}
      <path d="M68 56L73 34L80 26L87 34L92 56" stroke="#FEF08A" strokeWidth="1.75" fill="none" />
      {/* Crown Red Gems */}
      <circle cx="80" cy="24" r="3.5" fill="#DC2626" stroke="#7F1D1D" strokeWidth="1" />
      <circle cx="80" cy="42" r="4" fill="#DC2626" stroke="#7F1D1D" strokeWidth="1" />
      <circle cx="70" cy="46" r="2.5" fill="#16A34A" />
      <circle cx="90" cy="46" r="2.5" fill="#16A34A" />

      {/* Auspicious Tilak & Chandan on Forehead */}
      {/* Three sacred chandan lines */}
      <path d="M68 62C76 65 84 65 92 62" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M71 59C77 61 83 61 89 59" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
      {/* Center red tilak dot / flame */}
      <path d="M80 54C78 57 78 63 80 67C82 63 82 57 80 54Z" fill="#DC2626" />
      <circle cx="80" cy="65" r="2" fill="#FEF08A" />

      {/* Friendly Twinkling Eyes */}
      {/* Left Eye */}
      <ellipse cx="66" cy="74" rx="4" ry="5" fill="#431407" />
      <circle cx="67.5" cy="72.5" r="1.5" fill="#FFFFFF" />
      <path d="M62 67C65 65 69 66 71 68" stroke="#7C2D12" strokeWidth="1.5" strokeLinecap="round" />

      {/* Right Eye */}
      <ellipse cx="94" cy="74" rx="4" ry="5" fill="#431407" />
      <circle cx="95.5" cy="72.5" r="1.5" fill="#FFFFFF" />
      <path d="M89 68C91 66 95 65 98 67" stroke="#7C2D12" strokeWidth="1.5" strokeLinecap="round" />

      {/* Rosy Friendly Cheeks */}
      <ellipse cx="58" cy="85" rx="5" ry="3" fill="#F43F5E" fillOpacity="0.45" />
      <ellipse cx="102" cy="85" rx="5" ry="3" fill="#F43F5E" fillOpacity="0.45" />

      {/* Broken Tusk on Left, Intact on Right (Auspicious iconography) */}
      <path d="M70 95L62 97" stroke="#FFFBEB" strokeWidth="3" strokeLinecap="round" />
      <path d="M90 95L99 98" stroke="#FFFBEB" strokeWidth="3" strokeLinecap="round" />

      {/* Cute Curved Trunk (Sond) reaching left towards Modak */}
      <path
        d="M78 86C78 98 72 108 67 114C61 120 54 118 53 111C52 104 57 101 62 103C66 104 67 107 65 109"
        fill="none"
        stroke="url(#faceGrad)"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M78 86C78 98 72 108 67 114C61 120 54 118 53 111C52 104 57 101 62 103C66 104 67 107 65 109"
        fill="none"
        stroke="#C2410C"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Sweet Golden Modak in reach */}
      <g transform="translate(40, 96)">
        <ellipse cx="10" cy="18" rx="8" ry="2" fill="#B45309" fillOpacity="0.3" />
        <path
          d="M10 2C10 2 4 8 3 13C2 17 5 19 10 19C15 19 18 17 17 13C16 8 10 2 10 2Z"
          fill="#FBBF24"
          stroke="#B45309"
          strokeWidth="1.25"
        />
        <path d="M10 2V19" stroke="#D97706" strokeWidth="1" strokeLinecap="round" />
        <path d="M10 3C8 7 6 12 6 18" stroke="#D97706" strokeWidth="1" strokeLinecap="round" />
        <path d="M10 3C12 7 14 12 14 18" stroke="#D97706" strokeWidth="1" strokeLinecap="round" />
        <circle cx="10" cy="3" r="1" fill="#DC2626" />
      </g>

      {/* Festive Pitambar Garland / Collar */}
      <path
        d="M56 120C64 128 96 128 104 120"
        stroke="#F59E0B"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M56 120C64 128 96 128 104 120"
        stroke="#DC2626"
        strokeWidth="2"
        strokeDasharray="4 4"
        strokeLinecap="round"
      />
      {/* Auspicious golden pendant */}
      <circle cx="80" cy="125" r="4.5" fill="#FEF08A" stroke="#B45309" strokeWidth="1.5" />
      <circle cx="80" cy="125" r="2" fill="#DC2626" />
    </svg>
  );
};
