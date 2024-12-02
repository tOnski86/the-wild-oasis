import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateSetting as updateSettingApi } from '../../services/apiSettings';
import toast from 'react-hot-toast';

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Setting updated');
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
    },
    onError: error => toast.error(error.message),
  });

  return { isUpdating, updateSetting };
}
