import React, { Suspense } from 'react'
import { Outlet, defer, Await} from 'react-router-dom'
import { Link , NavLink ,useOutletContext 
,useRouteError , useLoaderData} from 'react-router-dom'
import { fetchById  } from './firebase'
import Loading from './Loading'

function Detailedvan() {

  const vanDataPromise = useLoaderData()
 
  function DisplayJsx (vanData){
  console.log(vanData,"details")
    
  return(
  <div className='bg-white mt-6 flex  p-4 flex-col gap-6 w-11/12  '>  
  <Link  className='flex rounded-lg  flex-row gap-4 min-w-[150px]   '>

<img className='  rounded-md w-4/12 min-w-[150px] max-w-[200px]' src={vanData.imageUrl}  alt='img'/>
<div className='w-6/12 mt-6 ml-4 '>
<button className={`py-1 px-4  bg-orange-200  rounded-md  `} > {vanData.type}</button>
  <p className='text-[25px]  font-bold w-fit mt-2'>{vanData.name}</p>
  <p className=' text-[16px] font-bold w-fit '>&#8377;{vanData.price}/day</p>
  </div>
    </Link>
   
<div  className='w-fit  mr-14  flex flex-row gap-10 md:text-[18px]   '>  

{
  
  NAV_ITEMS.map(ele=>
    
    <NavLink 
    end={ele.id === "."}
    key={ele.id} to={ele.id} className={({isActive})=>isActive ? "text-[20px] font-bold underline cursor-pointer ":"text-[20px] cursor-pointer "}><p 
    >{ele.navTitle}</p></NavLink>
    
  )
}
</div>
<Outlet context={vanData}/>
  </div> 
  )
}

   
  return (
    <div  className='mt-16 mb-24'>
     <Link to={"../vans"} > &#x2190; <span className='underline'>Back to all vans</span>  </Link>    
           <Suspense fallback={<Loading/>}>
           <Await ErrorElement={<div>
            <h1>No such Data </h1>
           </div>} resolve={vanDataPromise.data}>
            {
              DisplayJsx
            }

            </Await>  
            </Suspense>     
    </div>
  )
}






export default Detailedvan



const NAV_ITEMS = [
  {
    id: ".",
    navTitle: "Details"
  },
  {
    id: "pricing",
    navTitle: "Pricing"
  },
  {
    id: "photos",
    navTitle: "Photos"
  },
]



function HostVanDetails() {
  const {name ,type , description } = useOutletContext()
  return (
    <div className='  flex flex-col gap-3'>
         
         <p className='capitalize '><span className='font-bold text-[16px]'>Name: </span> {name}</p>
         <p className='capitalize '><span className='font-bold text-[16px]'>Category: </span> {type}</p>
         <p className='capitalize '><span className='font-bold text-[16px]'>Description: </span> {description}</p>
         <p className='capitalize '><span className='font-bold text-[16px]'>Visibility: </span> Public</p>
    </div>
  )
}

function Pricing() {
  console.log("bye")
  const {price}  = useOutletContext()
  return (
    <div>
          <p className=''><span className='font-bold text-[22px]'>&#8377; {price}</span>/day </p>
    </div>
  )
}
function Photos() {
  const {imgArray}  = useOutletContext()

  return (
    <div className='flex flex-warp gap-6'>
        {
          imgArray.map((imageUrl)=>      <img key={imageUrl} className='  rounded-md w-[80px]' src={imageUrl}  alt='img'/>
          
          )
        }

    </div>
  )
}


const ErrorElement = ()=> {
  const err = useRouteError()
   console.log(err)
  return (
    <div className='mt-16'>
          <p className='text-[25px] p-12  font-bold'> 
          {err.message}
          
          </p>
      </div>
  )
}
async function loader({params}){
  const mail = localStorage.getItem("email")
  const CustumPromise = new Promise(
    async(resolve , reject)=>{
      const data = await fetchById(mail,params.id)
      if (!data.exists()){
        return reject("reject")
      }
      console.log(data.data()  ,"asdddd")
      return resolve(data.data())

    }
  )
  return defer({data:CustumPromise})


}


export {HostVanDetails , Pricing , Photos , ErrorElement ,loader}
