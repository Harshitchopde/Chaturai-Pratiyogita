import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'
import { AiOutlineCaretDown } from 'react-icons/ai'
import { VscDashboard, VscQuestion, VscSignOut } from 'react-icons/vsc'
import { PiCoinVertical } from "react-icons/pi"
import { logOut } from '../../../services/operations/authApis'

const ProfileDropDown = () => {
  const { user } = useSelector(state => state.profile)
  const { coins } = useSelector(state => state.coins)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  return (
    <div className="relative" ref={ref}>
      {/* Trigger button */}
      <button
        className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-100 transition"
        onClick={() => setOpen(!open)}
      >
        {/* Coins */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-md px-2 py-1">
          <p className="text-sm font-medium text-slate-700">+{coins}</p>
          <PiCoinVertical className="text-xl text-yellow-500" />
        </div>

        {/* Avatar + caret */}
        <div className="flex items-center gap-1">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="w-8 h-8 rounded-full object-cover border border-slate-200"
          />
          <AiOutlineCaretDown
            className={`text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-slate-200 overflow-hidden z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            to="/dashboard/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
          >
            <VscDashboard className="text-lg" />
            Dashboard
          </Link>

          <Link
            to="/quiz-studio"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
          >
            <VscQuestion className="text-lg" />
            Quiz Studio
          </Link>

          <button
            onClick={() => {
              dispatch(logOut(navigate))
              setOpen(false)
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-slate-600 hover:bg-red-50 hover:text-red-600 transition"
          >
            <VscSignOut className="text-lg" />
            Log Out
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfileDropDown
