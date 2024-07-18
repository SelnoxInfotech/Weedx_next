import TextField from "@material-ui/core/TextField";
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import useStyles from "@/styles/style"
import React from 'react';
import { useForm } from "react-hook-form";
import Image from "next/image"
import Createcontext from "@/hooks/context";
import Button from '@mui/material/Button';

const DeliveryInformation = ({ SetShowDeliveryInformation, image, setImage, setDataImage, Details, SetDetails , DefalutImage , SetDefalutimage }) => {
    const { dispatch } = React.useContext(Createcontext)
    const method = useForm()
    const [ShowRestDeliveryInformation, SetShowRestDeliveryInformation] = React.useState(true)
    const classes = useStyles()
    const HandleDeliveryInformation = (data) => {
        if(image === undefined){
            SetDefalutimage(true)
            window.scroll(0,5)
        }
    else{
        SetShowDeliveryInformation(true)
        SetShowRestDeliveryInformation(false)
        dispatch({ type: 'DeliveryInformation', DeliveryInformation: true })
        SetDetails({
            ...Details, ["DateOfBirth"]: data.DateOfBirth
        });

    }
    }
    const ShowAgainDeliverInformation = () => {
        SetShowRestDeliveryInformation(true)
    }
   
    function SelectImage(event) {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            setDataImage(event.target.files[0])
        }
        SetDefalutimage(false)

    }

    function handleChange(event) {

        SetDetails({
            ...Details, [event.target.name]: event.target.value
        });
    }
  
      function maxagelimit(){
         let date = new Date()
         let y = date.getFullYear() -18
         return `${y}-01-01`
      }
    return (
        <div className="container-fluid">

            <div className='row center deliver_row_margin'>

                <div className='col-lg-12 col-md-12 col-sm-12 col-12 delivery_information_container'>
                    <div className='row'>
                        <div className="col-12 height_del_information_inner_div font_size_paragraph d-flex justify-content-between align-items-center">
                            <p >Your Information</p>
                            {
                                ShowRestDeliveryInformation ? null :
                            
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
                                    }} onClick={ShowAgainDeliverInformation}>Edit</Button>
                                }
                        </div>
                    </div>
                    {ShowRestDeliveryInformation &&
                        <div className='showRestDeliveryInformation'>
                            <div className='row'>
                                <div className="col-12 height_del_information_inner_div font_size_paragraph_del">
                                    <p>Enter Your Information</p>

                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-lg-2 col-md-2 col-sm-2 col-2'>
                                    <p>Photo Id</p>
                                </div>
                                <div className='col-lg-10 col-md-10 col-sm-10 col-10'>
                                    <input accept="image/*" type='file' onChange={SelectImage} />
                                </div>

                            </div>
                            <div className='row'>
                                <div className='col-8 delivery_option_img_div_height' >
                                    <Image  unoptimized={true} width={100} height={100} style={{border:DefalutImage && "1px solid red" }} className='delivery_option_image' src={image} title={'Delivery info'} alt={'Delivery info'} />
                                </div>


                            </div>

                            <form onSubmit={method.handleSubmit(HandleDeliveryInformation)} >
                                <div className='row my-2'>
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 height_text_field">
                                        <TextField
                                            className={classes.deliveryInformationTextFildColor}
                                            value={Details.FirstName }
                                            label="First name on photo id"
                                            variant="standard"
                                            fullWidth
                                            onChange={((e)=>handleChange(e))}
                                            name='FirstName'
                                            inputRef={method.register({
                                                required: "FirstName is required*.",
                                            }
                                            )}
                                            helperText={method.errors?.FirstName?.message}
                                            error={Boolean(method.errors?.FirstName)}
                                        />
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 height_text_field">
                                        <TextField
                                            className={classes.deliveryInformationTextFildColor}
                                            label="Last name on photo id"
                                            variant="standard"
                                            value={Details.LastName}
                                            onChange={((e)=>handleChange(e))}
                                            fullWidth
                                            name='LastName'
                                            inputRef={method.register({
                                                required: "LastName is required*.",
                                            }
                                            )}
                                            helperText={method.errors?.LastName?.message}
                                            error={Boolean(method.errors?.LastName)}
                                        />
                                    </div>
                                </div>
                                <div className='row my-4'>
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 height_text_field">
                                        <Box
                                            sx={{
                                                ".MuiFormControl-marginNormal": {
                                                    marginTop: "8px",
                                                },
                                                ".MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline ": {

                                                },
                                                "& .MuiOutlinedInput-notchedOutline.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#31B665"
                                                }

                                            }}>
                                            <TextField
                                                className={classes.deliveryInformationTextFildColor}
                                                name="DateOfBirth"
                                                fullWidth
                                                value={Details.DateOfBirth}
                                                onChange={handleChange}
                                                label="Birth date"
                                                inputProps={{
                                                    max: maxagelimit(),
                                                    min: "1960-01-01"
                                                  }}
                                                InputLabelProps={{ shrink: true, required: true }}
                                                type="date"
                                                inputRef={method.register({
                                                    required: "Birthdate is required*.",
                                                }
                                                )}
                                               
                                                helperText={method.errors?.Birthdate?.message}
                                                error={Boolean(method.errors?.Birthdate)}
                                            />
                                        
                                        </Box>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 height_text_field">
                                        <TextField
                                            className={classes.deliveryInformationTextFildColor}
                                            label="Email"
                                            value={Details.Email}
                                            onChange={((e)=>handleChange(e))}
                                            variant="standard"
                                            fullWidth
                                            name='Email'
                                            inputRef={method.register({
                                                required: "Email is required*.",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "invalid email address"
                                                }
                                            }
                                            )}
                                            helperText={method.errors?.Email?.message}
                                            error={Boolean(method.errors?.Email)}
                                        />
                                    </div>
                                </div>
                                <div className='row my-4'>
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 height_text_field">
                                        <TextField
                                            className={classes.deliveryInformationTextFildColor}
                                            type='number'
                                            onChange={((e)=>handleChange(e))}
                                            value={Details.MobileNo}
                                            label="Mobile phone"
                                            variant="standard"
                                            fullWidth
                                            name='MobileNo'
                                            inputRef={method.register({
                                                required: "Email is required*.",
                                                minLength: {
                                                    value: 10,
                                                    message: "enter valid number"
                                                },
                                                maxLength: {
                                                    value: 15,
                                                    message: "enter valid number"
                                                }
                                            }
                                            )}
                                            helperText={method.errors?.MobileNo?.message}
                                            error={Boolean(method.errors?.MobileNo)}
                                        />


                                    </div>

                                </div>
                                <div className='row'>
                                    <div className="col-12 height_del_information_inner_div font_size_paragraph_del">
                                        <p className="deliveryInfoPara">Medical Marijuana</p>


                                    </div>

                                </div>
                                <div className='row'>
                                    <div className="col-12 height_del_information_inner_div font_size_paragraph_del font_color delivery_information_font_family">
                                        <p>Please enter the ID number from your valid Medical Marijuana ID. Include all dashes and special characters.</p>


                                    </div>

                                </div>
                                <div className='row my-4'>
                                    <div className="col-12 height_del_information_inner_div font_size_paragraph_del font_color delivery_information_font_family">
                                        <TextField
                                            className={classes.deliveryInformationTextFildColor}
                                            onChange={handleChange}
                                            value={Details.MedicalMarijuanaNumber}
                                            label="Medical Marijuana Number"
                                            variant="standard"
                                            fullWidth
                                            name="MedicalMarijuanaNumber"
                                            inputRef={method.register({
                                                required: "Enter valid Id Number is required*.",
                                            }
                                            )}
                                            helperText={method.errors?.MedicalMarijuanaNumber?.message}
                                            error={Boolean(method.errors?.MedicalMarijuanaNumber)}
                                        />


                                    </div>

                                </div>
                                <div className='row my-4'>
                                    <div className='col-12 col-lg-4 height_delivery_information_btn'>
                                        <Box
                                            className={`  ${classes.loadingBtnTextAndBack}`}
                                        >
                                            <LoadingButton type='submit' variant="outlined">continue</LoadingButton>
                                        </Box>
                                    </div>

                                </div>

                            </form>
                        </div>
                    }

                </div>

            </div>


        </div>
    )
}
export  {DeliveryInformation}