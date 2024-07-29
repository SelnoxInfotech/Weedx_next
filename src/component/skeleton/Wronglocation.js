import React, { useContext } from 'react'
import Createcontext from '../../hooks/context'
import Image from 'next/image'
import deliveryimage from '../../../public/image/errorimage.webp';
import DespenseryImage from '../../../public/image/error.webp';
const Wronglocation = ({title ,description}) => {
  const {state ,dispatch}=useContext(Createcontext)

  return (
      <div className="nodatafoundcontainer">
            <Image  unoptimized={true} width={100} height={100} src={title?.includes('dispensaries') ?DespenseryImage.src:deliveryimage.src} alt='Wrong Location'  title='Wrong Location'/>
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={()=>{dispatch({ type: 'locationchange', focus: true })}}>Change Location</button>
      </div>
  )
}

export default Wronglocation