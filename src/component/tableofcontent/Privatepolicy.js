import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
const Privatepolicy = ({refrenc}) => {
    const router = useRouter()
    const [allHeigths,setallheight] = React.useState([])
   
  
    React.useEffect(()=>{
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      }); 
          let data =[]
          refrenc.current.childNodes.forEach((item , index)=>{
      
              data.push({
                  topheigth: item.offsetTop,
                  id : item.id,
                  height : item.clientHeight
              })   
          })
          setallheight(data)
      
    },[])
  
  React.useEffect(() => {
       let divElement = document.getElementById('Navbar_box')?.clientHeight
        
         allHeigths.forEach((item)=>{
        
      })
    }, [allHeigths])
  return (
        <div className="tc_topic_list">
            <div className="heading_box">
            <h3 className='text-white m-0 sideTableHeading'>{`Table of Contents`}</h3>
            </div>
            <ul>
               <Link href={{ hash:`#introduction`,}} ><li  className={router.pathname.includes( "#introduction") && "activeTable"  }>{`1. Introduction`} </li></Link>
               <Link href={{ hash:`#information_we_collect`,}} ><li  className={router.pathname.includes( "#information_we_collect") && "activeTable"  }>{`2. Information We Collect`}</li></Link>
               <Link href={{ hash:`#how_we_use_your_information`,}} ><li className={router.pathname.includes( "#how_we_use_your_information") && "activeTable"  }> {`3. How We Use Your Information`}  </li></Link>
               <Link href={{ hash:`#sharing_your_information`,}} ><li className={router.pathname.includes( "#sharing_your_information") && "activeTable"  }>{`4. Sharing Your Information`}</li></Link>
               <Link href={{ hash:`#cookies_and_tracking_technologies`,}} ><li  className={router.pathname.includes( "#cookies_and_tracking_technologies") && "activeTable"  }>{` 5. Cookies and Tracking Technologies `}</li></Link>
               <Link href={{ hash:`#your_choices`,}} ><li  className={router.pathname.includes( "#your_choices") && "activeTable"  }> {`6. Your Choices`}</li></Link>
               <Link href={{ hash:`#security`,}} ><li  className={router.pathname.includes( "#security") && "activeTable"  }> {` 7. Security `}</li></Link>
               <Link href={{ hash:`#children's_privacy`,}} ><li className={router.pathname.includes( "#children's_privacy") && "activeTable"  }> {`8. Children's Privacy`} </li></Link>
               <Link href={{ hash:`#changes_to_this_privacy_policy`,}} ><li  className={router.pathname.includes( "#changes_to_this_privacy_policy") && "activeTable"  }>  {`9. Changes to This Privacy Policy`} </li></Link>
               <Link href={{ hash:`#contact_us`,}} ><li  className={router.pathname.includes( "#contact_us") && "activeTable"  }>{`10. Contact Us`} </li></Link>
            </ul>
        </div>
  )
}

export default Privatepolicy