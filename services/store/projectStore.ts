import { create } from 'zustand'

import { TProjectActions } from './types'

type TProjectState = {
  projects: TProject[]
}

export const useProjectStore = create<TProjectState & TProjectActions>()(
  (set) => ({
    projects: [],
    updateProject: (id, data) => {},
    removeProject: (id) => {}
  })
)
