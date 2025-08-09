'use client';

import { ComparisonCard } from '@/components/search/ComparisonCard';
import { ProductCard } from '@/components/search/ProductCard';
import { SearchBar } from '@/components/search/SearchBar';
import CreateTrackerForm from '@/components/tracker/CreateTrackerForm';
import { Product, SearchResult, trackerService } from '@/lib/api/tracker.service';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function HomePage() {
    const router = useRouter();
    const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [isCreatingTracker, setIsCreatingTracker] = useState(false);
    const [trackerName, setTrackerName] = useState('');
    const [targetPrice, setTargetPrice] = useState('');

    const handleSearch = async (query: string) => {
        setIsSearching(true);
        try {
            const results = await trackerService.searchProducts(query, 100);
            setSearchResults(results);
            setSelectedProducts([]);
            setTrackerName(query);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const toggleProductSelection = (product: Product) => {
        setSelectedProducts(prev => {
            const isSelected = prev.some(p => p.productUrl === product.productUrl);
            if (isSelected) {
                return prev.filter(p => p.productUrl !== product.productUrl);
            }
            return [...prev, product];
        });
    };

    const handleCreateTracker = async () => {
        if (!searchResults || (!selectedProducts.length && !searchResults.amazonResults.products.length)) {
            return;
        }

        setIsCreatingTracker(true);
        try {
            // const productUrls = selectedProducts.length > 0
            //   ? selectedProducts.map(p => p.productUrl)
            //   : undefined;

            await trackerService.createTrackedItem({
                name: trackerName,
                searchQuery: searchResults.amazonResults.searchQuery,
                targetPrice: targetPrice ? parseFloat(targetPrice) : undefined,
                productsToTrack: selectedProducts,
            });

            router.push('/price-tracker/tracker');
        } catch (error) {
            console.error('Failed to create tracker:', error);
        } finally {
            setIsCreatingTracker(false);
        }
    };

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Track Prices from Amazon & Flipkart
                </h2>
                <p className="text-lg text-gray-600">
                    Search for products and get notified when prices drop
                </p>
            </div>

            <SearchBar onSearch={handleSearch} isLoading={isSearching} />

            {isSearching && (
                <div className="flex justify-center items-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">Searching products...</span>
                </div>
            )}

            {searchResults && !isSearching && (
                <div className="mt-8">
                    {/* Track Products Section */}
                    <CreateTrackerForm trackerName={trackerName}
                        setTrackerName={setTrackerName}
                        targetPrice={targetPrice}
                        setTargetPrice={setTargetPrice}
                        selectedProducts={selectedProducts}
                        isCreatingTracker={isCreatingTracker}
                        handleCreateTracker={handleCreateTracker} />

                    {/* Comparisons */}
                    {searchResults.comparisons.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Price Comparisons
                            </h3>
                            <div className="space-y-4">
                                {searchResults.comparisons.map((comparison, index) => (
                                    <ComparisonCard key={index} comparison={comparison} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Amazon Results */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            Amazon Results ({searchResults.amazonResults.products.length})
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {searchResults.amazonResults.products.map((product, index) => (
                                <ProductCard
                                    key={`amazon-${index}`}
                                    product={product}
                                    onSelect={toggleProductSelection}
                                    isSelected={selectedProducts.some(p => p.productUrl === product.productUrl)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Flipkart Results */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            Flipkart Results ({searchResults.flipkartResults.products.length})
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {searchResults.flipkartResults.products.map((product, index) => (
                                <ProductCard
                                    key={`flipkart-${index}`}
                                    product={product}
                                    onSelect={toggleProductSelection}
                                    isSelected={selectedProducts.some(p => p.productUrl === product.productUrl)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}