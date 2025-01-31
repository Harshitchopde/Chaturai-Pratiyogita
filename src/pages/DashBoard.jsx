import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/core/dashboard/SideBar'

const DashBoard = () => {
    console.log("Dash board")
  return (
    <div className=' flex  min-h-[calc(100vh-3.5rem)]'>
       <SideBar/>
       <div className=" h-[calc(100vh-3.5rem)]  flex-1 overflow-auto">
        <div className=" w-11/12 mx-auto py-0 max-w-[1000px] mt-8 ">
          <Outlet/>
        </div>
       </div>
    </div>
  )
}

export default DashBoard