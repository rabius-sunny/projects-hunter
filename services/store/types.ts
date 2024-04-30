export type TProjectActions = {
  updateProject: (
    id: string,
    data: Omit<TProject, 'id' | 'team' | 'tasks'>
  ) => void
  removeProject: (id: string) => void
}
