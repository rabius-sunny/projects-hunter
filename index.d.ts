type TProject = {
  id: number
  title: string
  description: string
  deadline: string
  memberIds: number[] // IDs of members
  members: TMember[]
  taskIds: number[] // IDs of tasks
  tasks: TTask[]
  //   recents?: any
}

type TTask = {
  id: number
  title: string
  description: string
  deadline: string
  assigneeIds: number[] // IDs of members
  assignee: TMember[]
  status: 'PLANNING' | 'COOKING' | 'EAT'
}

type TMember = {
  id: number
  name: string
  designation: string
}
