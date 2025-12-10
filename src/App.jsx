// App.jsx
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';

// Ленивая загрузка страниц
const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Account = lazy(() => import('./pages/Account'));
const Profile = lazy(() => import('./pages/Profile'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Layout>
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <LoadingSpinner size="lg" />
            </div>
          }>
            <Routes>
              {/* Публичные маршруты */}
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/account" element={<Account />} />
              
              {/* Защищенные маршруты */}
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
            </Routes>
          </Suspense>
        </Layout>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;