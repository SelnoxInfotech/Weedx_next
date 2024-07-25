import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import  Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import useStyles from "@/styles/style"
import { useForm } from "react-hook-form";
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Cookies from 'universal-cookie';
import { CiLock } from "react-icons/ci"
import Menuintregration_google from '@/component/Menuintregation/Menuintregration_google';
import Createcontext from "@/hooks/context"
export function Menuintegration_login({ open, setOpen }) {
    const handleClose = () => { setOpen(false);};
    const cookies = new Cookies();
    const method = useForm()
    const router = useRouter();
    const { state, dispatch } = React.useContext(Createcontext)
    const [loading, Setloading] = React.useState(false)
    const classes = useStyles()
    const [showPassword, setShowPassword] = React.useState(false);
    const [dulicate] = React.useState([])
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    function Submit(data) {

        Setloading(true)
        axios.post("https://api.cannabaze.com/UserPanel/Login/", {
            email: data.email,
            password: data.password
        },
        ).then(response => {

            if (router.pathname === "/CheckOutMainPage") {
                if (state.AllProduct.length === 0) { handleClose() }
            }else {
                if (response.data !== "Not Authorised") {
                    let date = new Date();
                    date.setTime(date.getTime() + 60 * 60 * 24 * 365)
                    cookies.set('User_Token_access', response?.data?.tokens?.access, { expires: date })
                    dispatch({ type: 'Login', login: true })
                    dispatch({ type: 'ApiProduct', ApiProduct: !state.ApiProduct })
                    handleClose()
                    Setloading(false)
                }
                else {
                    // alert("SomeThing Worng")
                    Swal.fire({
                        imageUrl: "/image/cross.png",
                        imageClass: "loginsweetimg",
                        imageWidth: 60,
                        imageHeight: 60,
                        title: "Oops...",
                        text: "Login Credentials Incorrect     ",
                        footer: "Invalid email or password. Please check and try again. If not registered, use the correct email or sign up for a new account.",
                        customClass: {
                            confirmButton: 'loginSweetbtn',
                            title: 'title-class',
                            icon: 'loginSweeticon'
                        },
                    });
                    Setloading(false)
                }
            }


        }).catch(
            function (error) {
                Setloading(false)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.response.data.message,

                });
            })
    }
    React.useEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }, [])

    return (
        <div className='menuItegratedlogin'>
           
            <Dialog open={open}  onClose={handleClose}>
                    <div className="login_signup_reset_container ">
                        <div className='col-12 fontStyle signup_head'>
                            <h1>Log In</h1>
                        </div>
                        <form onSubmit={method.handleSubmit(Submit)}>
                            <div className='logininputbox'>
                                <div className='col-lg-12 signup_margins_top_textfield '>
                                    <TextField
                                        placeholder="Enter Your Email"
                                        variant="outlined"
                                        fullWidth
                                        className={`${classes.textFieldFocusBorderColor}`}
                                        id='Email'
                                        name='email'
                                        size='small'
                                        inputRef={method.register({
                                            required: "email  is required*.",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "invalid email address"
                                            }
                                        },
                                        )}
                                        helperText={method.errors?.email?.message || dulicate?.email}
                                        error={Boolean(method.errors?.email) || (Boolean(dulicate?.email))}
                                    />
                                </div>
                            </div>
                            <div className='row logininputbox'>
                                <div className='col-lg-12 signup_margins_top_textfield '>
                                    <TextField
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        variant="outlined"
                                        fullWidth
                                        className={`${classes.textFieldFocusBorderColor}`}
                                        id='Password'
                                        size='small'
                                        name='password'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <CiLock />
                                                </InputAdornment>
                                            ),
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }}
                                        inputRef={method.register({
                                            required: "password  is required*.",

                                        },
                                        )}
                                        helperText={method.errors?.password?.message}
                                        error={Boolean(method.errors?.password)}
                                    />
                                </div>
                            </div>

                            <div className='row  signup_margins_top'>
                                <div className=' col-lg-12 '>
                                    <Box className={!loading ? `${classes.loginBtnTextAndBackground}` : `${classes.loginBtnTextAndBackgroundAfter}`} >
                                        <LoadingButton variant="outlined" loading={loading} type='submit'>LOGIN</LoadingButton>
                                    </Box>
                                </div>

                            </div>
                        </form>
                        <div className='w-100 d-flex mt-4 center align-items-center'>
                            <div className='login_horizontalLine '></div> <span className='px-2 login_OR'>OR</span> <div className='login_horizontalLine '></div>
                        </div>
                        <div className='row  signup_margins_top'>
                            <div className='col-lg-12 '>

                                <Menuintregration_google handleClose={handleClose}></Menuintregration_google>
                            </div>

                        </div>
                      
                        <div className='crosslogin'>
                            
                         
                        </div>
                    </div>
          
            </Dialog>

        </div>
    );
}
