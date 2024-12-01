import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateCabin as updateCabinApi } from '../../services/apiCabins';

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isPending: isEditing } = useMutation({
    mutationFn: updateCabinApi,
    onSuccess: () => {
      toast.success('New cabin updated');
      queryClient.invalidateQueries(['cabins']);
    },
    onError: error => toast.error(error.message),
  });

  return { updateCabin, isEditing };
}
