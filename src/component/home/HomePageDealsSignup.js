import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useStyles from '../../styles/style';
import { useForm } from "react-hook-form";
import Axios from 'axios';
import  newsletters from '../../../public/newsletters.png'
import React from 'react';
import Image from 'next/image';
import { useCallback } from 'react';
const HomePageDealsSignup = () => {
    const classes = useStyles()
    const [submited,setsubmited]= React.useState(false)
    const { register, handleSubmit, errors, reset, setError } = useForm();
    const [email, setEmail] = React.useState('');
    const onSubmit = (data) => {
        Axios.post(`https://api.cannabaze.com/UserPanel/Add-Subscribe/`,
            {
                email: email
            },

        ).then((res) => {
                if (res.data.status === "success") {
                    setsubmited(true)
                }
               
        })
        .catch((error) => {
            setError("email", {
                type: 'custom',
                message: 'subscribe with this email already exists.',
            }
            )
        })
    }
    const handleChange = useCallback((event) => {
        event.preventDefault();
        setEmail(event.target.value);
    }, [setEmail]);
    

    return (
        <div className="mt-4">
                <div className="col-12 HomePageDealsSignupContainer">
                    <div className='row'>
                        <div className='col-md-6 col-12 d-md-inline d-none'>
                            <div className='newsletterImage text-center'>
                                <Image unoptimized={true} width={200} height={200} src={newsletters.src} alt='newsletter Icon' title='newsletter Icon'/>
                            </div>
                        </div>
                        <div className='col-md-6  col-12'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="contentarea">
                                <div className=" homePageSignup_heading   ">
                                    <h3>{`Subscribe To Our Newsletters`}</h3>
                                </div>
                                <div className=" homePageSignup_paragraph   ">
                                    <p>{`Subscribe to our weekly newsletter and be a part of our journey to self discovery and love.`}</p>
                                </div>
                            
                            {
                                submited ? <h2 className='thankforsubscribe'>{`Thanks For Subscribe`}</h2>:
                                <div className='newsletterFormFeild'>
                                    <TextField
                                        className={classes.homePageDealSignup_TextFields}
                                        InputProps={{
                                            style: {
                                                borderRadius: "20px 0 0 20px",
                                                backgroundColor: "#efefef"
                                            }
                                        }}
                                        type='email'
                                        placeholder="Enter Your Email"
                                        variant="outlined"
                                        fullWidth
                                        size='small'
                                        value={email}
                                        name="email"
                                        onChange={handleChange}
                                        helperText={errors.email?.message}
                                        error={Boolean(errors?.email)}
                                        inputRef={register({
                                            required: "Email not Valid",
                                            pattern: {
                                                value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                                                message: "Email not Valid"
                                            }
                                        })}

                                    />
                                    <span className='newsletter_btn'>
                                        <Button className={` ${classes.homePageButton}`} type='submit' >{`Subscribe`}</Button>
                                    </span>
                                </div>
                                }




                            </div>
                        </form>
                        </div>
                    </div>
                 
                </div>
        </div >
    )
}
export default HomePageDealsSignup