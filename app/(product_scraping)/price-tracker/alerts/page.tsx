'use client';

import { Alert, trackerService } from '@/lib/api/tracker.service';
import { Bell, BellOff, Check, TrendingDown } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AlertsPage() {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showUnreadOnly, setShowUnreadOnly] = useState(false);

    const loadAlerts = async () => {
        setIsLoading(true);
        try {
            const data = await trackerService.getAlerts(showUnreadOnly);
            setAlerts(data);
        } catch (error) {
            console.error('Failed to load alerts:', error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        loadAlerts();
    }, [showUnreadOnly]);


    const markAsRead = async (alertId: string) => {
        try {
            await trackerService.markAlertAsRead(alertId);
            await loadAlerts();
        } catch (error) {
            console.error('Failed to mark alert as read:', error);
        }
    };

    return (

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Bell className="w-6 h-6 text-gray-600" />
                    <span className="text-lg font-medium text-gray-900">
                        {alerts.filter(a => !a.isRead).length} unread alerts
                    </span>
                </div>

                <button
                    onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                    className={`px-4 py-2 rounded-md flex items-center gap-2 ${showUnreadOnly
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border'
                        }`}
                >
                    {showUnreadOnly ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                    {showUnreadOnly ? 'Show All' : 'Unread Only'}
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            ) : alerts.length === 0 ? (
                <div className="text-center py-12">
                    <BellOff className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No alerts found</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {alerts.map((alert) => (
                        <div
                            key={alert.id}
                            className={`bg-white rounded-lg border p-6 ${!alert.isRead ? 'border-blue-300 shadow-md' : ''
                                }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingDown className="w-5 h-5 text-green-600" />
                                        <h3 className="font-semibold text-gray-900">{alert.message}</h3>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Previous Price</p>
                                            <p className="text-lg font-medium text-gray-900">
                                                ₹{alert.oldPrice.toLocaleString('en-IN')}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">New Price</p>
                                            <p className="text-lg font-medium text-green-600">
                                                ₹{alert.newPrice.toLocaleString('en-IN')}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Savings</p>
                                            <p className="text-lg font-medium text-green-600">
                                                ₹{Math.abs(alert.priceChange).toLocaleString('en-IN')}
                                                ({((Math.abs(alert.priceChange) / alert.oldPrice) * 100).toFixed(1)}%)
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <Link
                                            href={`/tracker/${alert.trackedItem.id}`}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                        >
                                            View Tracker: {alert.trackedItem.name}
                                        </Link>

                                        <p className="text-sm text-gray-500">
                                            {new Date(alert.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                {!alert.isRead && (
                                    <button
                                        onClick={() => markAsRead(alert.id)}
                                        className="ml-4 p-2 text-gray-400 hover:text-green-600 transition-colors"
                                        title="Mark as read"
                                    >
                                        <Check className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
        //</div>
    );
}