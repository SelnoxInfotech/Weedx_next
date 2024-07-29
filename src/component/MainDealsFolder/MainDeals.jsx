
import { DealsSeo } from "@/component/ScoPage/DealsSeo";
import ProductSearchResult from "../../component/productcard/ProductSearchResult"
import axios from "axios";
import { FaIdeal } from "react-icons/fa";

import React from "react";
import Image from "next/image";
const MainDeals=()=>{

const [deals,setdeals]= React.useState([])

    React.useEffect(()=>{
     
       axios.get('https://api.cannabaze.com/UserPanel/BuyXGetYDiscount/').then((res)=>{
        setdeals(res.data)
       }).catch((error)=>{
        console.trace(error)
       })
    } , [])



   
    const NewProductSearchRseultArray = [{ imgUrl: "./image/social.png" }, { imgUrl: "./image/sativa.png" }, { imgUrl: "./image/sativa.png" },
    { imgUrl: "./image/sativa.png" }, { imgUrl: "./image/sativa.png" }, { imgUrl: "./image/sativa.png" }, { imgUrl: "./image/sativa.png" }
    ]
    const NewProductSearchResult_Heading="Best Deals Near By You"
  

    const DispensoriesDealHeading="Find dispensories Deals"
    
    return(
        <div className="">
            <DealsSeo></DealsSeo>
            <div className="">
         {
            deals.length ?
       
             <ProductSearchResult RelatedProductResult={deals} title={"Best Deals Near By You"} /> 
               : <div className="noReview">
                                <div className="noreviewicon">
                                    <div className="iconcircl"><Image unoptimized={true} width={100} height={100} src={'/image/nodeal.png'} className="nodealsicon" title="no Deals"  alt="no Deals"/></div>
                                </div>
                                <h1 className="noreview_title">{`Discover More Savings Soon!`}</h1>
                                <p className="noreview_description w-lg-50 ">{`It looks like there are no active deals at the moment . Don't worry, though – our partnered stores frequently update their promotions. Be sure to check back regularly for exciting discounts and special offers on your favorite products.`}</p>
                                <p className="noreview_description w-lg-50">{`In the meantime, explore the diverse range of products available at WeedX.io. We're constantly working to bring you the best deals, so stay tuned for upcoming promotions.`}</p>
                </div>
                  }
            </div>
        </div>
    )
}
export default MainDeals