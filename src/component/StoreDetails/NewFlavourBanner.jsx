// import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AiFillStar } from "react-icons/ai"
import { IoLocationSharp } from "react-icons/io5"
import { TbCircleFilled } from "react-icons/tb"
import { BsStar, BsStarFill } from "react-icons/bs";
import { BsShareFill } from "react-icons/bs";
import useStyles from '../../styles/style';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import { RWebShare } from "react-web-share";
import React, { useMemo, useState } from 'react';
import { isShopOpen, modifystr } from '../../hooks/utilis/commonfunction'
// import { Link, useParams, useLocation } from 'react-router-dom';
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
const NewFlavourBanner = ({ delBtn }) => {
    const location = useRouter()
    const classes = useStyles()
    const [shopopen, setshopopen] = useState()
    React.useEffect(() => {
        const myTimeout = setTimeout(() => {
            setshopopen(isShopOpen(delBtn))
        }, 0);
    }, [new Date().getMinutes(), delBtn])
    return (
        <React.Fragment>
            <div className={location.pathname.includes('/menu-integration') ? 'row integratdclass  newFlavour_row' : "row  newFlavour_row"} >
                <div className="col-12 newFlavour_container  position-relative">
                    {
                        delBtn?.map((data ,index)  => {
                            return (
                                <React.Fragment key={index}>
                                    <div  className="d-md-block d-none">
                                        <div className="row" >
                                            <div className="col-md-2 col-sm-4  col-3 newFlavour_image_container_height">
                                                <div className='newFlavourimage_div'>
                                                    <Image
                                                        unoptimized={true}
                                                        width={100}
                                                        height={100}
                                                        quality={100}
                                                        className='newFlavour_image'
                                                        src={`${data?.Store_Image}`}
                                                        alt={data.Store_Name}
                                                        title={data.Store_Name}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-9 col-sm-8  col-9  newFlavourContent_height" style={{ position: "0px" }}>
                                                <div className='w-100'>
                                                        <h1 className='New_flavour_font_size_head'>{data.Store_Name}</h1>
                                                        <h4  className='newFlavourBannerSubHead'><span> <IoLocationSharp /></span> {data.Store_Address}</h4>
                                                        
                                                    <div className='col-12  d-flex gap-lg-4 gap-md-3 justify-content-sm-start justify-content-between align-items-center'>

                                                        <div className='newFlav_inner_div d-flex New_flavour_font_size_paragraph'>
                                                            <p className='newFlavBanerRatingFontStyle'>{data?.rating?.toFixed(1)}</p>
                                                            <BsStarFill size={16} color="#31B665" className="product_search_rating_star" />

                                                        </div>

                                                        <div className='newFlav_inner_div d-flex New_flavour_font_size_paragraph newFlav_margin'>
                                                            <p className='m-0'><TbCircleFilled id="new_flavCircle" /></p>
                                                            <Link
                                                                href={location.pathname.includes("weed-dispensaries")
                                                                    ? `${modifystr(data.Store_Name)}/store-details/${delBtn[0].id}`
                                                                    :
                                                                    location.pathname.includes("/weed-deliveries") &&

                                                                    `/weed-deliveries/${modifystr(data.Store_Name)}/store-details/${delBtn[0].id}`}>

                                                                <p className='marginLeftnewFlavStore '>Store details</p></Link>
                                                        </div>

                                                        <div className='newFlav_inner_div d-flex New_flavour_font_size_paragraph newFlav_margin'>
                                                            <p className='m-0'><TbCircleFilled id="new_flavCircle" color={shopopen ? "#31B665" : "red"} /></p>
                                                            <p className={shopopen ? "newFlav_open" : "newFlav_closed"}>{shopopen ? "Open" : "Closed"}</p>
                                                        </div>


                                                    </div>
                                                    {!location.pathname.includes('/menu-integration') && <div className='col-lg-12  col-md-8 col-sm-8 col-12 mt-sm-4 mt-2 d-flex newFlav_btn_height'>
                                                        {
                                                            data.StoreEmail !== "" && data.StoreEmail !== null &&

                                                            <Box
                                                                className={`${classes.loadingBtnTextAndBack}`}
                                                            >

                                                                <LoadingButton style={{ height: "30px", maxWidth: '250px', width: '100%' }} variant="outlined">Email</LoadingButton>
                                                            </Box>
                                                        }

                                                        {
                                                            data.Stores_MobileNo !== '' && data.Stores_MobileNo !== null && <Box
                                                                className={`mx-2 ${classes.loadingBtnTextAndBack}`}    >
                                                                <Link href={`tel:${delBtn[0].Stores_MobileNo}`}>
                                                                    <LoadingButton style={{ height: "30px", maxWidth: '250px', width: '100%' }} variant="outlined">Call</LoadingButton>
                                                                </Link>
                                                            </Box>

                                                        }
                                                    </div>}
                                                </div>
                                            </div>
                                            {
                                                !location.pathname.includes('/menu-integration') && <div className='shareiconcontainer position-absolute w-auto top-0 p-2 end-0'>

                                                    {/* <RWebShare
                                                        // data={{ url: window.location.href }}
                                                        sites={["facebook", "twitter", "whatsapp", "telegram", "linkedin", 'mail', 'copy']}
                                                        onClick={() => console.info("share successful!")}
                                                        color="#31B665" >
                                                        <BsShareFill />
                                                        </RWebShare>
                                                    */}

                                                </div>
                                            }
                                        </div>
                                    </div>

                                    <div  className="d-md-none d-block">
                                        <div className="StoreHeaderCard">
                                            <div className=" newFlavour_image_container_height">
                                                <div className='newFlavourimage_div'>
                                                    <Image
                                                        unoptimized={true}
                                                        width={100}
                                                        height={100}
                                                        quality={100}
                                                        className='newFlavour_image'
                                                        src={`${data?.Store_Image}`}
                                                        alt={data.Store_Name}
                                                        title={data.Store_Name}
                                                    />
                                                </div>
                                                <div>
                                                    <h1 className='New_flavour_font_size_head'>{data.Store_Name}</h1>
                                                    <h4  className='newFlavourBannerSubHead'> <span> <IoLocationSharp /></span>{data.Store_Address}</h4>
                                                </div>
                                            </div>
                                            <div className=" newFlavourContent_height flex-wrap" style={{ position: "0px" }}>
                                                
                                                  
                                                    <div className='d-flex gap-3 '>

                                                        <div className='newFlav_inner_div d-flex '>
                                                            <p className='newFlavBanerRatingFontStyle'>{data?.rating?.toFixed(1)}</p>
                                                            <BsStarFill size={16} color="#31B665" className="product_search_rating_star" />

                                                        </div>

                                                        <div className='newFlav_inner_div d-flex  newFlav_margin'>
                                                            <p className='m-0'><TbCircleFilled id="new_flavCircle" /></p>
                                                            <Link
                                                                href={location.pathname.includes("weed-dispensaries")
                                                                    ? `${modifystr(data.Store_Name)}/store-details/${delBtn[0].id}`
                                                                    :
                                                                    location.pathname.includes("/weed-deliveries") &&

                                                                    `/weed-deliveries/${modifystr(data.Store_Name)}/store-details/${delBtn[0].id}`}>

                                                                <p className='marginLeftnewFlavStore '>Store details</p></Link>
                                                        </div>

                                                        <div className='newFlav_inner_div d-flex  newFlav_margin'>
                                                            <p className='m-0'><TbCircleFilled id="new_flavCircle" color={shopopen ? "#31B665" : "red"} /></p>
                                                            <p  className={shopopen ? "newFlav_open" : "newFlav_closed"}>{shopopen ? "Open" : "Closed"}</p>
                                                        </div>
                                                    </div>
                                                    {!location.pathname.includes('/menu-integration') && <div className='newFlav_btn_height'>
                                                        {
                                                            data.StoreEmail !== "" && data.StoreEmail !== null &&

                                                            <Box
                                                                className={`${classes.loadingBtnTextAndBack}`}
                                                            >

                                                                <LoadingButton style={{ height: "30px", maxWidth: '250px', width: '100%' }} variant="outlined">Email</LoadingButton>
                                                            </Box>
                                                        }

                                                        {
                                                            data.Stores_MobileNo !== '' && data.Stores_MobileNo !== null && <Box
                                                                className={`mx-2 ${classes.loadingBtnTextAndBack}`}    >
                                                                <Link href={`tel:${delBtn[0].Stores_MobileNo}`}>
                                                                    <LoadingButton style={{ height: "30px", maxWidth: '250px', width: '100%' }} variant="outlined">Call</LoadingButton>
                                                                </Link>
                                                            </Box>

                                                        }
                                                    </div>}
                                               
                                            </div>
                                            {
                                                !location.pathname.includes('/menu-integration') && <div className='shareiconcontainer position-absolute w-auto top-0 p-2 end-0'>

                                                    {/* <RWebShare
                                                        // data={{ url: window.location.href }}
                                                        sites={["facebook", "twitter", "whatsapp", "telegram", "linkedin", 'mail', 'copy']}
                                                        onClick={() => console.info("share successful!")}
                                                        color="#31B665" >
                                                        <BsShareFill />
                                                        </RWebShare>
                                                    */}

                                                </div>
                                            }
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                </div>

            </div>
        </React.Fragment >
    )
}
export default NewFlavourBanner