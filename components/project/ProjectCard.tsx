
import { Project, RepositoryType } from "@/lib/types/projectTypes";
import GithubMark from "@/public/icons/github-mark.svg";
import {
  ArrowRight,
  Globe,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Button } from "../ui/button";

// export const ProjectCard = ({ project }: { project }) => {
export const ProjectCard = ({ project }: { project: Project }) => {

  const getRepositories = () => {
    const repos: RepositoryType[] = [];

    // Fallback to old githubUrl for backward compatibility
    // if (project.repositories && project.repositories.length > 0) {
    //   repos = project.repositories;
    // }
    if (repos.length == 0 && project.githubUrl) {
      repos.push({ name: 'repository', githubUrl: project.githubUrl });
    }

    return repos;
  };

  const repositories = getRepositories();
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

        {/* Project Image */}
        <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />
          {/* Image or Icon */}
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl">{project.icon}</span>
            </div>
          )}
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="flex items-center space-x-4">
              {/* <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 transition"
              >
                <Globe className="w-5 h-5" />
              </motion.a> */}
              {project.liveUrl ? (
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
              ) : null}


              {/* GitHub Repository(ies) */}
              {repositories.length > 0 && (
                <div onClick={(e) => e.stopPropagation()}>
                  {repositories.length === 1 ? (
                    // Single repository - direct link
                    <Button
                      asChild
                      size="icon"
                      className="rounded-full bg-white text-gray-900 hover:bg-gray-100"
                    >
                      <motion.a
                        href={repositories[0].githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title={repositories[0].name}
                      >
                        {/* <Github className="w-5 h-5" /> */}
                        <Image src={GithubMark.src} alt={"github"} width={100} height={100} className="w-6 h-6" />
                      </motion.a>
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button
                        asChild
                        size="icon"
                        className="rounded-full bg-white text-gray-900 hover:bg-gray-100"
                      >
                        <motion.a
                          href={repositories.find(r => r.name === 'frontend')?.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          title="Frontend Repository"
                        >
                          <Image src={GithubMark.src} alt={"github"} width={100} height={100} className="w-6 h-6" />

                        </motion.a>
                      </Button>
                      <Button
                        asChild
                        size="icon"
                        className="rounded-full bg-white text-gray-900 hover:bg-gray-100"
                      >
                        <motion.a
                          href={repositories.find(r => r.name === 'backend')?.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          title="Backend Repository"
                        >
                          <Image src={GithubMark.src} alt={"github"} width={100} height={100} className="w-6 h-6" />
                        </motion.a>
                      </Button>
                    </div>
                  )}
                </div>
              )}


              {/* <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 transition"
              >
                <Image src={GithubMark.src} alt={"github"} width={100} height={100} className="w-6 h-6" />
              </motion.a> */}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3
              title={project.title}
              className="truncate text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition">
              {project.title}
            </h3>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition" />
          </div>
          <p className="text-sm text-purple-400 mb-3 truncate" title={project.subtitle}>{project.subtitle}</p>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2" title={project.subtitle}>{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag: string) => (
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
          {/* <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-3">
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
          </div> */}
        </div>
      </div>
    </motion.div>
  );
}
