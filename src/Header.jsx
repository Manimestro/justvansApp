import * as R from 'react'
import './Header.css'
const {useState } = R ;
import { motion } from "framer-motion"
import { Link , NavLink} from 'react-router-dom'
export default function () {
  return (
   <nav className='flex  flex-wrap justify-between'>
          <Link to={"."}><h1 className='font-bold text-[26px] uppercase'>#JustVans</h1></Link>
  <div className='w-fit hidden mr-14  md:flex flex-row gap-10 md:text-[18px] mt-1  items-center'>
    {
      WEB_NAV_ITEMS.map(ele=>
        
        <NavLink key={ele.id} to={ele.id} className={({isActive})=>isActive ? "text-[20px] font-bold underline cursor-pointer ":"text-[20px] cursor-pointer "}><p 
       >{ele.navTitle}</p></NavLink>
        
      )
    }
       <NavLink to={"login"} className="text-[20px] font-bold  cursor-pointer "><p 
       >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
</svg>

        
        </p></NavLink>
          </div> 
          <div className='md:hidden block  mt-1 z-50 '>
          <MobileNav/>
          </div>
        
            
        </nav>

    
  )
}


export function Footer() {
  return (
      <footer className='bg-[#161616] 
      text-[#aaaaaa] h-[74px] flex justify-center
      items-center font-[500] w-full absolute bottom-0 right-0 '>
        &#169; 2023 #JUST_VANS
        </footer>
  )

}



const MOBILE_NAV_ITEMS = [
  {
    id: "host",
    navTitle: "Host"
  },
  {
    id: "about",
    navTitle: "About"
  },
  {
    id: "vans",
    navTitle: "Vans"
  },
  {
    id: "login",
    navTitle: "Account"
  },
]
const WEB_NAV_ITEMS = [
  {
    id: "host",
    navTitle: "Host"
  },
  {
    id: "about",
    navTitle: "About"
  },
  {
    id: "vans",
    navTitle: "Vans"
  },
]

const MobileNav = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const hideNavItemsVariant = {
    opened: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    closed: {
      opacity: 1,
      y: "0%",
      transition: {
        delay: 1.1,
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  }

  const mobileMenuVariant = {
    opened: {
      y: "0%",
      transition: {
        delay: 0.15,
        duration: 1.1,
        ease: [0.74, 0, 0.19, 1.02]
      }
    },
    closed: {
      y: "-100%",
      transition: {
        delay: 0.35,
        duration: 0.63,
        ease: [0.74, 0, 0.19, 1.02]
      }
    }
  }

  const fadeInVariant = {
    opened: {
      opacity: 1,
      transition: {
        delay: 1.2
      }
    },
    closed: { opacity: 0 }
  }

  const ulVariant = {
    opened: {
      transition: {
        delayChildren: 1,
        staggerChildren: 0.18
      }
    },
    closed: {
      transition: {
        staggerChildren: 0.06,
        staggerDirection: -1
      }
    }
  }

  const liVariant = {
    opened: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.65,
        ease: "easeOut"
      }
    },
    closed: {
      opacity: 0,
      y: "100%",
      transition: {
        duration: 0.25,
        ease: "easeInOut"
      }
    }
  }

  

  return (
    <main className=" w-fit flex flex-row    ">
      <motion.nav
        initial="closed"
        animate={mobileNavOpen ? "opened" : "closed"}
      >
        <div className="menu-container  ">
          <motion.div
            variants={hideNavItemsVariant}
            onClick={() => setMobileNavOpen(true)}
            className=' cursor-pointer '
          >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
  <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
</svg>

          </motion.div>
        </div>
        <motion.div variants={mobileMenuVariant} className="fixed top-0 left-0  h-screen gap-10 w-full flex felx-col  mobile-menu">
          <motion.button
            variants={fadeInVariant}
            onClick={() => setMobileNavOpen(false)}
            className='ml-auto mr-10 mt-6'
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

          </motion.button>
          <motion.ul variants={ulVariant} className='list-none flex flex-col gap-6'>
            {MOBILE_NAV_ITEMS.map(navItem => (
              <motion.li whileTap={{ scale: 0.95 }} key={navItem.id}>
                <motion.div variants={liVariant} className='text-[20px] hover:italic w-fit mx-auto' onClick={()=>setMobileNavOpen(!mobileNavOpen)}>
                  <Link to={navItem.id}>
                  {navItem.navTitle}
                  </Link>
                  </motion.div>
              </motion.li>
            ))}
            
          </motion.ul>
  
        </motion.div>
      </motion.nav>
    </main>
  )
}

