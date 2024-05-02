'use client'

import { PlusCircleTwoTone } from '@ant-design/icons'
import { useGetAssetsData } from '~/helper/server/projects'
import { useProjectStorage } from '~/services/store/projectStore'
import { Dropdown, MenuProps } from 'antd'

export default function AssignMember({ projectId }: { projectId: number }) {
  const { data: assets } = useGetAssetsData()
  const addMember = useProjectStorage((state) => state.addMemberToProject)
  const items: MenuProps['items'] = assets?.members.map((member) => ({
    ...member,
    key: member.id,
    label: (
      <p>
        {member.name}
        <span className='text-slate-400 text-xs'>({member.designation})</span>
      </p>
    )
  }))
  const onClick: MenuProps['onClick'] = (item) => {
    const memberId = Number(item.key)
    const currentProject = assets?.projects.find(
      (project) => project.id === projectId
    )
    const memberExist = currentProject?.members.find(
      (member) => member === memberId
    )
    if (memberExist) return
    addMember(
      projectId,
      assets?.members.find((member) => member.id === memberId) as TMember
    )
  }
  return (
    <Dropdown menu={{ items, onClick }}>
      <PlusCircleTwoTone className='text-4xl' twoToneColor='orangered' />
    </Dropdown>
  )
}
