'use client'

import { PlusCircleTwoTone } from '@ant-design/icons'
import { Tooltip } from 'antd'

export default function AssignMember({ projectId }: { projectId: number }) {
  return (
    <Tooltip
      placement='top'
      title='Assign a member to this project'
      color='cyan'
    >
      <PlusCircleTwoTone className='text-4xl' twoToneColor='orangered' />
    </Tooltip>
  )
}
