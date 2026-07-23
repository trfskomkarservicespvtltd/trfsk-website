import Image from 'next/image';
import { CSSProperties } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  objectPosition?: string;
}

export function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false,
  fill = false,
  objectFit = 'cover',
  objectPosition = 'center',
}: OptimizedImageProps) {
  const style: CSSProperties = fill
    ? {
        objectFit,
        objectPosition,
      }
    : {};

  return (
    <div className={`relative ${fill ? 'w-full h-full' : ''}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        fill={fill}
        style={style}
        sizes={fill ? '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px' : undefined}
        quality={85}
      />
    </div>
  );
}

// Placeholder component while images load
export function ImageSkeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse ${className}`}
      style={{
        backgroundSize: '200% 100%',
        animation: 'shimmer 2s infinite',
      }}
    />
  );
}

// Responsive image component with built-in size handling
export function ResponsiveImage({
  src,
  alt,
  className = '',
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      className={`w-full h-full ${className}`}
      priority={priority}
    />
  );
}
