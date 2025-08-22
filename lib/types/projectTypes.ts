// Project type definitions
const PROJECT_TYPES = {
    web: { label: 'Web App', color: 'bg-blue-500' },
    mobile: { label: 'Mobile', color: 'bg-green-500' },
    ai: { label: 'AI/ML', color: 'bg-purple-500' },
    fullstack: { label: 'Full Stack', color: 'bg-orange-500' },
};

type ProjectType = keyof typeof PROJECT_TYPES;

type ProjectStats = {
    views: string;
    stars: string;
    users: string;
};
type RepoType = "frontend" | "backend" | "repository"

export type RepositoryType = {
    githubUrl: string;
    name: RepoType;
}

export type Project = {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    longDescription: string;
    image: string;
    tags: string[];
    type: ProjectType;
    liveUrl?: string; // Optional since not all projects might have a live URL
    repositories?: RepositoryType[],// Optional since not all projects might be open source
    // Keep githubUrl for backward compatibility
    githubUrl?: string;
    featured: boolean;
    stats: ProjectStats;
    color: string;
    icon: string;
    date: string;
};

// If you want to make some properties optional, you could use:
type ProjectOptional = Partial<Pick<Project, 'liveUrl' | 'githubUrl'>> & Omit<Project, 'liveUrl' | 'githubUrl'>;