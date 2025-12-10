const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 border-4 border-coffee-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-coffee-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;