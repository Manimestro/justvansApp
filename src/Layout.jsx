import React from 'react'
import { Outlet ,Link } from 'react-router-dom'
import Header from './Header'
import { Footer } from './Header'
function Layout() {
  return (
    <div className=' min-h-screen sm:px-10 px-4 py-4'>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

function Notfound() {
  return (
    <div className='m-auto  w-8/12 mt-48 '>
      <p className='text-[30px] font-bold '>Sorry, the page you were looking for was not found.</p>
      <Link to={"."}  ><button className='bg-slate-950
      font-bold w-full p-2 mt-8 rounded-md  text-[20px] text-white'>Return to Home</button></Link>
    </div>
  )
}

export {Notfound}

export default Layout