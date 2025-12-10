import { useState, useMemo, useCallback, memo } from 'react';
import { FiX, FiPlus, FiMinus, FiInfo } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import OptimizedImage from './OptimizedImage';

// Мемоизируем компонент
const ProductModal = memo(({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedMilk, setSelectedMilk] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  // Мемоизируем проверки опций
  const hasSizes = useMemo(() => 
    product.sizes && product.sizes.length > 0, 
    [product.sizes]
  );
  
  const hasMilkOptions = useMemo(() => 
    product.milkOptions && product.milkOptions.length > 0, 
    [product.milkOptions]
  );
  
  const hasExtras = useMemo(() => 
    product.extras && product.extras.length > 0, 
    [product.extras]
  );

  // Мемоизируем URL изображений
  const imageUrls = useMemo(() => {
    const getImageUrls = (imageUrl) => {
      if (imageUrl.includes('fm=webp')) {
        const regularUrl = imageUrl.replace('fm=webp', 'fm=jpg&q=85');
        return {
          webp: imageUrl,
          regular: regularUrl,
        };
      }
      
      if (imageUrl.endsWith('.webp')) {
        const regularUrl = imageUrl.replace('.webp', '.jpg');
        return {
          webp: imageUrl,
          regular: regularUrl,
        };
      }
      
      return {
        webp: `${imageUrl}&fm=webp&q=85`,
        regular: `${imageUrl}&q=85`,
      };
    };
    
    return getImageUrls(product.image);
  }, [product.image]);

  // Мемоизируем расчет цены
  const calculateTotalPrice = useCallback(() => {
    let total = product.price;
    
    if (hasSizes) {
      total += product.sizes[selectedSize].price;
    }
    
    if (hasMilkOptions) {
      total += product.milkOptions[selectedMilk].price;
    }
    
    selectedExtras.forEach(extra => {
      total += extra.price;
    });
    
    return total * quantity;
  }, [product.price, hasSizes, selectedSize, product.sizes, 
      hasMilkOptions, selectedMilk, product.milkOptions, 
      selectedExtras, quantity]);

  const totalPrice = useMemo(() => calculateTotalPrice(), [calculateTotalPrice]);
  const pricePerUnit = useMemo(() => totalPrice / quantity, [totalPrice, quantity]);

  // Мемоизируем обработчики
  const handleExtraToggle = useCallback((extra) => {
    setSelectedExtras(prev => {
      const isSelected = prev.some(e => e.name === extra.name);
      if (isSelected) {
        return prev.filter(e => e.name !== extra.name);
      } else {
        return [...prev, extra];
      }
    });
  }, []);

  const handleAddToCart = useCallback(() => {
    let displayName = product.name;
    
    if (hasSizes) {
      displayName += ` (${product.sizes[selectedSize].name})`;
    }
    
    if (hasMilkOptions && product.milkOptions[selectedMilk].price > 0) {
      displayName += `, ${product.milkOptions[selectedMilk].name}`;
    }
    
    if (selectedExtras.length > 0) {
      const extrasNames = selectedExtras.map(e => e.name).join(', ');
      displayName += `, доп: ${extrasNames}`;
    }

    const cartItem = {
      ...product,
      price: pricePerUnit,
      finalPrice: totalPrice,
      selectedOptions: {
        size: hasSizes ? product.sizes[selectedSize] : null,
        milk: hasMilkOptions ? product.milkOptions[selectedMilk] : null,
        extras: selectedExtras,
        quantity
      },
      displayName,
      id: `${product.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    addToCart(cartItem);
    onClose();
  }, [product, hasSizes, selectedSize, hasMilkOptions, selectedMilk, 
      selectedExtras, quantity, pricePerUnit, totalPrice, addToCart, onClose]);

  const getCategoryName = useCallback((category) => {
    const categories = {
      coffee: 'Кофе',
      tea: 'Чай',
      dessert: 'Десерт',
      bakery: 'Выпечка'
    };
    return categories[category] || category;
  }, []);

  // Функции для изменения количества
  const decreaseQuantity = useCallback(() => {
    setQuantity(prev => Math.max(1, prev - 1));
  }, []);

  const increaseQuantity = useCallback(() => {
    setQuantity(prev => prev + 1);
  }, []);

  // Мемоизируем данные для рендеринга
  const sizeOptions = useMemo(() => 
    hasSizes ? product.sizes.map((size, index) => ({ ...size, index })) : [],
    [hasSizes, product.sizes]
  );

  const milkOptions = useMemo(() => 
    hasMilkOptions ? product.milkOptions.map((milk, index) => ({ ...milk, index })) : [],
    [hasMilkOptions, product.milkOptions]
  );

  const extraOptions = useMemo(() => 
    hasExtras ? product.extras.map((extra, index) => ({ ...extra, index })) : [],
    [hasExtras, product.extras]
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Заголовок */}
        <div className="sticky top-0 bg-white border-b p-6 rounded-t-2xl flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {getCategoryName(product.category)}
              </span>
              {product.popular && (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  Популярное
                </span>
              )}
            </div>
            <h2 className="text-2xl font-serif font-bold text-gray-800">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Закрыть"
          >
            <FiX className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Контент */}
        <div className="p-6 space-y-8">
          {/* Изображение */}
          <div className="h-48 rounded-xl overflow-hidden">
            <OptimizedImage
              src={imageUrls.regular}
              webpSrc={imageUrls.webp}
              alt={product.name}
              width={800}
              height={192}
              lazy={false}
              priority={true}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Состав и аллергены */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <FiInfo className="mr-2 text-coffee-600" /> Состав
              </h3>
              <p className="text-gray-600">{product.composition}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-3">⚠️ Аллергены</h3>
              <p className="text-gray-600">{product.allergens || 'Не указаны'}</p>
            </div>
          </div>

          {/* КБЖУ */}
          {product.nutrition && (
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-lg font-bold mb-3">Пищевая ценность</h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="font-bold text-coffee-600">{product.nutrition.calories}</div>
                  <div className="text-sm text-gray-500">Ккал</div>
                </div>
                <div>
                  <div className="font-bold text-coffee-600">{product.nutrition.protein}g</div>
                  <div className="text-sm text-gray-500">Белки</div>
                </div>
                <div>
                  <div className="font-bold text-coffee-600">{product.nutrition.fat}g</div>
                  <div className="text-sm text-gray-500">Жиры</div>
                </div>
                <div>
                  <div className="font-bold text-coffee-600">{product.nutrition.carbs}g</div>
                  <div className="text-sm text-gray-500">Углеводы</div>
                </div>
              </div>
            </div>
          )}

          {/* Выбор размера */}
          {hasSizes && (
            <div>
              <h3 className="text-lg font-bold mb-3">Размер порции</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {sizeOptions.map((size) => (
                  <button
                    key={size.index}
                    onClick={() => setSelectedSize(size.index)}
                    className={`p-4 border-2 rounded-lg text-left transition ${
                      selectedSize === size.index
                        ? 'border-coffee-500 bg-coffee-50'
                        : 'border-gray-200 hover:border-coffee-300'
                    }`}
                  >
                    <div className="font-medium">{size.name}</div>
                    {size.price > 0 && (
                      <div className="text-coffee-600 font-bold mt-1">
                        +{size.price} ₽
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Выбор молока */}
          {hasMilkOptions && (
            <div>
              <h3 className="text-lg font-bold mb-3">Тип молока</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {milkOptions.map((milk) => (
                  <button
                    key={milk.index}
                    onClick={() => setSelectedMilk(milk.index)}
                    className={`p-3 border-2 rounded-lg text-left transition ${
                      selectedMilk === milk.index
                        ? 'border-coffee-500 bg-coffee-50'
                        : 'border-gray-200 hover:border-coffee-300'
                    }`}
                  >
                    <div className="font-medium">{milk.name}</div>
                    {milk.price > 0 && (
                      <div className="text-coffee-600 text-sm mt-1">
                        +{milk.price} ₽
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Дополнительные опции */}
          {hasExtras && (
            <div>
              <h3 className="text-lg font-bold mb-3">Дополнительные опции</h3>
              <div className="space-y-2">
                {extraOptions.map((extra) => (
                  <label
                    key={extra.index}
                    className="flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedExtras.some(e => e.name === extra.name)}
                        onChange={() => handleExtraToggle(extra)}
                        className="mr-3 text-coffee-600 focus:ring-coffee-500"
                      />
                      <span>{extra.name}</span>
                    </div>
                    {extra.price > 0 && (
                      <span className="text-coffee-600 font-medium">
                        +{extra.price} ₽
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Количество */}
          <div>
            <h3 className="text-lg font-bold mb-3">Количество</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={decreaseQuantity}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
                disabled={quantity <= 1}
              >
                <FiMinus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <FiPlus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Футер с ценой */}
        <div className="sticky bottom-0 bg-white border-t p-6 rounded-b-2xl">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-sm text-gray-500">Итоговая стоимость</div>
              <div className="text-2xl font-bold text-coffee-600">
                {totalPrice} ₽
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="px-8 py-3 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition font-bold text-lg"
            >
              Добавить в корзину
            </button>
          </div>
          <div className="text-sm text-gray-500">
            {quantity} × {pricePerUnit} ₽
            {hasSizes && product.sizes[selectedSize].price > 0 && (
              <span className="ml-2">(базовая цена: {product.price} ₽)</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

ProductModal.displayName = 'ProductModal';

export default ProductModal;