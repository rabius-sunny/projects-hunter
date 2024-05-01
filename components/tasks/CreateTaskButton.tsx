'use client'

import { useState } from 'react'
import { PlusCircleTwoTone } from '@ant-design/icons'
import getUID from '~/lib/cuid'
import { useProjectStorage } from '~/services/store/projectStore'
import { useTaskStorage } from '~/services/store/taskStore'
import type { FormProps } from 'antd'
import { Button, DatePicker, Form, Input, Modal, Select, Tooltip } from 'antd'
import dayjs from 'dayjs'

type TField = Omit<TTask, 'id'> & {
  memberId: string
}

export default function CreateTaskButton({
  projectId,
  allProjects,
  members
}: {
  projectId: number
  allProjects?: { id: number; title: string }[]
  members?: TMember[]
}) {
  const addTask = useTaskStorage((state) => state.addTask)
  const addTaskToProject = useProjectStorage((state) => state.addTaskToProject)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const onFinish: FormProps<TField>['onFinish'] = async (values) => {
    const id = getUID()
    const data = {
      ...values,
      id,
      assignedTo: members?.find(
        (member) => member.id === Number(values.memberId)
      ) as TMember,
      deadline: dayjs(values.deadline).format('DD-MM-YYYY')
    }
    addTask(data)
    addTaskToProject(projectId, id)

    setIsModalOpen(false)
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
              variant='filled'
              placeholder='enter a cool task title'
            />
          </Form.Item>
          <Form.Item<TField>
            rules={[{ required: false }]}
            label='Task description'
            name='description'
          >
            <Input.TextArea variant='filled' placeholder='write the agenda' />
          </Form.Item>
          <Form.Item<TField>
            rules={[{ required: true }]}
            label='Deadline'
            name='deadline'
          >
            <DatePicker variant='filled' className='w-full' />
          </Form.Item>
          <Form.Item<TField>
            rules={[
              {
                required: true,
                message: 'please enter the project id for this task'
              }
            ]}
            label='Project'
            name='projectId'
          >
            <Select
              variant='filled'
              options={allProjects?.map((project) => ({
                value: project.id,
                label: project.title
              }))}
            />
          </Form.Item>
          <Form.Item<TField>
            rules={[
              {
                required: true,
                message: 'please enter the project id for this task'
              }
            ]}
            label='Assign members'
            name='memberId'
          >
            <Select
              variant='filled'
              options={members?.map((member) => ({
                value: member.id,
                label: (
                  <p>
                    {member.name} (
                    <span className='text-xs text-slate-400'>
                      {member.designation}
                    </span>
                    )
                  </p>
                )
              }))}
            />
          </Form.Item>
          <Form.Item>
            <Button className='w-full' type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Tooltip
        placement='top'
        title='Create a task to this project'
        color='cyan'
      >
        <PlusCircleTwoTone
          onClick={() => setIsModalOpen(true)}
          className='text-4xl'
          twoToneColor='orangered'
        />
      </Tooltip>
    </div>
  )
}
