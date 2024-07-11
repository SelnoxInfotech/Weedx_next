import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import { AiFillPlusCircle } from "react-icons/ai"
import { Box } from '@mui/system';
import LoadingButton from "@mui/lab/LoadingButton"
import useStyles from '@/styles/style';
import IconButton from '@mui/material/IconButton';
import { RiCloseCircleFill } from "react-icons/ri"
import { useForm } from "react-hook-form";
import Cookies from 'universal-cookie';
import Axios from 'axios';
const MedicalCardDetailsPopup = ({ Profile, Api, SetApi }) => {
    const cookies = new Cookies();
       let token_data = cookies.get('User_Token_access')
       let accessToken 
       if (typeof window !== 'undefined') {
   
            accessToken = localStorage.getItem('User_Token_access');
   
       }
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
    const { register, handleSubmit, errors, reset ,setError} = useForm();
    const [Open, SetOpen] = React.useState(false)
    const handleClick = () => {
        SetOpen(true)
    }
    const handleClose = () => {
        SetOpen(false)
    }
    const classes = useStyles()


    const onSubmit = (data) => {


        Axios.post(`https://api.cannabaze.com/UserPanel/Update-UpdateUserProfile/`,
        {
            MedicalCardExpire:data.MedicalCardExpire,
            MedicalCardNumber:data.MedicalCardNumber,
            MedicalCardState:data.MedicalCardState

        },
            {
                headers: {
                    'Authorization': `Bearer ${token_data}`
                }
                ,
            
            }

        )
            .then((res) => {
                reset()
                SetOpen(false);
                SetApi(!Api)
            })
            .catch((error) => {
              
                setError("Email", {
                    type: "manual",
                    message:error.response.data.error.email[0],
                  })
            })
    }

    return (
        <div>
            <Button className={`${classes.EditProfileBtn_Color}`} onClick={handleClick} startIcon={<AiFillPlusCircle color='#707070' size={20} />}>
                Add
            </Button>
            <Dialog open={Open} onClose={handleClose} className={classes.medicalCardDetail_dialog} >
                <div className='container-fluid py-4 px-4'>
                    <div className='row'>
                        <div className='col-12 text-end AddPhotoIdPoppup_col '>
                            <IconButton aria-label="closebutton"><RiCloseCircleFill onClick={handleClose} color='#949494' size={24} /></IconButton>
                        </div>
                        <div className='col-12 medicalCard_col_height'>
                            <h2 className='medicalCard_heading'>Add Medical Card Informations</h2>

                        </div>

                    </div>
                    <form  onSubmit={handleSubmit(onSubmit)}>
                        <div className='row'>
                            <div className='col-12 MedicalCard_label_div'>
                                <label htmlFor='medical card number'>Medical Card Number*</label>
                            </div>
                            <div className='col-12 medicalCard_col_height mt-2'>
                                <TextField type='number'
                                 id='medical card number'
                                 name='MedicalCardNumber'
                                 placeholder={Profile.MedicalCardNumber}
                                 className={`${classes.FilledTextFieldStyle}`}
                                  fullWidth variant='filled'
                                  inputRef={register({
                                    required: "Medical Card Number is required*.",

                                })}
                                error={Boolean(errors?.MedicalCardNumber)}
                                helperText={errors.MedicalCardNumber?.message}
                                  />
                            </div>

                        </div>
                        <div className='row mt-4'>
                            <div className='col-12 MedicalCard_label_div mt-2'>
                                <label htmlFor='ExpiryDates'>Medical Card Expiration*</label>
                            </div>
                            <div className='col-12 medicalCard_col_height mt-2'>
                                <TextField type="date" 
                                id="ExpiryDates" fullWidth 
                                variant='filled'
                                defaultValue={Profile.MedicalCardExpire}
                                placeholder={Profile.MedicalCardExpire}
                                name="MedicalCardExpire"
                                className={`${classes.FilledTextFieldStyle}`}
                             
                                inputRef={register({
                                    required: "Medical Card Expire is required*.",

                                })}
                                error={Boolean(errors?.MedicalCardExpire)}
                                helperText={errors.MedicalCardExpire?.message}
                                 />

                            </div>

                        </div>
                        <div className='row mt-4'>
                            <div className='col-12 MedicalCard_label_div mt-2'>
                                <label htmlFor='MedicalCardState'>Medical Card State*</label>
                            </div>
                            <div className='col-12 medicalCard_col_height mt-2'>
                                <TextField type="text"
                                 id="MedicalCardState" 
                                 name="MedicalCardState"
                                 fullWidth variant='filled'
                                 placeholder={Profile.MedicalCardState}
                                 className={`${classes.FilledTextFieldStyle}`}
                                 inputRef={register({
                                    required: "Medical Card State is required*.",

                                })}
                                error={Boolean(errors?.MedicalCardState)}
                                helperText={errors.MedicalCardState?.message}
                                  />

                            </div>

                        </div>
                        <Box className={` mt-4 ${classes.editEmail_loadingBtn}`}>
                            <LoadingButton type='submit'>Save</LoadingButton>
                        </Box>
                        <Box className={`mt-5 ${classes.editEmail_loadingBtn_cancel}`}>
                            <LoadingButton onClick={handleClose}>Cancel</LoadingButton>
                        </Box>
                        
                        
                    </form>

                </div>
            </Dialog>

        </div>
    )
}
export default MedicalCardDetailsPopup