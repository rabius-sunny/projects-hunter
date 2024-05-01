'use server'

import projectsList from '~/assets/fakedata/projectsdata'
import { populateMembers } from '~/helper/client/populateData'

const projectData: TProject[] = [...JSON.parse(projectsList)]

export const getAllProjects = async () => {
  try {
    projectData.forEach((project) => {
      const allMembers = populateMembers(project)
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

    const allMembers = populateMembers(project)
    project.members = [...allMembers]

    return {
      ...project,
      projects: projectData.map((data) => ({ id: data.id, title: data.title }))
    }
  } catch {
    throw new Error('failed to fetch project')
  }
}
