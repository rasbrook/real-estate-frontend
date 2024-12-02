import {create} from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { setLogLevel } from 'firebase/app'





//

export const useUserStore = create(
  persist(
    (set, get) => ({
      _hasHydrated: false,
      user: null,
      token:null,
      setUser: (user) => set({user}),
      setToken: (token) => set({token}),
      Signup: async (newUser, setLoading, setError, setSuccess) => {
        const {user, token}=get()

        try {
          setLoading(true)
          const res = await fetch(' http://localhost:5000/api/auth/sign-up',
          {
            method:"POST", 
            headers:{
              'Content-Type':'application/json',
             
            }, credentials: 'include',
            body:JSON.stringify(newUser)
          })
          
          const data = await res.json()
          setLoading(false)
          console.log(data)
          
          if(data.success === false){
            
            setError(data.error)
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
          setError('Thera has been an error with the server')
        }
      }, 
      Signin: async (signinuser, setLoading, setError, setSuccess) => {
        setLoading(true)
        console.log(document.cookie)
        const {user, token}=get()
        const cookieName = 'access_token'; 
        const cookies = document.cookie.split('; '); 
        let jwtToken = ''; 
        for (let i = 0; i < cookies.length; i++) 
          { const cookie = cookies[i].split('='); 
            if (cookie[0] === cookieName) 
              { jwtToken = cookie[1]; break; } }

        console.log(jwtToken)

        try {
          const res = await fetch(' http://localhost:5000/api/auth/sign-in', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              
            
            },
             credentials: 'include',
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
      Google_Sign_up:async (newUser, setLoading, setError, setSuccess) => {
        try {
          setLoading(true)
          const res = await fetch(' http://localhost:5000/api/auth/google-signup',
          {
            method:"POST", 
            headers:{
              'Content-Type':'application/json',
            
            },
             credentials: 'include',
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
          const res = await fetch(' http://localhost:5000/api/auth/google-signin', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              
            },
             credentials: 'include',
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
      },
      UpdateuserInfo:async(update, setError, setLoading, id)=>{
        const cookieName = 'access_token'; 
        const cookies = document.cookie.split('; '); 
        let jwtToken = ''; 
        for (let i = 0; i < cookies.length; i++) 
          { const cookie = cookies[i].split('='); 
            if (cookie[0] === cookieName) 
              { jwtToken = cookie[1]; break; } }

        console.log(jwtToken)
        try {
          setLoading(true)
          const res = await fetch(` http://localhost:5000/api/user/update/${id}`,
          {
            method:"PUT", 
            headers:{
              'Content-Type':'application/json',
              
            },
             credentials: 'include',
            body:JSON.stringify(update)
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
      DeleteUser:async(user,setError, setLoading, id)=>{
       
        setLoading(true)
        try {
          const res = await fetch(` http://localhost:5000/api/user/delete/${id}`,
            {
              method:"DELETE", 
              headers:{
                'Content-Type':'application/json',
                
              },
               credentials: 'include',
              body:JSON.stringify(user)
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
              set({ user: null })
              setSuccess(true)
              setLoading(false)
              console.log('User Deleted Successfully');
            }
          
        } catch (error) {
          setLoading(false)
          setError('There has been an error')
          
        }
      },
      LogOut: async(setLoading, setError) => {
        setLoading(true)
        set({ user: null })
        
        try {
          const res=await fetch(' http://localhost:5000/api/user/sign--out',
            {
            method:"GET", 
            headers:{
              'Content-Type':'application/json',
             
            },
             credentials: 'include'
          })
          data=await res.json()
        
        if(data.success){
          setLoading(false)
          set({ user: null })
          return
        }
        setError(data.message)
        setLoading(false)
        } catch (error) {
          setLoading(false)
          setError(error)
          
        }

        
      },
      UpdatefavlistInfo:async(update, id)=>{
        const cookieName = 'access_token'; 
        const cookies = document.cookie.split('; '); 
        let jwtToken = ''; 
        for (let i = 0; i < cookies.length; i++) 
          { const cookie = cookies[i].split('='); 
            if (cookie[0] === cookieName) 
              { jwtToken = cookie[1]; break; } }

        console.log(jwtToken)
        console.log(update)
        try {
    
          const res = await fetch(` http://localhost:5000/api/user/update/favlisting/${id}`,
          {
            method:"PUT", 
            headers:{
              'Content-Type':'application/json',
              
            },
             credentials: 'include',
            body:JSON.stringify(update)
          })
          
          const data = await res.json()
          console.log(data)
          if(data.success===true){
            set({ user: data })
            
          }
         
        
          
        } catch (error) {
         
        }


      },
    
    

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








