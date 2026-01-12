import { useParams, Link } from "react-router-dom";
import { websiteConfig } from "@/data/website-config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { ArrowLeft, Package } from "lucide-react";

export default function CategoryProducts() {
    const { categoryId } = useParams();
    const { categories, settings } = websiteConfig;

    const category = categories.find((c) => c.id === categoryId);

    if (!category) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
                        <Link to="/" className="text-red-600 hover:text-red-700 font-medium inline-flex items-center space-x-2">
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back to Home</span>
                        </Link>
                    </div>
                </main>
                <Footer settings={settings} />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col scroll-smooth">
            <Navbar />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-gray-900 text-white pt-32 pb-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link to="/" className="text-gray-400 hover:text-white mb-8 inline-flex items-center space-x-2 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back to Home</span>
                        </Link>
                        <h1 className="text-4xl sm:text-6xl font-bold mb-6">{category.name}</h1>
                        <p className="text-xl text-gray-300 max-w-2xl">
                            Discover our range of {category.name.toLowerCase()} solutions designed for efficiency and durability.
                        </p>
                    </div>
                </section>

                {/* Category Navigation Bar */}
                <div className="sticky top-20 bg-white border-b z-40 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex space-x-8 py-4">
                            {categories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    to={`/category/${cat.id}`}
                                    className={`text-sm font-medium transition-colors ${cat.id === categoryId
                                        ? "text-red-600 border-b-2 border-red-600 pb-4 -mb-4.5"
                                        : "text-gray-500 hover:text-gray-900"
                                        }`}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <section className="section-padding bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {!category.products || category.products.length === 0 ? (
                            <div className="text-center py-20">
                                <Package className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h2>
                                <p className="text-gray-600 max-w-md mx-auto">
                                    We are currently updating our product catalog for {category.name}. Check back soon for the latest models and specifications.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {category.products.map((product, index) => (
                                    <div key={index} className="premium-card flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                        <div className="h-64 overflow-hidden relative group bg-gray-100">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                loading="lazy"
                                                className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="mb-4">
                                                <h3 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
                                                {product.spec && (
                                                    <span className="inline-block px-3 py-1 bg-red-50 text-red-600 text-xs font-semibold rounded-full">
                                                        {product.spec}
                                                    </span>
                                                )}
                                            </div>
                                            <ul className="space-y-2 mb-6 flex-grow">
                                                {product.features.map((feature, fIndex) => (
                                                    <li key={fIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <button
                                                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                                                className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors mt-auto"
                                            >
                                                Inquire Now
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <Contact settings={settings} />
            </main>
            <Footer settings={settings} />
        </div>
    );
}
