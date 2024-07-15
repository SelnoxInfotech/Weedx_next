"use client"
import * as React from 'react';
import Grid from '@mui/system/Unstable_Grid';
import Link from 'next/link'
import SideNavbar from "../navbar/component/SideSlider/Slider"
import Button from '@mui/material/Button';
import useStyles from "../../styles/style"
import { FiShoppingBag } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { TbEdit } from "react-icons/tb";
import { FaHandsHelping } from "react-icons/fa";
import SearchBar from "../navbar/component/searchbar"
import { AiFillHeart } from "react-icons/ai"
import Image from 'next/image';
import { ErrorBoundary } from 'react-error-boundary';
import { IoIosNotifications } from "react-icons/io"
import { MdOutlineShoppingCart } from "react-icons/md"
// import {  Link } from "react-router-dom";
import SliderLink from "../navbar/component/SideSlider/SilderLink"
import Createcontext from "../../hooks/context"
import Cookies from 'universal-cookie';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import Notification from './component/Notification'
// import './Navbar.css'
// import logo from ""
const Navbar = () => {
    const cookies = new Cookies();
    const ref = React.useRef(null);
    const profileRef = React.useRef(null)
    const Location = useRouter();
    const { state, dispatch } = React.useContext(Createcontext)
    const [notify, setnotify] = React.useState(false)
    const [windowDimenion, detectHW] = React.useState({
        winWidth: 0,
        winHeight: 0,
    })

    const [Hamburger, SetHamburger] = React.useState(true)
    const classes = useStyles()
    const [Open, SetOpen] = React.useState(false)
    const [DropDownState, SetDropDownState] = React.useState(false);
    const [notificationdata, Setnotificationdata] = React.useState([]);
    const [totalnotify, Settotalnotify] = React.useState([]);

    //   React.useEffect(() => {

    //     const handleResize = () => {
    //       setWindowSize(window.innerWidth)
    //     }
    //     window.addEventListener('resize', handleResize)
    //     if (windowSize >= 900) {
    //       SetHamburger(true)
    //     }
    //     else {
    //       if (windowSize <= 900) {
    //         SetHamburger(false)
    //       }
    //     }
    //     return () => window.removeEventListener('resize', handleResize)

    //   }, [windowSize])

    const detectSize = () => {
        detectHW({
            winWidth: window?.innerWidth,
            winHeight: window?.innerHeight,
        })
        window?.innerWidth <= 991 ? SetHamburger((show) => false) : SetHamburger((show) => true);
    }
    //   const toggleOffCanvas = () => {
    //     if (windowDimenion?.winWidth <= 991) {

    //       setShow((show) => !show);
    //     }
    //   }
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            detectSize();
            window.addEventListener('resize', detectSize);

            return () => {
                window.removeEventListener('resize', detectSize);
            };
        }
    }, []);
    function openNav() {
        SetOpen((open) => !open)
    }
    function closeNav() {
        SetOpen(false)
    }
    async function Logout() {
        localStorage.removeItem('User_Token_access');
        cookies.remove('User_Token_access')
        await dispatch({ type: 'Login', login: false })
        await dispatch({ type: 'ApiProduct' })
        await dispatch({ type: 'Profile', Profile: [] })

    }


    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                if (Open) {
                    SetOpen((Open) => !Open)
                }
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [Open]);


    React.useEffect(() => {
        const handleClickOutsideprofile = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                if (DropDownState) {
                    SetDropDownState((DropDownState) => !DropDownState)
                }
            }
        };
        document.addEventListener('click', handleClickOutsideprofile, true);
        return () => {
            document.removeEventListener('click', handleClickOutsideprofile, true);
        };
    }, [DropDownState]);

    const handleClickDropdown = () => {
        SetDropDownState((DropDownState) => {
            return !DropDownState;
        })
    }
    const DefaultImage = () => (
        <img src="/image/user.webp" alt="Default Profile" width={100} height={100} />
    );

    return (
        <React.Fragment>
            <div className='container p-0'>
                <div ref={ref} className='sticky-top' id='Navbar_box' style={{ background: "white", padding: "10px 0" }}>
                    <Grid container spacing={0} rowSpacing={0.3} justifyContent="between"   >
                        {
                            Hamburger ?
                                <Grid container xs={2} md={2} xl={2}
                                    alignItems="center"
                                    justifyContent="start"
                                >
                                    <span >
                                        <Link href="/">
                                            <Image
                                                className={"navbarLogoImage"} // Apply CSS module class
                                                src="/weedx.iologo.png"
                                                alt="WeedX.io logo"
                                                title="WeedX.io logo"
                                                width={50}
                                                height={50}
                                            />
                                        </Link>
                                    </span>

                                </Grid>
                                :
                                <Grid container xs={3} md={2} xl={2} alignItems="center"
                                >
                                    <div className='center' style={{ marginLeft: "15px" }}>
                                        <button className="openbtn Border" onClick={() => { openNav() }}>☰</button>
                                    </div>
                                </Grid>
                        }
                        <Grid xs={6} md={6} xl={7} display={{ xs: "block", md: "block", lg: "block" }}>
                            {
                                Hamburger ?

                                    <SearchBar path={Location.pathname} />
                                    :
                                    <span className='mobileNavLogo' >
                                        <Link href="/"><Image className='navbar_logo_image' alt="WeedX.io logo" title="WeedX.io logo" src={'/weedx.iologo.png'} width={100} height={100} /></Link>
                                    </span>
                            }
                        </Grid>
                        <Grid xs={3} md={2} xl={1} display={{ xs: "block", md: "none", lg: "none" }} >
                            <div className=' col-12 Login_Sigup_button  Heder_icon ' style={{ justifyContent: "end", marginLeft: "-20px" }}>
                                <Link href="/WhisLists">

                                    <Badge badgeContent={state.login && Object.values(state.WishList).reduce((a, item) => a + item, 0) >= 1 ? Object.values(state.WishList).reduce((a, item) => a + item, 0) : 0} className={classes.sliderLink_badge}>
                                        <IconButton className={classes.navBarButton_icons} aria-label='whishlist'><AiFillHeart color="#858585" size={22} /></IconButton>
                                    </Badge>
                                </Link>
                                <div className="notification_icon" onClick={() => { setnotify(!notify) }}>
                                    <Badge badgeContent={
                                        state.login ? (totalnotify?.length === state?.Profile?.RemovedNotification?.length ? 0 : (totalnotify?.length - state?.Profile?.RemovedNotification?.length) > 0 ? totalnotify?.length - state?.Profile?.RemovedNotification?.length : 0) : notificationdata?.length
                                    } className={classes.sliderLink_badge}>

                                        <IconButton className={classes.navBarButton_icons} aria-label='notification'><IoIosNotifications color="#858585" size={22}></IoIosNotifications></IconButton>
                                    </Badge>
                                    <Notification
                                        notify={notify}
                                        setnotify={setnotify}
                                        notificationdata={notificationdata}
                                        Setnotificationdata={Setnotificationdata}
                                        Settotalnotify={Settotalnotify}
                                    ></Notification>

                                </div>
                                <Link href="/cart">
                                    <Badge badgeContent={state.AllProduct?.length > 0 ? state.AllProduct?.length : null} className={`state.LoadingApi ? "animated bounce" : " " ${classes.sliderLink_badge}`}>
                                        <IconButton className={classes.navBarButton_icons} aria-label='shopping-cart'><MdOutlineShoppingCart color="#858585" size={22}></MdOutlineShoppingCart></IconButton>
                                    </Badge>
                                </Link>
                            </div>
                        </Grid>
                        <Grid xs={5} md={4} xl={3} >
                            {
                                state.login
                                    ?


                                    <div className='navbarProfileDropDown_container' ref={profileRef}>
                                        <Grid display={{ xs: "none", md: "flex" }} justifyContent="flex-end">
                                            <div className='Navbar_profile_logo_container'>
                               
                                                <Image
                                           
                                                    src={state.Profile.googlelink === null ? `${state.Profile.image} ` : state.Profile.googlelink}
                                                    alt='Profile'
                                                    width={100}
                                                    height={100}
                                                    title='Profile'
                                                    className="Navbar_logo_imgs"
                                                    onClick={handleClickDropdown}
                                                />
                                          
                                            </div>
                                        </Grid>
                                        {DropDownState && (
                                            
                                            <div className='profileDropdown_container'>
                                                <section className='Navbar_proflie_image_name_section'>

                                                    <div className='profile_name_container'>
                                                        <p className='profile_names ellipsis'>{state.Profile.username}</p>

                                                    </div>

                                                </section>
                                                <hr />
                                                <section className=' navbarProfileDropDownSection'>
                                                    <ol className='navbar_profile_orderList px-0'>

                                                        <Link href={'/editprofile'} onClick={() => { SetDropDownState(false) }}> <li className='profile_list'>  <span><TbEdit /></span> {`EDIT PROFILE`}</li></Link>
                                                        <Link href={'/myorder'} onClick={() => { SetDropDownState(false) }}> <li className='profile_list' > <span><FiShoppingBag /></span> {`MY ORDER`}</li></Link>
                                                        <Link href={'/whislists'} onClick={() => { SetDropDownState(false) }}> <li className='profile_list'> <span><FaHeart /></span> {`FAVORITES`} </li></Link>
                                                        <Link href={'/myreviews'} onClick={() => { SetDropDownState(false) }}> <li className='profile_list' >  <span><MdReviews /></span>{`MY REVIEW`} </li></Link>
                                                        <Link href={'/helpcenter'} onClick={() => { SetDropDownState(false) }}> <li className='profile_list'>  <span><FaHandsHelping /></span> {`HELP`}</li></Link>

                                                        <li className='profile_list' onClick={() => { Logout() }}>  <span><TbLogout /></span> {`LOGOUT`}</li>



                                                    </ol>

                                                </section>

                                            </div>
                                        )}

                                    </div>

                                    :
                                   
                                    <div className=' col-12 Login_Sigup_button justify-content-end  Sapceing'>
                                         <div className='col-lg-4 col-sm-4'>
                                            <Grid display={{ xs: "none", md: "block", lg: "block", }} >
                                                <Link href="/login" >   <Button className={classes.muiBtn} >{`Log In`}</Button></Link>
                                            </Grid>
                                        </div>
                                        <div className='col-lg-4 col-sm-4'>
                                            <Grid display={{ xs: "none", md: "block", lg: "block" }}>
                                                <Link href="/signup" >    <Button sx={{ boxShadow: 3 }} className={classes.muiBtn_Signup} >{`Sign Up`}</Button></Link>
                                            </Grid>
                                        </div> 
                                   </div>
                            }
                        </Grid>
                        <Grid xs={12} md={12} xl={12} >
                            <SliderLink state={state}></SliderLink>
                            <SideNavbar closeNav={closeNav} Open={Open}></SideNavbar>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Navbar