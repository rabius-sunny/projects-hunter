'use client'

import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  DeleteTwoTone,
  EditTwoTone,
  EyeTwoTone,
  SearchOutlined
} from '@ant-design/icons'
import { useProjectStorage } from '~/services/store/projectStore'
import type { InputRef, TableColumnsType, TableColumnType } from 'antd'
import { Button, Input, message, Popconfirm, Space, Table } from 'antd'
import type { FilterDropdownProps } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'

import EditProjectButton from './EditProjectButton'

type DataIndex = keyof TProject

export default function ProjectsTable() {
  const { push } = useRouter()
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)

  const { projects, removeProject } = useProjectStorage((state) => state)

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const handleDeleteProject = (id: number) => {
    removeProject(id)
    message.success(`project deleted, id: ${id}`)
  }

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<TProject> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText((selectedKeys as string[])[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#fa541c', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  })

  const columns: TableColumnsType<TProject> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '50%',
      ...getColumnSearchProps('title'),
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      width: '10%',
      render: (text) => (
        <span className='bg-cyan-500 font-medium text-white text-xs px-2 py-[2px] rounded-full'>
          {text}
        </span>
      )
    },
    {
      title: 'Team',
      dataIndex: 'team',
      key: 'team',
      render: (_, { members }) => (
        <div className='flex items-center'>
          {members?.map((item, idx) => (
            <span
              className='bg-slate-300 mx-px rounded-full font-medium text-xs size-6 flex items-center justify-center'
              key={idx}
            >
              {item.name.slice(0, 2)}
            </span>
          ))}
        </div>
      )
    },
    {
      title: 'Tasks',
      dataIndex: 'taskIds',
      key: 'taskIds',
      width: '10%',
      sorter: (a, b) => a.taskIds.length - b.taskIds.length,
      sortDirections: ['descend', 'ascend'],
      render: (taskIds) => (
        <span className='font-semibold'>{taskIds?.length}</span>
      )
    },
    {
      title: 'Action',
      width: '15%',
      key: 'action',
      render: (_, data) => (
        <Space size='middle'>
          <EyeTwoTone
            twoToneColor='green'
            onClick={() => push(`/projects/${data.id}`)}
            className='text-xl'
          />
          <EditProjectButton id={data.id} />
          <Popconfirm
            title='Delete the project'
            description='Are you sure to delete this project?'
            onConfirm={() => handleDeleteProject(data.id)}
            okText='Yes'
            cancelText='No'
          >
            <DeleteTwoTone twoToneColor='red' className='text-xl' />
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <Table loading={!projects.length} columns={columns} dataSource={projects} />
  )
}
