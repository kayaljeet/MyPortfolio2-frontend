import { useState, useEffect } from 'react';

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

export const useExperienceData = () => {
  const [data, setData] = useState<Experience[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || ''; // Get base URL from environment variable
        const response = await fetch(`${baseUrl}/api/experience`); // Fetch from backend API
        if (!response.ok) {
            // If response is not OK, throw an error with status text
            throw new Error(`Failed to fetch experience data: ${response.statusText}`);
        }
        const experienceData = await response.json();
        setData(experienceData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error fetching experience');
      } finally {
        setLoading(false);
      }
    };

    fetchExperienceData();
  }, []);

  return { data, loading, error };
};