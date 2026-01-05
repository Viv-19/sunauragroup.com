import { ExternalLink, CheckCircle } from "lucide-react";

export default function Products({ products }) {
  // Duplicate products array for seamless infinite scroll
  const duplicatedProducts = [...products, ...products];

  return (
    <section id="products" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Our Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Premium quality solar water heaters and heat pump solutions</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products available at the moment.</p>
          </div>
        ) : (
          <div className="scroll-container">
            <div className="scroll-content">
              {duplicatedProducts.map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  className="premium-card hover-lift flex-shrink-0 w-[350px]"
                  data-testid={index < products.length ? `product-card-${product.id}` : undefined}
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h3>
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2 text-gray-700">
                          <CheckCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {product.brochure_url && (
                      <a
                        href={product.brochure_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                        data-testid={index < products.length ? `product-brochure-${product.id}` : undefined}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>View Brochure</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
