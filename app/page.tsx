// app/projects/page.tsx
'use client';

import { FloatingNav } from '@/components/project/FloatingNav';
import { ProjectCard } from '@/components/project/ProjectCard';
import { ProjectListItem } from '@/components/project/ProjectListItem';
import { ProjectModal } from '@/components/project/ProjectModal';
import { ProjectSearch } from '@/components/project/ProjectSearch';
import { ProjectTimeline } from '@/components/project/ProjectTimeline';
import { PROJECTS } from '@/constants/project';
import {
  Calendar,
  Clock,
  Code2,
  Grid3x3,
  List,
  Rocket,
  Search,
  Star
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';


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
        <div className="max-w-7xl mx-auto ">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center "
          >
            {/* TODO: Breadcrumb  will be used alter */}
            {/* <nav className="flex items-center justify-center space-x-2 text-sm text-gray-400 mb-8">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">Projects</span>
            </nav> */}

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
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold">2+</p>
                  <p className="text-sm text-gray-400">Years Experience</p>
                </div>
              </motion.div>
              {/* TODO: will uncomment it later */}
              {/* <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2"
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold">6</p>
                  <p className="text-sm text-gray-400">GitHub Stars</p>
                </div>
              </motion.div> */}
            </div>
          <ProjectSearch searchQuery={searchQuery} onSearch={setSearchQuery} />

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
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition ${viewMode === 'list'
                    ? 'bg-white text-gray-900'
                    : 'text-gray-400 hover:text-white'
                    }`}
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

      {/* Projects Grid/List */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {viewMode === 'timeline' ? (
            <ProjectTimeline projects={filteredProjects} />
          ) :
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
            </motion.div>}
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



