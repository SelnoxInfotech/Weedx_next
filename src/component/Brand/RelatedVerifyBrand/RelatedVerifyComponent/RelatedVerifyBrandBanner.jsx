import { MdShare } from "react-icons/md"
import IconButton from "@mui/material/IconButton";
import { RWebShare } from "react-web-share";
import { useState } from "react";
import React from "react";
// import '../../../../../styles/AppStyle.css'
import Image from "next/image";
const RelatedVerifyBanner = ({ BrandDetails }) => {
    const [readmore, setreadmore] = useState(false)
  
    const handleContainerClick = (e) => {
        if (e.target.tagName === 'SPAN') {
            setreadmore(!readmore)
        }
    };

    return (
            <div className="brandProfileBanner row center">

                <div className={"relatedVerifyBrand_Banner"}>

                    <div className="relatedVerifyBrand_icons">
                      <div className="shareiconcontainer ">
                        <IconButton aria-label="share icons">
                            <RWebShare
                                data={{ url: window.location.href }}
                                sites={["facebook", "twitter", "whatsapp", "telegram", "linkedin", 'mail', 'copy']}
                                onClick={() => console.info("share successful!")}
                                color="#31B665" >
                                <MdShare color="#949494" size={20} />
                            </RWebShare>
                        </IconButton>
                      </div>
                    </div>
                    <div className="related_verifyBrandBanner_maincol">
                        <div className="RelatedVerifyBrandBanner_image_box">
                            <div className="realtedVerifyBanner_image_inner_container">
                                <Image unoptimized={true} width={100} height={100} className="related_verify_banner_img" src={BrandDetails?.Brand_Logo} title={BrandDetails?.name} alt={BrandDetails?.name} />
                            </div>
                        </div>
                        <div className="RelatedVerifyBanner_content_box">

                            <h1 className="section_main_title">{BrandDetails?.name}</h1>

                            <div className={readmore ? "related_verify_paragraph" : " brandMoreLess"}>

                                <div id="html"
                                    onClick={handleContainerClick}
                                    dangerouslySetInnerHTML=
                                    {{
                                        __html: readmore ? BrandDetails?.Brand_description +
                                            `<span id="band_shlebtn" className="band_shlebtn">...Read less</span>` :
                                            BrandDetails?.Brand_description.split('</p>')[0] + '<span id="band_shlebtn" className="band_shlebtn">...Read more</span>'
                                    }} />

                            </div>

                        </div>
                    </div>


                </div>
            </div>
    )
}
export default RelatedVerifyBanner