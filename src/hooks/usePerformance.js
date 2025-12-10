import { useEffect, useCallback } from 'react';

export const usePerformance = () => {
  useEffect(() => {
    // Отслеживание метрик загрузки
    if (window.performance) {
      const navigationTiming = performance.getEntriesByType('navigation')[0];
      
      const metrics = {
        // Время до первой отрисовки
        FCP: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
        // Время до интерактивности
        TTI: performance.now(),
        // Время загрузки страницы
        pageLoadTime: navigationTiming?.loadEventEnd - navigationTiming?.navigationStart,
        // Время до первого байта
        TTFB: navigationTiming?.responseStart - navigationTiming?.requestStart,
      };
      
      // Отправка метрик (замените на ваш сервис аналитики)
      console.log('Performance metrics:', metrics);
    }
  }, []);
  
  const measureComponentRender = useCallback((componentName) => {
    const start = performance.now();
    
    return () => {
      const end = performance.now();
      const renderTime = end - start;
      
      if (renderTime > 16) { // Больше чем один кадр при 60fps
        console.warn(`Component ${componentName} render took ${renderTime.toFixed(2)}ms`);
      }
      
      return renderTime;
    };
  }, []);
  
  return { measureComponentRender };
};