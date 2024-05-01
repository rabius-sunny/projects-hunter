import Image from 'next/image'
import { getProjectById } from '~/actions/projects'
import projectImg from '~/assets/images/project.png'
import AssignMemberButton from '~/components/projects/AssignMemberButton'
import CreateTaskButton from '~/components/tasks/CreateTaskButton'
import { Avatar } from 'antd'

export default async function ProjectDetails({
  params
}: {
  params: { id: string }
}) {
  const data = await getProjectById(Number(params.id))
  return (
    <div className='box mx-auto mt-10'>
      <Image
        src={projectImg}
        alt={data.title}
        priority
        width={400}
        height={300}
        className='size-full rounded-lg overflow-hidden'
      />
      <h1 className='mt-8 md:text-4xl md:mb-2'>{data.title}</h1>
      <span className='bg-cyan-500 font-medium text-white text-sm px-3 py-[2px] rounded-full'>
        {data.deadline}
      </span>
      <p className='text-slate-700 mt-4'>{data.description}</p>

      <div className='mt-8'>
        <div className='flex items-center justify-between py-2'>
          <h2 className='text-2xl font-me'>Members</h2>
          <AssignMemberButton projectId={data.id} />
        </div>
        <hr />
        <div className={`grid ${data.members.length ? 'sm:grid-cols-2' : ''}`}>
          {data.members.length ? (
            data.members.map((member, idx) => (
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
          <h2 className='text-2xl font-me'>Tasks</h2>
          <CreateTaskButton allProjects={data.projects} projectId={data.id} />
        </div>
        <hr />
        <div className={`grid ${data.tasks.length ? 'sm:grid-cols-2' : ''}`}>
          {data.tasks.length ? (
            data.members.map((member, idx) => (
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
              No task found yet!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
