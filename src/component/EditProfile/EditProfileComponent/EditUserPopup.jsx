
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import { Box } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton';
import { RxCross2 } from "react-icons/rx";
import Snackbar from '@material-ui/core/Snackbar';
import useStyles from '@/styles/style';
import { MdEdit } from "react-icons/md"
import { RiCloseCircleFill } from "react-icons/ri"
import IconButton from '@mui/material/IconButton';
import { useForm } from "react-hook-form";
import Cookies from 'universal-cookie';
import Axios from 'axios';
const EditUserPopup = ({ username, Api, SetApi }) => {
    const classes = useStyles()
    const cookies = new Cookies();
    const { register, handleSubmit, errors, reset, setError } = useForm();
       let token_data = cookies.get('User_Token_access')
       let accessToken 
       if (typeof window !== 'undefined') {
   
            accessToken = localStorage.getItem('User_Token_access');
   
       }
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
    const [open, setOpen] = React.useState(false);
    const [user, Setusername] = React.useState('')
    const handleClickOpen = () => {
        setOpen(true);
    };
    const [status, setstatus] = React.useState(false)
    const handleClose = () => {
        setOpen(false);
    };
    const onSubmit = (data) => {


        Axios.post(`https://api.cannabaze.com/UserPanel/Update-UpdateUserProfile/`,
            {
                username: user
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
                setOpen(false);
                SetApi(!Api)
                setstatus(true)
            })
            .catch((error) => {
            
                setError("username", {
                    type: "manual",
                    message: error.response.data.error.username[0],
                })
            })
    }
const handleChnage = (e) =>{
    Setusername(e.target.value)
}
    return (
        <div>
            <Button className={`${classes.EditProfileBtn_Color}`} onClick={handleClickOpen} startIcon={< MdEdit color="#707070" size={18} />}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose} className={`${classes.notification_user_dialogBox_width_height}`}>
                <div className='container-fluid px-4'>
                    <div className='row'>
                        <div className='col-12 text-end mt-4 EditUser_col_div'>
                            <IconButton onClick={handleClose} aria-label="closebutton"><RiCloseCircleFill color='#949494' size={24} /></IconButton>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='col-12 mt-4 EditUser_col_div'>
                                <label className='Edit_userName' htmlFor='Edit User Name'>Edit User Name</label>
                            </div>
                            <div className='col-12 mt-4 EditUser_col_div'>
                                <TextField
                                    className={`${classes.FilledTextFieldStyle}`}
                                    placeholder={username}
                                    value={user}
                                    onChange={handleChnage}
                                    fullWidth variant="filled"
                                    id='Edit User Name'
                                    name='username'
                                    inputRef={register({
                                        required: "username is required*.",

                                    })}
                                    helperText={errors.username?.message}
                                    error={Boolean(errors?.username)}
                                />
                            </div>
                            <Box
                                className={`edit_UserPopUp_btn_container mt-4
                         ${classes.editEmail_loadingBtn}`}
                            >
                                <LoadingButton type="submit" variant="outlined" >Save</LoadingButton>
                            </Box>
                            <Box
                                className={`edit_UserPopUp_btn_container mt-4 ${classes.editEmail_loadingBtn_cancel}`}
                            >
                                <LoadingButton onClick={handleClose} variant="outlined" >Cancel</LoadingButton>
                            </Box>
                        </form>
                    </div>
                </div>


            </Dialog>
            <Snackbar
               anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        autoHideDuration={2000}
        TransitionComponent={'SlideTransition'}
        open={status}
        onClose={()=>setstatus(false)}
        message="Success"
        className={classes.promptstyle}
        action={
            <RxCross2 size={22}  onClick={()=>setstatus(false)} />
               }
             />
        </div>

    )
}
export default EditUserPopup