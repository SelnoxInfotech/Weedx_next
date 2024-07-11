import Dialog from "@mui/material/Dialog"
import React from "react"
import Button from "@mui/material/Button"
import { MdEdit } from "react-icons/md"
import TextField from "@mui/material/TextField"
import useStyles from '@/styles/style';
import { Box } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { RxCross2 } from "react-icons/rx";
import Snackbar from '@material-ui/core/Snackbar';
import { RiCloseCircleFill } from "react-icons/ri"
import IconButton from '@mui/material/IconButton';
import { useForm } from "react-hook-form";
import Cookies from 'universal-cookie';
import Axios from 'axios';
const EditUserName = ({ Username, Api, SetApi }) => {
    const cookies = new Cookies();
       let token_data = cookies.get('User_Token_access')
       let accessToken 
       if (typeof window !== 'undefined') {
   
            accessToken = localStorage.getItem('User_Token_access');
   
       }
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
    const classes = useStyles()
    const { register, handleSubmit, errors, reset, setError } = useForm();
    const [Open, SetOpen] = React.useState(false)
    const [status, setstatus] = React.useState(false)
    const handleClickOpen = () => {
        SetOpen(true)
    }
    const handleClose = () => {
        SetOpen(false)
    }
    const onSubmit = (data) => {


        Axios.post(`https://api.cannabaze.com/UserPanel/Update-UpdateUserProfile/`,
            {
                username: data.Username
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
                setstatus(true)
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
            <Button className={`${classes.EditProfileBtn_Color}`} onClick={handleClickOpen} startIcon={<MdEdit color="#707070" size={20} />}>
                Edit
            </Button>
            <Dialog open={Open} onClose={handleClose} className={classes.EditUserNamePopup}>
                <div className="container-fluid py-4 px-4">
                    <div className="row">
                        <div className="col-12 text-end edit_userName_col">
                            <IconButton aria-label="closebutton"><RiCloseCircleFill onClick={handleClose} color='#949494' size={24} /></IconButton>
                        </div>
                        <div className="col-12 edit_userName_col">
                            <h2 className="editUserHeading">Edit User</h2>
                        </div>

                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-12 edit_userName_col">
                                <label className="editUserLabel" htmlFor="UserName">Name</label>
                            </div>
                            <div className="col-12 edit_userName_col_textfield">
                                <TextField id="UserName"
                                    variant="filled" fullWidth
                                    placeholder={Username}
                                    name="Username"
                                    inputRef={register({
                                        required: "Username is required*.",

                                    })}
                                    className={`${classes.FilledTextFieldStyle}`}
                                    helperText={errors.Username?.message}
                                    error={Boolean(errors?.Username)}
                                />
                            </div>

                        </div>
                        <Box className={`mt-4 ${classes.editEmail_loadingBtn}`}>
                            <LoadingButton type="submit">Save</LoadingButton>
                        </Box>
                        <Box className={`mt-4 ${classes.editEmail_loadingBtn_cancel}`}>
                            <LoadingButton onClick={handleClose}>Cancel</LoadingButton>
                        </Box>
                    </form>

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
export default EditUserName