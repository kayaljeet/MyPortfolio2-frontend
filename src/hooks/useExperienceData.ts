import { useDataContext } from '../contexts/DataContext';

export const useExperienceData = () => {
  const { experience } = useDataContext();
  return experience;
};