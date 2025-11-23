import { useDataContext } from '../contexts/DataContext';

export const useSkillsData = () => {
  const { skills } = useDataContext();
  return skills;
};