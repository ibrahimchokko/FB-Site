"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

interface OptimizedImageProps extends Omit<ImageProps, "alt"> {
  alt: string;
  /**
   * Responsive sizes string.
   * Defaults to a two-step breakpoint tuned for Nigerian mobile-first loading.
   */
  sizes?: string;
  /** Show a low-contrast blur placeholder while loading */
  withBlur?: boolean;
  /** Aspect ratio wrapper — e.g. "aspect-[4/3]". Applied to the container div. */
  aspect?: string;
  /** Extra classes on the outer container */
  containerClassName?: string;
}

const DEFAULT_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

export default function OptimizedImage({
  alt,
  sizes = DEFAULT_SIZES,
  withBlur = true,
  aspect = "aspect-[4/3]",
  containerClassName = "",
  priority = false,
  className = "",
  ...props
}: OptimizedImageProps) {
  const [errored, setErrored] = useState(false);
  const [loaded,  setLoaded]  = useState(false);

  if (errored) {
    return (
      <div
        className={`${aspect} ${containerClassName} flex items-center justify-center bg-(--border) rounded-[var(--radius-image)]`}
        role="img"
        aria-label={alt}
      >
        <span className="text-3xl opacity-40" aria-hidden="true">🍽️</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${aspect} ${containerClassName}`}>
      {/* Blur shimmer shown until image loads */}
      {withBlur && !loaded && (
        <div
          className="absolute inset-0 bg-(--border) animate-pulse"
          aria-hidden="true"
        />
      )}
      <Image
        alt={alt}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        placeholder={withBlur ? "blur" : "empty"}
        blurDataURL={
          withBlur
            ? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSIzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjMiIGZpbGw9IiNlOGRkZDAiLz48L3N2Zz4="
            : undefined
        }
        fill
        className={`object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        {...props}
      />
    </div>
  );
}
