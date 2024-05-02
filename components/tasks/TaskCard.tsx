'use client'

import { useTaskStorage } from '~/services/store/taskStore'
import { Card } from 'antd'

export default function TaskCard({
  id,
  title,
  description,
  status
}: {
  id: string
  title: string
  description?: string
  status: TStatus
}) {
  const { dragging, removeTask } = useTaskStorage((state) => state)
  return (
    <div
      className={`shadow-lg border-2 rounded-lg ${status === 'PLAN' ? 'border-slate-300' : status === 'COOKING' ? 'border-cyan-300' : 'border-emerald-300'}`}
      draggable
      onDragStart={() => dragging(id)}
    >
      <Card className='cursor-move' title={title}>
        <p>{description}</p>
      </Card>
    </div>
  )
}
