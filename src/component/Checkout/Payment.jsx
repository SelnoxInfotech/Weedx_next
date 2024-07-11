import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import useStyles from "@/styles/style"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Payment = ({ SetShowPlaceOrder }) => {
    const classes = useStyles()

    const [value, setValue] = React.useState('');
    const [PaymentRestData, SetPaymentRestData] = React.useState(true)
    const HandlePaymentRestData = () => {
        SetPaymentRestData(false)
        SetShowPlaceOrder(true)
    }
    const ShowAgainPaymentRestData = () => {
        SetPaymentRestData(true)
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row center deliver_row_margin">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12 payment_container">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-between align-items-center">
                                <p className='font_size_paragraph' onClick={ShowAgainPaymentRestData}>Payment Method</p>
                                {
                                    PaymentRestData ? null :
                                
                                <Button     variant="outlined" sx={{
                                    color: '#31B665',
                                    borderColor:'#31B665',
                                    fontSize:'12px',
                                    textTransform:'capitalize',
                                    '&:hover': {
                                        color: "white",
                                        backgroundColor:'#31B665',
                                        borderColor:'#31B665',
                                    },
                                    }} onClick={ShowAgainPaymentRestData}>Edit</Button>
                                }
                            </div>

                        </div>
                        {    PaymentRestData &&
                            <div>

                              
                                 

                               
                                <div className="row">
                                    <div className="col-12">
                                        <Box
                                        className={classes.deliveryOptionRadioBtn}
                                        >
                                        <FormControl>
                                            <RadioGroup
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="controlled-radio-buttons-group"
                                                value={value}
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel value="I plan to pay delivery at cash" control={<Radio />} label="We Accept Cash On Delivery" />

                                            </RadioGroup>
                                        </FormControl>
                                         </Box>
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col-12 col-lg-4 height_delivery_information_btn'>
                                        <Box
                                            className={`  ${classes.loadingBtnTextAndBack}`}
                                        >
                                            <LoadingButton onClick={HandlePaymentRestData} variant="outlined">continue</LoadingButton>
                                        </Box>
                                    </div>

                                </div>
                            </div>}
                    </div>

                </div>

            </div >
        </React.Fragment>
    )
}
export default Payment