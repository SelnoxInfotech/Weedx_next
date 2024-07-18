import { Button, Grid } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { FiShoppingBag } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { TbEdit } from "react-icons/tb";
import { FaHandsHelping } from "react-icons/fa";
import useStyles from "@/styles/style";
import Image from 'next/image';
const Afterlogin = ({ dropDownState, state, profileRef, handleClickDropdown , Logout }) => {
    const classes = useStyles();
    return (
        <div>
         { state.login ?  <div className='navbarProfileDropDown_container' ref={profileRef}>
                <Grid display={{ xs: "none", md: "flex" }} justifyContent="flex-end">
                    <div className='Navbar_profile_logo_container'>
                        <Image
                        unoptimized={true}
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
                {dropDownState &&
                    <div className='profileDropdown_container'>
                        <section className='Navbar_proflie_image_name_section'>
                            <div className='profile_name_container'>
                                <p className='profile_names ellipsis'>{state.Profile.username}</p>
                            </div>
                        </section>
                        <hr />
                        <section className='navbarProfileDropDownSection'>
                            <ol className='navbar_profile_orderList px-0'>
                                <Link href={'/editprofile'} onClick={() => setDropDownState(false)}> <li className='profile_list'> <span><TbEdit /></span> {`EDIT PROFILE`}</li></Link>
                                <Link href={'/myorder'} onClick={() => setDropDownState(false)}> <li className='profile_list'> <span><FiShoppingBag /></span> {`MY ORDER`}</li></Link>
                                <Link href={'/whislists'} onClick={() => setDropDownState(false)}> <li className='profile_list'> <span><FaHeart /></span> {`FAVORITES`} </li></Link>
                                <Link href={'/myreviews'} onClick={() => setDropDownState(false)}> <li className='profile_list'> <span><MdReviews /></span>{`MY REVIEW`} </li></Link>
                                <Link href={'/helpcenter'} onClick={() => setDropDownState(false)}> <li className='profile_list'> <span><FaHandsHelping /></span> {`HELP`}</li></Link>
                                <li className='profile_list' onClick={Logout}> <span><TbLogout /></span> {`LOGOUT`}</li>
                            </ol>
                        </section>
                    </div>
                }
            </div>

            :
            <div className='col-12 Login_Sigup_button justify-content-end Sapceing'>
                <div className='col-lg-4 col-sm-4'>
                    <Grid display={{ xs: "none", md: "block", lg: "block", }}>
                        <Link href="/login"><Button className={classes.muiBtn}>{`Log In`}</Button></Link>
                    </Grid>
                </div>
                <div className='col-lg-4 col-sm-4'>
                    <Grid display={{ xs: "none", md: "block", lg: "block" }}>
                        <Link href="/signup"><Button sx={{ boxShadow: 3 }} className={classes.muiBtn_Signup}>{`Sign Up`}</Button></Link>
                    </Grid>
                </div>
            </div>}
        </div>
    );
};

export default Afterlogin;