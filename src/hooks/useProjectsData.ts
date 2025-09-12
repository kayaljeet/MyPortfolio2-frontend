import { useState, useEffect } from 'react';

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

export const useProjectsData = () => {
  const [data, setData] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || ''; // Get base URL from environment variable
        const response = await fetch(`${baseUrl}/api/projects`); // Fetch from backend API
        if (!response.ok) {
            // If response is not OK, throw an error with status text
            throw new Error(`Failed to fetch projects data: ${response.statusText}`);
        }
        const projectsData = await response.json();
        setData(projectsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error fetching projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsData();
  }, []);

  return { data, loading, error };
};