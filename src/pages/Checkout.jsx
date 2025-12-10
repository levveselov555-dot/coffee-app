import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiLock, FiAlertCircle } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import OrderForm from '../components/OrderForm';
import SEO from '../components/SEO';

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [orderType, setOrderType] = useState('delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState('');

  const totalPrice = getTotalPrice();

  // Проверяем авторизацию при загрузке компонента
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <FiLock className="w-16 h-16 text-coffee-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Требуется авторизация</h2>
          <p className="text-gray-600 mb-6">
            Для оформления заказа необходимо войти в аккаунт или зарегистрироваться
          </p>
          <div className="space-y-3">
            <Link
              to="/account"
              state={{ from: '/checkout' }}
              className="block w-full py-3 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition font-medium"
            >
              Войти в аккаунт
            </Link>
            <Link
              to="/account"
              state={{ register: true }}
              className="block w-full py-3 border-2 border-coffee-500 text-coffee-600 rounded-lg hover:bg-coffee-50 transition font-medium"
            >
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmitOrder = async (formData) => {
    setIsSubmitting(true);
    setOrderError('');
    
    try {
      // Имитация отправки заказа
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // В реальном приложении здесь был бы API запрос
      const order = {
        id: `ORD-${Date.now()}`,
        userId: user.id,
        items: cartItems,
        total: totalPrice,
        deliveryType: orderType,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        deliveryTime: formData.deliveryTime,
        paymentMethod: formData.paymentMethod,
        comments: formData.comments,
        status: 'processing',
        createdAt: new Date().toISOString(),
      };
      
      console.log('Order created:', order);
      
      // Сохраняем заказ в localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));
      
      // Очищаем корзину
      clearCart();
      setOrderSuccess(true);
      
    } catch (error) {
      console.error('Ошибка оформления заказа:', error);
      setOrderError('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="container mx-auto px-4 py-12">
        <SEO title="Заказ оформлен | Coffee Place" />
        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiShoppingBag className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Заказ успешно оформлен!</h1>
          <p className="text-gray-600 mb-8">
            Спасибо за ваш заказ! Мы уже начали готовить ваш кофе.
            Подробности заказа и статус доставки вы можете отслеживать в разделе «Мои заказы».
          </p>
          <div className="space-y-4">
            <Link
              to="/profile"
              className="block w-full py-3 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition font-medium"
            >
              Перейти к моим заказам
            </Link>
            <Link
              to="/menu"
              className="block w-full py-3 border-2 border-coffee-500 text-coffee-600 rounded-lg hover:bg-coffee-50 transition font-medium"
            >
              Продолжить покупки
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <FiShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Корзина пуста</h2>
          <p className="text-gray-600 mb-6">
            Добавьте товары в корзину, чтобы оформить заказ
          </p>
          <Link
            to="/menu"
            className="inline-block py-3 px-8 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition font-medium"
          >
            Перейти в меню
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Оформление заказа | Coffee Place"
        description={`Оформление заказа на сумму ${totalPrice} ₽`}
      />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>
        
        {/* Отображение ошибки */}
        {orderError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <FiAlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <p className="text-red-700">{orderError}</p>
            </div>
          </div>
        )}
        
        {/* Информация о пользователе */}
        <div className="mb-8 p-4 bg-coffee-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Заказ оформляет</p>
              <p className="font-bold">{user?.name}</p>
              <p className="text-sm text-gray-600">{user?.email} • {user?.phone}</p>
            </div>
            <Link
              to="/profile"
              className="text-coffee-600 hover:text-coffee-700 text-sm font-medium"
            >
              Изменить данные
            </Link>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 h-2 bg-coffee-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-coffee-500 transition-all duration-500"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-coffee-600">
              Шаг {step} из 4
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка - форма */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6">Способ получения</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setOrderType('delivery')}
                    className={`p-6 border-2 rounded-xl text-left transition ${
                      orderType === 'delivery'
                        ? 'border-coffee-500 bg-coffee-50'
                        : 'border-gray-200 hover:border-coffee-300'
                    }`}
                    disabled={isSubmitting}
                  >
                    <div className="text-2xl mb-2">🚚</div>
                    <h3 className="font-bold mb-2">Доставка</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Привезем ваш заказ по указанному адресу
                    </p>
                    <div className="text-coffee-600 font-medium">
                      От 0 ₽ • 15-45 мин
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setOrderType('pickup')}
                    className={`p-6 border-2 rounded-xl text-left transition ${
                      orderType === 'pickup'
                        ? 'border-coffee-500 bg-coffee-50'
                        : 'border-gray-200 hover:border-coffee-300'
                    }`}
                    disabled={isSubmitting}
                  >
                    <div className="text-2xl mb-2">🏪</div>
                    <h3 className="font-bold mb-2">Самовывоз</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Заберите заказ в нашей кофейне
                    </p>
                    <div className="text-coffee-600 font-medium">
                      Бесплатно • 10-25 мин
                    </div>
                  </button>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setStep(2)}
                    disabled={isSubmitting}
                    className={`w-full py-3 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition font-medium ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    Продолжить
                  </button>
                </div>
              </div>
            )}

            {step > 1 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <OrderForm
                  step={step}
                  setStep={setStep}
                  orderType={orderType}
                  onSubmit={handleSubmitOrder}
                  isSubmitting={isSubmitting}
                />
              </div>
            )}
          </div>

          {/* Правая колонка - корзина и итоги */}
          <div className="space-y-6">
            {/* Корзина */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Ваш заказ</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Итоги */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Итог</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Стоимость товаров</span>
                  <span>{totalPrice} ₽</span>
                </div>
                
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Доставка</span>
                    <span className="text-green-600">Бесплатно</span>
                  </div>
                )}
                
                {user?.bonuses > 0 && step >= 4 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      Использовать бонусы ({user.bonuses} доступно)
                    </span>
                    <input
                      type="number"
                      min="0"
                      max={Math.min(user.bonuses, totalPrice)}
                      defaultValue="0"
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-right"
                      disabled={isSubmitting}
                    />
                  </div>
                )}
                
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between text-lg font-bold">
                    <span>К оплате</span>
                    <span className="text-coffee-600">{totalPrice} ₽</span>
                  </div>
                </div>
              </div>
              
              {/* Предупреждение о безопасности */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start">
                  <FiAlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">Безопасная оплата</p>
                    <p>Все платежи защищены 256-битным SSL-шифрованием</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Информация о гарантиях */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold mb-3">Гарантии</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Свежие ингредиенты каждый день</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Возврат денег, если не понравится</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Привезем в течение 60 минут или сделаем скидку 50%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;