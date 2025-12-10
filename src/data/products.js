export const products = [
  {
    id: 1,
    name: 'Капучино',
    description: 'Классический итальянский кофе с молочной пенкой',
    price: 250,
    category: 'coffee',
    image: '/images/products/cappuccino.webp',
    popular: true,
    composition: 'Эспрессо, свежее молоко, молочная пена',
    allergens: 'Лактоза (молоко)',
    nutrition: { calories: 120, protein: 7, fat: 5, carbs: 10 },
    sizes: [
      { name: 'Маленький (200 мл)', price: 0 },
      { name: 'Средний (300 мл)', price: 40 },
      { name: 'Большой (400 мл)', price: 80 }
    ],
    milkOptions: [
      { name: 'Обычное молоко', price: 0 },
      { name: 'Миндальное молоко', price: 30 },
      { name: 'Кокосовое молоко', price: 40 },
      { name: 'Соевое молоко', price: 30 },
      { name: 'Овсяное молоко', price: 35 },
      { name: 'Безлактозное молоко', price: 40 }
    ],
    extras: [
      { name: 'Ванильный сироп', price: 25 },
      { name: 'Карамельный сироп', price: 25 },
      { name: 'Шоколадный сироп', price: 25 },
      { name: 'Кленовый сироп', price: 30 },
      { name: 'Корица', price: 15 },
      { name: 'Тертый шоколад', price: 20 },
      { name: 'Взбитые сливки', price: 35 },
      { name: 'Мускатный орех', price: 10 }
    ]
  },
  {
    id: 2,
    name: 'Латте',
    description: 'Нежный кофе с большим количеством молока',
    price: 280,
    category: 'coffee',
    image: '/images/products/latte.webp',
    popular: true,
    composition: 'Эспрессо, молоко в соотношении 1:3, молочная пена',
    allergens: 'Лактоза (молоко)',
    nutrition: { calories: 180, protein: 9, fat: 7, carbs: 15 },
    sizes: [
      { name: 'Маленький (250 мл)', price: 0 },
      { name: 'Средний (350 мл)', price: 45 },
      { name: 'Большой (450 мл)', price: 90 }
    ],
    milkOptions: [
      { name: 'Обычное молоко', price: 0 },
      { name: 'Миндальное молоко', price: 30 },
      { name: 'Кокосовое молоко', price: 40 },
      { name: 'Соевое молоко', price: 30 },
      { name: 'Овсяное молоко', price: 35 },
      { name: 'Безлактозное молоко', price: 40 }
    ],
    extras: [
      { name: 'Ванильный сироп', price: 25 },
      { name: 'Карамельный сироп', price: 25 },
      { name: 'Шоколадный сироп', price: 25 },
      { name: 'Кленовый сироп', price: 30 },
      { name: 'Корица', price: 15 },
      { name: 'Тертый шоколад', price: 20 },
      { name: 'Взбитые сливки', price: 35 },
      { name: 'Тертый кокос', price: 25 }
    ]
  },
  {
    id: 3,
    name: 'Эспрессо',
    description: 'Крепкий и ароматный кофе по-итальянски',
    price: 180,
    category: 'coffee',
    image: '/images/products/espresso.webp',
    popular: false,
    composition: 'Молотый кофе арабика, вода',
    allergens: 'Нет',
    nutrition: { calories: 5, protein: 0, fat: 0, carbs: 1 },
    sizes: [
      { name: 'Стандартный (30 мл)', price: 0 },
      { name: 'Двойной (60 мл)', price: 80 },
      { name: 'Тройной (90 мл)', price: 150 }
    ],
    milkOptions: [
      { name: 'Без молока', price: 0 },
      { name: 'Немного молока', price: 20 }
    ],
    extras: [
      { name: 'Лимонная цедра', price: 10 },
      { name: 'Сахарный сироп', price: 15 },
      { name: 'Шоколадная стружка', price: 25 },
      { name: 'Вода со льдом', price: 0 }
    ]
  },
  {
    id: 4,
    name: 'Американо',
    description: 'Черный кофе, разбавленный горячей водой',
    price: 200,
    category: 'coffee',
    image: '/images/products/americano.webp',
    popular: true,
    composition: 'Эспрессо, горячая вода',
    allergens: 'Нет',
    nutrition: { calories: 10, protein: 0, fat: 0, carbs: 2 },
    sizes: [
      { name: 'Маленький (150 мл)', price: 0 },
      { name: 'Средний (250 мл)', price: 30 },
      { name: 'Большой (350 мл)', price: 60 }
    ],
    milkOptions: [
      { name: 'Без молока', price: 0 },
      { name: 'С молоком', price: 30 },
      { name: 'С миндальным молоком', price: 40 },
      { name: 'С соевым молоком', price: 40 }
    ],
    extras: [
      { name: 'Сахарный сироп', price: 15 },
      { name: 'Карамельный сироп', price: 25 },
      { name: 'Ванильный сироп', price: 25 },
      { name: 'Лимон', price: 15 },
      { name: 'Корица', price: 15 }
    ]
  },
  {
    id: 5,
    name: 'Зеленый чай',
    description: 'Свежий и полезный зеленый чай',
    price: 150,
    category: 'tea',
    image: '/images/products/green-tea.webp',
    popular: false,
    composition: 'Листья зеленого чая, вода',
    allergens: 'Нет',
    nutrition: { calories: 2, protein: 0, fat: 0, carbs: 0 },
    sizes: [
      { name: 'Чашка (200 мл)', price: 0 },
      { name: 'Чайник (400 мл)', price: 50 },
      { name: 'Большой чайник (600 мл)', price: 100 }
    ],
    milkOptions: [
      { name: 'Без молока', price: 0 },
      { name: 'С молоком', price: 30 },
      { name: 'С миндальным молоком', price: 40 }
    ],
    extras: [
      { name: 'Мед', price: 25 },
      { name: 'Лимон', price: 15 },
      { name: 'Имбирь', price: 20 },
      { name: 'Мята', price: 15 },
      { name: 'Жасмин', price: 20 }
    ]
  },
  {
    id: 6,
    name: 'Черный чай',
    description: 'Крепкий черный чай с бергамотом',
    price: 150,
    category: 'tea',
    image: '/images/products/black-tea.webp',
    popular: false,
    composition: 'Листья черного чая, бергамот, вода',
    allergens: 'Нет',
    nutrition: { calories: 5, protein: 0, fat: 0, carbs: 1 },
    sizes: [
      { name: 'Чашка (200 мл)', price: 0 },
      { name: 'Чайник (400 мл)', price: 50 },
      { name: 'Большой чайник (600 мл)', price: 100 }
    ],
    milkOptions: [
      { name: 'Без молока', price: 0 },
      { name: 'С молоком', price: 30 },
      { name: 'С овсяным молоком', price: 35 },
      { name: 'С кокосовым молоком', price: 40 }
    ],
    extras: [
      { name: 'Сахарный сироп', price: 15 },
      { name: 'Мед', price: 25 },
      { name: 'Лимон', price: 15 },
      { name: 'Корица', price: 15 },
      { name: 'Ванильный сироп', price: 25 }
    ]
  },
  {
    id: 7,
    name: 'Тирамису',
    description: 'Итальянский десерт с кофе и маскарпоне',
    price: 320,
    category: 'dessert',
    image: '/images/products/tiramisu.webp',
    popular: true,
    composition: 'Печенье савоярди, кофе, маскарпоне, яйца, сахар, какао',
    allergens: 'Яйца, лактоза, глютен',
    nutrition: { calories: 380, protein: 8, fat: 22, carbs: 35 },
    sizes: [
      { name: 'Порция 100г', price: 0 },
      { name: 'Порция 150г', price: 120 },
      { name: 'Порция 200г', price: 200 }
    ],
    milkOptions: null,
    extras: [
      { name: 'Дополнительные ягоды', price: 50 },
      { name: 'Шоколадный соус', price: 30 },
      { name: 'Карамельный соус', price: 30 },
      { name: 'Взбитые сливки', price: 40 },
      { name: 'Мята для украшения', price: 10 }
    ]
  },
  {
    id: 8,
    name: 'Чизкейк',
    description: 'Нежный чизкейк с ягодным соусом',
    price: 280,
    category: 'dessert',
    image: '/images/products/cheesecake.webp',
    popular: true,
    composition: 'Сыр маскарпоне, сливки, сахар, печенье, ягоды',
    allergens: 'Лактоза, глютен',
    nutrition: { calories: 350, protein: 7, fat: 20, carbs: 32 },
    sizes: [
      { name: 'Кусочек', price: 0 },
      { name: 'Большой кусок', price: 100 },
      { name: 'Мини-торт (4 куска)', price: 450 }
    ],
    milkOptions: null,
    extras: [
      { name: 'Дополнительный ягодный соус', price: 40 },
      { name: 'Шоколадный топпинг', price: 30 },
      { name: 'Карамельный топпинг', price: 30 },
      { name: 'Мороженое ванильное', price: 80 },
      { name: 'Свежие ягоды', price: 60 }
    ]
  },
  {
    id: 9,
    name: 'Круассан',
    description: 'Свежая французская выпечка',
    price: 120,
    category: 'bakery',
    image: '/images/products/croissant.webp',
    popular: false,
    composition: 'Мука, масло сливочное, дрожжи, молоко, сахар, соль',
    allergens: 'Глютен, лактоза',
    nutrition: { calories: 280, protein: 5, fat: 15, carbs: 30 },
    sizes: [
      { name: 'Стандартный', price: 0 },
      { name: 'С двойной начинкой', price: 40 }
    ],
    milkOptions: null,
    extras: [
      { name: 'Шоколадная начинка', price: 25 },
      { name: 'Миндальная начинка', price: 30 },
      { name: 'Варенье', price: 20 },
      { name: 'Сливочный сыр', price: 35 },
      { name: 'Ветчина и сыр', price: 50 }
    ]
  },
  {
    id: 10,
    name: 'Брауни',
    description: 'Шоколадный пирог с орехами',
    price: 220,
    category: 'dessert',
    image: '/images/products/brownie.webp',
    popular: true,
    composition: 'Шоколад, масло, сахар, яйца, мука, грецкие орехи',
    allergens: 'Яйца, глютен, орехи',
    nutrition: { calories: 420, protein: 6, fat: 25, carbs: 45 },
    sizes: [
      { name: 'Кусочек', price: 0 },
      { name: 'Большой кусок', price: 80 },
      { name: 'Порция с мороженым', price: 150 }
    ],
    milkOptions: null,
    extras: [
      { name: 'Ванильное мороженое', price: 80 },
      { name: 'Шоколадный соус', price: 25 },
      { name: 'Карамельный соус', price: 25 },
      { name: 'Взбитые сливки', price: 30 },
      { name: 'Ореховая крошка', price: 20 }
    ]
  },
  {
    id: 11,
    name: 'Мокачино',
    description: 'Кофе с шоколадом и молоком',
    price: 300,
    category: 'coffee',
    image: '/images/products/mochaccino.webp',
    popular: false,
    composition: 'Эспрессо, горячее молоко, шоколадный сироп, молочная пена',
    allergens: 'Лактоза, шоколад',
    nutrition: { calories: 210, protein: 8, fat: 8, carbs: 25 },
    sizes: [
      { name: 'Маленький (250 мл)', price: 0 },
      { name: 'Средний (350 мл)', price: 50 },
      { name: 'Большой (450 мл)', price: 100 }
    ],
    milkOptions: [
      { name: 'Обычное молоко', price: 0 },
      { name: 'Миндальное молоко', price: 30 },
      { name: 'Кокосовое молоком', price: 40 },
      { name: 'Соевое молоко', price: 30 },
      { name: 'Овсяное молоко', price: 35 }
    ],
    extras: [
      { name: 'Дополнительный шоколад', price: 25 },
      { name: 'Карамельный сироп', price: 25 },
      { name: 'Ванильный сироп', price: 25 },
      { name: 'Мятный сироп', price: 30 },
      { name: 'Взбитые сливки', price: 35 },
      { name: 'Шоколадная стружка', price: 20 }
    ]
  },
  {
    id: 12,
    name: 'Фраппучино',
    description: 'Холодный кофейный напиток со льдом',
    price: 320,
    category: 'coffee',
    image: '/images/products/frappuccino.webp',
    popular: true,
    composition: 'Эспрессо, молоко, лед, сироп, взбитые сливки',
    allergens: 'Лактоза',
    nutrition: { calories: 280, protein: 6, fat: 10, carbs: 40 },
    sizes: [
      { name: 'Средний (350 мл)', price: 0 },
      { name: 'Большой (500 мл)', price: 60 },
      { name: 'Огромный (700 мл)', price: 120 }
    ],
    milkOptions: [
      { name: 'Обычное молоко', price: 0 },
      { name: 'Миндальное молоко', price: 30 },
      { name: 'Кокосовое молоко', price: 40 },
      { name: 'Соевое молоко', price: 30 },
      { name: 'Овсяное молоко', price: 35 }
    ],
    extras: [
      { name: 'Ванильный сироп', price: 25 },
      { name: 'Карамельный сироп', price: 25 },
      { name: 'Шоколадный сироп', price: 25 },
      { name: 'Клубничный сироп', price: 30 },
      { name: 'Дополнительные взбитые сливки', price: 35 },
      { name: 'Шоколадная крошка', price: 20 },
      { name: 'Карамельная крошка', price: 25 }
    ]
  }
]