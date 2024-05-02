'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightOutlined, DeleteTwoTone } from '@ant-design/icons'
import projectImg from '~/assets/images/project.png'
import AssignMemberButton from '~/components/projects/AssignMemberButton'
import CreateTaskButton from '~/components/tasks/CreateTaskButton'
import TaskActions from '~/components/tasks/TaskActions'
import { usePopulateTasks } from '~/helper/client/populateData'
import { useProjectStorage } from '~/services/store/projectStore'
import { useTaskStorage } from '~/services/store/taskStore'
import { Avatar, Dropdown, Input, MenuProps, Tooltip } from 'antd'

export default function ProjectDetails({ params }: { params: { id: string } }) {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const { projects: projectData, removeTaskFromProject } = useProjectStorage(
    (state) => state
  )
  const removeTask = useTaskStorage((state) => state.removeTask)
  const data = useMemo(() => {
    return projectData.find((project) => project.id === Number(params.id))
  }, [projectData, params.id])
  const tasks = usePopulateTasks(Number(params.id), data?.taskIds as string[])
  const menuItems: MenuProps['items'] = ['PLAN', 'COOKING', 'EAT', 'ALL'].map(
    (item) => ({ label: item, key: item })
  )

  const handleFilter: MenuProps['onClick'] = ({ key }) => setSelectedFilter(key)

  const filteredTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      const searchTask = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      return (
        (selectedFilter === 'ALL' || selectedFilter === task.status) &&
        searchTask
      )
    })
    return filtered
  }, [tasks, searchQuery, selectedFilter])

  const handleRemoveTask = (taskId: string) => {
    removeTask(taskId)
    removeTaskFromProject(Number(params.id), taskId)
  }
  return (
    <div className='box mx-auto mt-10'>
      <Image
        src={projectImg}
        alt={data?.title as string}
        priority
        width={400}
        height={300}
        className='size-full rounded-lg overflow-hidden'
      />
      <h1 className='mt-8 md:text-4xl md:mb-2'>{data?.title}</h1>
      <span className='bg-cyan-500 font-medium text-white text-sm px-3 py-[2px] rounded-full'>
        {data?.deadline}
      </span>
      <p className='text-slate-700 mt-4'>{data?.description}</p>

      <div className='mt-8'>
        <div className='flex items-center justify-between py-2'>
          <h2 className='text-2xl font-me'>Members</h2>
          <AssignMemberButton projectId={data?.id as number} />
        </div>
        <hr />
        <div className={`grid ${data?.members.length ? 'sm:grid-cols-2' : ''}`}>
          {data?.memberIds.length ? (
            data?.members.map((member, idx) => (
              <div key={idx} className='my-4 flex items-center gap-2'>
                <Avatar>{member.name.slice(0, 2)}</Avatar>
                <div>
                  <h2 className='font-medium text-xl'>{member.name}</h2>
                  <p className='text-sm text-slate-500'>{member.designation}</p>
                </div>
              </div>
            ))
          ) : (
            <div className='text-center text-danger my-8 text-xl font-medium'>
              No member is cooking here!
            </div>
          )}
        </div>
      </div>
      <div className='my-8'>
        <div className='flex items-center justify-between py-2'>
          <div className='flex items-center gap-2'>
            <h2 className='text-2xl'>Tasks</h2>
            <Link
              href={`/tasks?project=${params.id}`}
              className='text-secondary font-medium text-sm'
            >
              View all <ArrowRightOutlined />
            </Link>
          </div>
          <CreateTaskButton compact projectId={data?.id as number} />
        </div>
        <hr />
        <div className='mt-4'>
          <div className='grid grid-cols-3 gap-4'>
            <div className='col-span-2'>
              <Input
                value={searchQuery}
                onChange={({ target: { value } }) => setSearchQuery(value)}
                placeholder='search for a task'
              />
            </div>
            <div>
              <Dropdown menu={{ items: menuItems, onClick: handleFilter }}>
                <p className='px-3 py-1.5 rounded-lg border border-slate-300 text-sm cursor-pointer'>
                  {selectedFilter ?? 'Select status'}
                </p>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className='grid gap-2 mt-4 mb-20'>
          {filteredTasks.length ? (
            filteredTasks.map((task, idx) => (
              <div className='flex items-center gap-2' key={idx}>
                <div className='flex-1 bg-slate-100 px-4 py-2 rounded-lg'>
                  <h2>{task.title}</h2>
                </div>
                <TaskActions
                  id={task.id}
                  handleRemove={() => handleRemoveTask(task.id)}
                />
              </div>
            ))
          ) : (
            <div className='text-center text-danger my-8 text-xl font-medium'>
              No task found yet!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
