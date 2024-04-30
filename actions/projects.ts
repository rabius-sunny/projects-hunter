'use server'

export const getAllProjects = async () => {
  try {
    return ['projects 1']
  } catch {
    return { error: 'failed to fetch projects' }
  }
}
