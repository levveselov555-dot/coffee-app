import { Link, useNavigate } from 'react-router-dom'
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import CartItem from '../components/CartItem'

const Cart = () => {
  const { cartItems, clearCart, getTotalPrice, getTotalItems } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Функция обработки нажатия кнопки "Оформить заказ"
  const handleCheckoutClick = () => {
    if (!isAuthenticated) {
      // Если пользователь не авторизован, перенаправляем на страницу входа
      navigate('/account', { 
        state: { 
          from: '/checkout',
          message: 'Для оформления заказа требуется войти в аккаунт'
        }
      })
    } else {
      // Если пользователь авторизован, переходим к оформлению
      navigate('/checkout')
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        
        <div className="max-w-md mx-auto">
          
          <div className="text-6xl mb-6">🛒</div>
          
          <h2 className="text-2xl font-bold mb-4">Ваша корзина пуста</h2>
          
          <p className="text-gray-600 mb-8">
            Добавьте товары из меню, чтобы сделать заказ
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="btn-primary inline-flex items-center justify-center"
            >
              <FiArrowLeft className="mr-2" /> Вернуться в меню
            </Link>
            
            <Link
              to="/"
              className="btn-secondary inline-flex items-center justify-center"
            >
              На главную
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Список товаров */}
        <div className="lg:col-span-2">
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                Товары ({getTotalItems()})
              </h2>
              
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-600 flex items-center text-sm"
              >
                <FiTrash2 className="mr-2" /> Очистить корзину
              </button>
            </div>
            
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Итоги заказа */}
        <div className="lg:col-span-1">
          
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
            
            <h2 className="text-xl font-bold mb-6">Итог заказа</h2>
            
            <div className="space-y-4 mb-6">
              
              <div className="flex justify-between">
                <span className="text-gray-600">Товары:</span>
                <span className="font-medium">{getTotalPrice()} ₽</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Доставка:</span>
                <span className="font-medium">Бесплатно</span>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Итого:</span>
                  <span className="text-coffee-600">{getTotalPrice()} ₽</span>
                </div>
              </div>
            </div>
            
            {/* Измененная кнопка */}
            <button
              onClick={handleCheckoutClick}
              className="btn-primary w-full text-center py-3 text-lg flex items-center justify-center gap-2"
            >
              <FiShoppingBag className="w-5 h-5" />
              Оформить заказ
            </button>
            
            {/* Информация для неавторизованных пользователей */}
            {!isAuthenticated && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700 text-center">
                  Для оформления заказа потребуется войти в аккаунт
                </p>
              </div>
            )}
            
            <div className="mt-6 text-sm text-gray-500 space-y-2">
              <p>✓ Бесплатная доставка от 500 ₽</p>
              <p>✓ Возврат в течение 24 часов</p>
              <p>✓ Оплата картой или наличными</p>
            </div>
            
            <div className="mt-8 text-center">
              <Link
                to="/menu"
                className="text-coffee-600 hover:text-coffee-700 inline-flex items-center"
              >
                <FiArrowLeft className="mr-2" /> Продолжить покупки
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart