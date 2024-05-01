'use client'

import { useEffect, useState } from 'react'
import ProjectsList from '~/components/projects/ProjectsList'
import ProjectsTable from '~/components/projects/ProjectsTable'
import { useGetAllProjects } from '~/helper/server/projects'
import { useProjectStorage } from '~/services/store/projectStore'
import { useTaskStorage } from '~/services/store/taskStore'

export default function Projects() {
  const { data, fetchStatus } = useGetAllProjects()
  const [initialized, setInitialized] = useState(false)
  const { projects, addProjects } = useProjectStorage((state) => state)
  const removeAllLocalTasks = useTaskStorage((state) => state.removeAllTasks)
  useEffect(() => {
    if (data) setInitialized(true)
    // seeding data to zustand storage for further uses, in real scenario, application will talk to database and cached data instead.
    if (data && initialized && projects.length === 0) {
      console.log('seeded')
      addProjects(data)
      removeAllLocalTasks()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, projects, initialized])

  return (
    <div>
      <ProjectsTable />
      <ProjectsList loading={fetchStatus === 'fetching'} data={data} />
    </div>
  )
}
