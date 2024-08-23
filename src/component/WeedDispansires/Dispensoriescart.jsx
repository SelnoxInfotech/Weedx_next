import React from 'react'
import useStyles from "../../styles/style";
import Box from '@mui/material/Box';
// import { LazyLoadImage } from "react-lazy-load-image-component";
import LoadingButton from '@mui/lab/LoadingButton';
// import {isShopOpen} from '../../../../Hooks/Function'
import Link from 'next/link';
import { Rating } from '@mui/material';
import { modifystr , isShopOpen } from '../../hooks/utilis/commonfunction';
import Image from 'next/image';
const Dispensoriescart = ({ ele }) => {
  const classes = useStyles()
  return (
    <div className="despensories_card_container">
    
        <div className="row">
            <div className="col-4 disensories_card_image_div">
                <Link  href={`/weed-dispensaries/${modifystr(ele?.Store_Name)}/${ele.id}`}>
                    <Image unoptimized={true} width={100} height={100} id={ele?.id} src={`${ele.Store_Image}`} alt={ele.Store_Name} title={ele.Store_Name} className="dispensories_card_image" />
                </Link>

            </div>
            <div className="col-8 dispenosries_card_content_div">

                <div className="col-12 dispensories_content_Header_paragraphs text-truncate">
                <Link  href={`/weed-dispensaries/${modifystr(ele.Store_Name)}/${ele.id}`}>
                    <span className="text-truncate dispensoriesHeadingName">{ele.Store_Name}</span>
                </Link>
                </div>
                <div className="col-12 dispensories_content_paragraphs">
                    <span className="text-truncate dispensorieAddressNames">{ele.Store_Address}</span>
                </div>
                <div className="col-12 dispensories_buttonsContainer">
                    <button className="dispensories_open_res_btns" style={{color: isShopOpen([ele]) ? "#31B665" : "red"}}>{isShopOpen([ele]) ? 'Open' : "Closed"}</button>
                    {
                        ele.Delivery &&   <button className="dispensories_open_res_btns2">Order Online</button>
                    
                    }

                
                { ele.CurbSide_Pickup && <div className="col-12 dispensories_buttonsContainer mt-2">
                    <button className="dispensories_pickup_btn">Pickup delivery</button>
                </div>}

                {

                    ele.StoreFront  && <div className="col-12 dispensories_buttonsContainer mt-2">
                    <button className="dispensories_pickup_btn">Store Front</button>
                    </div>
                }
                    </div>
                    <div className='homecardRating'>
                    <Link  href={`/weed-dispensaries/${modifystr(ele.Store_Name)}/${"review"}/${ele.id}`}>
                        <div className="col-12 d-flex dispensories_content_paragraphs">
                            <span className='disOPenResRating'>{ele?.rating !== null ? ele?.rating.toFixed(1) : 0}</span>
                            <Rating className={`mx-2 ${classes.homePageStarIcons}`} color='green' name="read-only" value={ele.rating === null ? 0 : ele.rating} readOnly />
                        </div>
                    </Link>
                    </div>
                <div className="col-12">
                    <Box className={classes.loadingBtnTextAndBack}>
                    <Link  href={`/weed-dispensaries/${modifystr(ele.Store_Name)}/${ele.id}`}>
                        <LoadingButton style={{ width: "100%", height: "30px" }}>Order Pickup</LoadingButton>
                        </Link>
                    </Box>
                </div>

            </div>
        </div>
        
    </div>
  )
}

export default Dispensoriescart