import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'

function RootLayouts() {
  return (
    <div className='app-shell'>
      <aside className='app-shell-sidebar'>
        <SideBar />
      </aside>
      <main className='app-shell-content'>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayouts