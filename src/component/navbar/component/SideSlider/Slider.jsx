"use client"
import React from "react"
import Button from '@mui/material/Button';
import useStyles from "../../../../styles/style"
import { useRouter } from 'next/router';
import Link from "next/link";
import Createcontext from "../../../../hooks/context"
import { FaHome, FaClinicMedical, FaIdeal, FaProductHunt } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { SiBrandfolder, SiFuturelearn } from "react-icons/si";
import { RxCross2 } from "react-icons/rx";
import { URL } from 'url';
import Image from "next/image";
const SideNavbar = ({ closeNav, Open }) => {
    const profileRef = React.useRef(null)
    const Navigate = useRouter()
    const { state } = React.useContext(Createcontext)
    const [SliderStateDropDown, SetSliderStateDropdown] = React.useState(null)
    const classes = useStyles()

    function Login() {
        Navigate.push("/login")
        closeNav()
    }
    function Signup() {
        Navigate.push("/signup")
        closeNav()
    }
    React.useEffect(() => {
        const handleClickOutsideprofile = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                if (SliderStateDropDown) {
                    SetSliderStateDropdown((SliderStateDropDown) => !SliderStateDropDown)
                }
            }
        };
        document.addEventListener('click', handleClickOutsideprofile, true);
        return () => {
            document.removeEventListener('click', handleClickOutsideprofile, true);
        };
    }, [SliderStateDropDown]);



    const sliderProfileHandler = () => {
        SetSliderStateDropdown((SliderStateDropDown) => {
            return !SliderStateDropDown;
        })
    }
    const Redirect = (items) => {

        Navigate.push("/profile")
        closeNav()
    }

    // const href = new URL(`/weed-dispensaries/in/${state?.Country?.toLowerCase()}/${state?.State?.toLowerCase()}/${state?.City?.toLowerCase()}`, '/weed-dispensaries/in/'); // replace with your base URL
    // const normalizedHref = href.pathname.replace(/\/\/+/g, '/');

    return (
        <React.Fragment>
            <div id="mySidebar" className="sidebar" style={{ width: Open ? "300px" : "0px" }}>
                <div className=' col-12  mb-4 '>
                    {
                        !state.login ?
                            <div className=" px-3 d-flex w-100 ml-0 py-3 align-items-center manuheader justify-content-between">
                                <div className='w-50'>
                                    <span >
                                        <Link href="/">
                                            {/* <LazyLoadImage className='navbar_logo_image'  src='/image/WeedWhiteLogo.webp' alt='WeedX.io logo' title="Weedx.io logo" /> */}
                                            <Image
                                                unoptimized={true}
                                                className={'navbarLogoImage'} // Apply CSS module class
                                                src="/image/WeedWhiteLogo.webp"
                                                alt="WeedX.io logo"
                                                title="WeedX.io logo"
                                                width={50}
                                                height={50}
                                            />

                                        </Link>
                                    </span>
                                </div>
                                <div className='w-50 text-end'>

                                    <span className="manuclosebtn d-flex justify-content-end " onClick={closeNav}> <RxCross2 color="#fff" size={25} /></span>
                                </div>
                            </div>
                            :
                            <div className="row w-100 d-flex align-items-center manuheader justify-content-between mx-0">
                                <div className="col-9" ref={profileRef}>

                                    <section className="image_name_section">
                                        <div className="SliderImageProfile_container">

                                            <Image
                                                // onError={event => {
                                                //     event.target.src = "/image/user.webp"
                                                //     event.onerror = null
                                                // }} 
                                                unoptimized={true}
                                                width={100}
                                                height={100}
                                                alt='Profile' title='Profile' onClick={Redirect} src={state?.Profile?.image} className="Slider_inner_profile_imgs" />

                                        </div>
                                        <div className="slider_image_profile_names_conatiner">
                                            <h2 className="slider_image_name_heading ellipsis" onClick={Redirect}>{state.Profile.username}</h2>
                                        </div>
                                    </section>

                                </div>
                                <div className='col-3 text-end'>
                                    <span className="manuclosebtn d-flex justify-content-end " onClick={closeNav}> <RxCross2 color="#fff" size={25} />
                                    </span>
                                </div>
                            </div>
                    }
                </div>
                <div className="col-12 Slider_content_center " >
                    <Link href="/" className="LinkColor"><p onClick={closeNav} className="m-0 d-flex" ><span> <FaHome color="#31B655" fontSize={25} /></span >Home</p></Link>
                </div>

                <hr></hr>
                <div className="col-12 Slider_content_center " >
                    <Link
                        className="LinkColor"
                        href={`/weed-dispensaries/in/${state?.Country?.toLowerCase() || 'default-country'}/${state?.State?.toLowerCase() || 'default-state'}/${state?.City?.toLowerCase() || 'default-city'}`}
                    ><p onClick={closeNav} className="m-0 d-flex"><span ><FaClinicMedical color="#31B655" fontSize={25} /></span>Dispensaries</p></Link>
               
                </div>

                <hr></hr>

                <div className="col-12 Slider_content_center ">
                    <Link className="LinkColor" href={`/weed-deliveries/in/${state?.Country?.toLowerCase()}/${state?.State?.toLowerCase()}/${state?.City?.toLowerCase()}`}><p onClick={closeNav} className="m-0 d-flex"><span><TbTruckDelivery color="#31B655" fontSize={25} /></span>Deliveries</p></Link>
                </div>
                <hr></hr>
                {/* <div className="col-12 Slider_content_center " >
                    <Link className="LinkColor" href="/brands"><p onClick={closeNav} className="m-0 d-flex"><span><SiBrandfolder color="#31B655" fontSize={25}/></span> Brand</p></Link>
                </div>
                <hr></hr> */}
                <div className="col-12 Slider_content_center " >
                    <Link className="LinkColor" href="/products"> <p onClick={closeNav} className="m-0 d-flex"><span><FaProductHunt color="#31B655" fontSize={25} /></span>Products</p></Link>
                </div>
                <hr></hr>
                <div className="col-12 Slider_content_center " >
                    <Link className="LinkColor" href="/deals"> <p onClick={closeNav} className="m-0 d-flex"><span><FaIdeal color="#31B655" fontSize={25} /></span>Deals</p></Link>
                </div>
                <hr></hr>
                <div className="col-12 Slider_content_center " >
                    <Link className="LinkColor" href="/learn/laws-and-regulation"><p onClick={closeNav} className="m-0 d-flex"><span><SiFuturelearn color="#31B655" fontSize={25} /></span>Law</p></Link>
                </div>
                <hr></hr>

                <div className=' col-12 Login_Sigup_button mt-4 mb-3 '>
                    {
                        !state.login &&
                        <>
                            <div className='col-4'>

                                <Button onClick={Login} className={classes.muiBtn} >Login</Button>

                            </div>
                            <div className='col-4'>

                                <Button onClick={Signup} className={classes.muiBtn} >Signup</Button>

                            </div>
                        </>
                    }
                </div>


            </div>
        </React.Fragment>
    )
}
export default SideNavbar