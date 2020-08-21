import React, { useContext } from "react";
import {FaWindowClose} from 'react-icons/fa'
import {UserContext} from './../context/user'


export default function Alert() {

     const {alert ,hideALert} = useContext(UserContext)
    
    
     let css ='alert-container'
    
    if(alert.show){
    css += ' alert-show'
    if (alert.type === 'danger'){
      css += ' alert-danger'
    }
  }

  return <div className={css}>
    <p>{alert.show && alert.msg}</p>
<button className="alert-close" onClick={hideALert}><FaWindowClose/></button>

  </div>
}


