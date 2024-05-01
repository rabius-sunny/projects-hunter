'use client'

import { useRouter } from 'next/navigation'
import { signIn } from '~/actions/auth'
import type { FormProps } from 'antd'
import { Button, Checkbox, Form, Input, message } from 'antd'

type TField = {
  email: string
  password: string
  remember?: boolean
}

export default function HuntIn() {
  const { replace } = useRouter()
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish: FormProps<TField>['onFinish'] = async (values) => {
    const res = await signIn(values.email, values.password)
    res.ok
      ? replace('/projects')
      : messageApi.open({
          type: 'error',
          content: res.error
        })
  }

  const onFinishFailed: FormProps<TField>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className='my-[20vh] w-full flex justify-center items-center'>
      <div className='max-w-md w-full mx-4 sm:mx-0 border border-indigo-500 rounded-lg p-8 shadow-lg shadow-black/20'>
        <h1 className='text-center text-indigo-500 md:text-5xl mb-8'>
          Hunt in
        </h1>
        {contextHolder}
        <Form
          name='basic'
          layout='vertical'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<TField>
            label='Email address'
            name='email'
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input your nice email address!'
              }
            ]}
          >
            <Input placeholder='user@projects-hunter.com' />
          </Form.Item>

          <Form.Item<TField>
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                min: 6,
                max: 18,
                message: 'Please input your hunting password!'
              }
            ]}
          >
            <Input.Password placeholder='147570' />
          </Form.Item>

          <Form.Item<TField> name='remember' valuePropName='checked'>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button className='w-full' type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
