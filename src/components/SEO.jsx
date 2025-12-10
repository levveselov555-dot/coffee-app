import { Helmet } from 'react-helmet';;

const SEO = ({ 
  title = 'Coffee Place - Лучший кофе в городе',
  description = 'Закажите свежий кофе и десерты с доставкой. Приготовлено с любовью и профессионализмом.',
  keywords = 'кофе, доставка кофе, капучино, латте, десерты, кофейня',
  image = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  url = window.location.href,
  type = 'website'
}) => {
  return (
    <Helmet>
      {/* Основные мета-теги */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CafeOrCoffeeShop",
          "name": "Coffee Place",
          "description": description,
          "image": image,
          "url": window.location.origin,
          "telephone": "+7 (999) 123-45-67",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "ул. Кофейная, 123",
            "addressLocality": "Город",
            "addressCountry": "RU"
          },
          "openingHours": [
            "Mo-Fr 08:00-22:00",
            "Sa-Su 09:00-23:00"
          ],
          "priceRange": "₽₽"
        })}
      </script>
      
      {/* Preload критичных ресурсов */}
      <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      
      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    </Helmet>
  );
};

export default SEO;