import React from 'react'
import img from './assets/about.jpeg'
import { Link } from 'react-router-dom'
function About() {
  return (
    <div className='mt-10 -mx-10 mb-24'>
     
        <img  className='w-full h-3/4  object-fill' src={img}/>
        <div className='p-6 flex flex-col gap-3'>
            <h1 className=' font-bold text-[35px]'>Collect moments, not things, on the road in a van.</h1>
            <p>
Welcome to our van rental company, where we specialize in providing top-quality 
vans for all your travel needs. We understand 
the excitement and freedom that comes with hitting the road, 
and our mission is to make your journey unforgettable.</p>
            <p>Our team is full of vanlife enthusiasts who know firsthand the
               magic of touring the world on 4 wheels.</p> 
               <div className='rounded-lg p-4 bg-orange-300 '>


<h1 className='sm:text-[25px] text-[20px] font-bold w-[350px]'>
Your destination is waiting.
</h1>

<h1 className=' -mt-2 sm:text-[25px] text-[20px] font-bold w-[350px]'>
Your van is ready.
</h1>
<Link to={"../vans"}> <button
 className={`py-2 mt-6 w-fit bg-zinc-950 p-5  rounded-md font-bold text-white  `} > 
 Explore your vans</button>
 
 </Link>


</div>  
        </div>

       

    </div>
  )
}

export default About