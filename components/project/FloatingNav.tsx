import { useEffect, useState } from "react";
import { motion } from "motion/react"
import { ChevronUp } from "lucide-react";

// Floating Navigation Component
export const FloatingNav = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 200);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-40"
        >
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-12 h-12 bg-white text-gray-900 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition"
            >
                <ChevronUp className="w-5 h-5" />
            </button>
        </motion.div>
    );
}