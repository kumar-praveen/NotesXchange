// import React, {createContext, useState} from 'react'

// export const AppContext = createContext()

// export const AppContextProvider = (props) => {
//     const backendUrl = import.meta.env.VITE_BACKEND_URL;
//     const [isLoggedin, setIsLoggedin] = useState(false);
//     const [userData, setUserData] = useState()
//     const value = {
//         backendUrl,
//         isLoggedin, setIsLoggedin,
//         userData, setUserData
//     }
//     return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
// }

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set) => ({
      backendUrl: import.meta.env.VITE_BACKEND_URL,
      isLoggedin: false,
      userData: null,
      loading: false,

      // Actions
      setIsLoggedin: (status) => set({ isLoggedin: status }),
      setUserData: (data) => set({ userData: data }),
      reset: () => set({ isLoggedin: false, userData: null }),
      setGlobalLoading: (value) => set({ loading: value }),
    }),
    {
      name: "app-storage", // key in localStorage
    }
  )
);
