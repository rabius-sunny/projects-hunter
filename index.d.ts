type TProject = {
  id: string
  title: string
  description: string
  deadline: Date
  team: string[] // IDs of members
  tasks: string[] // IDs of tasks
  //   recents?: any
}

type TTask = {
  id: string
  title: string
  description: string
  deadline: Date
  assignee: string[] // IDs of members
  status: 'PLANNING' | 'COOKING' | 'EAT'
}

type TMember = {
  id: string
  name: string
  designation: string
}
