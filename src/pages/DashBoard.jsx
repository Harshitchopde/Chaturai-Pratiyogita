import React, { useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/core/dashboard/SideBar';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { IoReorderThreeOutline } from "react-icons/io5";
const DashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref,()=>setIsSidebarOpen(false));
  return (
    <div className='  flex  relative min-h-[calc(100vh-3.5rem)]'>
      {/* Hamburger Button */}
      <button 
        className='md:hidden absolute top-3 left-1  max-h-max p-2 '
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
       <IoReorderThreeOutline className=' text-3xl'/>
      </button>
      
      {/* Sidebar */}
      <div ref={ref}
        className={`fixed inset-y-0 top-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <SideBar  />
      </div>
      

      {/* Main Content */}
      <div className='h-[calc(100vh-3.5rem)] flex flex-1 overflow-auto'>
        <div className='w-11/12 mx-auto py-0 justify-center items-center   pl-10 md:pl-0 max-w-[1000px] mt-2 md:mt-8'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
