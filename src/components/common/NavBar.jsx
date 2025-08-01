import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Search, X } from "lucide-react";
import { resetQuery, setQuery } from "../../slices/quizzesSlice";
import ProfileDropDown from "../core/auth/ProfileDropDown";
import QuizDropDown from "./QuizDropDown";

export const NavBar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const location = useLocation();
  const [qWord, setQWord] = useState("");

  const handleSearch = () => {
    dispatch(setQuery(qWord));
  };

  const isQuizzesPage = location.pathname === "/quizzes";

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          QuizMaster
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/quizzes">
            <QuizDropDown />
          </Link>
          <Link to="/contacts" className="hover:text-blue-600 transition">Contacts</Link>
        </div>

        {/* Right Side (Search, Auth/User) */}
        <div className="flex items-center gap-3">
          {/* Conditional Search Bar */}
          {isQuizzesPage && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search Quizzes..."
                value={qWord}
                onChange={(e) => setQWord(e.target.value)}
                className="pl-4 pr-10 py-1 text-sm sm:text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 w-[150px] sm:w-[200px]"
              />
              {qWord && (
                <button
                  className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                  onClick={() => {
                    setQWord("");
                    dispatch(resetQuery());
                  }}
                >
                  <X size={14} />
                </button>
              )}
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                onClick={handleSearch}
              >
                <Search size={18} />
              </button>
            </div>
          )}

          {/* Auth buttons or Profile */}
          {token && user ? (
            <ProfileDropDown />
          ) : (
            <>
              <Link to="/login">
                <button className="text-sm border border-gray-300 px-3 py-1 rounded-md hover:bg-blue-50 transition">
                  Login
                </button>
              </Link>
              <Link to="/signUp">
                <button className="text-sm border border-gray-300 px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
