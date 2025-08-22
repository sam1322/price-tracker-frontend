

import { Project } from "@/lib/types/projectTypes";
import GithubMark from "@/public/icons/github-mark-white.svg";
import {
  ArrowRight,
  Globe
} from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

// Project List Item Component
export const ProjectListItem = ({ project }: { project: Project }) => {
  return (
    <motion.div
      whileHover={{ x: 8 }}
      className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all"
    >
      <div className="flex items-start space-x-6">
        {/* Icon */}
        {/* <div className={`w-16 h-16 bg-gradient-to-br ${project.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <span className="text-3xl">{project.icon}</span>
        </div> */}
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            width={100}
            height={100}
            className='rounded-xl object-cover h-30 w-30'
          // fill
          // className="object-cover max-w-16 h-16"
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className={`w-16 h-16 bg-gradient-to-br ${project.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
            <span className="text-3xl">{project.icon}</span>
          </div>
        )}

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
              {project.tags.map((tag:string) => (
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
              {/* <div className="flex items-center space-x-3 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{project.stats.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>{project.stats.stars}</span>
                </div>
              </div> */}
              <div className="flex items-center space-x-2">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                >
                  <Globe className="w-4 h-4 text-white" />
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                >
                  <Image src={GithubMark.src} alt={"github"} width={100} height={100} className="w-5 h-5" />

                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}