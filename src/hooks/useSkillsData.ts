import { useState, useEffect } from 'react';

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

export const useSkillsData = () => {
  const [data, setData] = useState<SkillCategory[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || ''; // Get base URL from environment variable
        const response = await fetch(`${baseUrl}/api/skills`); // Fetch from backend API
        if (!response.ok) {
            // If response is not OK, throw an error with status text
            throw new Error(`Failed to fetch skills data: ${response.statusText}`);
        }
        const skillsData = await response.json();
        setData(skillsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error fetching skills');
      } finally {
        setLoading(false);
      }
    };

    fetchSkillsData();
  }, []);

  return { data, loading, error };
};