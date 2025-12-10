import { useState } from 'react';
import { 
  FiMapPin, FiPhone, FiMail, FiClock, 
  FiInstagram, FiFacebook, FiTwitter, 
  FiSend, FiCheck, FiAlertCircle 
} from 'react-icons/fi';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeLocation, setActiveLocation] = useState(0);

  const locations = [
    {
      id: 1,
      title: 'Центральная кофейня',
      address: 'ул. Кофейная, 123, Центральный район',
      phone: '+7 (999) 123-45-67',
      email: 'central@coffeeplace.com',
      hours: 'Пн-Пт: 8:00 - 22:00, Сб-Вс: 9:00 - 23:00',
      description: 'Главная кофейня с уютной атмосферой и большим залом',
      features: ['Wi-Fi', 'Розетки', 'Большие столы', 'Терраса']
    },
    {
      id: 2,
      title: 'Кофейня в бизнес-районе',
      address: 'пр. Деловой, 45, Бизнес-центр "Солнечный"',
      phone: '+7 (999) 123-45-68',
      email: 'business@coffeeplace.com',
      hours: 'Пн-Пт: 7:00 - 21:00, Сб-Вс: 9:00 - 20:00',
      description: 'Идеальное место для деловых встреч и работы',
      features: ['Конференц-зал', 'Быстрый Wi-Fi', 'Печать документов', 'Бизнес-ланчи']
    },
    {
      id: 3,
      title: 'Историческая кофейня',
      address: 'б-р. Старинный, 67, Исторический центр',
      phone: '+7 (999) 123-45-69',
      email: 'historic@coffeeplace.com',
      hours: 'Ежедневно: 9:00 - 00:00',
      description: 'Кофейня в историческом здании с уникальным интерьером',
      features: ['Антикварная мебель', 'Книжный уголок', 'Живая музыка', 'Винная карта']
    }
  ];

  const workingHours = [
    { day: 'Понедельник - Пятница', hours: '8:00 - 22:00' },
    { day: 'Суббота', hours: '9:00 - 23:00' },
    { day: 'Воскресенье', hours: '9:00 - 23:00' }
  ];

  const contactInfo = {
    generalPhone: '+7 (999) 123-45-60',
    generalEmail: 'info@coffeeplace.com',
    deliveryPhone: '+7 (999) 123-45-61',
    socialMedia: {
      instagram: '@coffeeplace_official',
      facebook: '/coffeeplace',
      twitter: '@coffeeplace_tw'
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Введите ваше имя';
    if (!formData.email.trim()) newErrors.email = 'Введите email';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Неверный формат email';
    if (!formData.subject.trim()) newErrors.subject = 'Введите тему сообщения';
    if (!formData.message.trim()) newErrors.message = 'Введите ваше сообщение';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Имитация отправки формы
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Сбрасываем сообщение об успехе через 5 секунд
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      alert('Ошибка при отправке сообщения');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Заголовок */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4">
          Контакты
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Мы всегда рады вашему звонку, письму или визиту в нашу кофейню. 
          Если у вас есть вопросы, предложения или просто хотите поздороваться — пишите!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Левая колонка: Контактная информация */}
        <div>
          {/* Основная контактная информация */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-coffee-700">Контактная информация</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-coffee-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiPhone className="w-5 h-5 text-coffee-600" />
                </div>
                <div>
                  <h3 className="font-bold">Телефоны</h3>
                  <p className="text-gray-600">Общий: {contactInfo.generalPhone}</p>
                  <p className="text-gray-600">Доставка: {contactInfo.deliveryPhone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-coffee-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiMail className="w-5 h-5 text-coffee-600" />
                </div>
                <div>
                  <h3 className="font-bold">Email</h3>
                  <p className="text-gray-600">{contactInfo.generalEmail}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-coffee-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiClock className="w-5 h-5 text-coffee-600" />
                </div>
                <div>
                  <h3 className="font-bold">Часы работы</h3>
                  {workingHours.map((item, index) => (
                    <div key={index} className="flex justify-between text-gray-600">
                      <span>{item.day}</span>
                      <span>{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Социальные сети */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="font-bold mb-4">Мы в социальных сетях</h3>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-coffee-100 transition"
                  aria-label="Instagram"
                >
                  <FiInstagram className="w-5 h-5 text-gray-700" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-coffee-100 transition"
                  aria-label="Facebook"
                >
                  <FiFacebook className="w-5 h-5 text-gray-700" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-coffee-100 transition"
                  aria-label="Twitter"
                >
                  <FiTwitter className="w-5 h-5 text-gray-700" />
                </a>
              </div>
            </div>
          </div>

          {/* Наши кофейни */}
          <div className="bg-coffee-50 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-coffee-700">Наши кофейни</h2>
            
            <div className="space-y-4">
              {locations.map((location, index) => (
                <div 
                  key={location.id}
                  className={`p-4 rounded-lg cursor-pointer transition ${
                    activeLocation === index 
                      ? 'bg-white border-2 border-coffee-500 shadow-sm' 
                      : 'bg-white/80 hover:bg-white border border-gray-200'
                  }`}
                  onClick={() => setActiveLocation(index)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-coffee-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiMapPin className="w-5 h-5 text-coffee-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">{location.title}</h3>
                      <p className="text-gray-600 text-sm">{location.address}</p>
                      <p className="text-gray-500 text-xs mt-1">{location.hours}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {location.features.map((feature, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Карта (заглушка) */}
            <div className="mt-6">
              <div className="bg-gray-200 h-48 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <FiMapPin className="w-12 h-12 text-coffee-600 mx-auto mb-2" />
                    <p className="text-gray-700 font-medium">
                      {locations[activeLocation].title}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {locations[activeLocation].address}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                На карте показана выбранная кофейня. Нажмите на другую кофейню, чтобы посмотреть её расположение.
              </div>
            </div>
          </div>
        </div>

        {/* Правая колонка: Форма обратной связи */}
        <div>
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
            <h2 className="text-2xl font-bold mb-6 text-coffee-700">Напишите нам</h2>
            
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCheck className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Сообщение отправлено!</h3>
                <p className="text-gray-600">
                  Спасибо за ваше сообщение. Мы ответим вам в течение 24 часов.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ваше имя *
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
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
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
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Телефон (необязательно)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Тема сообщения *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent ${
                      errors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Например: вопрос о доставке"
                  />
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ваше сообщение *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Опишите ваш вопрос или предложение..."
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <FiAlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Что вы можете у нас спросить:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Вопросы по доставке и оплате</li>
                        <li>Предложения по сотрудничеству</li>
                        <li>Отзывы и предложения по улучшению</li>
                        <li>Организация мероприятий в наших кофейнях</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition font-bold flex items-center justify-center gap-2"
                >
                  <FiSend className="w-5 h-5" />
                  Отправить сообщение
                </button>
              </form>
            )}
          </div>

          {/* Часто задаваемые вопросы */}
          <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6 text-coffee-700">Часто задаваемые вопросы</h2>
            
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-bold mb-2">Как работает доставка?</h3>
                <p className="text-gray-600 text-sm">
                  Доставка осуществляется в течение 30-60 минут в зависимости от района. 
                  Бесплатная доставка от 500 ₽ в пределах центра.
                </p>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-bold mb-2">Можно ли забронировать столик?</h3>
                <p className="text-gray-600 text-sm">
                  Да, вы можете забронировать столик по телефону конкретной кофейни 
                  или через нашу страницу в Instagram.
                </p>
              </div>

              <div>
                <h3 className="font-bold mb-2">Есть ли у вас бонусная программа?</h3>
                <p className="text-gray-600 text-sm">
                  Да! При заказе от 300 ₽ вы получаете бонусы. 
                  Создайте аккаунт на нашем сайте, чтобы начать копить баллы.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Важная информация */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-coffee-50 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-coffee-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiClock className="w-6 h-6 text-coffee-600" />
          </div>
          <h3 className="font-bold mb-2">Срочный заказ</h3>
          <p className="text-gray-600 text-sm">
            Звоните на номер доставки для срочных заказов. 
            Минимальное время приготовления — 15 минут.
          </p>
        </div>

        <div className="bg-coffee-50 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-coffee-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiMail className="w-6 h-6 text-coffee-600" />
          </div>
          <h3 className="font-bold mb-2">Для сотрудничества</h3>
          <p className="text-gray-600 text-sm">
            По вопросам сотрудничества пишите на почту: 
            <br />
            <span className="font-medium">partners@coffeeplace.com</span>
          </p>
        </div>

        <div className="bg-coffee-50 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-coffee-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiMapPin className="w-6 h-6 text-coffee-600" />
          </div>
          <h3 className="font-bold mb-2">Франшиза</h3>
          <p className="text-gray-600 text-sm">
            Интересуетесь открытием кофейни под нашим брендом? 
            Напишите нам для получения подробной информации.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;