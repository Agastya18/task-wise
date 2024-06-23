import { create } from 'zustand'



export const useAuthStore = create((set) => ({

    authUser: localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')) : null,
    
    setAuthUser: (user) => set({ authUser: user }),
    logout: () => set({ authUser: localStorage.removeItem('userInfo')}),
   
  
}));