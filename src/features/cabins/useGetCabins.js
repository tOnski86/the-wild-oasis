import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export function useGetCabins() {
  const { isPending, data: cabins } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  return { isPending, cabins };
}
