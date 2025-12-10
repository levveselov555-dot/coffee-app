const Footer = () => {
  return (
    <footer className="bg-yellow-600 text-white mt-12">
      <div className="container mx-auto px-4 py-5">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Информация о компании */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Coffee Place</h3>
            <p className="text-gray-100">
              Мы готовим лучший кофе в городе с 2010 года. 
              Наши бариста проходят специальное обучение и используют 
              только отборные зерна.
            </p>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-lg font-bold mb-4">Контакты</h4>
            <ul className="space-y-2 text-gray-100">
              <li>📍 ул. Кофейная, 123</li>
              <li>📞 +7 (999) 123-45-67</li>
              <li>✉️ info@coffeeplace.com</li>
            </ul>
          </div>

          {/* Быстрые ссылки */}
          <div>
            <h4 className="text-lg font-bold mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li>
                <a href="/menu" className="text-gray-300 hover:text-white transition">
                  Меню
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition">
                  О нас
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white transition">
                  Контакты
                </a>
              </li>
              <li>
                <a href="/delivery" className="text-gray-300 hover:text-white transition">
                  Доставка
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Копирайт */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-800">
            © {new Date().getFullYear()} Coffee Place. Все права защищены.
          </p>
          <p className="text-gray-700 text-sm mt-2">
            Сайт создан в учебных целях
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer