import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ElectricScooterSharp } from '@mui/icons-material';
const Openingtime = ({storeDetails , heading , type ,key}) => {
  var date = new Date();
  const easternTime = date.toLocaleString("en-US", {timeZone: "America/New_York"})
  let day = new Date(easternTime)


  return (
    <React.Fragment>
      <div className='destop_view'>
         <div className="opning_time mt-2">
            
              <h4>{heading}</h4>
              <hr></hr>
            {
                  type?.map((items , idxe )=>{
                    if(items.close){
                      return<p  className={day.getDay()-1 === idxe ? 'currentDay d-flex' : 'd-flex'}><span className='w-50'>{`${items.day} `}</span> <span className='w-50'>Close</span> </p>

                    }else{
                     return items.Open?.map((ite,index)=>{
                       if(index === 0 ){
                        return <p className={day.getDay()-1 === idxe ? 'currentDay d-flex' : 'd-flex'}><span className='w-50'>{`${items?.day} `}</span> <span className='w-50'>{` ${ite.Time1}-${ite.Time2}`}</span> </p>

                       }else{
                        return <p className={day.getDay()-1 === idxe ? 'currentDay d-flex' : 'd-flex'}><span className='w-50'>  </span> <span className='w-50'>{` ${ite.Time1}-${ite.Time2}`}</span> </p>

                       }
                    })
                    }
                })
            }

               
         </div>
      </div>
      <div className='mobile_view'>
        <div className="opning_time mt-2">
            <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h4>{heading}</h4>
            </AccordionSummary>
            <AccordionDetails>
            {
                storeDetails[0]?.[type] !== null &&  storeDetails[0]?.[type]?.map((items , idxe )=>{
                    if(items.close){
                      return<p  className={day.getDay()-1 === idxe ? 'currentDay d-flex' : 'd-flex'}><span className='w-50'>{`${items.day} `}</span> <span className='w-50'>Close</span> </p>

                    }else{
                     return items.Open?.map((ite,index)=>{
                       if(index === 0 ){
                        return <p className={day.getDay()-1 === idxe ? 'currentDay d-flex' : 'd-flex'}><span className='w-50'>{`${items?.day} `}</span> <span className='w-50'>{` ${ite.Time1}-${ite.Time2}`}</span> </p>

                       }else{
                        return <p className={day.getDay()-1 === idxe ? 'currentDay d-flex' : 'd-flex'}><span className='w-50'>  </span> <span className='w-50'>{` ${ite.Time1}-${ite.Time2}`}</span> </p>

                       }
                    })
                    }
                })
            }
            </AccordionDetails>
            </Accordion>                    
        </div>
      </div>
      
    </React.Fragment>
  )
}

export default Openingtime