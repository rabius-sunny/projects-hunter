export type TProjectActions = {
  addProjects: (data: TProject[]) => void
  addTaskToProject: (projectId: number, taskId: string) => void
  removeTaskFromProject: (projectId: number, taskId: string) => void
  addMemberToProject: (projectId: number, newMember: TMember) => void
  updateProject: (
    id: number,
    data: {
      title: string
      description: string
    }
  ) => void
  removeProject: (id: number) => void
}

export type TTaskActions = {
  addTask: (data: TTask) => void
  dragging: (id: string | null) => void
  updateTask: (
    id: string,
    data: { title: string; description?: string }
  ) => void
  assignTaskToMember: (taskId: string, member: TMember) => void
  updateTaskStatus: (id: string, status: TStatus) => void
  removeTask: (id: string) => void
  removeAllTasks: () => void
}
