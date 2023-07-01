import * as React from 'react'
import img from './assets/home.jpg'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div style={{backgroundImage:`url(${img})` }}  className=' mt-28 bg-no-repeat'>
      <div className='backdrop-blur-sm p-28'>
      <h1 className='text-white text-[35px] font-bold'>You got the travel plans, we got the travel vans.</h1>
      <h1 className='text-white text-[15px] mt-8  '>Add adventure to your life by joining the #JUSTVANS movement. Rent the perfect van to make your perfect road trip.</h1>
      <Link to={"vans"}><button className='bg-orange-400 w-full p-2 mt-8 rounded-md '>Find your van</button></Link>

      </div>

      
  
    </div>
  )
}




export default Home
