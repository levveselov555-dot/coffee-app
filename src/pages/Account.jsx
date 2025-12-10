import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FiUser, FiMail, FiLock, FiShoppingBag, FiMapPin, 
  FiClock, FiStar, FiGift, FiArrowLeft, FiAlertCircle, 
  FiPhone 
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';

const Account = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState('');
  
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from || '/';
  const message = location.state?.message || '';

  // Проверяем, если пользователь уже авторизован
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Устанавливаем сообщение, если пришли из корзины
  useEffect(() => {
    if (message) {
      setRedirectMessage(message);
    }
  }, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (generalError) setGeneralError('');
  };

  const validateForm = () => {
    const newErrors = {};
    setGeneralError('');

    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Введите пароль';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }

    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = 'Введите имя';
      }
      
      if (!formData.phone.trim()) {
        newErrors.phone = 'Введите телефон';
      }
      
      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = 'Подтвердите пароль';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Пароли не совпадают';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        // Логика входа
        const result = await login({ 
          email: formData.email, 
          password: formData.password 
        });
        
        if (result.success) {
          navigate(from, { replace: true });
        } else {
          setGeneralError(result.error || 'Ошибка входа');
        }
      } else {
        // Логика регистрации
        const result = await register({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        });
        
        if (result.success) {
          navigate(from || '/profile', { replace: true });
        } else {
          setGeneralError(result.error || 'Ошибка регистрации');
        }
      }
    } catch (error) {
      setGeneralError('Произошла ошибка. Попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setGeneralError('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
  };

  const loadDemoAccount = (type) => {
    const accounts = {
      user: {
        name: 'Демо Пользователь',
        email: 'user@example.com',
        phone: '+7 (999) 123-45-67',
        password: 'password123',
        confirmPassword: 'password123'
      },
      admin: {
        name: 'Администратор',
        email: 'admin@example.com',
        phone: '+7 (999) 987-65-43',
        password: 'admin123',
        confirmPassword: 'admin123'
      }
    };
    
    setFormData(accounts[type]);
    setErrors({});
    setGeneralError('');
  };

  return (
    <>
      <SEO 
        title={isLogin ? 'Вход в аккаунт | Coffee Place' : 'Регистрация | Coffee Place'}
        description={isLogin 
          ? 'Войдите в свой аккаунт для оформления заказов' 
          : 'Создайте аккаунт для быстрого оформления заказов и получения бонусов'}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-coffee-600 hover:text-coffee-700 mb-4"
          >
            <FiArrowLeft className="mr-2" /> На главную
          </Link>
          
          {/* Сообщение о перенаправлении из корзины */}
          {redirectMessage && (
            <div className="mb-6 p-4 bg-coffee-50 border border-coffee-200 rounded-lg">
              <div className="flex items-center gap-3">
                <FiShoppingBag className="w-5 h-5 text-coffee-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-coffee-800">{redirectMessage}</p>
                  <p className="text-sm text-coffee-600 mt-1">
                    После входа вы вернетесь к оформлению заказа
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-coffee-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiUser className="w-10 h-10 text-coffee-600" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-gray-800">
              {isLogin ? 'Вход в аккаунт' : 'Создание аккаунта'}
            </h1>
            <p className="text-gray-600 mt-2">
              {isLogin 
                ? 'Войдите, чтобы получить доступ к истории заказов и бонусам' 
                : 'Создайте аккаунт для быстрого оформления заказов'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Форма */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6 text-coffee-700">
              {isLogin ? 'Введите данные для входа' : 'Заполните форму регистрации'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {generalError && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <FiAlertCircle className="h-5 w-5 text-red-400" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">{generalError}</h3>
                    </div>
                  </div>
                </div>
              )}
              
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FiUser className="inline mr-2" /> Имя и фамилия *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Иван Иванов"
                    disabled={isLoading}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FiMail className="inline mr-2" /> Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="ivan@example.com"
                  disabled={isLoading}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FiPhone className="inline mr-2" /> Телефон *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+7 (999) 123-45-67"
                    disabled={isLoading}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FiLock className="inline mr-2" /> Пароль *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
                {isLogin && (
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-coffee-600 focus:ring-coffee-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Запомнить меня
                      </label>
                    </div>
                    <Link to="/forgot-password" className="text-sm text-coffee-600 hover:text-coffee-700">
                      Забыли пароль?
                    </Link>
                  </div>
                )}
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FiLock className="inline mr-2" /> Подтверждение пароля *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              {!isLogin && (
                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-coffee-600 focus:ring-coffee-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                    Я соглашаюсь с{' '}
                    <Link to="/terms" className="text-coffee-600 hover:text-coffee-500">
                      условиями использования
                    </Link>
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg font-bold transition ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-coffee-500 hover:bg-coffee-600 text-white'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    {isLogin ? 'Вход...' : 'Регистрация...'}
                  </span>
                ) : (
                  isLogin ? 'Войти' : 'Зарегистрироваться'
                )}
              </button>

              <div className="text-center pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-coffee-600 hover:text-coffee-700 font-medium"
                  disabled={isLoading}
                >
                  {isLogin 
                    ? 'Нет аккаунта? Зарегистрироваться' 
                    : 'Уже есть аккаунт? Войти'}
                </button>
              </div>
            </form>

            {/* Быстрый вход (демо) */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600 text-sm mb-4">Или войдите быстро:</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => loadDemoAccount('user')}
                  className="py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
                  disabled={isLoading}
                >
                  Демо-аккаунт
                </button>
                <button
                  type="button"
                  onClick={() => loadDemoAccount('admin')}
                  className="py-2 bg-coffee-100 hover:bg-coffee-200 text-coffee-700 rounded-lg text-sm font-medium transition"
                  disabled={isLoading}
                >
                  Аккаунт админа
                </button>
              </div>
              
              {isLogin && (
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>Для демонстрации используйте:</p>
                  <p className="font-medium">Email: user@example.com</p>
                  <p className="font-medium">Пароль: password123</p>
                </div>
              )}
            </div>

            {!isLogin && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-center text-green-700 text-sm">
                  <FiGift className="inline mr-2" />
                  Регистрируясь, вы получаете 100 бонусных рублей!
                </p>
              </div>
            )}
          </div>

          {/* Преимущества аккаунта */}
          <div className="bg-coffee-50 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6 text-coffee-700">Преимущества аккаунта</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiShoppingBag className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold">История заказов</h3>
                  <p className="text-gray-600 text-sm">Следите за всеми своими заказами и быстро повторяйте их</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiGift className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold">Бонусная программа</h3>
                  <p className="text-gray-600 text-sm">Получайте бонусы за каждый заказ и оплачивайте ими до 50% стоимости</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiStar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold">Персональные предложения</h3>
                  <p className="text-gray-600 text-sm">Специальные скидки и доступ к новинкам меню</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiClock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-bold">Быстрое оформление</h3>
                  <p className="text-gray-600 text-sm">Сохраняйте адреса и способы оплаты для ускоренного заказа</p>
                </div>
              </div>
            </div>

            {/* Информация для гостя */}
            <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
              <h3 className="font-bold mb-2">Заказ без регистрации</h3>
              <p className="text-sm text-gray-600">
                Вы можете оформить заказ как гость, но для получения бонусов и отслеживания статуса 
                потребуется регистрация. Данные текущего заказа можно будет перенести в аккаунт позже.
              </p>
              <div className="mt-3 flex gap-2">
                <Link
                  to="/menu"
                  className="flex-1 py-2 bg-white border border-gray-300 text-center rounded-lg hover:bg-gray-50 transition text-sm"
                >
                  Заказать сейчас
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;