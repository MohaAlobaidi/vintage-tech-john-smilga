import React, { useContext } from 'react'
import {FaAngleDoubleUp} from 'react-icons/fa'
import {UserContext} from './../context/user'

const scrollBackToTop = ()=>{
  window.scrollTo({
    top:0,
    left:0,
    behavior:'smooth'
  })
}

export default function ScrollButton() {
  const {heigth} = useContext(UserContext)

  return (
    <button className={heigth > 300?'scroll-btn show-scroll-btn':'scroll-btn'} onClick={scrollBackToTop}>
     <FaAngleDoubleUp/>
    </button>
  )
}
