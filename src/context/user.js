// user context
import React, { createContext, useState, useEffect } from 'react'

const UserContext = createContext()


function getUserFromLocalStorage(){
  return localStorage.getItem('user')?JSON.parse( localStorage.getItem('user')): {username:null,token:null}
}



function UserProvider ({children}){
      // const [user,setUser] = useState({username:null,token:null})
      const [user,setUser] = useState(getUserFromLocalStorage())

       
  
      const userLogin = (user)=>{
      setUser(user);
      localStorage.setItem('user',JSON.stringify(user))
      }

        const userLogout = ()=>{
        setUser({username:null,token:null})
        localStorage.removeItem('user')
        }

        // alert 
        const [alert ,setAlert] = useState({
          show:false,
          msg:'',
          type:"success"})


          
        const showAlert =({msg,type="success"})=>{
          setAlert({show:true,msg,type})
        }

        const hideALert = ()=>{
          setAlert({...alert,show:false})
        }

        //heigth
        const [heigth,setHeight] = useState(0)
       useEffect(() => {
         window.addEventListener('scroll',()=>{
          setHeight(window.pageYOffset)
         })
         return () => {
           window.removeEventListener('scroll',()=>{})
         }
       })
       console.log(heigth)
  return <UserContext.Provider value={{user,heigth,userLogin,userLogout,alert,showAlert,hideALert}}>
            {children}
        </UserContext.Provider>
}




export {UserContext,UserProvider}