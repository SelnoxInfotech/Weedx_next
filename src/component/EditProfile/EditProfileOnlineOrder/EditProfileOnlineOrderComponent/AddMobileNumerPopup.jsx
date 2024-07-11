
import Dialog from "@mui/material/Dialog"
import React from "react"
import Button from "@mui/material/Button"
import { Box } from "@mui/material"
import useStyles from '@/styles/style';
import MuiPhoneNumber from "material-ui-phone-number"
import LoadingButton from "@mui/lab/LoadingButton"
import { AiFillPlusCircle } from "react-icons/ai"
import IconButton from '@mui/material/IconButton';
import { RiCloseCircleFill } from "react-icons/ri"
import { useForm, Controller } from "react-hook-form";
import Cookies from 'universal-cookie';
import Axios from 'axios';
const AddMobileNumberPopup = ({ Mobile, Api, SetApi }) => {
    const cookies = new Cookies();
       let token_data = cookies.get('User_Token_access')
       let accessToken 
       if (typeof window !== 'undefined') {
   
            accessToken = localStorage.getItem('User_Token_access');
   
       }
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
    const {  handleSubmit, errors, control, reset ,setError} = useForm();
    const [Open, SetOpen] = React.useState(false)
    const classes = useStyles()
    const handleClickOpen = () => {
        SetOpen(true)
    }
    const handleClose = () => {
        SetOpen(false)
    }
    const onSubmit = (data) => {


        Axios.post(`https://api.cannabaze.com/UserPanel/Update-UpdateUserProfile/`,
            {
                MobilePhone: data.Mobile
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
              
                setError("Username", {
                    type: "manual",
                    message: error.response.data.error.username[0],
                })
            })
    }
    return (
        <div>
            <Button className={`${classes.EditProfileBtn_Color}`} onClick={handleClickOpen} startIcon={<AiFillPlusCircle color="#707070" size={20} />}>Add</Button>
            <Dialog open={Open} onClose={handleClose} className={`${classes.AddMobilePopup}`}>
                <div className="container-fluid py-4 px-4">
                    <div className="row">
                        <div className="col-12 text-end AddMobileNo_col">
                            <IconButton onClick={handleClose} aria-label="closebutton"><RiCloseCircleFill color='#949494' size={24} /></IconButton>
                        </div>
                        <div className="col-12 AddMobileNo_col">
                            <h2 className="addMobileNumberPopup_heading">Add Mobile Number</h2>

                        </div>

                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-12 AddMobileNo_col ">
                                <label htmlFor="mobileNo">Mobile Number</label>

                            </div>
                            <div className="col-12 mt-2 AddMobileNo_col">
                                <Controller
                                    render={({ name, onChange, value }) => (
                                        <MuiPhoneNumber 
                                        id="mobileNo" 
                                        name={name}
                                        onChange={onChange}
                                        value={Mobile}
                                        defaultCountry="in"
                                         fullWidth="true" 
                                         error={Boolean(errors?.Mobile)}
                                         helperText={errors.Mobile?.message}
                                         />
                                    )}
                                    name="Mobile"
                                    control={control}
                                    rules={
                                        {
                                            required: "Enter valid phone number",
                                            minLength: {
                                                value: 8,
                                                message: "Please enter minimum 10 digits"
                                            },
                                            maxLength: {
                                                value: 15,
                                                message: "Please enter valid mobile number"
                                            }
                                        }
                                    }
                                />

                            </div>


                        </div>
                        <Box className={` mt-4 ${classes.editEmail_loadingBtn}`}>
                            <LoadingButton type="submit">Continue</LoadingButton>
                        </Box>
                        <Box className={`mt-4 ${classes.editEmail_loadingBtn_cancel}`}>
                            <LoadingButton onClick={handleClose}>Cancel</LoadingButton>
                        </Box>
                    </form>
                </div>
            </Dialog>
        </div>
    )
}
export default AddMobileNumberPopup