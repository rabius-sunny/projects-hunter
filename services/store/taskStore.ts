import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { TTaskActions } from './types'

type TState = {
  tasks: TTask[]
  draggedTask: string | null
}

export const useTaskStorage = create<TState & TTaskActions>()(
  persist(
    (set) => ({
      tasks: [],
      draggedTask: null,
      addTask: (data) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...data,
              status: 'PLAN'
            }
          ]
        })),
      dragging: (id) => set({ draggedTask: id }),
      updateTask: (id, ...rest) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...rest } : task
          )
        })),
      assignTaskToMember: (taskId, member) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId && task.assignedTo.id !== member.id
              ? { ...task, assignedTo: member }
              : task
          )
        })),
      updateTaskStatus: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, status } : task
          )
        })),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        })),
      removeAllTasks: () =>
        set(() => ({
          tasks: []
        }))
    }),
    {
      name: 'tasks',
      skipHydration: true
    }
  )
)
