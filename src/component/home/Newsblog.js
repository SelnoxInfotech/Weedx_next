
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import _, { reverse } from "lodash";
import { FaArrowRight } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ScrollContainer from 'react-indiana-drag-scroll';
// import { LazyLoadImage } from "react-lazy-load-image-component";
import { modifystr } from "../../hooks/utilis/commonfunction";
import DeliverServiceSkeleton from '@/component/skeleton/DeliveryServicesSkeleton'
import Image from "next/image";
const Newsblog = (props) => {
     const News =  props.data
    return (
        <React.Fragment>
            <div className="px-sm-0 px-3">
                   <div className="d-flex align-items-center justify-content-between">
                      <h3 className="section_main_title">{`Trendings`}</h3>
                      <Link href={'/cannabis-news'}>
                        <span className="viewallbtn">{`View All`} <FaArrowRight/></span>
                      </Link>
                    </div>
                    <div className="blogs_card_slider">
                        <ScrollContainer className="ScrollContainerRelative">
                                {News?.map((ele, index) => {
                                    return (
                                        <Link href={`/${ ele.CategoryName ==='BLOGS'? "blogs":'cannabis-news'}/${modifystr(ele.Title)}/${ele.id}`} key={index}> 
                                            <div className="new_blog_card">
                                                <div className="new_blog_card_img">
                                                    <Image 
                                                     width={100}
                                                     height={100}
                                                    src={`${ele.Image}`} 
                                                    alt={ele.Title} 
                                                    title={ele.Title} 
                                                    unoptimized={true}
                                                    style={{ pointerEvents: "none" }} />
                                                </div>
                                                <div className="new_blog_card_text">  
                                                    <span className=" latest_font_size text-capitalize">
                                                        {ele.Title}
                                                    </span>
                                                  
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                          
                        </ScrollContainer>
                 
                    </div>
               
            </div >
        </React.Fragment>
    )
}
export default Newsblog