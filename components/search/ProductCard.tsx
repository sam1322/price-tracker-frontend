import Image from 'next/image';
import { ExternalLink, Star } from 'lucide-react';
import { Product } from '@/lib/api/tracker.service';

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
  isSelected?: boolean;
}

export function ProductCard({ product, onSelect, isSelected }: ProductCardProps) {
  const vendorColors = {
    AMAZON: 'bg-orange-100 text-orange-800',
    FLIPKART: 'bg-blue-100 text-blue-800',
  };

  return (
    <div
      className={`border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer ${isSelected ? 'ring-2 ring-blue-500' : ''
        }`}
      onClick={() => onSelect?.(product)}
    >
      <div className="flex gap-4">
        <div className="relative w-24 h-24 flex-shrink-0">
          <Image
            src={product.imageUrl || '/placeholder.png'}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>

        <div className="flex-1">
          <h3 className="font-medium text-gray-900 line-clamp-2 mb-1" title={product.title}>
            {product.title}
          </h3>

          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 text-xs font-medium rounded ${vendorColors[product.vendor]}`} title={product.vendor}>
              {product.vendor}
            </span>

            {product.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600">{product.rating}</span>
                {product.reviewCount ? <span className="text-sm text-gray-800">({product.reviewCount})</span> : null}
              </div>
            )}
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>

            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-green-600 font-medium">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                </span>
              </>
            )}
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className={`text-sm ${product.availability ? 'text-green-600' : 'text-red-600'}`}>
              {product.availability ? 'In Stock' : 'Out of Stock'}
            </span>

            <a
              href={product.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}