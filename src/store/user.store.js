import {create} from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Google_Sign_up } from '../../../../backend/controller/auth.controller'







export const useUserStore = create(
  persist(
    (set) => ({
      _hasHydrated: false,
      user: null,
      setUser: (user) => set({user}),
      Signup: async (newUser, setLoading, setError, setSuccess) => {
        try {
          setLoading(true)
          const res = await fetch('/api/auth/sign-up',
          {
            method:"POST", 
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(newUser)
          })
          
          const data = await res.json()
          setLoading(false)
          console.log(data)
          
          if(data.success === false){
            
            setError(data.message)
            console.log(data.message)
            setLoading(false)
            return 
          } else {
            set({ user: data })
            setSuccess(true)
            setLoading(false)
            console.log('Form submitted:', data);
          }
        } catch (error) {
          setLoading(false)
          setError(error)
        }
      }, 
      Signin: async (signinuser, setLoading, setError, setSuccess) => {
        setLoading(true)
        try {
          const res = await fetch('/api/auth/sign-in', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(signinuser)
          })
          const data = await res.json()
          
          setLoading(false)
          if(data.success === true){
            set({ user: data }) // Update the user in the store
            setSuccess(true)
            console.log('Signed in successfully:', signinuser)
            return true
          }
          setError(data.message)
          console.log(data.message)
          return false
        } catch (error) {
          setLoading(false)
          setError(error.message)
          return false
        }
      },
      logout: () => set({ user: null }),
      Google_Sign_up:async (newUser, setLoading, setError, setSuccess) => {
        try {
          setLoading(true)
          const res = await fetch('/api/auth/google-signup',
          {
            method:"POST", 
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(newUser)
          })
          
          const data = await res.json()
          setLoading(false)
          
          
          if(data.success === false){
            setError(data.message)
            console.log(data.message)
            setLoading(false)
            return 
          } else {
            set({ user: newUser })
            setSuccess(true)
            setLoading(false)
            console.log('Form submitted:', newUser);
          }
        } catch (error) {
          setLoading(false)
          setError(error)
        }
      },
      Google_Sign_in: async (signinuser, setLoading, setError, setSuccess) => {
        setLoading(true)
        try {
          const res = await fetch('/api/auth/google-signin', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(signinuser)
          })
          const data = await res.json()
          
          setLoading(false)
          if(data.success === true){
            set({ user: signinuser }) // Update the user in the store
            setSuccess(true)
            console.log('Signed in successfully:', signinuser)
            return true
          }
          setError(data.message)
          console.log(data.message)
          return false
        } catch (error) {
          setLoading(false)
          setError(error.message)
          return false
        }
      }
    }
  ),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state._hasHydrated = true
      },
    }
  )
)








