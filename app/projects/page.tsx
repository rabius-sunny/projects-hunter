'use client'

import ProjectsList from '~/components/projects/ProjectsList'
import ProjectsTable from '~/components/projects/ProjectsTable'
import { useGetAllProjects } from '~/helper/server/projects'

export default function Projects() {
  const { data, fetchStatus, error } = useGetAllProjects()
  if (error) return
  return (
    <div>
      <ProjectsTable loading={fetchStatus === 'fetching'} data={data} />
      <ProjectsList loading={fetchStatus === 'fetching'} data={data} />
    </div>
  )
}
