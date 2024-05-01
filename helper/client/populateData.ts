import members from '~/assets/fakedata/membersdata'

export const populateMembers = (project: TProject) => {
  const membersdata: TMember[] = [...JSON.parse(members)]

  return membersdata.filter((member: TMember) =>
    project.memberIds.includes(member.id)
  )
}
