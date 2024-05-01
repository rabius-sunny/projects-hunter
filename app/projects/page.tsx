'use client'

import ProjectsList from '~/components/projects/ProjectsList'
import ProjectsTable from '~/components/projects/ProjectsTable'
import { useGetAllProjects } from '~/helper/server/projects'

export default function Projects() {
  const { data, fetchStatus } = useGetAllProjects()

  return (
    <div>
      <ProjectsTable loading={fetchStatus === 'fetching'} data={data} />
      <ProjectsList loading={fetchStatus === 'fetching'} data={data} />
    </div>
  )
}
