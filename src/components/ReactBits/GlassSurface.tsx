'use client';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface GlassSurfaceProps {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  backgroundOpacity?: number;
  saturation?: number;
  className?: string;
  style?: React.CSSProperties;
}

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return isDark;
};

const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  width = '100%',
  height = '100%',
  borderRadius = 20,
  blur = 11,
  backgroundOpacity = 0.1,
  saturation = 1,
  className = '',
  style = {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDarkMode = useDarkMode();

  const getContainerStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      ...style,
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      borderRadius: `${borderRadius}px`,
    };

    const supportsBackdropFilter = () => {
      if (typeof window === 'undefined') return false;
      return CSS.supports('backdrop-filter', 'blur(10px)');
    };

    if (supportsBackdropFilter()) {
      return {
        ...baseStyles,
        background: isDarkMode 
          ? `rgba(0, 0, 0, ${backgroundOpacity})` 
          : `rgba(255, 255, 255, ${backgroundOpacity})`,
        backdropFilter: `blur(${blur}px) saturate(${saturation})`,
        WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation})`,
        border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        boxShadow: isDarkMode
          ? `0 0 0 1px rgba(255, 255, 255, 0.05) inset, 0 8px 32px rgba(0, 0, 0, 0.3)`
          : `0 0 0 1px rgba(0, 0, 0, 0.05) inset, 0 8px 32px rgba(0, 0, 0, 0.1)`
      };
    } else {
        return {
            ...baseStyles,
            background: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
        };
    }
  };

  const focusVisibleClasses = isDarkMode
    ? 'focus-visible:outline-2 focus-visible:outline-[#0A84FF] focus-visible:outline-offset-2'
    : 'focus-visible:outline-2 focus-visible:outline-[#007AFF] focus-visible:outline-offset-2';

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex flex-row overflow-hidden transition-all duration-[260ms] ease-out",
        focusVisibleClasses,
        className
      )}
      style={getContainerStyles()}
    >
      <div className="relative z-10 w-full h-full flex flex-row overflow-hidden rounded-[inherit] pointer-events-auto">
        {children}
      </div>
    </div>
  );
};

export default GlassSurface;
