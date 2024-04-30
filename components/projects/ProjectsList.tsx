'use client'

import { useGetAllProjects } from '~/helper/server/projects'

export default function ProjectsList() {
  const { data, fetchStatus, error } = useGetAllProjects()
  console.log('result', { data, fetchStatus, error })
  return <div>ProjectsList</div>
}
