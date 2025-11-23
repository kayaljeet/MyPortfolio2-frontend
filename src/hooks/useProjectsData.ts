import { useDataContext } from '../contexts/DataContext';

export const useProjectsData = () => {
  const { projects } = useDataContext();
  return projects;
};