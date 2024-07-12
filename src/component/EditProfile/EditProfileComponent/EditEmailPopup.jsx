import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import { Box } from "@mui/material"
import useStyles from "@/styles/style"
import LoadingButton from '@mui/lab/LoadingButton';
import { MdEdit } from 'react-icons/md';
import { RiCloseCircleFill } from "react-icons/ri"
import IconButton from '@mui/material/IconButton';
import { useForm } from "react-hook-form";
import Cookies from 'universal-cookie';
import Axios from 'axios';
const EditEmailPopup = ({ email , Api, SetApi }) => {
    const nam = email
    const cookies = new Cookies();
    let token_data = cookies.get('User_Token_access')
    let accessToken 
    if (typeof window !== 'undefined') {

         accessToken = localStorage.getItem('User_Token_access');

    }
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
    const classes = useStyles()
    const { register, handleSubmit, errors, reset ,setError} = useForm();
    const [open, setOpen] = React.useState(false);
    const [Name, SetName] = React.useState('')
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChnage = (event) => {
        SetName(event.target.value)
    }
    const onSubmit = (data) => {
        Axios.post(`https://api.cannabaze.com/UserPanel/Update-UpdateUserProfile/`,
        {
            email:data.Email
        },
            {
                headers: {
                    'Authorization': `Bearer ${token_data}`
                },
            }
        ).then((res) => {
                reset()
                setOpen(false);
                SetApi(!Api)
            }).catch((error) => {
              
                setError("Email", {
                    type: "manual",
                    message:error.response.data.error.email[0],
                  })
            })
    }


    
    return (

        <div>
            <Button className={`${classes.EditProfileBtn_Color}`} onClick={handleClickOpen} startIcon={<MdEdit />}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose} className={classes.notification_dialogBox_width_height}>
                <div className='container-fluid px-4'>

                    <div className='row my-2'>
                        <div className='col-6 mt-4 EditEmailPopup_col_height'>
                            <label className='EditEmail_pop_heading' htmlFor='edit email'>Email Edit</label>
                        </div>
                        <div className='col-6 text-end mt-4 EditEmailPopup_col_height'>
                            <IconButton onClick={handleClose} aria-label="closebutton"><RiCloseCircleFill color='#949494' size={24} /></IconButton>

                        </div>


                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='row'>
                            <div className='col-12  EditEmailPopup_col_height'>
                                <TextField id="edit email"
                                    className={`${classes.FilledTextFieldStyle}`}
                                    fullWidth
                                    name="Email"
                                    placeholder={nam}
                                    value={Name}
                                    onChange={handleChnage}
                                    variant="filled"
                                    inputRef={register({
                                        required: "Email is required*.",

                                    })}
                                    helperText={errors.Email?.message}
                                    error={Boolean(errors?.Email)}
                                />
                            </div>

                        </div>


                        <Box
                            className={`edit_emailPopUp_btn_container ${classes.editEmail_loadingBtn}`}
                        >
                            <LoadingButton type="submit" id='EditEmailSave' variant="outlined" >Save</LoadingButton>
                        </Box>
                    </form>
                    <Box
                        className={`edit_emailPopUp_btn_container ${classes.editEmail_loadingBtn_cancel}`}
                    >
                        <LoadingButton onClick={handleClose} id='EditEmailSave' variant="outlined" >Cancel</LoadingButton>
                    </Box>
                </div>

            </Dialog>

        </div>
    )
}
export default EditEmailPopup