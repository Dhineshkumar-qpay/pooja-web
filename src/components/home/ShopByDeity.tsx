import Link from 'next/link';
import { SectionHeading } from '../ui/SectionHeading';
import { fetchProducts, IMAGE_BASE_URL } from '@/lib/api';
import { ArrowRight } from 'lucide-react';

const cardColors = [
  "from-orange-500 to-amber-500",
  "from-blue-600 to-cyan-500",
  "from-pink-500 to-rose-500",
  "from-indigo-500 to-purple-500"
];

export async function ShopByDeity() {
  const products = await fetchProducts({ categoryid: "4739aece-d31b-4c1e-a7a1-575068ab22a1" });

  // Show up to 4 products to maintain grid symmetry
  const displayProducts = products.slice(0, 4);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-saffron/5 rounded-l-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Shop by Deity"
          subtitle="Find the perfect offerings, idols, and pooja essentials for your beloved deities."
        />

        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {displayProducts.map((product, idx) => {
              const color = cardColors[idx % cardColors.length];
              return (
                <Link
                  key={product.productid}
                  href={`/products/${product.productid}`}
                  className="group block relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={`${IMAGE_BASE_URL}${product.thumbnailimage}`}
                      alt={product.productname}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${color} opacity-40 mix-blend-multiply group-hover:opacity-70 transition-opacity duration-500`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-text-dark/95 via-text-dark/20 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-2xl font-serif font-bold text-white mb-2 line-clamp-2">{product.productname}</h3>
                      <div className="flex items-center gap-2 text-white/90 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        View Details <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute top-4 right-4 size-12 rounded-full border border-white/30 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-100">
                    <ArrowRight className="-rotate-45" size={20} />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mt-16 text-center text-text-secondary">
            No products found for this deity.
          </div>
        )}
      </div>
    </section>
  );
}
