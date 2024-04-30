'use server'

import projectsList from '../assets/projectsdata.json'

export const getAllProjects = async () => {
  try {
    return JSON.parse(JSON.stringify(projectsList))
  } catch {
    return { error: 'failed to fetch projects' }
  }
}
