import { useQuery } from '@tanstack/react-query'
import { getAllProjects } from '~/actions/projects'

export function useGetAllProjects() {
  return useQuery({
    queryFn: async () => getAllProjects(),
    queryKey: ['projects']
  })
}
