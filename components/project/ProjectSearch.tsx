import { SearchIcon } from "lucide-react";

// Search Component
export const ProjectSearch = ({ onSearch }: { onSearch: (query: string) => void }) => {
    return (
        <div className="relative max-w-md mx-auto mb-8">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
            <input
                type="text"
                placeholder="Search projects..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
            />
        </div>
    );
}
