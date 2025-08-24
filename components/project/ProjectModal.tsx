// Project Modal Component

import { Project, RepositoryType } from "@/lib/types/projectTypes";
import GithubMark from "@/public/icons/github-mark-white.svg";
import {
  ExternalLink,
  Globe,
  X
} from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

export const ProjectModal = ({
  project,
  onClose
}: {
  project: Project
  onClose: () => void;
}) => {
  const getRepositories = () => {
    let repos: RepositoryType[] = [];

    // Fallback to old githubUrl for backward compatibility
    if (project.repositories && project.repositories.length > 0) {
      repos = project.repositories;
    }
    else if (project.githubUrl) {
      repos.push({ name: 'repository', githubUrl: project.githubUrl });
    }

    return repos;
  };

  const repositories = getRepositories();
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

        {/* Header with gradient */}
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            width={400}
            height={400}
            className='rounded-t-xl object-cover w-full max-h-64'
          // fill
          // className="object-cover rounded-"
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="text-8xl"
            >
              {project.icon}
            </motion.span>
          </div>
        </div>}

        {/* Content */}
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
            <p className="text-lg text-purple-400">{project.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">About</h3>
              <p className="text-gray-300 leading-relaxed mb-4">{project.longDescription}</p>

              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 mt-6">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
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
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Links</h3>
              {/* <div className="space-y-3">
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
              </div> */}

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
                {repositories.map((item) => <a
                  key={item.githubUrl}
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition"
                >
                  <Image src={GithubMark.src} alt={"github"} width={100} height={100} className="w-5 h-5" />
                  <span className="capitalize">View {item.name} Code</span>
                  <ExternalLink className="w-4 h-4" />
                </a>)}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
