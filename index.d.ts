type TProject = {
  id: number
  title: string
  description: string
  deadline: string
  memberIds: number[] // IDs of members
  members: TMember[]
  taskIds: string[] // IDs of tasks
  tasks: TTask[]
  //   recents?: any
}

type TTask = {
  id: string
  title: string
  description?: string
  deadline: string
  projectId: number
  assignedTo: TMember
  status: TStatus
}

type TMember = {
  id: number
  name: string
  designation: string
}

type TStatus = 'PLAN' | 'COOKING' | 'EAT'
