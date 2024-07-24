import Image from 'next/image';
import  ScrollContainer  from 'react-indiana-drag-scroll';
import * as React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { modifystr } from "@/hooks/utilis/commonfunction";
import Link from 'next/link';

const Featuredbrand = ({ CardDataArray}) => {
    const ref = React.useRef(null);

    return (
        <div className="px-sm-0 px-3 feature_brands_section">
            <div className="">
        {/* {!BrandSkeleton  ? */}
        <React.Fragment>
             <div className="bestDealsCard_Heading_offers">
                  
                    <div className="d-flex align-items-center justify-content-between">
                    <h1 className="section_main_title">{`Featured Brands`}</h1>
                      <Link href='/brands'>
                        <span className="viewallbtn">{`View All`} <FaArrowRight   /></span>
                      </Link>
                    </div>
             </div>

            <div  className="feature_brand_container"  ref={ref}>
                <ScrollContainer className="ScrollContainerRelative py-2">
                    {
                        CardDataArray?.map((items, index) => {
                            return (
                                <div className="feature_brands" key={index}>
                                      <Link  href={`/brands/${modifystr(items.name)}/${items.id}`}> 
                                        <div className="row  FeaturedBrandContainer  mx-0 my-2">
                                            <div className="col-12 FeaturedBrandImageContainer px-0">
                                                  <Image unoptimized={true} width={100} height={100}  alt={items.name} title={items.name}  src={`${items.Brand_Logo}`} />
                                            </div>
                                        </div>
                                      </Link>
                                </div>
                            )
                        })
                    }
                </ScrollContainer>
            </div>
          

        </React.Fragment>
        {/* : */}
         {/* <div className="col-12 bestDealsCard_Heading_offers mt-4">
       
          <FeaturedBrandSkeleton></FeaturedBrandSkeleton>
         </div>
        } */}
        </div>
        </div>
    )
}
export default Featuredbrand