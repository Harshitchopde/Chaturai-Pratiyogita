import React from 'react'
import { useSelector } from 'react-redux'
import { sidebarLinks } from '../../../data/dashboard-links';
import SideBarLinks from './SideBarLinks';
import { VscSignOut } from 'react-icons/vsc';
const SideBar = () => {

  const { loading:authLoading} = useSelector(state=> state.auth);
  const { user, loading:profileLoading} = useSelector(state=> state.profile)

  if(authLoading || profileLoading){
    return (
      <div className=" flex  items-center justify-center">
        Loading...
      </div>
    )
  }
  return (
    <div className='  hidden sm:visible sm:flex h-[calc(100vh-2.5rem)]  gap-2 flex-col pt-[50px] bg-blue-100 border-r border-black'>
      {
        sidebarLinks.map((link)=>{
          console.log("user -> ",user,link)
          if(link.type && user?.accountType!==link.type){
            return null;
          }else{
            return <SideBarLinks key={link.id} link={link} iconName={link.icon}/>
          }
        }) 
      }
      <div className=" flex h-[1px] w-10/12 mx-auto my-6  border border-gray-400"></div>
      <div className="flex flex-col">
         <SideBarLinks link={{ name: "Settings", path: "/dashboard/settings" }} iconName={"VscSettingsGear"}/>
      </div>
      <button className=' text-white bg-blue-200 text-sm  font-medium px-8 py-2'>
            <div className=" flex items-center gap-x-2">
                <VscSignOut className=' text-lg'/>
                <span>LogOut</span>
            </div>
        </button>
    </div>
  )
}

export default SideBar