import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { TProjectActions } from './types'

type TState = {
  projects: TProject[]
}

export const useProjectStorage = create<TState & TProjectActions>()(
  persist(
    (set) => ({
      projects: [],
      addProjects: (data) =>
        set(() => ({
          projects: data
        })),
      addTaskToProject: (projectId, newTask) => {
        console.log('project id', projectId)
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? { ...project, taskIds: [...project.taskIds, newTask] }
              : project
          )
        }))
      },
      removeTaskFromProject: (projectId, taskId) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  taskIds: project.taskIds.filter((id) => id !== taskId)
                }
              : project
          )
        })),
      addMemberToProject: (projectId, newMember) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? { ...project, memberIds: [...project.memberIds, newMember] }
              : project
          )
        })),

      updateProject: (id, data) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, ...data } : project
          )
        })),
      removeProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id)
        }))
    }),
    {
      name: 'projects',
      skipHydration: true
    }
  )
)
