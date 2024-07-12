import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className="loader_container">
       <span className="newloader shine"><Image width={500} height={500} src='/image/weedx.webp' alt='weedx.io logo'  title='weedx.io logo'/></span>
    </div>
  )
}

export default Loader