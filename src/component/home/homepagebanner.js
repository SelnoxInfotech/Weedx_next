import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import HomePageBannerSkeleton from '../skeleton/DashBoardSkeleton/HomePageBannerSkeleton.jsx';
const HomePageBanner = ({props}) => {
    
    const [Skeletoncom, SetSkeleton] = React.useState(false)

    const handleImageError = (event) => {
        //  console.log(event.type === "error")
        if (event.type === "error") {
            // event.target.src = "/image/1.jpg"; // Fallback image URL
            // setImageError(true);
        }
    };

    const imageLoader = ({ src, width, quality }) => {
        return `${src}`
      }
    return (
        <React.Fragment>
            {
                !Skeletoncom ?

                    <div className="homeBannerContainer">
                        <div className="destop_image">
                            <Swiper loop={true} autoplay={{
                                delay: 25000,
                                disableOnInteraction: false,

                            }}   style={{zIndex:0}} modules={[Autoplay]}>
                                {props?.reverse()?.map((items, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <div className='col-12 homePageBanner_container'>
                                                <a href={items?.Link !== null ? items?.Link : "#"}>
                                                    <Image  src={items?.Banner}
                                                        alt="Weedx.io Promotion banner"
                                                        title="Weedx.io Promotion banner"
                                                        width={1500}
                                                        quality={75}
                                                        height={500}
                                                        loader={imageLoader}
                                                        unoptimized={true}
                                                        className='HomePageBanner_image'
                                                    />
                                                </a>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div>
                        <div className="mobile_imges">
                            <Swiper loop={true} autoplay={{
                                delay: 2000,

                                disableOnInteraction: true,
                            }}   style={{zIndex:0}} modules={[Autoplay]}>
                                {props?.reverse()?.map((items, index) => {

                                    return (
                                        <SwiperSlide key={index}>
                                            <div className='col-12 homePageBanner_container'>
                                                <a href={items?.Link !== null ? items?.Link : "#"} >

                                                    <Image
                                                        unoptimized={true}
                                                        src={items?.mobile}
                                                        alt="Weedx.io Promotion banner"
                                                        title="Weedx.io Promotion banner"
                                                        width={500}
                                                        height={10}
                                                        quality={300}
                                                        className='HomePageBanner_image'
                                        
                                                        loader={imageLoader}
                                                    />
                                                </a>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div>
                    </div>

                    :
                    <HomePageBannerSkeleton />
            }


        </React.Fragment>
    )

}
export default HomePageBanner