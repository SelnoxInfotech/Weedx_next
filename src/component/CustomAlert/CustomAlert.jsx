import React, { useEffect } from 'react'
import { TbAlertTriangleFilled } from "react-icons/tb";

const CustomAlert = ({title , discription , setisalert}) => {
    useEffect(()=>{
        setTimeout(()=>{
            setisalert(false)
        }, 4000);
    },[])
  return (
    <div className="customalertpopupwrapper">
        <div className='customalertpopup'>
            <span className='alerticons'><TbAlertTriangleFilled  color={'#ffba00'} /></span>
            <h3 className='alertpopupheading'>{title}</h3>
            <p className='alertpopupdescription'>{discription}</p>
            <button onClick={()=>{setisalert(false)}}>Ok</button>
        </div>
    </div>
  )
}

export default CustomAlert