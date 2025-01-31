import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';
const SideBarLinks = ({link,iconName}) => {
  const Icon = Icons[iconName];
  const dispatch = useDispatch();
  const location = useLocation();

  const matchRoute = (route)=>{
    console.log("route match ",route,location.pathname,location);
    return matchPath({path:route},location.pathname);
  }
  return (
    <NavLink to={link?.path}
      className={` relative flex ${matchRoute(link.path)?" text-yellow-400 bg-yellow-900":" text-white bg-blue-200"}  text-sm font-medium px-8 py-2 
       transition-all duration-200`}>
       <span className={`w-[0.15rem] h-full absolute top-0 left-0 bg-yellow-400 ${matchRoute(link.path)?" opacity-100":" opacity-0"}`}></span>
       <div className=" flex items-center  gap-x-2">
        <Icon className={"text-lg"}/>
        <span>{link.name}</span>
       </div>
    </NavLink>
  )
}

export default SideBarLinks