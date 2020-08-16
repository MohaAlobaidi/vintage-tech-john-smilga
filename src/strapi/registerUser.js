
import axios from 'axios'
import url from './../utils/URL'


// register user

async function registerUser({email,password,username}){
//response  heeft te maken met axios dus anders dan Login page gewoon zelfde naam

const response = await axios.post(`${url}/auth/local/register`,{
  username,
  password,
  email
}).catch(error=>console.log(error))

return response

}
export default registerUser