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
  assigneeIds: number[] // IDs of members
  assignee?: TMember[]
  status: TStatus
}

type TMember = {
  id: number
  name: string
  designation: string
}

type TStatus = 'PLANNING' | 'COOKING' | 'EAT'
