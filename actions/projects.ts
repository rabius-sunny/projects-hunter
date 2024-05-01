'use server'

import members from '~/assets/membersdata'
import projectsList from '~/assets/projectsdata'

export const getAllProjects = async () => {
  try {
    const projectData: TProject[] = [...JSON.parse(projectsList)]
    const membersdata: TMember[] = [...JSON.parse(members)]
    projectData.forEach((project) => {
      const allMembers = membersdata.filter((member: TMember) =>
        project.memberIds.includes(member.id)
      )
      project.members = [...allMembers]
    })

    return projectData
  } catch {
    throw new Error('failed to fetch projects')
  }
}
