import { Link } from 'react-router-dom'
import { FiShoppingCart, FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartItems } = useCart()
  const { user, logout, isAuthenticated } = useAuth()
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  
  const navItems = [
    { name: 'Главная', path: '/' },
    { name: 'Меню', path: '/menu' },
    { name: 'Контакты', path: '/contact' },
    { name: 'О нас', path: '/about' },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          
          {/* Логотип */}
          <Link>
           <div className="flex items-center space-x-3">
              <img 
                src="/images/logo/logo.webp " 
                alt="Coffee Place" 
                className="w-12 h-12 rounded-full object-cover mr-3"
              />
              <span className="text-xl font-serif font-bold text-coffee-700 hidden md:block">
                Coffee Place
              </span>
            </div>
          </Link>

          {/* Навигация для десктопа */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-600 hover:text-coffee-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Иконки действий */}
          <div className="flex items-center space-x-4">
            
            <Link to="/cart" className="relative">
              <FiShoppingCart className="w-6 h-6 text-gray-700 hover:text-coffee-600 transition" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-coffee-500 text-white text-xs 
                      rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              // Если пользователь авторизован
              <div className="hidden md:flex items-center space-x-4">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-coffee-600 transition"
                >
                  <div className="w-8 h-8 bg-coffee-100 rounded-full flex items-center justify-center">
                    <FiUser className="w-4 h-4 text-coffee-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user?.name?.split(' ')[0]}</span>
                    <span className="text-xs text-gray-500">{user?.bonuses} бонусов</span>
                  </div>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition text-sm"
                  title="Выйти"
                >
                  <FiLogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              // Если пользователь не авторизован
              <Link 
                to="/account" 
                className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-coffee-600 transition"
              >
                <FiUser className="w-5 h-5" />
                <span>Войти</span>
              </Link>
            )}

            {/* Кнопка мобильного меню */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <div className="md:hidden border-t pt-4 pb-6">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-600 hover:text-coffee-600 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="text-gray-600 hover:text-coffee-600 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Мой профиль
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-gray-600 hover:text-red-600 py-2"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/account"
                    className="text-gray-600 hover:text-coffee-600 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Войти
                  </Link>
                  <Link
                    to="/account"
                    state={{ register: true }}
                    className="text-gray-600 hover:text-coffee-600 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Зарегистрироваться
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header