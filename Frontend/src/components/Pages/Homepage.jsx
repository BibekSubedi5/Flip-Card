import React from 'react'
import Header from "../UI/Header"
import Body from "../UI/Body"
import Sidebar from '../UI/Sidebar'


const Homepage = () => {
  return (
    <div className="flex flex-col min-h-screen">
    <Header /> 
    
    <div className="flex flex-1">
      <Sidebar /> 
      <Body /> 
    </div>
  </div>
  )
}

export default Homepage