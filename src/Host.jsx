import React ,{Suspense, forwardRef, useState} from 'react'
import {useRouteError, NavLink, Outlet, 
  redirect, useLoaderData, Link ,defer ,
  Await,
  useAsyncError,
  useNavigate,
 
} from 'react-router-dom'
import {  hostVanDel, hostVansFetch , } from './firebase'
import Loading from './Loading'
console.log(localStorage.getItem("email"))
import img from './assets/rating.png'
import vanimg from './assets/van.jpeg'

function Host() {

  return (
    <div className=' w-full mt-16'>
    <HostHeader/>
  
    <Outlet />
   
    

    </div>
  )
}

export default Host

function HostHeader(){

  return <div  className='w-fit flex flex-row sm:gap-10 gap-4 md:text-[18px] mt-1  '>  
    {
      
      NAV_ITEMS.map(ele=>
        
        <NavLink 
        end={ele.id === "."}
        key={ele.id} to={ele.id} className={({isActive})=>isActive ? "text-[20px] font-bold underline cursor-pointer ":"text-[20px] cursor-pointer "}><p 
        >{ele.navTitle}</p></NavLink>
        
      )
    }


  </div>
}

const NAV_ITEMS = [
  {
    id: ".",
    navTitle: "Dashboard"
  },
  {
    id: "rating",
    navTitle: "Rating"
  },
  {
    id: "vans",
    navTitle: "Vans"
  },

]
let i =0
const star = []
do{
  star.push(
    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 text-amber-500 h-6">
  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
</svg>)
i++
}while(i<5);

function Dashboard() {

  return (
    <div className='mt-12 mb-24 w-full'>
      <div className='bg-neutral-100'>
   <img  src={vanimg} className='m-auto w-60  -translate-x-8'/>
   </div>
    <div className='w-12/12 justify-between py-10 flex felx-wrap bg-orange-100' >
    <div className='ml-6  w-10/12'>
      <div className=' w-12/12 mx-auto flex flex-col gap-3'>
      <h1 className=' text-[35px]
      font-bold '>Welcome!</h1>
      <h1 className=''>Wishing you a safe and joyful journey ahead. </h1>
      </div>
      </div>
      <Link to={"vans"} className=' p-10'>
          Details
      </Link>
      </div>
      <div className='bg-orange-200'>
      <div className='py-10  justify-between flex flex-wrap ' >
        <div className='ml-6'>
      <div className='  w-12/12 mx-auto flex flex-col gap-3'>
      <h1 className=' text-[35px]
      font-bold '>Our Customer's Review</h1>
      <div className='flex flex-row items-center gap-2'> 
      {
        star
      }
      <h1 className='text-[20px] font-semibold'>5.0/5</h1>

      </div>

     

      </div>
   

      </div >
      <Link to="rating" className='p-10'>
          Details
      </Link>
      </div>
      </div>
     
          
  
      
      </div>
  )
}


const HostVans=(porps, ref)=> {
  const promisedvans = useLoaderData()
  const navigate = useNavigate()
  console.log("did ")
  return (
    <div   className='mt-6 mb-24'>
      <p className=' font-bold text-[30px]' >Your listed vans</p>
      <div className='mt-4'>
        
        <div className='mt-16 flex flex-col gap-10 w-11/12  '>
          
          <Suspense fallback={<Loading/>}>
          <Await errorElement={<NoHostVansError/>} resolve={promisedvans.data}>  
         
            {(resolvedVans)=> {
              const vans = resolvedVans.docs
               
             return vans.map(van=>{
                const vanData = van.data()
                console.log(vanData)
                return (

                  <div  key={van.id}  className='flex rounded-lg  bg-white p-4 flex-row items-center min-w-[150px]   '>
                    <Link  to={`${van.id}`} className='flex w-11/12 flex-row gap-4 min-w-[150px]   '>
         
                  <img className='  rounded-md w-[80px]' src={vanData.imageUrl}  alt='img'/>
                  <div className=''>
                    <p className='text-[25px]  font-bold w-fit'>{vanData.name}</p>
                    <p className=' text-[20px] w-fit '>&#8377;{vanData.price}/day</p>
                    </div>
                      </Link>
                      <button onClick={
                        async()=>{
                          const mail = localStorage.getItem("email")
                          console.log("clicked")
                        return  hostVanDel(mail , van.id).then(()=>{
                            return navigate("/host/vans/")
                          })  
                        }
                      }  className=''>
                     <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-red-500 w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

                      </button>
                      </div>
                )
              })
                } }
                
          </Await> 
          </Suspense>
      
            </div>
            
        
        
      </div>
    </div>
  )
}


function Income() {
  return (
    <div className='mt-16 '>
      <img src={img} className='w-12/12 max-w-[700px]' >
        </img> 

    </div>
  )
}

function Review() {
  return (
    <div>Review</div>
  )
}



function NoHostVansError() {
  const err  = useAsyncError()
  console.log(err , "await ")
  return (
    <div className='w-6/12 mx-auto'>
         <h1 className='text-red-600
         font-bold text-[25px]'>
          ....No vans Are Rented yet
          </h1>
          <Link to={"/vans"}  ><button className='bg-orange-400
      font-bold w-full p-2 mt-8 rounded-md  text-[20px] text-white'>
        Rent Some Vans
        </button></Link>
    </div>
  )
}





const ErrorElement = ()=> {
  console.log("asss i n")
  const err = useRouteError()
   
  return (
    <div className='mt-16'>
          <p className='text-[25px] p-12  font-bold'> 
              {err.message}
          </p>
      </div>
  )
}
async function loader(){
  console.log("lodinga gaigan")
  const CustumPromise = new Promise(
    async(resolve , reject)=>{
       const mail  = localStorage.getItem("email") 
        const data =await  hostVansFetch(mail)
        if (data.docs.length === 0){
          return reject("no data")
        }
        return resolve(data)


    }
  )
  return defer({data:CustumPromise})


}
// const logged = localStorage.removeItem("isLogged")
async function useAuthLoader(request){

  const urlpath =  new URL(request.url).pathname
  const logged = localStorage.getItem("isLogged")
  
  if (!logged){
    throw redirect(`/login?message=NotLogged&redirect=${urlpath}` )
  }
  return null
}


export { Dashboard , HostVans    , Income ,Review}
export {ErrorElement , loader , useAuthLoader}
