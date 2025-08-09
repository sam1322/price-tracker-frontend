'use client';

import { TrackedItemCard } from '@/components/tracker/TrackedItemCard';
import { TrackedItem, trackerService } from '@/lib/api/tracker.service';
import { Loader2, Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TrackerPage() {
  const [trackedItems, setTrackedItems] = useState<TrackedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');


  const loadTrackedItems = async () => {
    setIsLoading(true);
    try {
      const activeOnly = filter === 'active' ? true : filter === 'inactive' ? false : undefined;
      const items = await trackerService.getTrackedItems(activeOnly);
      setTrackedItems(items);
    } catch (error) {
      console.error('Failed to load tracked items:', error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    loadTrackedItems();
  }, [filter]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this tracker?')) {
      try {
        await trackerService.deleteTrackedItem(id);
        await loadTrackedItems();
      } catch (error) {
        console.error('Failed to delete tracker:', error);
      }
    }
  };

  return (

    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-md ${filter === 'active'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('inactive')}
            className={`px-4 py-2 rounded-md ${filter === 'inactive'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
          >
            Inactive
          </button>
        </div>

        <Link
          href="/price-tracker"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          New Tracker
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading trackers...</span>
        </div>
      ) : trackedItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No trackers found</p>
          <Link
            href="/price-tracker"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Create your first tracker →
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trackedItems.map((item) => (
            <TrackedItemCard
              key={item.id}
              item={item}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </main>
  );
}