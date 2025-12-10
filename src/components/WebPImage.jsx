import { useState } from 'react';

const WebPImage = ({ 
  src, 
  webpSrc, 
  fallbackSrc, 
  alt, 
  className, 
  ...props 
}) => {
  const [error, setError] = useState(false);
  
  // Проверяем поддержку WebP
  const supportsWebP = () => {
    const elem = document.createElement('canvas');
    if (!!(elem.getContext && elem.getContext('2d'))) {
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  };

  const getImageSource = () => {
    if (error && fallbackSrc) {
      return fallbackSrc;
    }
    
    // Если есть webpSrc и браузер поддерживает WebP, используем его
    if (webpSrc && supportsWebP()) {
      return webpSrc;
    }
    
    // Иначе используем обычный src или fallback
    return src || fallbackSrc;
  };

  return (
    <img
      src={getImageSource()}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
};

export default WebPImage;