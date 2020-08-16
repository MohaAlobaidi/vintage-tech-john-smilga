import axios from 'axios'
import  url from './../utils/URL'
//login user
async function  loginUser({email,password}){
const response = await axios.post(`${url}/auth/local/`,{
  identifeir:email,
  password
}).catch(error =>console.log(error) )
return response
}
export default loginUser