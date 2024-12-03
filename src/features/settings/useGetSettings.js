import { useQuery } from '@tanstack/react-query';
import { getSettings as getSettingsApi } from '../../services/apiSettings';

export function useGetSettings() {
  const {
    isPending: isGetting,
    data: getSettings,
    error,
  } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettingsApi,
  });

  return { isGetting, getSettings };
}
