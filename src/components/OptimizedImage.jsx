import { useState, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  webpSrc, 
  alt, 
  className, 
  width, 
  height, 
  lazy = true,
  priority = false,
  ...props 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Создаем blur placeholder
  const getBlurDataURL = () => {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+';
  };

  const supportsWebP = () => {
    if (typeof window === 'undefined') return false;
    
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  };

  const getBestSource = () => {
    if (error) {
      // Fallback для ошибок
      return 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80';
    }
    
    // Проверяем WebP поддержку
    if (webpSrc && supportsWebP()) {
      return webpSrc;
    }
    
    return src;
  };

  // Preload изображения с приоритетом
  useEffect(() => {
    if (priority) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = getBestSource();
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [priority, src, webpSrc]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Блюр placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {/* Основное изображение */}
      <img
        src={getBestSource()}
        alt={alt}
        width={width}
        height={height}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        className={`
          transition-opacity duration-300
          ${imageLoaded ? 'opacity-100' : 'opacity-0'}
          w-full h-full object-cover
        `}
        onLoad={() => setImageLoaded(true)}
        onError={() => setError(true)}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;