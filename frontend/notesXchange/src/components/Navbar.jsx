import { NavLink, useNavigate } from "react-router-dom";
import { Loader2, LogOut, Menu, UserCircleIcon, X } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "../store/useAppStore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const { isLoggedin, userData, backendUrl, reset } = useAppStore();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      setLoader(true);
      const response = await axios.get(`${backendUrl}/api/user/logout`);
      if (response.data.success) {
        toast.success(response.data.message);
        reset();
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "logout failed");
    } finally {
      setLoader(false);
    }
  };

  return (
    <nav className="bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="w-[90%] mx-auto py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          Notes<span className="text-gray-800">X</span>change
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative font-medium text-sm sm:text-base md:text-lg transition ${
                isActive
                  ? "text-indigo-600"
                  : "text-gray-600 hover:text-indigo-600"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/notes"
            className={({ isActive }) =>
              `relative font-medium text-sm sm:text-base md:text-lg transition ${
                isActive
                  ? "text-indigo-600"
                  : "text-gray-600 hover:text-indigo-600"
              }`
            }
          >
            Notes
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `relative font-medium text-sm sm:text-base md:text-lg transition ${
                isActive
                  ? "text-indigo-600"
                  : "text-gray-600 hover:text-indigo-600"
              }`
            }
          >
            About
          </NavLink>

          {isLoggedin ? (
            <Popover>
              <PopoverTrigger>
                <div className="px-3 py-1 text-sm sm:text-base md:text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full cursor-pointer hover:scale-105 transition">
                  {userData ? (
                    userData?.fullname[0]?.toUpperCase()
                  ) : (
                    <UserCircleIcon />
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4 rounded-2xl shadow-xl bg-white dark:bg-gray-900">
                <div className="flex flex-col items-center gap-2">
                  {/* Avatar */}
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg">
                    {userData?.fullname?.[0]?.toUpperCase() || "U"}
                  </div>
                  {/* Info */}
                  <div className="text-center">
                    <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base">
                      {userData?.fullname}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                      {userData?.email}
                    </p>
                  </div>
                  {/* Logout */}
                  <Button
                    onClick={logoutHandler}
                    className="w-full mt-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white font-medium rounded-xl flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
                  >
                    {loader && <Loader2 className="animate-spin h-4 w-4" />}
                    Logout <LogOut />
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <NavLink
              to="/login"
              className="px-4 sm:px-5 py-2 text-sm sm:text-base bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow hover:opacity-90 transition font-medium"
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md shadow-lg px-4 sm:px-6 py-4 space-y-4 animate-slideDown rounded-b-2xl">
          <NavLink
            to="/"
            className="block text-gray-700 hover:text-indigo-600 transition text-sm sm:text-base border-b"
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/notes"
            className="block text-gray-700 hover:text-indigo-600 transition text-sm sm:text-base border-b"
            onClick={() => setIsOpen(false)}
          >
            Notes
          </NavLink>
          <NavLink
            to="/about"
            className="block text-gray-700 hover:text-indigo-600 transition text-sm sm:text-base border-b"
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>

          {isLoggedin ? (
            <div>
              <Popover>
                <PopoverTrigger>
                  <p className="block text-gray-700 hover:text-indigo-600 transition cursor-pointer text-sm sm:text-base">
                    Profile
                  </p>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4 rounded-xl shadow-xl bg-white dark:bg-gray-900">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg">
                      {userData?.fullname?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base">
                        {userData.fullname}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                        {userData.email}
                      </p>
                    </div>
                    <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
                    <Button
                      onClick={logoutHandler}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white font-medium rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
                    >
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="block px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow hover:opacity-90 transition text-center font-medium text-sm sm:text-base"
              onClick={() => setIsOpen(false)}
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
}
