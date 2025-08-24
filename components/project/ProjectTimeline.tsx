

import { Project } from '@/lib/types/projectTypes';
import {
    Calendar
} from 'lucide-react';
import { motion } from 'motion/react';

// Timeline Component
export const ProjectTimeline = ({ projects }: { projects: Project[] }) => {
    return (
        <div className="relative py-12">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-800" />
            {projects.map((project, index) => (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex items-center ${index % 2 === 0 ? 'justify-end' : 'justify-start'
                        } mb-12`}
                >
                    <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                        <div className={`${index % 2 === 0 ? 'ml-auto' : ''} max-w-sm`}>
                            <h3 className="text-xl font-semibold text-white mb-1">{project.title}</h3>
                            <p className="text-gray-400 text-sm mb-2">{project.subtitle}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3 justify-end">
                                <Calendar className="w-4 h-4" />
                                <span>{project.date}</span>
                            </div>
                            <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>
                        </div>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full ring-4 ring-gray-900" />
                </motion.div>
            ))}
        </div>
    );
}