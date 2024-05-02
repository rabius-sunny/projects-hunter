'use server'

import membersList from '~/assets/fakedata/membersdata'
import projectsList from '~/assets/fakedata/projectsdata'

const projectData: TProject[] = [...JSON.parse(projectsList)]
const membersData: TMember[] = [...JSON.parse(membersList)]
const getMembersForProject = (memberIds: number[]) =>
  membersData.filter((member: TMember) => memberIds.includes(member.id))

export const getAllProjects = async () => {
  try {
    projectData.forEach((project) => {
      const allMembers = getMembersForProject(project.memberIds)
      project.members = [...allMembers]
    })

    return projectData
  } catch {
    throw new Error('failed to fetch projects')
  }
}

export const getProjectById = async (id: number) => {
  try {
    const project = projectData.find((item) => item.id === id)
    if (!project) throw new Error('no project found')

    const allMembers = getMembersForProject(project.memberIds)
    project.members = [...allMembers]

    return project
  } catch {
    throw new Error('failed to fetch project')
  }
}

export const getAssetsData = async () => {
  try {
    return {
      projects: projectData.map((data) => ({
        id: data.id,
        title: data.title,
        members: data.memberIds
      })),
      members: membersData
    }
  } catch {
    throw new Error('failed to fetch project')
  }
}
