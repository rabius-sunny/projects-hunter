export type TProjectActions = {
  updateProject: (
    id: string,
    data: Omit<TProject, 'id' | 'team' | 'tasks'>
  ) => void
  removeProject: (id: string) => void
}

export type TTaskActions = {
  addTask: (data: Omit<TTask, 'id'>) => void
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
}
