import React, { useState, useContext } from 'react'

//strapi function
import loginUser from './../strapi/loginUser'
import registerUser from './../strapi/registerUser'

//handle user
import {useHistory} from 'react-router-dom'
import {UserContext} from './../context/user'


export default function Login() {
  const history = useHistory()
  // setup user context
//const value = useContext(UserContext)
//console.log(value)
const {userLogin,alert ,showAlert} = useContext(UserContext)



  // state values
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [username,setUsername] = useState('default')
  const [isMember,setIsMember] = useState(true)

  let isEmpty = !email || !password || !username || alert.show;


  const toggleMember = ()=>{
    setIsMember((prevMember)=>{
     let isMember= !prevMember ;
      isMember? setUsername('default'):setUsername('')
      return isMember
    })
  }

  const handleSubmit = async (e)=>{
    // alert for not to much submitting
    showAlert({msg:'accessing user data .please wait..'})
   
    e.preventDefault();
      let response ;
       if(isMember){
        response = await loginUser({email,password})

  }
  else{
    response = await registerUser({email,password,username})

  }

  if (response){
    //
    
    const {jwt:token,user:{username}} = response.data
    console.log(response)
    console.log( response.data)
    const newUser = {token,username}
    userLogin(newUser)//from UserContext 
      showAlert({
        msg:`you are logged in :${username} shop away my friend...`
      })
    history.push("/products")
  }
  else{
    //show alert
    showAlert({
      msg:`there was an error ,please try again..`,
      type:'danger'
    })
  }

  }
  return <section className="form section">
    <h2 className="section-title">{isMember?"sign in":"register"}</h2>

    <form className="login-form">
      {/* email input */}
      <div className = "form-control">
        <label htmlFor="email">email</label>
        <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      {/* end email input */}

        {/* password input */}
     <div className="form-control">
     <label htmlFor="password">password</label>
        <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
     </div>
        {/* end password input */}

          {/*  username input */}
      {!isMember &&  <div className="form-control">
                   <label htmlFor="username">username</label>
                   <input type="text" id="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
     </div>}
          {/* end username input */}


          {/* empty form text */}
          {isEmpty && <p className="form-empty">please fill out all form fields</p>}
          {/* empty form text */}

          {/* submit button */}
          {!isEmpty && <button type="submit"
                  className="btn btn-block btn-primary"
                  onClick={handleSubmit}>
            submit
            </button>}
          {/* end submit button */}

          {/* register link */}
          <p className="register-link">
            {isMember? "need to register": "already a member"}
            <button type="button" onClick={toggleMember}> click hier</button>
          </p>
          {/* register link */}
          </form>
  </section>
}
