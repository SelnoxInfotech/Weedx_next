import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useStyles from '@/styles/style';
import LoadingButton from '@mui/lab/LoadingButton';
import {IoMdShare} from "react-icons/io"
import { AiOutlineConsoleSql } from 'react-icons/ai';


const OrderTracking = ({AllOrder_data}) => {
    const classes = useStyles()
    const [activeStep, setActiveStep] = React.useState(1);
    React.useEffect(()=>{
        if( AllOrder_data.Order_Status === ".Order_Status"){
            setActiveStep(3)

        }else if(AllOrder_data.Order_Status === "AllOrder_data.Order_Status"){
            setActiveStep(2)

        }else{
            setActiveStep(1)
        }
    },[])
    return (
        <div className=" col-xl-7 col-lg-8 col-12 ">
           <div className='orderTracking_container'>
           
            <h1 className="orderTracking_heading">Order Tracking</h1>
            { AllOrder_data[0]?.Order_Status=== "Cancel" ?
             <h2 className='cancelOrderIndicator'>This Order has been Cancelled</h2>
                : 
            <React.Fragment>
            <Box sx={{ maxWidth: 400 }}>
                <Stepper activeStep={activeStep} orientation="vertical" className={classes.OrderTrackingCircleColor}>
                
                        <Step >
                            <StepLabel >
                            Order Placed
                            </StepLabel>
                        </Step>
                        <Step >
                            <StepLabel >
                            Shipped
                            </StepLabel>
                        </Step>
                        <Step >
                            <StepLabel >
                            Delivered
                            </StepLabel>
                        </Step>
                
                </Stepper>
                {activeStep === 3 && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>Your items has been delivered</Typography>
                        <Typography sx={{ color: "#31B665" }}>Show more</Typography>

                    </Paper>
                )}
            </Box>
            <Box className={`mt-4 center ${classes.OrderTrackingLoadingBtn}`}>

                    <LoadingButton>Tracking Link</LoadingButton>
                    <LoadingButton startIcon={<IoMdShare color='#8A8A8A'/>} className="mx-2"> Share</LoadingButton>

            </Box>
            </React.Fragment>
            }
            </div>
        </div>
    )
}
export default OrderTracking;