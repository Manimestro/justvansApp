
import { Suspense } from 'react'
import { fetch } from './firebase'
import Loading from './Loading'
import { Link ,defer,useLoaderData,useSearchParams , useRouteError, Await} from 'react-router-dom'
function Vans() {
  const data = useLoaderData()
  const [params , setParams] = useSearchParams()
  
  
  const handleFilter=(key = null , value =null)=>{  

    if (value === null){
            setParams(params=>{
              console.log(params)
              params.delete(key)
              console.log(params)
              return params}
              )
    }
    else{
      setParams(param =>{
        param.set(key,value)
        return param

      })
    }
  }
  console.log(params, "this")
  const filterType = params.get("type")
 

  function Component(van) {
    const vans = van.docs

    const displayedVans = filterType ? vans.filter(ele =>
      ele.data().type.toLowerCase() === filterType.toLowerCase()
      ) : vans 
  return  displayedVans.map(van=>{
    const vanData = van.data()
     
    let color = "" ;
    if (vanData.type.toLowerCase() === "simple"){
       color = "bg-amber-700"
    }
    else if (vanData.type.toLowerCase() === "rugged"){
      color = "bg-lime-800"
    }
    else{
      color = "bg-slate-900"
    }
  
   
    
    return (
        <Link  state={{params:`?${params.toString()  }`, type:filterType}} key={vanData.imageUrl}   to={van.id} className='flex  flex-col gap-4 min-w-[150px] max-w-[350px] w-5/12 '>

      <img className='object-fill  rounded-md ' src={vanData.imageUrl}  alt='img'/>
        <p className='sm:text-[25px] text-[18px] font-bold w-fit'>{vanData.name}</p>
        <p className=' sm:text-[20px] text-[15px] w-fit '>&#8377;{vanData.price}/day</p>
        <button className={`py-2 max-w-[120px]   rounded-md font-bold text-white ${color} `} > {vanData.type}</button>
       
          </Link>
    )
  })

   }

  return (
    <div  className='w-full mt-16 mb-24'>
      <h1 className='text-[38px] font-bold w-fit '>Explore our van options</h1>
      <div className='text-[18px] flex flex-wrap gap-8  mt-4 '>
        <button className={`  py-2 px-7    hover:bg-amber-700 ${filterType === "simple" ?"bg-amber-700 text-white":"bg-orange-200"} hover:text-white  rounded-md`} 
        onClick={()=>{handleFilter("type" , "simple")}} > Simple</button>
        <button className={`  py-2 px-7    hover:bg-slate-900 ${filterType === "luxury" ?"bg-slate-900 text-white":"bg-orange-200"} hover:text-white  rounded-md`} 
         onClick={()=>{handleFilter("type" , "luxury")}}> Luxury</button>
        <button className={`  py-2 px-7    hover:bg-lime-800 ${filterType === "rugged" ?"bg-lime-800 text-white":"bg-orange-200"} hover:text-white  rounded-md`}  
        onClick={()=>{handleFilter("type","rugged")}}> Rugged</button>
        <button className=' py-2  underline min-w-[100px] ' onClick={()=>{handleFilter("type")}}>{filterType ? "Filter of " :""}</button>
      </div>
    <div className='mt-16 flex flex-wrap gap-10 w-11/12 '>
     <Suspense fallback={<Loading/>}>
      <Await resolve={data.data}>
       {
        Component
        }
       </Await> 
      </Suspense>
      </div>
    </div>
  )
}

const ErrorElement = ()=> {
  const err = useRouteError()
   console.log(err)
  return (
    <div className='mt-16'>
          <p className='text-[25px] p-12  font-bold'> 
              No vans Available Right Now
          </p>
      </div>
  )
}
async function loader(){

  const dataPromise = fetch()
  return defer({data:dataPromise})

}

export default Vans

export {ErrorElement , loader}