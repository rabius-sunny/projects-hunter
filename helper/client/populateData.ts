import { useTaskStorage } from '~/services/store/taskStore'

export const usePopulateTasks = (projectId: number, taskIds: string[]) => {
  const tasksData = useTaskStorage((state) => state.tasks).filter(
    (task) => task.projectId === projectId
  )

  return tasksData.filter((task: TTask) => taskIds.includes(task.id))
}
