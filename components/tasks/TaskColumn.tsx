'use client'

import { useEffect, useMemo } from 'react'
import { useTaskStorage } from '~/services/store/taskStore'

import CreateTaskButton from './CreateTaskButton'
import TaskCard from './TaskCard'

export default function TaskColumn({
  title,
  status,
  tasks,
  projectId
}: {
  title: string
  status: TStatus
  tasks: TTask[]
  projectId: number
}) {
  const { updateTaskStatus, dragging, draggedTask } = useTaskStorage(
    (state) => state
  )
  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.status === status),
    [tasks, status]
  )

  const handleDrop = (_e: React.DragEvent<HTMLDivElement>) => {
    console.log('draggedTask', draggedTask)
    if (!draggedTask) return
    updateTaskStatus(draggedTask, status)
    dragging(null)
  }
  useEffect(() => {
    useTaskStorage.persist.rehydrate()
  }, [])

  return (
    <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <div
        className={`${status === 'PLAN' ? 'bg-slate-500' : status === 'COOKING' ? 'bg-cyan-500' : 'bg-emerald-500'} uppercase text-white font-medium text-center py-3 text-xl rounded-t-full`}
      >
        {title}
      </div>
      <div className='bg-slate-200/70 p-4 h-[80vh] overflow-y-auto'>
        <div className='grid gap-3'>
          {filteredTasks.map((task) => (
            <TaskCard
              status={status}
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
            />
          ))}
        </div>
        {status === 'PLAN' && (
          <div className='mt-3'>
            <CreateTaskButton projectId={projectId} />
          </div>
        )}
      </div>
    </div>
  )
}
