'use client'

import { useMemo, useState } from 'react'
import { EditTwoTone } from '@ant-design/icons'
import { useProjectStorage } from '~/services/store/projectStore'
import { Button, Form, FormProps, Input, message, Modal } from 'antd'

type TField = {
  title: string
  description: string
}
export default function EditProjectButton({ id }: { id: number }) {
  const { projects, updateProject } = useProjectStorage((state) => state)
  const project = useMemo(() => {
    const projectById = projects.find((item) => item.id === id)
    return projectById
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onFinish: FormProps<TField>['onFinish'] = async (values) => {
    updateProject(id, { ...values })
    setIsModalOpen(false)
    message.success(`project updated successfully, id: ${id}`)
  }

  const onFinishFailed: FormProps<TField>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      <Modal
        title='Create a brand new task'
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
              defaultValue={project?.title}
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
              defaultValue={project?.description}
              variant='filled'
            />
          </Form.Item>
          <Form.Item>
            <Button className='w-full' type='primary' htmlType='submit'>
              Update project
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <EditTwoTone
        onClick={() => setIsModalOpen(true)}
        twoToneColor='orange'
        className='text-xl'
      />
    </div>
  )
}
