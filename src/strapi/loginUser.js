import axios from 'axios'
import  url from './../utils/URL'
//login user
async function  loginUser({email,password}){

// const response = await axios.post(`${url}/auth/local`,{
//   identifeir:email,
//   password
// })


// const response =await axios.post('http://localhost:1337/auth/local', {
//   identifier: email,
//   password
// })
  const response = await axios.post(`${url}/auth/local`,{
    identifier:email,
    password
  })


.catch(error =>console.log(error) )
return response
}
export default loginUser