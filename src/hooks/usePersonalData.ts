import { useDataContext } from '../contexts/DataContext';

export const usePersonalData = () => {
  const { personal } = useDataContext();
  return personal;
};