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
      updateProject: (id, data) => {},
      removeProject: (id) => {}
    }),
    {
      name: 'projects',
      skipHydration: true
    }
  )
)
