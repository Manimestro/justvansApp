import { Link , useLocation, useLoaderData, Form, useRouteError} from 'react-router-dom'
import {fetchById, hostVansupdate} from './firebase'
import { useState } from 'react'

function VanBooking() {
   const vanData  = useLoaderData()
    const [load , setLoad] = useState(false)
    const location = useLocation()
      let color ;
      if (vanData?.type == "Simple"){
         color = "bg-amber-700"
      }
      else if (vanData?.type == "Rugged"){
        color = "bg-lime-800"
        
      }
      else{
        color = "bg-slate-900"
      }
   const backUrl = location.state?.params || ""
   const text = location.state?.type || "all"
 return (
    <div className='mt-16 mb-24'>
    <Link to={`..${backUrl}`}  relative='path'>&#x2190; <span className='underline'>Back to {text} vans</span></Link>
    {
        <Form className=' mt-12 flex flex-wrap gap-10 w-full '>
 <div   className='  flex  flex-col lg:flex-row gap-4  w-full  '>
   
   <img className='object-fill min-w-[100px] max-w-[700px] rounded-md ' src={vanData.imageUrl}  alt='img'/>
   <div className='   lg:w-7/12  lg:ml-4 lg:mt-14  mt-4  '>
   <button className={ ` cursor-default py-2 px-10    rounded-md font-bold text-white ${color} `} > {vanData.type}</button>
     <p className='mt-4 sm:text-[35px] text-[30px] font-bold w-fit'>{vanData.name}</p>
     <p className=' sm:text-[20px] text-[15px] w-fit '>&#8377;{vanData.price}/day</p>
      <p className='py-2 '>{vanData.description}</p>
<button disabled={load} onClick={async()=>{
  setLoad(true)
  
  const currentDate= new Date()
  const formattedDate = currentDate.toLocaleDateString();
  let hours = currentDate.getHours();
 let  minutes = currentDate.getMinutes();
  
  console.log(currentDate)
  let subtime  ="AM"
  if (hours > 12){
    subtime ="PM"
  }
  if (hours < 10 ){
    
    hours = `${0}${hours}`

  }
  if (minutes < 10 ){
    minutes = `${0}${minutes}`
  }
  console.log(`${hours}:${minutes}`)
  const mail = localStorage.getItem("email")

   const a=await hostVansupdate(mail,{...vanData,date:formattedDate,time:`${hours}:${minutes} ${subtime}`
   ,ordTime : currentDate
  })
   
  setLoad(false)
}}  className={` ${load ? 'bg-orange-200':"bg-orange-400"} font-bold w-full p-2 mt-8 rounded-md  text-[20px] text-white`}>Rent this van</button>
     </div>
       </div>
        </Form>
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
  
  const data = await fetchById("vans",params.id)
   console.log(data,"dataaa")
  
  if (!data.exists()){
    const err  = new Error("Cannot Load information Currently")
    throw err
    
  }
  return data.data()
 

}



export default VanBooking
export {ErrorElement , loader }