'use client';

import {
    ArrowRight,
    ChevronRight,
    ChevronUp,
    Clock,
    Code2,
    ExternalLink,
    Eye,
    Github,
    Globe,
    Grid3x3,
    List,
    Rocket,
    Search,
    Sparkles,
    Star,
    X
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ProjectSearch } from './ProjectSearch';
import { ProjectTimeline } from './ProjectTimeline';



// Updated projects with proper image paths and types
const PROJECTS: Project[] = [
    {
        id: 1,
        title: "AI Video Generator",
        subtitle: "Text-to-Video Magic",
        description: "Transform text prompts into stunning AI-generated videos using cutting-edge machine learning models. Create cinematic scenes, animations, and visual stories in seconds.",
        longDescription: "Built with Next.js, Node.js, and integrated with state-of-the-art AI models. Features real-time video generation, cloud storage, and social sharing capabilities.",
        image: "/images/projects/ai-video-gen.jpg", // Add your actual image
        tags: ["Next.js", "Node.js", "AI/ML", "Prisma", "TypeScript"],
        type: 'ai',
        liveUrl: "https://your-ai-video-app.com",
        githubUrl: "https://github.com/yourusername/ai-video-gen",
        featured: true,
        stats: {
            views: "2.3k",
            stars: "142",
            users: "500+"
        },
        color: "from-purple-600 to-pink-600",
        icon: "🎬",
        date: "2024"
    },
    {
        id: 2,
        title: "Smart Task Manager",
        subtitle: "Productivity Redefined",
        description: "An intelligent task management system with AI-powered prioritization, automatic scheduling, and team collaboration features.",
        longDescription: "Features include real-time collaboration, AI task suggestions, calendar integration, and beautiful analytics dashboards. Built for teams who want to work smarter.",
        image: "/images/projects/task-manager.jpg",
        tags: ["React", "Firebase", "Material-UI", "Redux", "Node.js"],
        type: 'web' as keyof typeof PROJECT_TYPES,
        liveUrl: "https://your-task-app.com",
        githubUrl: "https://github.com/yourusername/task-manager",
        featured: false,
        stats: {
            views: "1.8k",
            stars: "89",
            users: "200+"
        },
        color: "from-blue-600 to-cyan-600",
        icon: "✅",
        date: "2023"
    },
    {
        id: 3,
        title: "E-Commerce Platform",
        subtitle: "Modern Shopping Experience",
        description: "A full-stack e-commerce solution with advanced filtering, real-time inventory, payment integration, and admin dashboard.",
        longDescription: "Complete e-commerce solution with Stripe payments, inventory management, order tracking, and customer analytics. Optimized for performance and conversion.",
        image: "/images/projects/ecommerce.jpg",
        tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS", "AWS"],
        type: 'fullstack' as keyof typeof PROJECT_TYPES,
        liveUrl: "https://your-shop.com",
        githubUrl: "https://github.com/yourusername/ecommerce",
        featured: true,
        stats: {
            views: "3.1k",
            stars: "156",
            users: "1k+"
        },
        color: "from-green-600 to-emerald-600",
        icon: "🛍️",
        date: "2023"
    }
];

