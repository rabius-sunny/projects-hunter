export type TProjectActions = {
  addProjects: (data: TProject[]) => void
  addTaskToProject: (projectId: number, taskId: string) => void
  removeTaskFromProject: (projectId: number, taskId: string) => void
  addMemberToProject: (projectId: number, memberId: number) => void
  updateProject: (
    id: number,
    data: {
      title: string
      description: string
      deadline: string
    }
  ) => void
  removeProject: (id: number) => void
}

export type TTaskActions = {
  addTask: (data: TTask) => void
  dragging: (id: string | null) => void
  updateTask: (
    id: string,
    title?: string,
    description?: string,
    deadline?: string
  ) => void
  assignMembers: (taskId: string, memberId: number) => void
  updateStatus: (id: string, status: TStatus) => void
  removeTask: (id: string) => void
  removeAllTasks: () => void
}
