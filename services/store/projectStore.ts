import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { TProjectActions } from './types'

type TProjectState = {
  projects: TProject[]
}

export const useProjectStore = create<TProjectState & TProjectActions>()(
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
