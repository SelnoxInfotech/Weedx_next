import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import React from 'react'
import style from "@/styles/style"
import Cookies from 'universal-cookie';
import Createcontext from "@/hooks/context"
import CookieSetting from './CookiesSetting';
export default function CookiesAccept() {
    const { dispatch } = React.useContext(Createcontext)
    const classes = style()
    const cookies = new Cookies();
    const handleCookies = () => {
        let date = new Date();
        date.setTime(date.getTime() + (30*24*60*60*1000))
        cookies.set('CookiesAcceptAll', 1, { expires: date })
        dispatch({ type: 'Cookies', Cookies: cookies.get('CookiesAcceptAll')})
    }
    return (
        <div className='col-12 AcceptCookies'>
            <div className='col-md-10 col-12 AcceptCookiesContent'>
                <div className='row' style={{ gap: '3px' }}>

                    <div className="col">
                        <p>This website uses cookies to improve your browsing experience and to show you personalized content.By browsing our website you consent to all cookies in accordance with our cookie policies included in our </p>
                    </div>
                    <div className=" col-lg-2 col-md-auto MediaFCookiesAccept">
                        {/* <Box className={classes.CookiesSetting}>
                   <LoadingButton >COOKIES SETTINGS</LoadingButton>
                   </Box> */}
                        <CookieSetting></CookieSetting>
                    </div>
                    <div className="col-lg-2">
                        <Box className={classes.CookiesAccept}>


                            <LoadingButton onClick={handleCookies}>ACCEPT ALL</LoadingButton>
                        </Box>
                    </div>
                </div>
            </div>
        </div>

    )
}
