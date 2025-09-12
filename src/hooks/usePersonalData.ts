import { useState, useEffect } from 'react';

interface PersonalData {
  name: string;
  title: string;
  tagline: string;
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
    twitter?: string;
  };
  resume?: string;
}

export const usePersonalData = () => {
  const [data, setData] = useState<PersonalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonalData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || ''; // Get base URL from environment variable
        const response = await fetch(`${baseUrl}/api/personal`); // Fetch from backend API
        if (!response.ok) {
            // If response is not OK, throw an error with status text
            throw new Error(`Failed to fetch personal data: ${response.statusText}`);
        }
        const personalData = await response.json();
        setData(personalData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error fetching personal data');
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalData();
  }, []);

  return { data, loading, error };
};