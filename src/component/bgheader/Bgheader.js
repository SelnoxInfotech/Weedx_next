import React from 'react'
// import './Bgheader.css'  

const Bgheader = ({text}) => {
  return (
    <div className='bgHedaer'>
      <div className='text_on_Learn_banner'>
        <h1>{text}</h1>
        </div>
    </div>
  )
}

export default Bgheader