const projectsdata: TProject[] = [
  {
    id: 1,
    title: 'Blood Donation App',
    description:
      'Fullstack blood donation and inventory management web application.',
    deadline: '2/5/24',
    memberIds: [5, 10, 3, 9],
    members: [],
    taskIds: [],
    tasks: []
  },
  {
    id: 2,
    title: 'Matrimonial Website',
    description: 'Full featured matrimonial web application.',
    deadline: '2/6/24',
    memberIds: [4, 5],
    members: [],
    taskIds: [],
    tasks: []
  },
  {
    id: 3,
    title: 'Learn To Code',
    description: 'Fullstack learning management system.',
    deadline: '2/7/24',
    memberIds: [7, 8, 9, 1, 3, 5],
    members: [],
    taskIds: [],
    tasks: []
  }
]

export default JSON.stringify(projectsdata)
