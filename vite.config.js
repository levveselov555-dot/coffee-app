import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // Автоматическое импортирование React
      jsxRuntime: 'automatic',
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        // Разделение кода на чанки
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          icons: ['react-icons/fi'],
        },
        // Оптимизация имен файлов
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Минификация
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Удаление console.log в продакшене
        drop_debugger: true,
      },
    },
    // Отключение source maps в продакшене
    sourcemap: process.env.NODE_ENV !== 'production',
  },
  server: {
    // Оптимизация для разработки
    port: 3000,
    open: true,
  },
});