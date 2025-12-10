import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiUser, FiMail, FiPhone, FiMapPin, 
  FiShoppingBag, FiPackage, FiClock, FiStar, FiEdit2, FiLogOut 
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';

const Profile = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загрузка заказов пользователя
  useEffect(() => {
    const loadUserOrders = () => {
      try {
        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        const userOrders = savedOrders.filter(order => order.userId === user?.id);
        setOrders(userOrders);
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadUserOrders();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-6">👤</div>
          <h2 className="text-2xl font-bold mb-4">Требуется авторизация</h2>
          <p className="text-gray-600 mb-8">
            Для просмотра профиля необходимо войти в систему
          </p>
          <Link
            to="/account"
            className="inline-block py-3 px-8 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition font-medium"
          >
            Войти
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Личный кабинет | Coffee Place"
        description={`Личный кабинет ${user.name}. История заказов и бонусы.`}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">
            Личный кабинет
          </h1>
          <p className="text-gray-600">
            Управляйте вашими данными, отслеживайте заказы и используйте бонусы
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка - профиль */}
          <div className="lg:col-span-2 space-y-8">
            {/* Информация о пользователе */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold mb-2">Контактная информация</h2>
                  <p className="text-gray-600 text-sm">
                    Основные данные для доставки и связи
                  </p>
                </div>
                <button className="flex items-center gap-2 text-coffee-600 hover:text-coffee-700">
                  <FiEdit2 className="w-4 h-4" />
                  <span className="text-sm">Изменить</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-coffee-100 rounded-full flex items-center justify-center">
                    <FiUser className="w-5 h-5 text-coffee-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Имя</h3>
                    <p className="text-gray-600">{user.name}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-coffee-100 rounded-full flex items-center justify-center">
                    <FiMail className="w-5 h-5 text-coffee-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-coffee-100 rounded-full flex items-center justify-center">
                    <FiPhone className="w-5 h-5 text-coffee-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Телефон</h3>
                    <p className="text-gray-600">{user.phone || 'Не указан'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-coffee-100 rounded-full flex items-center justify-center">
                    <FiMapPin className="w-5 h-5 text-coffee-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Адрес доставки</h3>
                    <p className="text-gray-600">
                      {user.address || 'Не указан'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={logout}
                  className="px-6 py-2 border-2 border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition font-medium flex items-center gap-2"
                >
                  <FiLogOut className="w-4 h-4" />
                  Выйти из аккаунта
                </button>
              </div>
            </div>

            {/* История заказов */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">История заказов</h2>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-coffee-600"></div>
                  <p className="text-gray-600 mt-4">Загрузка заказов...</p>
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.slice(0, 5).map(order => (
                    <div key={order.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold">Заказ #{order.id.slice(-6)}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                        <span className="font-bold text-coffee-600">
                          {order.total} ₽
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        {order.items.length} товаров • {order.deliveryType === 'delivery' ? 'Доставка' : 'Самовывоз'}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'completed' 
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'processing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status === 'completed' ? 'Завершен' : 
                           order.status === 'processing' ? 'В обработке' : 'Доставляется'}
                        </span>
                        <Link 
                          to="/checkout" 
                          state={{ orderId: order.id }}
                          className="text-coffee-600 hover:text-coffee-700 text-sm"
                        >
                          Повторить заказ
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FiShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2">Заказов пока нет</h3>
                  <p className="text-gray-600 mb-4">
                    Сделайте первый заказ, и он появится здесь
                  </p>
                  <Link
                    to="/menu"
                    className="inline-block py-2 px-6 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition"
                  >
                    Сделать заказ
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Правая колонка - бонусы и статистика */}
          <div className="space-y-8">
            {/* Бонусы */}
            <div className="bg-gradient-to-r from-coffee-500 to-coffee-600 rounded-xl p-6 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <FiStar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Бонусы</h3>
                  <p className="text-coffee-100">Ваш баланс</p>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-4xl font-bold">{user.bonuses || 0}</div>
                <p className="text-coffee-200">бонусных рублей</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-coffee-200">1 бонус = 1 ₽</span>
                  <span className="font-bold">До 50% заказа</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-coffee-200">Начисление</span>
                  <span className="font-bold">5% от суммы</span>
                </div>
              </div>
            </div>

            {/* Статистика */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold mb-6">Ваша статистика</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FiShoppingBag className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Всего заказов</h4>
                    </div>
                  </div>
                  <span className="font-bold text-lg">{orders.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <FiPackage className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Потрачено всего</h4>
                    </div>
                  </div>
                  <span className="font-bold text-lg">
                    {orders.reduce((sum, order) => sum + order.total, 0)} ₽
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <FiClock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Последний заказ</h4>
                    </div>
                  </div>
                  <span className="text-gray-600">
                    {orders.length > 0 
                      ? new Date(orders[0].createdAt).toLocaleDateString('ru-RU')
                      : '—'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;