import { Link } from 'react-router-dom'
import { FiCoffee, FiTruck, FiClock, FiAward } from 'react-icons/fi'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const Home = () => {
  // Берем 4 популярных товара для главной
  const featuredProducts = products.filter(p => p.popular).slice(0, 4)

  return (
    <div className="container mx-auto px-4">
      
      {/* Герой-секция с картинкой */}
      <section className="mb-16 relative">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-coffee-900/80 to-coffee-600/60 z-10"></div>
          <img 
            src="/images/hero/coffee-bg.webp"
            alt="Кофейня Coffee Place"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-8">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                  Лучший кофе в городе
                </h1>
                <p className="text-lg text-coffee-100 mb-8">
                  Приготовлено с любовью и профессионализмом. 
                  Закажите онлайн и получите скидку 10% на первый заказ!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/menu" className="btn-primary text-lg px-8 py-3 bg-white text-coffee-800 hover:bg-coffee-100">
                    Смотреть меню
                  </Link>
                  <Link to="/account" className="btn-secondary text-lg px-8 py-3 border-white text-white hover:bg-white/10">
                    Получить скидку
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Почему выбирают нас</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="w-16 h-16 bg-coffee-100 rounded-full flex items-center 
                  justify-center mx-auto mb-4">
              <FiCoffee className="w-8 h-8 text-coffee-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Свежие зерна</h3>
            <p className="text-gray-600">
              Используем только свежеобжаренные зерна премиум класса
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="w-16 h-16 bg-coffee-100 rounded-full flex items-center 
                  justify-center mx-auto mb-4">
              <FiTruck className="w-8 h-8 text-coffee-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Быстрая доставка</h3>
            <p className="text-gray-600">
              Доставляем за 30 минут или заказ бесплатно
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="w-16 h-16 bg-coffee-100 rounded-full flex items-center 
                  justify-center mx-auto mb-4">
              <FiClock className="w-8 h-8 text-coffee-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Работаем с 8:00</h3>
            <p className="text-gray-600">
              Открываемся рано, чтобы вы начали день с вкусного кофе
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="w-16 h-16 bg-coffee-100 rounded-full flex items-center 
                  justify-center mx-auto mb-4">
              <FiAward className="w-8 h-8 text-coffee-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Лучшие бариста</h3>
            <p className="text-gray-600">
              Наши специалисты — призеры кофейных чемпионатов
            </p>
          </div>
        </div>
      </section>

      {/* Популярные товары */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Популярное в меню</h2>
          <Link to="/menu" className="text-coffee-600 hover:text-coffee-700 
                font-medium flex items-center gap-1">
            Всё меню 
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA секция */}
      <section className="relative rounded-2xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-coffee-900/90 z-10"></div>
        <img 
          src="/images/hero/coffee-bg-fallback.webp"
          alt="Кофе навынос"
          className="w-full h-[300px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Попробуйте наш кофе сегодня!</h2>
            <p className="text-coffee-200 mb-8 max-w-2xl mx-auto">
              Сделайте заказ онлайн и получите специальное предложение 
              для новых клиентов — скидку 10% на первый заказ!
            </p>
            <Link to="/menu" className="inline-block px-8 py-3 bg-white text-coffee-800 
                  rounded-lg hover:bg-coffee-100 transition font-bold text-lg">
              Заказать сейчас
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home