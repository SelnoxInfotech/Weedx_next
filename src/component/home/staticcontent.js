import React from 'react';
import Createcontext from "../../hooks/context"
import Image from 'next/image';
const Staticcontent = () => {
    const { state, dispatch } = React.useContext(Createcontext)
    return (
        <div>
            <div className="About_weedx">
                <div className="container-fluid">
                    <h2 className="section_main_title mb-sm-1 mb-3">{`Welcome to weedx.io`}</h2>
                    <p className="section_main_description">{`Your all-in-one cannabis destination. Discover a world of convenience with our Online Ordering and Delivery   Services. Explore a rich selection of Dispensary and Retailer Listings, all while enjoying the peace of mind that comes with our
                        full Compliance with Local Laws. Your journey to a seamless, legal, and informed cannabis experience begins here at
                        weedx.io`}</p>

                    <div className="about_card_Wraper">
                        <div className="about_card">
                            <div className="about_card_img">
                                <Image
                                //  onError={event => {
                                //     event.target.src = "/image/VANNER_2.png"
                                //     event.onerror = null
                                unoptimized={true}
                                // }} 
                                width={100}
                                    height={100}
                                    src={state?.StaticImage?.AboutUs1}
                                    alt=" Online Ordering"
                                    title=" Online Ordering"
                                />
                            </div>
                            <div className="about_text">
                                <h3 className="acard_title">
                                    {` Online Ordering`}
                                </h3>
                                <p className="acard_description">
                                    {` Experience the convenience of ordering your
                                    favorite cannabis products online. Browse a
                                    wide selection, place your order, and have it
                                    delivered or ready for pickup with just a few
                                    clicks.`}
                                </p>
                            </div>
                        </div>
                        <div className="about_card">
                            <div className="about_card_img">
                                <Image
                                    // onError={event => {
                                    //     event.target.src = "/image/delivery.png"
                                    //     event.onerror = null
                                    // }}
                                    unoptimized={true}
                                    width={100}
                                    height={100}
                                    src={state?.StaticImage?.AboutUs2}
                                    alt="Delivery Services"
                                    title="Delivery Services"
                                />
                            </div>
                            <div className="about_text">
                                <h3 className="acard_title">
                                    {`  Delivery Services`}
                                </h3>
                                <p className="acard_description">
                                    {` Enjoy the ease of cannabis delivery right
                                    to your doorstep. Whether you're seeking
                                    flowers, edibles, or concentrates, our
                                    delivery services ensure a hassle-free
                                    experience`}
                                </p>
                            </div>
                        </div>
                        <div className="about_card">
                            <div className="about_card_img">
                                <Image
                                    // onError={event => {
                                    //     event.target.src = "/image/delivery.png"
                                    //     event.onerror = null
                                    // }}
                                    unoptimized={true}
                                    width={100}
                                    height={100}
                                    src={state?.StaticImage?.AboutUs3}
                                    alt="Dispensary Listings"
                                    title="Dispensary Listings"
                                />
                            </div>
                            <div className="about_text">
                                <h3 className="acard_title">
                                    {`Dispensary Listings`}
                                </h3>
                                <p className="acard_description">
                                    {`  Explore our comprehensive directory of
                                    cannabis dispensaries. Each listing
                                    provides essential details, including
                                    addresses, operating hours, and
                                    customer reviews, to help you make
                                    informed choices.`}
                                </p>
                            </div>
                        </div>
                        <div className="about_card">
                            <div className="about_card_img">
                                <Image
                                    width={100}
                                    height={100}
                                    src={state?.StaticImage?.AboutUs4}
                                    alt="Retailer Listings"
                                    title="Retailer Listings"
                                    unoptimized={true}
                                />
                            </div>
                            <div className="about_text">
                                <h3 className="acard_title">
                                    {`  Retailer Listings`}
                                </h3>
                                <p className="acard_description">
                                    {`Our retailer listings showcase the best
                                    places to explore, purchase, and learn
                                    about cannabis. Discover the perfect
                                    spot to meet your cannabis
                                    requirements`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Staticcontent; 