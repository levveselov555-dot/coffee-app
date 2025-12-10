import { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCreditCard, FiClock } from 'react-icons/fi';

/**
 * Компонент OrderForm - форма оформления заказа
 * @param {Object} props - свойства компонента
 * @param {number} props.step - текущий шаг
 * @param {Function} props.setStep - функция смены шага
 * @param {string} props.orderType - тип заказа (delivery/pickup)
 * @param {Function} props.onSubmit - функция отправки формы
 * @param {boolean} props.isSubmitting - состояние отправки
 */
const OrderForm = ({ step, setStep, orderType, onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    deliveryTime: 'asap',
    deliveryTimeCustom: '',
    paymentMethod: 'card',
    comments: '',
    csrf_token: ''
  });

  const [errors, setErrors] = useState({});

  // Генерация CSRF токена
  const generateCSRFToken = () => {
    return btoa(Date.now() + Math.random().toString(36).substr(2));
  };

  // Проверка CSRF токена
  const verifyCSRFToken = (token) => {
    const savedToken = localStorage.getItem('csrf_token');
    return token === savedToken;
  };

  // Инициализация CSRF токена
  useEffect(() => {
    const token = generateCSRFToken();
    localStorage.setItem('csrf_token', token);
    setFormData(prev => ({ ...prev, csrf_token: token }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};

    switch (stepNumber) {
      case 2:
        if (!formData.name.trim()) newErrors.name = 'Введите имя';
        if (!formData.email.trim()) newErrors.email = 'Введите email';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Неверный формат email';
        if (!formData.phone.trim()) newErrors.phone = 'Введите телефон';
        else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) newErrors.phone = 'Неверный формат телефона';
        if (orderType === 'delivery' && !formData.address.trim()) {
          newErrors.address = 'Введите адрес доставки';
        }
        break;
      case 4:
        if (!formData.paymentMethod) {
          newErrors.paymentMethod = 'Выберите способ оплаты';
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    if (e) e.preventDefault();
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrev = (e) => {
    if (e) e.preventDefault();
    setStep(step - 1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Проверка CSRF токена
    if (!verifyCSRFToken(formData.csrf_token)) {
      setErrors({ _error: 'Недействительная сессия. Обновите страницу.' });
      return;
    }
    
    // Валидация шага 4
    if (!validateStep(step)) {
      return;
    }
    
    // Подготавливаем данные для отправки
    const submissionData = {
      ...formData,
      deliveryTime: formData.deliveryTime === 'asap' 
        ? new Date().toISOString() 
        : formData.deliveryTimeCustom || formData.deliveryTime
    };
    
    onSubmit(submissionData);
  };

  // Отдельная функция для шага 4 (оплата)
  const renderPaymentStep = () => {
    return (
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <h3 className="text-xl font-bold mb-4">
          <FiCreditCard className="inline mr-2" /> Способ оплаты
        </h3>
        
        {errors.paymentMethod && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{errors.paymentMethod}</p>
          </div>
        )}
        
        <div className="space-y-3">
          <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:border-coffee-500 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === 'card'}
              onChange={handleChange}
              className="mr-3 text-coffee-600 focus:ring-coffee-500"
              disabled={isSubmitting}
            />
            <div>
              <span className="font-medium">Картой онлайн</span>
              <p className="text-sm text-gray-600">Оплата банковской картой через защищенный шлюз</p>
            </div>
          </label>

          <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:border-coffee-500 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={formData.paymentMethod === 'cash'}
              onChange={handleChange}
              className="mr-3 text-coffee-600 focus:ring-coffee-500"
              disabled={isSubmitting}
            />
            <div>
              <span className="font-medium">Наличными</span>
              <p className="text-sm text-gray-600">Оплата при получении заказа</p>
            </div>
          </label>

          <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:border-coffee-500 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="bonuses"
              checked={formData.paymentMethod === 'bonuses'}
              onChange={handleChange}
              className="mr-3 text-coffee-600 focus:ring-coffee-500"
              disabled={isSubmitting}
            />
            <div>
              <span className="font-medium">Бонусами</span>
              <p className="text-sm text-gray-600">Оплата накопленными бонусами</p>
            </div>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Комментарий к заказу (необязательно)
          </label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
            placeholder="Например: позвонить за 10 минут до доставки"
            disabled={isSubmitting}
          />
        </div>

        {/* Кнопка "Назад" и "Оформить заказ" */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handlePrev}
            disabled={isSubmitting}
            className="px-6 py-2 border-2 border-coffee-500 text-coffee-600 rounded-lg hover:bg-coffee-50 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Назад
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center justify-center min-w-[160px] ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Оформление...
              </>
            ) : (
              'Оформить заказ'
            )}
          </button>
        </div>
      </form>
    );
  };

  // Отдельная функция для шагов 2 и 3
  const renderStep = () => {
    return (
      <div className="space-y-4">
        {/* Шаг 2: Данные клиента */}
        {step === 2 && (
          <>
            <h3 className="text-xl font-bold mb-4">Контактные данные</h3>
            
            <div className="space-y-4">
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
                  disabled={isSubmitting}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    disabled={isSubmitting}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

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
                    disabled={isSubmitting}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              {orderType === 'delivery' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FiMapPin className="inline mr-2" /> Адрес доставки *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="ул. Кофейная, д. 123, кв. 45"
                    disabled={isSubmitting}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
              )}
            </div>
          </>
        )}

        {/* Шаг 3: Время получения */}
        {step === 3 && (
          <>
            <h3 className="text-xl font-bold mb-4">
              <FiClock className="inline mr-2" /> Время получения
            </h3>
            
            <div className="space-y-3">
              <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:border-coffee-500 cursor-pointer">
                <input
                  type="radio"
                  name="deliveryTime"
                  value="asap"
                  checked={formData.deliveryTime === 'asap'}
                  onChange={handleChange}
                  className="mr-3 text-coffee-600 focus:ring-coffee-500"
                  disabled={isSubmitting}
                />
                <div>
                  <span className="font-medium">Как можно скорее</span>
                  <p className="text-sm text-gray-600">Приготовим в течение 15-30 минут</p>
                </div>
              </label>

              <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:border-coffee-500 cursor-pointer">
                <input
                  type="radio"
                  name="deliveryTime"
                  value="later"
                  checked={formData.deliveryTime === 'later'}
                  onChange={handleChange}
                  className="mr-3 text-coffee-600 focus:ring-coffee-500"
                  disabled={isSubmitting}
                />
                <div>
                  <span className="font-medium">Ко времени</span>
                  <div className="mt-2">
                    <input
                      type="datetime-local"
                      name="deliveryTimeCustom"
                      value={formData.deliveryTimeCustom}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      min={new Date().toISOString().slice(0, 16)}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </label>
            </div>
          </>
        )}

        {/* Кнопки навигации для шагов 2 и 3 */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handlePrev}
            disabled={isSubmitting}
            className="px-6 py-2 border-2 border-coffee-500 text-coffee-600 rounded-lg hover:bg-coffee-50 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Назад
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            className={`px-6 py-2 bg-coffee-500 text-white rounded-lg hover:bg-coffee-600 transition font-medium flex items-center justify-center ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Загрузка...' : 'Продолжить'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* CSRF токен для шага 4 (оплата) */}
      {step === 4 && (
        <input type="hidden" name="csrf_token" value={formData.csrf_token || ''} />
      )}
      
      {/* Общая ошибка CSRF */}
      {errors._error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{errors._error}</p>
        </div>
      )}

      {/* Рендерим шаг 4 (оплата) в отдельной форме */}
      {step === 4 ? renderPaymentStep() : renderStep()}
    </div>
  );
};

export default OrderForm;