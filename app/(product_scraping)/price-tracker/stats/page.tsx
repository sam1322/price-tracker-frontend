'use client';

import { useEffect, useState } from 'react';
import { trackerService, Statistics } from '@/lib/api/tracker.service';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, TrendingDown, Bell, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function StatisticsPage() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const data = await trackerService.getStatistics();
      setStats(data);
    } catch (error) {
      console.error('Failed to load statistics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const vendorData = [
    {
      name: 'Amazon',
      products: stats.vendorStats.amazon.productCount,
      successRate: stats.vendorStats.amazon.successRate,
    },
    {
      name: 'Flipkart',
      products: stats.vendorStats.flipkart.productCount,
      successRate: stats.vendorStats.flipkart.successRate,
    },
  ];

  const COLORS = ['#FF9800', '#2196F3'];

  return (

    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Overview Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <Package className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">
              {stats.overview.totalTrackedItems}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Total Trackers</h3>
          <p className="text-xs text-gray-500 mt-1">
            {stats.overview.activeTrackedItems} active
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <Bell className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">
              {stats.overview.totalAlerts}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Price Alerts</h3>
          <p className="text-xs text-gray-500 mt-1">
            Avg drop: ₹{stats.overview.avgPriceDrop.toFixed(0)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900">
              {stats.overview.totalPriceChecks}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Price Checks</h3>
          <p className="text-xs text-gray-500 mt-1">
            Across all products
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <TrendingDown className="w-8 h-8 text-orange-600" />
            <span className="text-2xl font-bold text-gray-900">
              {stats.overview.totalProducts}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Products Tracked</h3>
          <p className="text-xs text-gray-500 mt-1">
            From Amazon & Flipkart
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Vendor Distribution */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={vendorData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, products }) => `${name}: ${products}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="products"
              >
                {vendorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Success Rate */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Scraping Success Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vendorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: any) => `${value.toFixed(2)}%`} />
              <Bar dataKey="successRate" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Scrapes */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Scraping Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.recentScrapes.map((scrape) => (
                <tr key={scrape.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(scrape.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${scrape.vendor === 'AMAZON'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-blue-100 text-blue-800'
                      }`}>
                      {scrape.vendor}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="flex items-center">
                      {scrape.status === 'SUCCESS' ? (
                        <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm ${scrape.status === 'SUCCESS' ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {scrape.status}
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {scrape.itemsScraped}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(scrape.duration / 1000).toFixed(2)}s
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}