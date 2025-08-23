import { Project } from "@/lib/types/projectTypes";

// Project type definitions
export const PROJECT_TYPES = {
    web: { label: 'Web App', color: 'bg-blue-500' },
    mobile: { label: 'Mobile', color: 'bg-green-500' },
    ai: { label: 'AI/ML', color: 'bg-purple-500' },
    fullstack: { label: 'Full Stack', color: 'bg-orange-500' },
};

// Define your projects here
export const PROJECTS: Project[] = [
    {
        id: 1,
        title: "AI Video Generator",
        subtitle: "Text-to-Video Magic",
        description: "Transform text prompts into stunning AI-generated videos using cutting-edge machine learning models. Create cinematic scenes, animations, and visual stories in seconds.",
        longDescription: "Built with Next.js, Nest.js, and integrated with state-of-the-art AI models. Features real-time video generation, cloud storage, and social sharing capabilities. Also used built a resilient processing pipeline with Kafka workers that fetch, composite (FFmpeg), and store ﬁnal videos, ensuring asynchronous and fault-tolerant job handling",
        image: "https://res.cloudinary.com/dw5xqmxyu/image/upload/v1755846072/Create-Next-App-08-22-2025_12_28_PM_qiqpu5.png", // Add your project images
        tags: ["Next.js", "Nest.js", "AI/ML", "Prisma", "TypeScript", "Kakfa"],
        type: 'ai',
        // liveUrl: "https://project.sam-tech.xyz/ai-video-gen",
        liveUrl: "/ai-video-gen",
        githubUrl: "https://github.com/sam1322/price-tracker-frontend", // there is also a frontend github
        repositories: [
            {
                name: "frontend",
                githubUrl: "https://github.com/sam1322/price-tracker-frontend"
            },
            {
                name: "backend",
                githubUrl: "https://github.com/sam1322/price-tracker-backend"
            },
        ],
        featured: true,
        stats: {
            views: "2.3k",
            stars: "142",
            users: "500+"
        },
        color: "from-purple-600 to-pink-600",
        icon: "🎬",
        date: "2025"
    },
    {
        id: 2,
        title: "E-commerce Price Tracker",
        subtitle: "Track prices, save money, shop smarter",
        description: "Full-stack price comparison tool that tracks product prices across Amazon and Flipkart",
        longDescription: "Smart price tracker that monitors 100+ products every 6 hours, stores historical data in PostgreSQL, and uses Playwright-powered web scraping for accurate updates. Built for savvy shoppers who want to save time and money.",
        image: "https://res.cloudinary.com/dw5xqmxyu/image/upload/v1755846071/Create-Next-App-07-24-2025_05_24_PM-2_xjs8xm.png",
        tags: ["Nextjs", "Nestjs", "Prisma", "Postgres", "Playwright", "Typescript"],
        type: 'fullstack',
        liveUrl: "/price-tracker",
        // liveUrl: "https://project.sam-tech.xyz/price-tracker",
        githubUrl: "https://github.com/sam1322/price-tracker-backend",
        repositories: [
            {
                name: "frontend",
                githubUrl: "https://github.com/sam1322/price-tracker-frontend"
            },
            {
                name: "backend",
                githubUrl: "https://github.com/sam1322/price-tracker-backend"
            },
        ],
        featured: false,
        stats: {
            views: "1.8k",
            stars: "89",
            users: "200+"
        },
        color: "from-blue-600 to-cyan-600",
        icon: "🛍️",

        date: "2025"
    },
    {
        id: 3,
        title: "Twitch Clone",
        subtitle: "Real-time video broadcasting and chat, just like Twitch",
        description: "Full-featured streaming platform with live video broadcasting and real-time chat",
        longDescription: "Full-featured Twitch clone built with Next.js, React, and Spring Boot. Supports live video broadcasting with Nginx RTMP, real-time chat via WebSockets, and secure REST APIs for authentication and user management. Optimized for performance and scalability with PostgreSQL as the data backbone.",
        image: "https://res.cloudinary.com/dw5xqmxyu/image/upload/v1753635192/327942574-9419582f-e037-4532-921d-6c73ebe7d610_resr5g.png",
        tags: ["Next.js", "Nginx RTMP", "PostgreSQL", "Tailwind CSS", "Springboot", "Azure"],
        type: 'fullstack',
        liveUrl: "https://twitch-clone-frontend-private.vercel.app/",
        githubUrl: "https://github.com/sam1322/twitch-clone-spring",
        repositories: [
            {
                name: "frontend",
                githubUrl: "https://github.com/sam1322/twitch-clone-frontend"
            },
            {
                name: "backend",
                githubUrl: "https://github.com/sam1322/twitch-clone-spring"
            },
        ],
        featured: true,
        stats: {
            views: "3.1k",
            stars: "6",
            users: "1k+"
        },
        color: "from-green-600 to-emerald-600",
        icon: "✅",
        date: "2024"
    }
];