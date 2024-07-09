import React, { useContext } from 'react'
import Createcontext from '../../hooks/context'
import Image from 'next/image'
const Wronglocation = ({title ,description}) => {
  const {state ,dispatch}=useContext(Createcontext)
  let image=''
  if(title?.includes('dispensaries')){
    image='/image/error.webp'
  }else{
    image='/image/errorimage.webp'
  }
  return (
      <div className="nodatafoundcontainer">
            <Image width={100} height={100} src={image} alt='Wrong Location'  title='Wrong Location'/>
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={()=>{dispatch({ type: 'locationchange', focus: true })}}>Change Location</button>
     </div>
  )
}

export default Wronglocation