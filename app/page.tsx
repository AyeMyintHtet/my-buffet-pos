import React from 'react'
import { getUser } from '@/utils/getUser'
import Demo from '@/components/Table'


const Dashboard = async () => {
  const { user, error } = await getUser()
  return (
    <div>Dashboard
      <br />
      {user.user?.email}
      <Demo/>
    </div>
  )
}

export default Dashboard