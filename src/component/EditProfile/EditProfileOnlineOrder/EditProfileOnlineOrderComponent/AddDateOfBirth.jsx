import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import { AiFillPlusCircle } from "react-icons/ai"
import { Box } from '@mui/system';
import LoadingButton from "@mui/lab/LoadingButton"
import useStyles from '@/styles/style';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { RiCloseCircleFill } from "react-icons/ri"
import { MdEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";  
import { useForm } from "react-hook-form";
import Cookies from 'universal-cookie';
import Axios from 'axios';
const AddDateOfBirth = ({ Profile, Api, SetApi }) => {
    const cookies = new Cookies();
       let token_data = cookies.get('User_Token_access')
       let accessToken 
       if (typeof window !== 'undefined') {
   
            accessToken = localStorage.getItem('User_Token_access');
   
       }
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
    const { register, handleSubmit, errors, reset, setError } = useForm();
    const classes = useStyles()
    const [Open, SetOpen] = React.useState(false)
    const [status, setstatus] = React.useState(false)
    const handleClick = () => {
        SetOpen(true)
    }
    const handleClose = () => {
        SetOpen(false)
    }
    const onSubmit = (data) => {
        Axios.post(`https://api.cannabaze.com/UserPanel/Update-UpdateUserProfile/`,
            {
                DateOfBirth: data.DateOfBirth,
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
               
                setError("Email", {
                    type: "manual",
                    message: error.response.data.error.email[0],
                })
            })
    }
    function getFormattedDate() {
        let date = new Date()
        date.setYear(date.getFullYear() - 18);
        date.toLocaleString()
        var year = date.getFullYear();
      
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
      
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return  year + '-' + month  + '-' + day  ;
    }

    return (
        <div>
            <Button className={`${classes.EditProfileBtn_Color}`} onClick={handleClick} startIcon={  Boolean(Profile.DateOfBirth) ? <MdEdit color='#707070' size={20} /> :  <AiFillPlusCircle color='#707070' size={20} /> }>
             { Boolean(Profile.DateOfBirth) ? "Edit" : "Add" } 
            </Button>
            <Dialog open={Open} onClose={handleClose} className={classes.addDateOfBirthPopup} >
                <div className='container-fluid py-4 px-4'>
                    <div className='row'>
                        <div className='col-12 text-end dobCol'>
                            <IconButton aria-label="closebutton" onClick={handleClose}><RiCloseCircleFill color='#949494' size={24} /></IconButton>
                        </div>
                        <div className='col-12 addDateOfBirth_label mt-2'>
                            <h2 className='dob_heading'>Add Date of Birth</h2>

                        </div>

                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='row mt-4'>
                            <div className='col-12 addDateOfBirth_label'>
                                <label htmlFor='DOB'>Date of Birth</label>
                            </div>
                            <div className='col-12 AddDateOfBirth_textField_col mt-2'>
                                <TextField
                                    id="DOB"
                                    fullWidth
                                    className={`${classes.FilledTextFieldStyle}`}
                                    type='date'
                                    defaultValue={Profile.DateOfBirth || ''}
                                    name='DateOfBirth'
                                    variant='filled'
                                    inputRef={register({
                                        required: "Date Of Birth required*.",
                                    
                                    })}
                                 
                                    error={Boolean(errors?.DateOfBirth)}
                                    helperText={errors.DateOfBirth?.message}
                                    InputProps={{inputProps: { max: getFormattedDate()} }}

                                />
                            </div>

                        </div>
                        <Box className={` mt-5 ${classes.editEmail_loadingBtn}`}>
                            <LoadingButton type='submit'>Save</LoadingButton>
                        </Box>
                        <Box className={`mt-5 ${classes.editEmail_loadingBtn_cancel}`}>
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
export default AddDateOfBirth