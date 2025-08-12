import { PriceComparison } from '@/lib/api/tracker.service';
import { ProductCard } from './ProductCard';

interface ComparisonCardProps {
  comparison: PriceComparison;
}

export function ComparisonCard({ comparison }: ComparisonCardProps) {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Price Comparison</h3>

      <div className="grid md:grid-cols-2 gap-4">
        {comparison.amazonProduct && (
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Amazon</h4>
            <ProductCard product={comparison.amazonProduct} />
          </div>
        )}

        {comparison.flipkartProduct ? (
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Flipkart</h4>
            <ProductCard product={comparison.flipkartProduct} />
          </div>
        ) : null}
      </div>

      {comparison.priceDifference && comparison.cheaperVendor ? (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
          <p className="text-sm text-green-800">
            <span className="font-medium">{comparison.cheaperVendor}</span> is cheaper by{' '}
            <span className="font-bold">₹{comparison.priceDifference.toLocaleString('en-IN')}</span>
          </p>
        </div>
      ) : null}
    </div>
  );
}