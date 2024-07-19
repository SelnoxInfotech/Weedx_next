import Image from 'next/image'
import React from 'react'
import weedx from '../../../public/image/weedx.webp'
const Loader = () => {
  return (
    <div className="loader_container">
       <span className="newloader shine"><Image unoptimized={true} width={300} height={300} src={weedx.src} alt='weedx.io logo'  title='weedx.io logo'/></span>
    </div>
  )
}

export default Loader