import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Loader from '../components/Loader/Loader';

// --- Interfaces ---
interface PersonalData {
    name: string;
    title: string;
    tagline: string;
    image?: string;
    bio: {
        title: string;
        paragraphs: string[];
    };
    contact: {
        email: string;
        phone?: string;
        location: string;
    };
    socialLinks: {
        github: string;
        linkedin: string;
    };
    stats?: {
        yearsExperience: string;
        projectsCompleted: string;
        cupsOfCoffee: string;
        linesOfCode: string;
    };
    resume?: string;
}

interface Skill {
    name: string;
    level: string;
    proficiency: number;
    icon?: string;
}

interface SkillCategory {
    category: string;
    skills: Skill[];
}

interface Project {
    id: number;
    title: string;
    description: string;
    longDescription?: string;
    technologies: string[];
    demoUrl?: string;
    githubUrl?: string;
    image?: string;
    category: string;
}

interface Experience {
    id: number;
    type: 'Work' | 'Internship' | 'Freelance';
    position: string;
    company: string;
    duration: string;
    location: string;
    description: string;
    achievements?: string[];
    technologies?: string[];
}

// --- Context Type ---
interface LoadingStep {
    name: string;
    loaded: boolean;
    visible: boolean;
}

interface DataContextType {
    personal: { data: PersonalData | null; loading: boolean; error: string | null };
    skills: { data: SkillCategory[] | null; loading: boolean; error: string | null };
    projects: { data: Project[] | null; loading: boolean; error: string | null };
    experience: { data: Experience[] | null; loading: boolean; error: string | null };
    loadingSteps: LoadingStep[];
    allDataLoaded: boolean;
    ready: boolean;
    setReady: (ready: boolean) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// --- Provider ---
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Personal Data State
    const [personal, setPersonal] = useState<{ data: PersonalData | null; loading: boolean; error: string | null }>({
        data: null, loading: true, error: null
    });

    // Skills Data State
    const [skills, setSkills] = useState<{ data: SkillCategory[] | null; loading: boolean; error: string | null }>({
        data: null, loading: true, error: null
    });

    // Projects Data State
    const [projects, setProjects] = useState<{ data: Project[] | null; loading: boolean; error: string | null }>({
        data: null, loading: true, error: null
    });

    // Experience Data State
    const [experience, setExperience] = useState<{ data: Experience[] | null; loading: boolean; error: string | null }>({
        data: null, loading: true, error: null
    });

    // Loading steps state
    const [loadingSteps, setLoadingSteps] = useState<LoadingStep[]>([
        { name: 'Personal Data', loaded: false, visible: false },
        { name: 'Skills', loaded: false, visible: false },
        { name: 'Projects', loaded: false, visible: false },
        { name: 'Experience', loaded: false, visible: false },
    ]);

    const [allDataLoaded, setAllDataLoaded] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || '';

        const fetchData = async () => {
            // Fetch Personal
            try {
                const res = await fetch(`${baseUrl}/api/personal`);
                if (!res.ok) throw new Error(res.statusText);
                const data = await res.json();
                setPersonal({ data, loading: false, error: null });
                setLoadingSteps(prev => prev.map((step, i) => i === 0 ? { ...step, loaded: true } : step));
            } catch (err) {
                setPersonal({ data: null, loading: false, error: err instanceof Error ? err.message : 'Error' });
                setLoadingSteps(prev => prev.map((step, i) => i === 0 ? { ...step, loaded: true } : step));
            }

            // Fetch Skills
            try {
                const res = await fetch(`${baseUrl}/api/skills`);
                if (!res.ok) throw new Error(res.statusText);
                const data = await res.json();
                setSkills({ data, loading: false, error: null });
                setLoadingSteps(prev => prev.map((step, i) => i === 1 ? { ...step, loaded: true } : step));
            } catch (err) {
                setSkills({ data: null, loading: false, error: err instanceof Error ? err.message : 'Error' });
                setLoadingSteps(prev => prev.map((step, i) => i === 1 ? { ...step, loaded: true } : step));
            }

            // Fetch Projects
            try {
                const res = await fetch(`${baseUrl}/api/projects`);
                if (!res.ok) throw new Error(res.statusText);
                const data = await res.json();
                setProjects({ data, loading: false, error: null });
                setLoadingSteps(prev => prev.map((step, i) => i === 2 ? { ...step, loaded: true } : step));
            } catch (err) {
                setProjects({ data: null, loading: false, error: err instanceof Error ? err.message : 'Error' });
                setLoadingSteps(prev => prev.map((step, i) => i === 2 ? { ...step, loaded: true } : step));
            }

            // Fetch Experience
            try {
                const res = await fetch(`${baseUrl}/api/experience`);
                if (!res.ok) throw new Error(res.statusText);
                const data = await res.json();
                setExperience({ data, loading: false, error: null });
                setLoadingSteps(prev => prev.map((step, i) => i === 3 ? { ...step, loaded: true } : step));
            } catch (err) {
                setExperience({ data: null, loading: false, error: err instanceof Error ? err.message : 'Error' });
                setLoadingSteps(prev => prev.map((step, i) => i === 3 ? { ...step, loaded: true } : step));
            }

            setAllDataLoaded(true);
        };

        fetchData();
    }, []);

    // Progressive rendering effect with 0.3s delays
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const stepIndex = loadingSteps.findIndex(step => step.loaded && !step.visible);

        if (stepIndex !== -1) {
            // Calculate delay: first step immediate, subsequent steps 0.3s after previous
            const delay = stepIndex === 0 ? 0 : 300;

            timeoutId = setTimeout(() => {
                setLoadingSteps(prev => prev.map((step, i) => i === stepIndex ? { ...step, visible: true } : step));
            }, delay);
        }

        return () => clearTimeout(timeoutId);
    }, [loadingSteps]);

    const isLoading = !ready;

    return (
        <DataContext.Provider value={{ personal, skills, projects, experience, loadingSteps, allDataLoaded, ready, setReady }}>
            {isLoading ? <Loader /> : children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};
