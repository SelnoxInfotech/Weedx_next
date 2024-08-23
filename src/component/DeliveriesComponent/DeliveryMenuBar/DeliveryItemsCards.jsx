import React from 'react';

import { AiFillStar } from "react-icons/ai"
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import useStyles from '../../../styles/style';
import { MdShoppingCart } from "react-icons/md"
import { GiFlowerPot } from "react-icons/gi"
import Link from 'next/link';
import { Rating } from '@mui/material';
import Image from 'next/image';
import { modifystr } from '@/hooks/utilis/commonfunction';
const DeliveryItemsCard = ({ Deliverie }) => {
    const classes = useStyles()
    return (
        <React.Fragment>
            <div className="container-fluid">
                    {Deliverie?.map((items, index) => {
                    
                        return (
                            <div className="delivery_items_cards_container mt-4" key={index}>
                                <div className='d-flex w-100 justify-content-between'>
                                        <div className='delivery_items_card_img_container'>
                                            <Link href={`/weed-deliveries/${modifystr(items.Store_Name)}/${items.id}`}>
                                                <Image 
                                                unoptimized={true}
                                                   width={100}
                                                   height={100}
                                                className='w-100 h-auto' 
                                                src={`${items.Store_Image}`}
                                                 alt={items.Store_Name} 
                                                 title={items.Store_Name} 
                                                 />
                                            </Link>
                                        </div>
                                        <div className='delivery_items_card_info_container'>
                                            <div className='col-12  deliver_items_content_same_height'>
                                                <h2 className='ellipsis DeliveryItem_heading'>{items.Store_Name}</h2>
                                            </div>
                                            <div>
                                                <div className='homecardRating'>
                                                    <Link href={`/weed-deliveries/${modifystr(items.Store_Name)}/${"review"}/${items.id}`}>
                                                        <div className="d-flex dispensories_content_paragraphs">
                                                            <span className='disOPenResRating'>{items.rating === null ? 0 : items.rating.toFixed(0) +".0"}</span>

                                                            <Rating className={`mx-2 ${classes.homePageStarIcons}`} color='green' name="read-only"   value={items.rating === null ? 0 : parseFloat(items.rating.toFixed(1))}readOnly />
                                                            {/* < span style={{color:"black"}}>{items.rating === null ? 0 : items.rating.toFixed(0) +".0"}</span> */}
                                                        </div>
                                                    </Link>
                                                </div>
                                                </div>
                                            <div className='col-12  deliver_items_content_same_height'>
                                                <p className='ellipsis delivery_item_paragraph'>{items.Store_Address}</p>
                                            </div>
                                            <div className='col-12  deliver_items_content_same_height '>
                                                <p className='ellipsis delivery_item_paragraph'>{items.address2}</p>
                                            </div>
                                            <div className='categoryinfowrapper'>
                                                {
                                                    items?.Category?.map((data, index) => {
                                                        return ( <div className='categoryinfo'  key={index+1}>
                                                            <p className='delivery_item_paragraph m-0'>{Object.keys(data)} ({Object.values(data)})</p>
                                                            </div>
                                                        )
                                                    })

                                                }
                                            </div>
                                          
                                        </div>
                                </div>
                                <div className='col-md-12 delivery_items_button_div'>
                                <div className='delivery_item_paragraphBtn  delivery_items_card_flex center'>
                                               { items.DeliveryTime !== null?
                                                <div className='deliverItemCard_icons'>
                                                    <MdShoppingCart color='#707070' size={16} /> <span>{items.DeliveryTime.Startmin} min to {items.DeliveryTime.Endmin} min |</span>{items.DeliveryPrice !== 0 ?<span> ${items.DeliveryPrice} Delivery changes </span>:<span>Free delivery</span>} 
                                                </div>
                                                :
                                                <div className='deliverItemCard_icons'>
                                                    <MdShoppingCart color='#707070' size={16} /> <span>30 to 90 min |</span> <span>Free delivery</span> |<span>$50 min</span>
                                                </div>
                                                }
                                            </div>
                                    <div className='row'>
                                        
                                        <div className='delivery_btn_div'>
                                            <Box className={`${classes.loadingBtnTextAndBack}`} >
                                                <Link href={`/weed-deliveries/${modifystr(items.Store_Name)}/${items.id}`}><LoadingButton variant="outlined">View Menu</LoadingButton></Link>
                                            </Box>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </React.Fragment>
    )
}
export default DeliveryItemsCard