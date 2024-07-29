import { useEffect, useState } from 'react';
import React from 'react';
import Grid from '@mui/system/Unstable_Grid';
import Link from 'next/link';
import dynamic from 'next/dynamic'
const SideNavbar = dynamic(() => import('../navbar/component/SideSlider/Slider') ,{ssr:false});
const Afterlogin = dynamic(() => import('../navbar/component/afterlogin') ,{ssr:false});
// import SideNavbar from "../navbar/component/SideSlider/Slider";
import Button from '@mui/material/Button';
import useStyles from "../../styles/style";
import { FiShoppingBag } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { TbEdit } from "react-icons/tb";
import { FaHandsHelping } from "react-icons/fa";
import SearchBar from "../navbar/component/searchbar";
import { AiFillHeart } from "react-icons/ai";
import Image from 'next/image';
import Notification from './component/Notification';
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import SliderLink from "../navbar/component/SideSlider/SilderLink";
import Createcontext from "../../hooks/context";
import Cookies from 'universal-cookie';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import image1 from "../../../public/weedx.iologo.png"
const Navbar = () => {
    const cookies = new Cookies();
    const ref = React.useRef(null);
    const profileRef = React.useRef(null);
    const Location = useRouter();
    const { state, dispatch } = React.useContext(Createcontext);
    const [notify, setNotify] = React.useState(false);
    const [windowDimension, setWindowDimension] = React.useState({
        winWidth: 0,
        winHeight: 0,
    });
    const [Hamburger, setHamburger] = React.useState(true);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [dropDownState, setDropDownState] = React.useState(false);
    const [notificationData, setNotificationData] = React.useState([]);
    const [totalNotify, setTotalNotify] = React.useState([]);
    const detectSize = () => {
        setWindowDimension({
            winWidth: window?.innerWidth,
            winHeight: window?.innerHeight,
        });
        setHamburger(window?.innerWidth <= 991 ? false : true);
    };
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            detectSize();
            window.addEventListener('resize', detectSize);
            return () => {
                window.removeEventListener('resize', detectSize);
            };
        }
    }, []);
    const openNav = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const closeNav = () => {
        setOpen(false);
    };
    async function Logout() {
        localStorage.removeItem('User_Token_access');
        cookies.remove('User_Token_access');
        await dispatch({ type: 'Login', login: false });
        await dispatch({ type: 'ApiProduct' });
        await dispatch({ type: 'Profile', Profile: [] });
    }
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                if (open) {
                    setOpen(false);
                }
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [open]);
    React.useEffect(() => {
        const handleClickOutsideProfile = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                if (dropDownState) {
                    setDropDownState(false);
                }
            }
        };
        document.addEventListener('click', handleClickOutsideProfile, true);
        return () => {
            document.removeEventListener('click', handleClickOutsideProfile, true);
        };
    }, [dropDownState]);
    const handleClickDropdown = () => {
        setDropDownState((prevState) => !prevState);
    };
    return (
        <React.Fragment>
            <div className='container p-0'>
                <div ref={ref} className='sticky-top' id='Navbar_box' style={{ background: "white", padding: "10px 0" }}>
                    <Grid container spacing={0} rowSpacing={0.3} justifyContent="between">
                        {
                            Hamburger ?
                                <Grid container xs={2} md={2} xl={2} alignItems="center" justifyContent="start">
                                    <span>
                                        <Link href="/">
                                            <Image
                                            unoptimized={true}
                                                className={"navbarLogoImage"} // Apply CSS module class
                                                src={image1.src}
                                                alt="WeedX.io logo"
                                                title="WeedX.io logo"
                                                width={50}
                                                height={50}
                                            />
                                        </Link>
                                    </span>
                                </Grid>
                                :
                                <Grid container xs={3} md={2} xl={2} alignItems="center">
                                    <div className='center' style={{ marginLeft: "15px" }}>
                                        <button className="openbtn Border" onClick={openNav}>☰</button>
                                    </div>
                                </Grid>
                        }
                        <Grid xs={6} md={6} xl={7} display={{ xs: "block", md: "block", lg: "block" }}>
                            {
                                Hamburger ?
                                    <SearchBar path={Location.pathname} />
                                    :
                                    <span className='mobileNavLogo'>
                                        <Link href="/"><Image  unoptimized={true} className='navbar_logo_image' alt="WeedX.io logo" title="WeedX.io logo" src={image1.src} width={100} height={100} /></Link>
                                    </span>
                            }
                        </Grid>
                        <Grid xs={3} md={2} xl={1} display={{ xs: "block", md: "none", lg: "none" }}>
                            <div className='col-12 Login_Sigup_button Heder_icon' style={{ justifyContent: "end", marginLeft: "-20px" }}>
                                <Link href="/WhisLists">
                                    <Badge badgeContent={state.login && Object.values(state.WishList).reduce((a, item) => a + item, 0) >= 1 ? Object.values(state.WishList).reduce((a, item) => a + item, 0) : 0} className={classes.sliderLink_badge}>
                                        <IconButton className={classes.navBarButton_icons} aria-label='whishlist'><AiFillHeart color="#858585" size={22} /></IconButton>
                                    </Badge>
                                </Link>
                                <div className="notification_icon" >
                                    <Badge  onClick={() => setNotify(!notify)} badgeContent={
                                       Boolean( state.login) ? (totalNotify?.length === state?.Profile?.RemovedNotification?.length ? 0 : (totalNotify?.length - state?.Profile?.RemovedNotification?.length) > 0 ? totalNotify?.length - state?.Profile?.RemovedNotification?.length : 0) : notificationData?.length
                                    } className={classes.sliderLink_badge}>
                                        <IconButton  className={classes.navBarButton_icons} aria-label='notification'><IoIosNotifications  color="#858585" size={22}></IoIosNotifications></IconButton>
                                    </Badge>
                                    <Notification
                                        notify={notify}
                                        setnotify={setNotify}
                                        notificationdata={notificationData}
                                        Setnotificationdata={setNotificationData}
                                        Settotalnotify={setTotalNotify}
                                    ></Notification>
                                </div>
                                <Link href="/cart">
                                    <Badge badgeContent={state.AllProduct?.length > 0 ? state.AllProduct?.length : null} className={`state.LoadingApi ? "animated bounce" : " " ${classes.sliderLink_badge}`}>
                                        <IconButton className={classes.navBarButton_icons} aria-label='shopping-cart'><MdOutlineShoppingCart color="#858585" size={22}></MdOutlineShoppingCart></IconButton>
                                    </Badge>
                                </Link>
                            </div>
                        </Grid>
                        <Grid xs={5} md={4} xl={3}>
                   
                            <Afterlogin dropDownState={dropDownState} state={state} profileRef ={profileRef} handleClickDropdown= {handleClickDropdown} Logout={Logout}></Afterlogin >
                        </Grid>
                        <Grid xs={12} md={12} xl={12}>
                            <SliderLink  state={state}></SliderLink>
                            <SideNavbar closeNav={closeNav} Open={open}></SideNavbar>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Navbar;
