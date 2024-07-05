import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Autoplay } from 'swiper/modules';
import { Homepagebanner } from '../../hooks/apicall/api';
import Skeleton from '@mui/material/Skeleton';
// import 'swiper.css';
import { Link } from "react-router-dom";
import Image from 'next/image';
import HomePageBannerSkeleton from '../skeleton/DashBoardSkeleton/HomePageBannerSkeleton.jsx';
const HomePageBanner = ({props}) => {
    
    const [HomePageBannerImage, SetHomePageBannerImage] = React.useState(props)
    const [Skeletoncom, SetSkeleton] = React.useState(false)
    // const classes = useStyles()
    // React.useEffect(() => {
    //     Homepagebanner().then((res) => {

    //         SetHomePageBannerImage(res.data)
    //         SetSkeleton(false)
    //     })
    // }, [])

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
                                delay: 2500,
                                disableOnInteraction: false,

                            }} modules={[Autoplay]}>
                                {props?.reverse()?.map((items, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <div className='col-12 homePageBanner_container'>
                                                <a href={items?.Link !== null ? items?.Link : "#"} target="_blank">
                                                    <Image
                                                        src={items?.Banner}
                                                        alt="Weedx.io Promotion banner"
                                                        title="Weedx.io Promotion banner"
                                                        width={100}
                                                        quality={75}
                                                        height={10}
                                                        loader={imageLoader}
                                                        className='HomePageBanner_image'
                                                        // onError={handleImageError}
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
                            }} modules={[Autoplay]}>
                                {props?.reverse()?.map((items, index) => {

                                    return (
                                        <SwiperSlide key={index}>
                                            <div className='col-12 homePageBanner_container'>
                                                <a href={items?.Link !== null ? items?.Link : "#"} target="_blank">

                                                    <Image
                                                        src={items?.Banner}
                                                        alt="Weedx.io Promotion banner"
                                                        title="Weedx.io Promotion banner"
                                                        width={100}
                                                        height={10}
                                                        quality={100}
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