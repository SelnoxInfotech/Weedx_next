'use client'
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import useStyles from "../styles/style"
import TextField from '@mui/material/TextField';
import { usePathname } from 'next/navigation'
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import axios from 'axios';
import Currentlocation from '@/component/currentlocation/CurrentLocation';
import Link from 'next/link'
import Cookies from 'universal-cookie';
import React from 'react';
import { RxCross2 } from "react-icons/rx";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { CiLock } from "react-icons/ci"
import LoginWithGoogle from '../component/LoginWithGoogle/LoginWithGoogle';
import Createcontext from "../hooks/context"
const Login = () => {
    const cookies = new Cookies();
    const pathname = usePathname()
    const method = useForm()
    const Swal = require('sweetalert2')
    const { state, dispatch } = React.useContext(Createcontext)
    const [loading, Setloading] = React.useState(false)
    const classes = useStyles()
    const [showPassword, setShowPassword] = React.useState(false);
    const router = useRouter()
    const { query } = router;
    const [dulicate] = React.useState([])
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    function Submit(data) {

        Setloading(true)
        axios.post("https://api.cannabaze.com/UserPanel/Login/", {

            email: data.email,
            password: data.password

        },
        ).then(response => {
            if (response.data !== "Not Authorised") {
                let date = new Date();
                date.setTime(date.getTime() + 60 * 60 * 24 * 365)
                localStorage.setItem('User_Token_access', response?.data?.tokens?.access);
                cookies.set('User_Token_access', response?.data?.tokens?.access, { expires: date })
                dispatch({ type: 'Login', login: true })
                dispatch({ type: 'ApiProduct', ApiProduct: !state.ApiProduct })

                // if (state === null || location.state.location.pathname === '/cart') {
                //     router.push(-1)
                // } else {
                    router.push('/')

                // }


                Setloading(false)
            }
            else {

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
        }).catch(
            function (error) {
                Setloading(false)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error?.response?.data?.error,

                });
            }
        )
    }

    return (
        <div className="login_signup_reset_container ">
            {state.permission === false && <Currentlocation></Currentlocation>}
            <div className='col-12 signup_head'>
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
                    {/* <label htmlFor='Password'>Password</label> */}

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
                                        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
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
                    <LoginWithGoogle></LoginWithGoogle>
                </div>
            </div>
            <div className='w-100 text-center my-2 '>
                <h2 className='login_bottom'>New To weedx ?</h2>
                <Link className='signInfo' href={pathname === '/menu-integration/login' ? '/menu-integration/signup' : '/signup'}><span>{`Create your Weedx Account`}</span></Link>
            </div>
            <div className='crosslogin'>
                <Tooltip title="Back">
                    <IconButton>
                        <RxCross2 color={'#000'} size={22} onClick={() => { router.back() }} />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}

export default Login