'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ProjectOutlined, SafetyOutlined } from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd'

const { Content, Footer, Sider } = Layout

const items = [
  { icon: ProjectOutlined, href: '/projects', label: 'Projects' },
  { icon: SafetyOutlined, href: '/hunt-in', label: 'Login' }
]

export default function HomeLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint='lg' collapsedWidth='0'>
        <div className='my-10 text-white mx-2 text-xl font-semibold'>
          Projects Hunter
        </div>
        <div className='grid gap-2 px-2 duration-200'>
          {items.map((nav) => (
            <Link
              className={`text-white font-medium py-2 px-2 rounded-lg hover:opacity-85 ${pathname === nav.href && 'bg-primary'}`}
              href={nav.href}
              key={nav.href}
            >
              {nav.label}
            </Link>
          ))}
        </div>
      </Sider>
      <Layout>
        <Content>
          <div
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            <div className='py-10'>{children}</div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Projects Hunter by{' '}
          <a href='https://github.com/rabius-sunny'>Rabius Sunny</a>
        </Footer>
      </Layout>
    </Layout>
  )
}
