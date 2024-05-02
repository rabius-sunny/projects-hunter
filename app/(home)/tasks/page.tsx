'use client'

import { Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import TaskColumn from '~/components/tasks/TaskColumn'
import { useProjectStorage } from '~/services/store/projectStore'
import { useTaskStorage } from '~/services/store/taskStore'

export default function TaskPage() {
  const searchParams = useSearchParams()
  const projectId = Number(searchParams.get('project'))
  const tasks = useTaskStorage((state) =>
    state.tasks.filter((task) => task.projectId === Number(projectId))
  )
  const projectData = useProjectStorage((state) => state.projects)
  const project = useMemo(() => {
    return projectData.find((project) => project.id === Number(projectId))
  }, [projectData, projectId])

  return (
    <Suspense>
      <div className='max-w-6xl mx-4 md:mx-8 lg:mx-12 xl:mx-auto my-10'>
        <h1 className='text-center text-secondary'>{project?.title}</h1>
        <div className='mt-8 grid gap-x-6 gap-y-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
          <TaskColumn
            projectId={projectId}
            title='plan'
            status='PLAN'
            tasks={tasks}
          />
          <TaskColumn
            projectId={projectId}
            title='coocking'
            status='COOKING'
            tasks={tasks}
          />
          <TaskColumn
            projectId={projectId}
            title='eat'
            status='EAT'
            tasks={tasks}
          />
        </div>
      </div>
    </Suspense>
  )
}
