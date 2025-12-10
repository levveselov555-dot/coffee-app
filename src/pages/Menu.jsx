import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import { FiFilter, FiX } from 'react-icons/fi'

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { id: 'all', name: 'Все товары' },
    { id: 'coffee', name: 'Кофе' },
    { id: 'tea', name: 'Чай' },
    { id: 'dessert', name: 'Десерты' },
    { id: 'bakery', name: 'Выпечка' }
  ]

  const sortOptions = [
    { id: 'popular', name: 'По популярности' },
    { id: 'price_asc', name: 'По возрастанию цены' },
    { id: 'price_desc', name: 'По убыванию цены' },
    { id: 'name', name: 'По названию' }
  ]

  // Фильтрация и сортировка товаров
  const filteredProducts = products
    .filter(product => 
      selectedCategory === 'all' || product.category === selectedCategory
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return a.price - b.price
        case 'price_desc':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        default: // popular
          return (b.popular ? 1 : 0) - (a.popular ? 1 : 0)
      }
    })

  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4">
          Наше меню
        </h1>
        <p className="text-gray-600">
          Выберите свой любимый напиток или десерт из нашего обширного меню
        </p>
      </div>

      {/* Фильтры для десктопа */}
      <div className="hidden md:flex justify-between items-center mb-8 p-4 bg-gray-50 rounded-lg">
        
        <div className="flex space-x-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedCategory === category.id
                  ? 'bg-coffee-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Сортировка:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field w-auto"
          >
            {sortOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Кнопка фильтров для мобильных */}
      <div className="md:hidden mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 btn-secondary w-full justify-center"
        >
          {showFilters ? (
            <>
              <FiX /> <span>Скрыть фильтры</span>
            </>
          ) : (
            <>
              <FiFilter /> <span>Показать фильтры</span>
            </>
          )}
        </button>
      </div>

      {/* Мобильные фильтры */}
      {showFilters && (
        <div className="md:hidden mb-6 bg-gray-50 p-4 rounded-lg space-y-4">
          
          <div>
            <h3 className="font-bold mb-2">Категории</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedCategory === category.id
                      ? 'bg-coffee-500 text-white'
                      : 'bg-white text-gray-700 border'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-2">Сортировка</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Сетка товаров */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Если товаров нет */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">☕</div>
          <h3 className="text-xl font-bold mb-2">Товары не найдены</h3>
          <p className="text-gray-600">
            Попробуйте выбрать другую категорию или изменить фильтры
          </p>
        </div>
      )}

      {/* Информация о количестве */}
      <div className="mt-8 pt-6 border-t text-center text-gray-500">
        Показано {filteredProducts.length} из {products.length} товаров
      </div>

    </div>
  )
}

export default Menu