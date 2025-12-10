import { FiCoffee, FiUsers, FiAward, FiHeart, FiMapPin, FiClock } from 'react-icons/fi';

const AboutPage = () => {
  const teamMembers = [
    { name: 'Анна Петрова', 
      role: 'Главный бариста',
      photo: '/images/about/anna.webp',
      experience: '8 лет', 
      specialty: 'Авторские рецепты' 
    },
    { name: 'Максим Иванов', 
      role: 'Шеф-кондитер', 
      photo: '/images/about/mihail.webp',
      experience: '12 лет', 
      specialty: 'Десерты' 
    },
    { name: 'Елена Смирнова', 
      role: 'Управляющая', 
       photo: '/images/about/ekaterina.webp',
      experience: '6 лет', 
      specialty: 'Клиентский сервис' 
    },
    { name: 'Дмитрий Кузнецов', 
      role: 'Обжарщик', 
       photo: '/images/about/max.webp',
      experience: '10 лет', 
      specialty: 'Подбор зерен' 
    },
  ];

  const values = [
    { icon: <FiCoffee />, title: 'Качество', description: 'Используем только свежеобжаренные зерна премиум-класса' },
    { icon: <FiHeart />, title: 'Забота', description: 'Создаем уютную атмосферу для каждого гостя' },
    { icon: <FiUsers />, title: 'Сообщество', description: 'Место, где собираются единомышленники' },
    { icon: <FiAward />, title: 'Профессионализм', description: 'Наши бариста — призеры кофейных чемпионатов' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Герой-секция */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-coffee-100 to-coffee-200 rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            О нашей кофейне
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Мы — команда энтузиастов, которая верит, что идеальная чашка кофе может сделать день лучше. 
            С 2015 года мы создаем пространство, где каждый найдет свой любимый напиток.
          </p>
        </div>
      </section>

      {/* История */}
      <section className="mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-6">Наша история</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Все началось с маленького кофейного киоска в центре города. Основатель, профессиональный бариста 
                с 10-летним опытом, хотел создать место, где кофе будет таким, каким он должен быть — свежим, 
                ароматным и приготовленным с душой.
              </p>
              <p>
                За несколько лет мы выросли в сеть из трех кофеен, но сохранили главное — внимание к деталям и 
                индивидуальный подход к каждому гостю. Каждое утро мы начинаем с обжарки свежих зерен, а наши 
                бариста проходят регулярное обучение.
              </p>
              <p>
                Сегодня мы не просто кофейня — мы место встреч, работы и вдохновения. Мы поддерживаем местных 
                поставщиков и заботимся об экологии, используя биоразлагаемую упаковку.
              </p>
            </div>
          </div>
          <div className="bg-gray-200 h-64 lg:h-96 rounded-xl overflow-hidden">
            <img 
              src="/public/images/hero/cofeen.webp" 
              alt="Интерьер кофейни" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Ценности */}
      <section className="mb-12">
        <h2 className="text-3xl font-serif font-bold text-gray-800 mb-8 text-center">Наши ценности</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-coffee-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl text-coffee-600">{value.icon}</div>
              </div>
              <h3 className="font-bold text-lg mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Команда */}
      <section className="mb-12">
        <h2 className="text-3xl font-serif font-bold text-gray-800 mb-8 text-center">Наша команда</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="h-48 bg-gray-300 overflow-hidden">
                <img 
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                <div className="w-full h-full bg-coffee-200 flex items-center justify-center">
                  <FiUsers className="w-16 h-16 text-coffee-600" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-coffee-600 font-medium">{member.role}</p>
                <div className="mt-3 text-sm text-gray-600 space-y-1">
                  <p>Опыт: {member.experience}</p>
                  <p>Специализация: {member.specialty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Блок с отзывами */}
      <section className="mt-12">
        <h2 className="text-3xl font-serif font-bold text-gray-800 mb-8 text-center">Что говорят наши гости</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <img 
                src="/images/about/1.webp"
                alt="Анна"
                className="w-12 h-12 rounded-full object-cover mr-3"
              />
              <div>
                <h4 className="font-bold">Анна К.</h4>
                <div className="flex text-yellow-400">
                  ★★★★★
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "Лучший капучино в городе! Бариста Анна всегда готовит именно так, как я люблю."
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <img 
                src="/images/about/2.webp"
                alt="Михаил"
                className="w-12 h-12 rounded-full object-cover mr-3"
              />
              <div>
                <h4 className="font-bold">Михаил П.</h4>
                <div className="flex text-yellow-400">
                  ★★★★★
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "Работаю здесь каждый день. Отличный Wi-Fi, вкусный кофе и уютная атмосфера."
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <img 
                src="/images/about/3.webp"
                alt="Екатерина"
                className="w-12 h-12 rounded-full object-cover mr-3"
              />
              <div>
                <h4 className="font-bold">Екатерина С.</h4>
                <div className="flex text-yellow-400">
                  ★★★★★
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">
              "Десерты просто волшебные! Каждый раз пробую что-то новое и никогда не разочаровываюсь."
            </p>
          </div>
        </div>
      </section>


      {/* Контактная информация */}
      <section className="mt-12 bg-coffee-50 rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FiMapPin className="mr-2" /> Адреса
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-700">📌 ул. Кофейная, 123 (центральный)</li>
              <li className="text-gray-700">📌 пр. Напитков, 45 (бизнес-район)</li>
              <li className="text-gray-700">📌 б-р. Десертный, 67 (исторический центр)</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FiClock className="mr-2" /> Часы работы
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-700">Пн-Пт: 8:00 - 22:00</li>
              <li className="text-gray-700">Сб-Вс: 9:00 - 23:00</li>
              <li className="text-gray-700">Без выходных</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li className="text-gray-700">📞 +7 (999) 123-45-67</li>
              <li className="text-gray-700">✉️ info@coffeeplace.com</li>
              <li className="text-gray-700">🌐 @coffeeplace_social</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;