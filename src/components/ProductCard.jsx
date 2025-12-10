import { useState } from 'react';
import { FiShoppingCart, FiInfo } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    const basicCartItem = {
      ...product,
      quantity: 1,
      displayName: product.name
    };
    addToCart(basicCartItem);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Функция для получения названия категории
  const getCategoryName = (category) => {
    const categories = {
      coffee: 'Кофе',
      tea: 'Чай',
      dessert: 'Десерт',
      bakery: 'Выпечка'
    };
    return categories[category] || category;
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        {/* Изображение товара */}
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {product.popular && (
            <div className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              Популярное
            </div>
          )}
        </div>

        {/* Информация о товаре */}
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
              <div className="text-xs text-gray-500 mt-1">
                {getCategoryName(product.category)}
              </div>
            </div>
            <span className="font-bold text-coffee-600 text-lg">{product.price} ₽</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
            {product.description}
          </p>

          {/* Наличие опций */}
          <div className="mb-4 flex flex-wrap gap-1">
            {product.sizes && product.sizes.length > 1 && (
              <span className="inline-block bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                Размеры
              </span>
            )}
            {product.milkOptions && product.milkOptions.length > 0 && (
              <span className="inline-block bg-green-100 text-green-600 text-xs px-2 py-1 rounded">
                Виды молока
              </span>
            )}
            {product.extras && product.extras.length > 0 && (
              <span className="inline-block bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded">
                Допы
              </span>
            )}
          </div>

          {/* Кнопки */}
          <div className="flex gap-2 mt-auto">
            <button
              onClick={handleOpenModal}
              className="flex-1 flex items-center justify-center gap-2 py-2 border-2 border-coffee-500 text-coffee-600 rounded-lg hover:bg-coffee-50 transition"
            >
              <FiInfo className="w-4 h-4" />
              Подробнее
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-coffee-500 text-white rounded-lg hover:bg-coffee-600 transition"
            >
              <FiShoppingCart className="w-4 h-4" />
              В корзину
            </button>
          </div>
        </div>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <ProductModal
          product={product}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ProductCard;