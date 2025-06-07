import React, { Children } from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import Sidebar from '@/components/admin/Sidebar';

export default async function ProtectedLayout({children}) {
    const session = await getServerSession(authOptions);

    if(!session || session.user.role!=="admin"){
        redirect("/")
    }
  return (
    <div> 
        {children}
    </div>
  )
}

