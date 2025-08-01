import { TrackedItem } from '@/lib/api/tracker.service';
import { Bell, Package, TrendingDown, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface TrackedItemCardProps {
  item: TrackedItem;
  onDelete: (id: string) => void;
}

export function TrackedItemCard({ item, onDelete }: TrackedItemCardProps) {
  return (
    <div className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{item.searchQuery}</p>
        </div>
        
        <div className="flex items-center gap-2">
          {item.unreadAlerts > 0 && (
            <div className="flex items-center gap-1 bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
              <Bell className="w-4 h-4" />
              <span>{item.unreadAlerts}</span>
            </div>
          )}
          
          <button
            onClick={() => onDelete(item.id)}
            className="text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Products</p>
          <p className="text-xl font-semibold flex items-center gap-1">
            <Package className="w-5 h-5" />
            {item.products.length}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Lowest Price</p>
          <p className="text-xl font-semibold">
            {item.currentLowestPrice
              ? `₹${item.currentLowestPrice.toLocaleString('en-IN')}`
              : '-'}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Target Price</p>
          <p className="text-xl font-semibold">
            {item.targetPrice
              ? `₹${item.targetPrice.toLocaleString('en-IN')}`
              : 'Not set'}
          </p>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className={`text-sm ${item.isActive ? 'text-green-600' : 'text-gray-500'}`}>
          {item.isActive ? 'Active' : 'Inactive'}
        </span>
        
        <Link
          href={`/price-tracker/tracker/${item.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}