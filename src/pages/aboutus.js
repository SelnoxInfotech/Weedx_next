'use Client'
import Newsletter from "@/component/home/HomePageDealsSignup/"
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import Image from "next/image";
import { AiOutlineSetting } from "react-icons/ai"
import { BsGraphUpArrow } from "react-icons/bs"
import { MdSettingsSuggest } from "react-icons/md"
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
// import './Aboutus.css'
import {AboutusSeo}  from "@/component/ScoPage/CommenpageSeo"
const AboutUs = () => {
    React.useEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        })
    }, [])
    const ClientPreachSlider = styled(Slider)`

    .slick-arrow{
        display: none;
        visibility:hidden;
    }
    .slick-next {
        position: relative;
        right: 0px;
        display: none;
        background-color:white;
        height:0px;
      } 
      .slick-prev {
        position: relative;
        left: 0px;
        display: none;
      }
     
 
      .slick-dots{
            bottom: -12px
      }
    `;
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    dots: false,
                    slidesToShow: 1,
                    slidesToScroll: 2,
                    // initialSlide: 2,
                    infinite: true,

                }
            },
            {
                breakpoint: 480,
                settings: {

                    dots: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,

                }
            }
        ]
    };
    const AboutUsJourney = [
        {
            head: "Explore the best dispensary and get the best weed!",
            paragraph: <div>
                <p>{`After engaging in conversations with numerous businesses spanning from California to Canada,
                    a prevalent challenge that consistently arises is centered around marketing and advertising endeavors. This challenge is particularly notable within the realms of Social Media, Google, and Print, where the constraints imposed by regulations tend to limit creative freedom. In recognition of these constraints,
                    which often feel restrictive, we aspire to introduce alternative platforms that can effectively augment your business's visibility.`}
                </p>
                <p>{`Enter Weedx, a pioneering force and a beacon of trust in the realm of cannabis exploration and acquisition.
                    Our platform stands as a beacon of reliability, connecting users with an array of cannabis products while facilitating seamless orders from verified,
                    licensed retailers. Boasting an extensive web traffic of over a million visitors,
                    our website serves as an invaluable hub for not only exploring the aspects of cannabis but also for placing online orders through local establishments.`}
                </p>
            </div>
        },
        {
            head: "Facilitating Exploration in the World of Cannabis",
            paragraph: <p>{`Within the expansive Weedx database, a multitude of strains awaits exploration, numbering more than you can imagine.
                Alongside this, we present a treasury of 5000+ cannabis articles and resources, each a testament to Weedx's commitment to independent narratives. These stories and articles serve as a nexus for millions of cannabis enthusiasts, connecting them with a global community of like-minded individuals. At Weedx, we've curated the ultimate destination to unlock the true potential of the cannabis plant. If you're embarking on a cannabis journey, look no further than Weedx – Marijuana Dispensaries & Delivery Near Me, your ideal starting point.
                Discover the finest dispensaries in your vicinity and initiate your cannabis adventure with us.`}
            </p>
        },
        {
            head: "Empowering a Space for Cannabis Enthusiasts",
            paragraph: <div>
                <p>{`Within the realms of Weedx, a treasure trove of the most sought-after strains awaits discovery,
                    complemented by a collection of comprehensive cannabis articles and resources. Our commitment to independent journalism establishes a grand arena that resonates with cannabis enthusiasts worldwide,
                    offering them an indispensable source of information and tools to unveil the profound potential of the cannabis plant.`}
                </p>
                <p>{`At the heart of our endeavor lies our distinctive consumer-oriented platform, which seamlessly operates through both web and native Android and iOS applications.
                    This platform equips consumers with an array of insights encompassing cannabis products. This includes a gateway to online orders, a comprehensive repository of local retailers and brands, a pathway to uncovering new products,
                    and an avenue for consumer education surrounding cannabis - its historical backdrop, its multifaceted applications, and its evolving legal landscape.`}</p>
            </div>

        },
        {
            head: "Cannabis Industry with Weedx for Business",
            paragraph: <p>{`Weedx for Business emerges as the driving force behind the cannabis realm,
                seamlessly merging SaaS solutions with a dynamic marketplace and an expansive network of trusted retailers. Our comprehensive Weedx Business product suite converges omnichannel advertising, strategic marketing, streamlined operations, and a personalized branded e-commerce destination into a singular, easily navigable platform. Empowering enterprises to expand while navigating the intricate and diverse landscape of cannabis regulations is at the core of our mission. By listing your business on Weedx, you open doors to increased visibility among cannabis enthusiasts. Leveraging on-platform marketing and exclusive deals further amplifies your business's reach and exposure, ensuring your sought-after products and services don't go unnoticed by the eager eyes of your customer base.
                Your customers is actively seeking your presence, and Weedx stands as the gateway to making that connection seamless and rewarding.`}</p>
        }
    ]
    const AboutUsBannerArray = [{ content: "“  WeedX has not only been a pleasure to work with but has been very beneficial to our organization. Throughout the last year, we have seen significant improvement in our organic rankings. With MMX’s thorough reporting, we are able to analyze all of our  marketing   platforms and their ROI to optimize our marketing budget. I would recommend them to anyone seeking exceptional marketing services.  “" },
    { content: "“  WeedX has not only been a pleasure to work with, but has been very beneficial to our organization. Throughout the last year we have seen significant improvement in our organic rankings. With MMX’s thorough reporting we are able to analyze all of our  marketing   platforms and their ROI to optimize our marketing budget. I would recommend them to anyone seeking exceptional marketing services.  “" }

    ]
    const OurValuesArray = [{ head: "Data-Driven Approach", icons: <AiOutlineSetting color="#27BE72" />, paragraph: "Our decisions are driven by data and analytics, guiding our continuous testing and improvement efforts." }
        , { head: "Result-Oriented", icons: <BsGraphUpArrow color="#27BE72" />, paragraph: "We prioritize achieving optimal outcomes for clients by harnessing our team's professionalism and upholding company values." },
    {
        head: "Optimize your marketing", icons: <MdSettingsSuggest color="#27BE72" />,
        paragraph: "Enhance your business by gaining deeper insights into your existing and potential customers and optimizing your marketing strategies."
    }]

    return (
        <div>
            <AboutusSeo></AboutusSeo>
            <div className='about_us_header'>


                <Image unoptimized={true} src='/image/about_us_banner.jpg' alt='imgs not available' width={100} height={100} title='imgs not available'  className='About_us_banner_image' />
                <div className='text-on-image'>
                    <h1>About us</h1>
                </div>

            </div>
            <div className="weedxByTheNumber_container">

                <div className="weedx_heading_container">
                    <h2 className="backwoodar_heading">{`WeedX  by the numbers`}</h2>
                </div>
                
                <div className="weedx_number_container bg-light ">
                    <ul>
                        <li>
                            <span className="upperText">{`60 MILLION`}</span>
                            <span className="lowertext">{`Visitors to weedx io every year`}</span>
                        </li>
                        <li> <span className="upperText">{`4+ MILLION`}</span>
                            <span className="lowertext">{` Orders placed annually
                            `}</span>                 </li>
                        <li> <span className="upperText">{`4,600+ MILLION`}</span>
                            <span className="lowertext">{` Retailers online with weedx io
                            `}</span>                       </li>
                        <li> <span className="upperText">{`1.3 million`}</span>
                            <span className="lowertext">{` Product reviews
                            `}</span>          </li>
                        <li> <span className="upperText">{`5,000+`}</span>
                            <span className="lowertext">{` Strains in the weedx io database`}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="AboutUsjourney_container">                  
                   <h2 className="About_Journey_mainheading">{`Weedx Marijuana Dispensaries & Delivery Near Me`}</h2>
                   <div className="journy_container">

                  
                        {/* {AboutUsJourney.map((items, index) => {
                            return (
                                <div className="about_us_inner_section_container" key={index}>
                                    <h2 className="About_Journey_heading">{items.head}</h2>
                                    <p className="journey_paragraph">
                                        {items.paragraph}
                                    </p>
                                </div>
                            )
                        })} */}
                          <div className="about_us_inner_section_container">
                                    <h2 className="About_Journey_heading">
                                    {`   About Us`}
                                    </h2>
                                    <p className="journey_paragraph">
                                  {`  Welcome to WeedX.io, your premier destination for all things cannabis. At WeedX.io, we are committed to revolutionizing the cannabis industry by providing an innovative e-commerce platform that connects consumers with top-quality dispensaries, brands, and delivery services.`}
                                    </p>
                                </div>
                                <div className="about_us_inner_section_container">
                                    <h2 className="About_Journey_heading">
                                   {` Our Mission`}
                                    </h2>
                                    <p className="journey_paragraph">
                                    {`Our mission is to simplify the cannabis shopping experience by offering a seamless, user-friendly platform that caters to both B2B and B2C markets. We aim to empower businesses and consumers alike by providing comprehensive tools and resources that enhance accessibility, convenience, and choice in the cannabis industry.`}
                                    </p>
                                </div>

                                <div className="about_us_inner_section_container">
                                    <h2 className="About_Journey_heading">
                                   {` Who We Are`}

                                    </h2>
                                    <p className="journey_paragraph">
                                   {` WeedX.io was developed by `} <a href="https://selnox.com/">{`Selnox Infotech Pvt Ltd`}</a>,{` a leading tech company dedicated to creating cutting-edge solutions for various industries. Founded by Sandeep Kourav, Selnox Infotech brings together a team of experts passionate about technology and innovation. Our goal is to leverage our expertise to elevate the cannabis industry to new heights.`}
                                    </p>
                                </div>
                                <div className="about_us_inner_section_container">
                                    <h2 className="About_Journey_heading">
                                  {`  What We Offer`}
                                    </h2>
                                    <p className="journey_paragraph">
                                        {`WeedX.io is designed to be a one-stop-shop for all your cannabis needs. Our platform features:`}
                                    </p>
                                    <ul>
                                        <li><b>{`Find a Weed Dispensary Near You:`}</b> {` Easily locate and choose from a wide range of dispensaries in your area.
                                        `}</li>
                                        <li><b>{`Weed Delivery Near You:`}</b>{` Discover delivery services available in your locality and get your cannabis delivered to your doorstep.
                                        `}</li>
                                        <li><b>{` Brand Discovery:`}</b>{` Explore various cannabis brands and their products.
                                        `}</li>
                                        <li><b>{`Order Placement:`}</b>{` Conveniently place orders for delivery or in-store pickup.
                                        `}</li>
                                        <li><b>{` Location-Based Search:`}</b>{` Utilize our location-based search to find nearby dispensaries and delivery services.
                                        `}</li>
                                        <li><b>{` Curbside Pickup:`}</b>{` Enjoy the convenience of curbside pickup for your orders.
                                        `}</li>
                                        <li><b>{` Product Reviews and Ratings:`}</b>{` Read and share reviews on products and dispensaries to make informed choices.
                                        `}</li>
                                        <li><b>{`Strain Information:`}</b>{` Access detailed information on different cannabis strains to find the perfect match for your needs.
                                        `}</li>
                                        <li><b>{`Cannabis Blogs and News:`}</b>{` Stay updated with the latest industry news and insightful blogs on cannabis-related topics.
                                        `}</li>
                                        <li><b>{`Cash Payment:`}</b>{` Pay with cash upon delivery or pickup, offering a hassle-free payment option.
                                        `}</li>
                                      
                                    </ul>
                                </div>
                                <div className="about_us_inner_section_container">
                                    <h2 className="About_Journey_heading">
                                   {`Manage Your Inventory with `}  <a href="https://cannabaze.com/">{`Cannabaze POS`}</a>
                                    </h2>
                                    <p className="journey_paragraph">
                                        {`For dispensaries and cannabis businesses, managing inventory efficiently is crucial. That's where Cannabaze POS comes in. Our advanced Point of Sale system, Cannabaze POS, offers:`}
                                    </p>
                                    <ul>
                                        <li><b>{`Real-Time Inventory Tracking:`}</b> {` Monitor your inventory levels in real-time to ensure you never run out of stock.
                                        `}</li>
                                        <li><b>{`Automated Reordering: `}</b>{`  Set up automated reordering based on inventory thresholds to streamline your stock management.
                                        `}</li>
                                        <li><b>{` Comprehensive Reporting:`}</b>{` Generate detailed reports on sales, inventory, and performance to make informed business decisions.
                                        `}</li>
                                        <li><b>{`Integration with WeedX.io:`}</b>{`Seamlessly integrate with WeedX.io to synchronize your product listings and manage your online sales effectively.
                                        `}</li>
                                        <li><b>{`User-Friendly Interface:`}</b>{` Enjoy an intuitive interface that simplifies daily operations and enhances efficiency.
                                        `}</li>
                                    </ul>
                                </div>
                                <div className="about_us_inner_section_container">
                                    <h2 className="About_Journey_heading">
                                   {`Available in the USA and Canada`}
                                    </h2>
                                    <p className="journey_paragraph">
                                        {`WeedX.io proudly serves customers across the USA and Canada, ensuring that our platform is accessible to a broad audience. Whether you're looking for a dispensary near you or need reliable weed delivery services, WeedX.io has you covered in both countries.
`}
                                    </p>
                                </div>
                                <div className="about_us_inner_section_container">
                                    <h2 className="About_Journey_heading">
                                   {`Our Commitment`}
                                    </h2>
                                    <p className="journey_paragraph">
                                        {`WeedX.io is dedicated to providing a secure, reliable, and enjoyable shopping experience. We continually strive to enhance our platform by incorporating user feedback and staying abreast of industry trends. Our commitment to quality and customer satisfaction is unwavering, and we are proud to serve the cannabis community with integrity and excellence.`}
                                    </p>
                                </div>
                               
                    </div>
            </div>
            <div className="our_valuesSection">
               <h2 className="ourValue_main_headings  section_title">{`Our Values`}</h2>
                <div className="valueCardWrapper row">
                    {OurValuesArray.map((items, index) => {
                        return (
                            <div className="col-md-4 col-sm-6 col-12 mt-2" key={index}>
                                <div className="border ourValues_card_container">
                                    <div className="ourvalues_icons_container">
                                        <span>{items.icons}</span>
                                    </div>
                                    <div className="w-100 values_heading_container ">
                                        <h2 className="ellipsis values_heading">{items.head}</h2>
                                    </div>
                                    <div className="values_paragraph_container">
                                        <p className="values_paragraph">{items.paragraph}</p>

                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
            <div className='testimonial'>

                <h2 className='section_title'>{`Clients preach the WeedX`}</h2>

                <div className="testiminial_card_wrapper row">
                    <ClientPreachSlider {...settings}>
                        {AboutUsBannerArray.map((items, index) => {
                            return (
                                <div key={index}>
                                    <div className=' client_preach_container mb-4'>

                                        <div className='clientPreach_content_section'>
                                            <p className='clientPreach_paragraph'>{items.content}</p>
                                        </div>

                                    </div>
                                </div>
                            )
                        })}
                    </ClientPreachSlider>
                </div>
            </div>
            <Newsletter />
        </div>
    )
}
export default AboutUs