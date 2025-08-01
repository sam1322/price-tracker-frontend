import { Product } from "@/lib/api/tracker.service";
import { Loader2, PlusIcon } from "lucide-react";

interface CreateTrackerFormProps {
    trackerName: string;
    setTrackerName: (trackerName: string) => void;
    targetPrice: string;
    setTargetPrice: (price: string) => void;
    selectedProducts: Product[],
    isCreatingTracker: boolean,
    handleCreateTracker: () => void;
}

const CreateTrackerForm = ({
    trackerName,
    setTrackerName,
    targetPrice,
    setTargetPrice,
    selectedProducts,
    isCreatingTracker,
    handleCreateTracker
}: CreateTrackerFormProps) => {
    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
                Create Price Tracker
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tracker Name
                    </label>
                    <input
                        type="text"
                        value={trackerName}
                        onChange={(e) => { setTrackerName(e.target.value) }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., iPhone 15 Price Watch"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Target Price (Optional)
                    </label>
                    <input
                        type="number"
                        value={targetPrice}
                        onChange={(e) => setTargetPrice(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 50000"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                    {selectedProducts.length > 0
                        ? `${selectedProducts.length} products selected`
                        : 'Select specific products or track all search results'}
                </p>

                <button
                    onClick={handleCreateTracker}
                    disabled={isCreatingTracker || !trackerName}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isCreatingTracker ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <PlusIcon className="w-4 h-4" />
                    )}
                    Create Tracker
                </button>
            </div>
        </div>
    )
}

export default CreateTrackerForm