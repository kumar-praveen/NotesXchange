import { clsx } from "clsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useAppStore } from "../store/useAppStore";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}



export const errorHandler = (error, setUserData, setIsLoggedin, navigate) => {
  if (error.response?.status === 401) {
    setUserData(null);
    setIsLoggedin(false);
    navigate("/login");
    toast.error("Session expired. Please login again.");
  } else {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};
