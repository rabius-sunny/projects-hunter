import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'
import { getAllProjects } from '~/actions/projects'
import ProjectsList from '~/components/projects/ProjectsList'

export default async function ProjectsLayout({
  children
}: {
  children: React.ReactNode
}) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['projects'],
    queryFn: getAllProjects
  })
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </div>
  )
}