// Floating Navigation Component
function FloatingNav() {
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


const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function ProjectsPage() {
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list' | 'timeline'>('grid');
    const [filter, setFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProjects = PROJECTS.filter(project => {
        const matchesFilter = filter === 'all' || (filter === 'featured' && project.featured);
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
            </div>

            {/* Header */}
            <header className="relative z-10 px-4 sm:px-6 lg:px-8 pt-8 pb-16">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        {/* Breadcrumb */}
                        <nav className="flex items-center justify-center space-x-2 text-sm text-gray-400 mb-8">
                            <Link href="/" className="hover:text-white transition">Home</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-white">Projects</span>
                        </nav>

                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                My Projects
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                            Exploring the intersection of design and technology. Here are some of my recent works
                            that showcase my passion for creating beautiful, functional applications.
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-8 mb-12">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center space-x-2"
                            >
                                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                    <Rocket className="w-6 h-6 text-purple-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-2xl font-bold">{PROJECTS.length}</p>
                                    <p className="text-sm text-gray-400">Projects</p>
                                </div>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center space-x-2"
                            >
                                <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center">
                                    <Code2 className="w-6 h-6 text-pink-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-2xl font-bold">10+</p>
                                    <p className="text-sm text-gray-400">Technologies</p>
                                </div>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center space-x-2"
                            >
                                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                    <Star className="w-6 h-6 text-blue-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-2xl font-bold">387</p>
                                    <p className="text-sm text-gray-400">GitHub Stars</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Search Bar */}
                        <ProjectSearch onSearch={setSearchQuery} />

                        {/* Controls */}
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            {/* Filter Buttons */}
                            <div className="flex items-center bg-gray-800/50 backdrop-blur rounded-lg p-1">
                                <button
                                    onClick={() => setFilter('all')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${filter === 'all'
                                        ? 'bg-white text-gray-900'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    All Projects
                                </button>
                                <button
                                    onClick={() => setFilter('featured')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${filter === 'featured'
                                        ? 'bg-white text-gray-900'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    Featured
                                </button>
                            </div>

                            {/* View Mode Toggle */}
                            <div className="flex items-center bg-gray-800/50 backdrop-blur rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-md transition ${viewMode === 'grid'
                                        ? 'bg-white text-gray-900'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                    title="Grid View"
                                >
                                    <Grid3x3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-md transition ${viewMode === 'list'
                                        ? 'bg-white text-gray-900'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                    title="List View"
                                >
                                    <List className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('timeline')}
                                    className={`p-2 rounded-md transition ${viewMode === 'timeline'
                                        ? 'bg-white text-gray-900'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                    title="Timeline View"
                                >
                                    <Clock className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Projects Display */}
            <main className="relative z-10 px-4 sm:px-6 lg:px-8 pb-20">
                <div className="max-w-7xl mx-auto">
                    {viewMode === 'timeline' ? (
                        <ProjectTimeline projects={filteredProjects} />
                    ) : (
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className={viewMode === 'grid'
                                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                : "space-y-8"
                            }
                        >
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    variants={item}
                                    layout
                                    onClick={() => setSelectedProject(project.id)}
                                    className="group cursor-pointer"
                                >
                                    {viewMode === 'grid' ? (
                                        <ProjectCard project={project} />
                                    ) : (
                                        <ProjectListItem project={project} />
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* Empty State */}
                    {filteredProjects.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-12 h-12 text-gray-600" />
                            </div>
                            <p className="text-gray-400 text-lg">No projects found matching your search</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setFilter('all');
                                }}
                                className="mt-4 text-purple-400 hover:text-purple-300"
                            >
                                Clear filters
                            </button>
                        </motion.div>
                    )}
                </div>
            </main>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={PROJECTS.find(p => p.id === selectedProject)!}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>

            {/* Floating Navigation */}
            <FloatingNav />
        </div>
    );
}

// Enhanced Project Card with Image
function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="relative h-full"
        >
            <div className="h-full bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all">
                {/* Featured Badge */}
                {project.featured && (
                    <div className="absolute top-4 left-4 z-10">
                        <div className={`px-3 py-1 bg-gradient-to-r ${project.color} rounded-full flex items-center space-x-1`}>
                            <Sparkles className="w-3 h-3 text-white" />
                            <span className="text-xs font-medium text-white">Featured</span>
                        </div>
                    </div>
                )}

                {/* Project Type Badge */}
                <div className="absolute top-4 right-4 z-10">
                    <div className={`px-3 py-1 ${PROJECT_TYPES[project.type].color} rounded-full`}>
                        <span className="text-xs font-medium text-white">{PROJECT_TYPES[project.type].label}</span>
                    </div>
                </div>

                {/* Project Image */}
                <div className="relative h-48 overflow-hidden group">
                    {project.image ? (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${project.color} opacity-20 flex items-center justify-center`}>
                            <span className="text-6xl">{project.icon}</span>
                        </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="flex items-center space-x-4">
                            <motion.a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 transition"
                            >
                                <Globe className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 transition"
                            >
                                <Github className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition">
                            {project.title}
                        </h3>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition" />
                    </div>
                    <p className="text-sm text-purple-400 mb-3">{project.subtitle}</p>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-md"
                            >
                                {tag}
                            </span>
                        ))}
                        {project.tags.length > 3 && (
                            <span className="px-2 py-1 text-gray-500 text-xs">
                                +{project.tags.length - 3} more
                            </span>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{project.stats.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4" />
                            <span>{project.stats.stars}</span>
                        </div>
                    </div>
                    <span>{project.date}</span>
                </div>
            </div>
        </motion.div >
    );
}

// Enhanced List Item with Image
function ProjectListItem({ project }: { project: typeof PROJECTS[0] }) {
    return (
        <motion.div
            whileHover={{ x: 8 }}
            className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all"
        >
            <div className="flex items-start space-x-6">
                {/* Image or Icon */}
                <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                    {project.image ? (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="96px"
                        />
                    ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                            <span className="text-3xl">{project.icon}</span>
                        </div>
                    )}
                    {/* Type Badge */}
                    <div className={`absolute bottom-2 right-2 px-2 py-1 ${PROJECT_TYPES[project.type].color} rounded text-xs text-white`}>
                        {PROJECT_TYPES[project.type].label}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition">
                                {project.title}
                            </h3>
                            <p className="text-sm text-purple-400">{project.subtitle}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition" />
                    </div>

                    <p className="text-gray-400 mb-4">{project.description}</p>

                    <div className="flex items-center justify-between">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-md"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Links & Stats */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                    <Eye className="w-4 h-4" />
                                    <span>{project.stats.views}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4" />
                                    <span>{project.stats.stars}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                                >
                                    <Globe className="w-4 h-4 text-gray-400" />
                                </a>
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                                >
                                    <Github className="w-4 h-4 text-gray-400" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Enhanced Modal with Image Gallery
function ProjectModal({
    project,
    onClose
}: {
    project: typeof PROJECTS[0];
    onClose: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl w-full bg-gray-900 rounded-3xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/20 transition"
                >
                    <X className="w-5 h-5 text-white" />
                </button>

                {/* Header with image */}
                <div className="relative h-72 overflow-hidden">
                    {project.image ? (
                        <>
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                        </>
                    ) : (
                        <div className={`relative h-full bg-gradient-to-br ${project.color}`}>
                            <div className="absolute inset-0 bg-black/30" />
                        </div>
                    )}

                    {/* Project info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="text-4xl">{project.icon}</span>
                                <div className={`px-3 py-1 ${PROJECT_TYPES[project.type].color} rounded-full`}>
                                    <span className="text-xs font-medium text-white">{PROJECT_TYPES[project.type].label}</span>
                                </div>
                                {project.featured && (
                                    <div className="px-3 py-1 bg-yellow-500 rounded-full flex items-center space-x-1">
                                        <Sparkles className="w-3 h-3 text-white" />
                                        <span className="text-xs font-medium text-white">Featured</span>
                                    </div>
                                )}
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                            <p className="text-lg text-purple-400">{project.subtitle}</p>
                        </motion.div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8">
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div className="md:col-span-2">
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">About</h3>
                            <p className="text-gray-300 leading-relaxed mb-4">{project.longDescription}</p>

                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 mt-6">Technologies</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-lg"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Stats</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                                    <span className="text-gray-400">Views</span>
                                    <span className="text-white font-semibold">{project.stats.views}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                                    <span className="text-gray-400">GitHub Stars</span>
                                    <span className="text-white font-semibold">{project.stats.stars}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                                    <span className="text-gray-400">Users</span>
                                    <span className="text-white font-semibold">{project.stats.users}</span>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r ${project.color} text-white rounded-lg font-medium hover:shadow-lg transition`}
                                >
                                    <Globe className="w-5 h-5" />
                                    <span>View Live Demo</span>
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition"
                                >
                                    <Github className="w-5 h-5" />
                                    <span>View Source Code</span>
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
