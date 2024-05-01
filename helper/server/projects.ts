import { useQuery } from '@tanstack/react-query'
import { getAllProjects, getAssetsData } from '~/actions/projects'

export function useGetAllProjects() {
  return useQuery({
    queryFn: async () => getAllProjects(),
    queryKey: ['projects']
  })
}

export function useGetAssetsData() {
  return useQuery({
    queryFn: async () => getAssetsData(),
    queryKey: ['assets']
  })
}
