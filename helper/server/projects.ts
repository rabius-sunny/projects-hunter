import { useQuery } from '@tanstack/react-query'
import { getAllProjects, getProjectById } from '~/actions/projects'

export function useGetAllProjects() {
  return useQuery({
    queryFn: async () => getAllProjects(),
    queryKey: ['projects']
  })
}
export function useGetProjectById(id: number) {
  return useQuery({
    queryFn: async () => getProjectById(id),
    queryKey: ['project']
  })
}
