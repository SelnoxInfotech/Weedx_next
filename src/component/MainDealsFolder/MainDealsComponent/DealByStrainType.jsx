import React from "react";
import { ScrollContainer } from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css'
import { LazyLoadImage } from "react-lazy-load-image-component";

const DealByStrainType = ({ArrayData,heading}) => {
  
    const ref = React.useRef(null);

    return (


                <div className="col-12 d-block   popularStrainContainerSlider dealsByStrainTypeSliderContainer " id="width" ref={ref}>
                        <h3 className="popularStrain_heading">{heading}</h3>
                    <ScrollContainer className="ScrollContainer_newProductCtaegory">
                        {ArrayData.map((items,index)=>{
                            return(
                                <div className="col-6 col-md-4 col-lg-2  newProductCard mx-0 popularStrainCard_slider pt-2 " key={index}>


                                <div className="w-100 center">
                                    <div className="popularStrainImageContainer">

                                        <LazyLoadImage
                                          
                                             className="popularStrain_Image"
                                             src={items.imgUrl}
                                             alt={items.name}
                                             title={items.name}
                                             />
                                             
                                    </div>

                                    
                                </div>
                                <div className="w-100  popularStrainContent ">
                                    <p className="my-0 popularStrainName ellipsis">{items.name}</p>
                                </div>

                            </div>
                            )
                        }) }
                    </ScrollContainer>

                </div>

    )
}
export default DealByStrainType