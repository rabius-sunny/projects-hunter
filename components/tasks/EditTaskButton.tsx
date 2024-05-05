'use client'

import { useMemo, useState } from 'react'
import { EditTwoTone } from '@ant-design/icons'
import { useTaskStorage } from '~/services/store/taskStore'
import { Button, Form, FormProps, Input, message, Modal, Tooltip } from 'antd'

type TField = {
  title: string
  description: string
}
export default function EditTaskButton({ id }: { id: string }) {
  const { tasks, updateTask } = useTaskStorage((state) => state)
  const task = useMemo(() => {
    const taskById = tasks.find((item) => item.id === id)
    return taskById
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onFinish: FormProps<TField>['onFinish'] = async (values) => {
    updateTask(id, { ...values })
    setIsModalOpen(false)
    message.success(`task updated successfully, id: ${id}`)
  }

  const onFinishFailed: FormProps<TField>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      <Modal
        title='Update task'
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer=''
      >
        <Form
          name='basic'
          layout='vertical'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<TField>
            rules={[{ required: true, max: 50 }]}
            label='Task title'
            name='title'
          >
            <Input
              allowClear
              defaultValue={task?.title}
              variant='filled'
              placeholder='enter a cool task title'
            />
          </Form.Item>
          <Form.Item<TField>
            rules={[{ required: true }]}
            label='Task description'
            name='description'
          >
            <Input.TextArea
              allowClear
              defaultValue={task?.description}
              variant='filled'
            />
          </Form.Item>
          <Form.Item>
            <Button className='w-full' type='primary' htmlType='submit'>
              Update task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Tooltip title='Edit task' color='gray'>
        <EditTwoTone
          onClick={() => setIsModalOpen(true)}
          twoToneColor='darkcyan'
          className='text-xl'
        />
      </Tooltip>
    </div>
  )
}
