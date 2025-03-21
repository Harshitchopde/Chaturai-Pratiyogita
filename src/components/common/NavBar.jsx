import React, {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Search, X } from "lucide-react";
import ProfileDropDown from "../core/auth/ProfileDropDown";
import { resetQuery, setQuery } from "../../slices/quizzesSlice";
import QuizDropDown from "./QuizDropDown";

export const NavBar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const location = useLocation();
  // console.log("Location : ",location.pathname)
  const [qWord, setQWord] = useState("");
  const handleSearch = () => {
    dispatch(setQuery(qWord))
  };

  return (
    <div className="h-12 text-[1rem]  relative border-b-slate-600 border-b bg-white text-black justify-center flex">
      <div className="flex items-center justify-between gap-x-2 w-10/12 max-w-maxContent">
        <div className="flex flex-1 justify-between">
              {/* left  -> name-> Quiz-test*/}
        <Link to={"/"}>
          <div className="sm:text-xl hidden sm:block font-bold">Quiz-test</div>
        </Link>
        {/* center -> home , quizzes*/}
        <div className=" sm:text-xl flex sm:gap-4  gap-2   ">
          <Link to={"/"}>
            <div className="">Home</div>
          </Link>
          <Link to={"/quizzes"}>
          <QuizDropDown/>
          </Link>
          <Link to={"/contacts"}>
            <div className="">Contacts</div>
          </Link>
        </div>
        </div>

        {/* right -> login sign up | user */}
        <div className="flex justify-end flex-1 sm:text-xl  sm:gap-2 gap-1">
          {/* Search Bar */}
         {
            location.pathname==="/quizzes" && (
                <div className=" border   rounded-full overflow-hidden relative">
                <div className=" flex gap-x-2 border border-gray-200">
                  <input
                    type="text"
                    placeholder="Search Quizzes..."
                    value={qWord}
                    onChange={(e) => setQWord(e.target.value)}
                    className=" w-[100px] sm:w-fit text-[0.75rem] sm:text-xl  pl-3   pr-11  text-black focus:outline-none"
                  />
                  {qWord && (
                    <button
                      className=" absolute right-7  bottom-0 top-0 rounded-full text-gray-500 hover:text-black"
                      onClick={() => {
                        setQWord("")
                        dispatch(resetQuery())
                      }}
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
                <button
                  className=" absolute  right-2 top-0 bottom-0 rounded-full text-gray-500 hover:text-black"
                  onClick={(e) => handleSearch(e)}
                >
                  <Search size={18} />
                </button>
              </div>
            )
         }
          {user && (

            <ProfileDropDown />
          )}
          {token == null && (
            <Link to={"/login"}>
              <button className="border border-slate-400 rounded-md px-1 sm:px-2 sm:py-[1px]">
                Login
              </button>
            </Link>
          )}
          {token === null && (
            <Link to={"/signUp"}>
              <button className="border border-slate-400  px-1 rounded-md sm:px-2 ">
                Sign Up
              </button>
            </Link>
          )}
        </div>
      </div>
   
    </div>
  );
};
