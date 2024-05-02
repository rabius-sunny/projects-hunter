import { useRouter } from 'next/navigation'
import { DeleteTwoTone, EyeTwoTone } from '@ant-design/icons'
import { Tooltip } from 'antd'

export default function TaskActions({
  handleRemove,
  id
}: {
  handleRemove: Function
  id: string
}) {
  const { push } = useRouter()
  return (
    <div className='flex items-center gap-2'>
      <Tooltip title='View task details'>
        <EyeTwoTone
          twoToneColor='green'
          className='text-xl'
          onClick={() => push(`/tasks/${id}`)}
        />
      </Tooltip>
      <Tooltip color='red' title='Delete this task'>
        <DeleteTwoTone
          twoToneColor='red'
          className='text-xl'
          onClick={() => handleRemove()}
        />
      </Tooltip>
    </div>
  )
}
