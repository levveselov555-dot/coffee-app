import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Изображение товара */}
      <div className="w-full md:w-20 h-20 flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Информация о товаре */}
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-gray-800">{item.displayName || item.name}</h3>
            {item.selectedOptions && (
              <div className="mt-2 space-y-1">
                {/* Размер */}
                {item.selectedOptions.size && (
                  <div className="text-sm text-gray-600">
                    Размер: {item.selectedOptions.size.name}
                  </div>
                )}
                
                {/* Молоко */}
                {item.selectedOptions.milk && (
                  <div className="text-sm text-gray-600">
                    Молоко: {item.selectedOptions.milk.name}
                  </div>
                )}
                
                {/* Допы */}
                {item.selectedOptions.extras && item.selectedOptions.extras.length > 0 && (
                  <div className="text-sm text-gray-600">
                    Добавки: {item.selectedOptions.extras.map(e => e.name).join(', ')}
                  </div>
                )}
              </div>
            )}
          </div>
          <span className="font-bold text-coffee-600">
            {item.price * item.quantity} ₽
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
        
        <div className="flex items-center gap-2">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            {item.category === 'coffee' ? 'Кофе' : 
             item.category === 'tea' ? 'Чай' : 
             item.category === 'dessert' ? 'Десерт' : 'Выпечка'}
          </span>
          {item.popular && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              Популярное
            </span>
          )}
        </div>
      </div>

      {/* Управление количеством и удалением */}
      <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
            aria-label="Уменьшить количество"
          >
            <FiMinus className="w-4 h-4 text-gray-600" />
          </button>
          
          <span className="w-8 text-center font-bold">{item.quantity}</span>
          
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
            aria-label="Увеличить количество"
          >
            <FiPlus className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <button
          onClick={handleRemove}
          className="flex items-center gap-1 text-red-500 hover:text-red-700 transition text-sm"
          aria-label="Удалить товар"
        >
          <FiTrash2 className="w-4 h-4" />
          <span className="hidden md:inline">Удалить</span>
        </button>
      </div>
    </div>
  );
};

export { CartItem };
export default CartItem;