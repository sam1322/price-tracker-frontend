'use client';
/* eslint-disable */

import { PriceHistoryChart } from '@/components/charts/PriceHistoryChart';
import { PriceCard } from '@/components/tracker/PriceCard';
import { trackerService } from '@/lib/api/tracker.service';
import { TrendingDown, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function TrackerDetailPage() {
  const params = useParams();
  const [trackerDetails, setTrackerDetails] = useState<any>(null);
  const [priceHistory, setPriceHistory] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDays, setSelectedDays] = useState(7);

  useEffect(() => {
    if (params.id) {
      loadTrackerDetails();
      // loadPriceHistory();
    }
  }, [params.id, selectedDays]);

  const loadTrackerDetails = async () => {
    setIsLoading(true)
    try {
      const details = await trackerService.getTrackedItemDetails(params.id as string);
      setTrackerDetails(details);
    } catch (error) {
      console.error('Failed to load tracker details:', error);
    }
    finally {
      setIsLoading(false);
    }
  };


  // const loadPriceHistory = async () => {
  //   setIsLoading(true);
  //   try {
  //     const history = await trackerService.getPriceHistory(params.id as string, selectedDays);
  //     setPriceHistory(history);
  //   } catch (error) {
  //     console.error('Failed to load price history:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  if (!trackerDetails || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tracker details...</p>
        </div>
      </div>
    );
  }

  return (

    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Products Tracked</h3>
          <p className="text-2xl font-bold text-gray-900">{trackerDetails.products.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Target Price</h3>
          <p className="text-2xl font-bold text-gray-900">
            {trackerDetails.targetPrice
              ? `₹${trackerDetails.targetPrice.toLocaleString('en-IN')}`
              : 'Not set'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Price Alerts</h3>
          <p className="text-2xl font-bold text-gray-900">{trackerDetails.alerts.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Status</h3>
          <p className={`text-2xl font-bold ${trackerDetails.isActive ? 'text-green-600' : 'text-gray-500'}`}>
            {trackerDetails.isActive ? 'Active' : 'Inactive'}
          </p>
        </div>
      </div>

      {/* Price History Chart */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Price History</h2>
          <div className="flex gap-2">
            {[7, 15, 30, 60].map(days => (
              <button
                key={days}
                onClick={() => setSelectedDays(days)}
                className={`px-3 py-1 rounded-md text-sm ${selectedDays === days
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {days}D
              </button>
            ))}
          </div>
        </div>

        {trackerDetails && trackerDetails.chartData.datasets.length > 0 ? (
          <PriceHistoryChart data={trackerDetails.chartData} />
        ) : (
          <div className="bg-white p-8 rounded-lg border text-center text-gray-500">
            No price history data available for the selected period
          </div>
        )}
      </div>

      {/* Current Prices */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Current Prices</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {trackerDetails.currentPrices.map((priceInfo: any) => {
            // --- ✅ Efficiently find the trend data ONCE per item ---
            const trendInfo = trackerDetails.priceTrends.find(
              (t: any) => t.productId === priceInfo.productId
            );

            return <PriceCard
              key={priceInfo.productId}
              productId={priceInfo.productId}
              title={priceInfo.title}
              currentPrice={priceInfo.currentPrice}
              vendor={priceInfo.vendor}
              lastUpdated={priceInfo.lastUpdated}
              image={priceInfo.imageUrl}
              productUrl={priceInfo.productUrl}
              trend={trendInfo}
            />

            return (
              // --- ✅ Entire card is a clickable link ---
              <a
                key={priceInfo.productId}
                href={priceInfo.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out overflow-hidden"
              >
                {/* --- ✅ Product Image --- */}
                <div className="flex-shrink-0 w-1/3">
                  <Image
                    width={400}
                    height={400}
                    src={priceInfo.imageUrl || 'https://via.placeholder.com/150'} // Fallback image
                    alt={priceInfo.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* --- Details Section --- */}
                <div className="flex flex-col justify-between p-4 w-2/3">
                  <div>
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                      {priceInfo.vendor}
                    </p>
                    <h3 className="font-bold text-gray-800 leading-tight mt-1 line-clamp-2 group-hover:text-blue-700 transition-colors">
                      {priceInfo.title}
                    </h3>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-baseline justify-between">
                      {/* --- Current Price --- */}
                      <p className="text-2xl font-extrabold text-gray-900">
                        ₹{priceInfo.currentPrice?.toLocaleString('en-IN') || 'N/A'}
                      </p>

                      {/* --- ✅ Styled Price Trend "Pill" --- */}
                      {trendInfo && (
                        <div
                          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold
                      ${trendInfo.trend === 'up' && 'bg-red-100 text-red-700'}
                      ${trendInfo.trend === 'down' && 'bg-green-100 text-green-700'}
                      ${trendInfo.trend === 'stable' && 'bg-gray-100 text-gray-600'}
                    `}
                        >
                          {trendInfo.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                          {trendInfo.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                          <span>
                            {trendInfo.trend === 'stable'
                              ? 'Stable'
                              : `${trendInfo.changePercent.toFixed(1)}%`}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-right">
                      Updated: {new Date(priceInfo.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Recent Alerts */}
      {trackerDetails.alerts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Alerts</h2>
          <div className="space-y-2">
            {trackerDetails.alerts.map((alert: any) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${alert.isRead ? 'bg-white' : 'bg-blue-50 border-blue-200'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{alert.message}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Price changed from ₹{alert.oldPrice.toLocaleString('en-IN')} to ₹{alert.newPrice.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(alert.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}