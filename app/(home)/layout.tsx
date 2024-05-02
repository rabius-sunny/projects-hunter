import HomeLayout from '~/components/shared/HomeLayout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HomeLayout>{children}</HomeLayout>
}
