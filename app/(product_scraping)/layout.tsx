"use client"
import { BarChart3, Bell, Home, Package } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
    const pathname = usePathname();

    const navigation = [
        { name: 'Search', href: '/price-tracker', icon: Home },
        { name: 'My Trackers', href: '/price-tracker/tracker', icon: Package },
        { name: 'Alerts', href: '/price-tracker/alerts', icon: Bell },
        { name: 'Statistics', href: '/price-tracker/stats', icon: BarChart3 },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/price-tracker" className="text-2xl font-bold text-gray-900">Price Tracker</Link>
                        </div>

                        <nav className="hidden md:flex space-x-8">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive
                                            ? 'text-blue-600 border-b-2 border-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        <item.icon className="w-4 h-4 mr-2" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </header>

            <main>{children}</main>
        </div>
    );
}