import RelatedVerifyBanner from "./RelatedVerifyComponent/RelatedVerifyBrandBanner"
import SearchBar from '@mkyy/mui-search-bar';

import { useParams, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import Axios from "axios";
import useStyles from "../../../../Style";

import { BrandDetailsSeo } from "../../../Component/ScoPage/BrandsSeo";
import ProductSearchResult from "../../Product/ProductSearchResult/ProductSearchResult";
const RelatedVerifyBrand = () => {
    const classes = useStyles()
    const { pathname } = useLocation()
    let { id, Name } = useParams();
    const navigate = useNavigate()
    const [BrandProduct, SetBrandProduct] = React.useState([])
    const [searchval, Setsearchval] = React.useState("")
    const [BrandDetails, GetBrandDetails] = React.useState([])

    React.useEffect(() => {
        if (searchval?.length !== 0) {
            const getData = setTimeout(() => {
                Axios.post(`https://api.cannabaze.com/UserPanel/SearchProductbyBrand/`, {
                    "brand": id,
                    "search": searchval,
                }).then((response) => {
                    SetBrandProduct(response.data);
                });
            }, 1000)

            return () => clearTimeout(getData)
        } else {
            Axios.get(`https://api.cannabaze.com/UserPanel/Get-ProductbyBrand/${id}`,
            ).then(response => {
                SetBrandProduct(response.data)
            })
            Axios.get(`https://api.cannabaze.com/UserPanel/Get-BrandById/${id}`,
            ).then(response => {
                if (response.data.length === 0) {
                    navigate("/404")
                }
                else {

                    GetBrandDetails(response.data[0])
                }
            })
            document.documentElement.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant", // Optional if you want to skip the scrolling animation
            });
        }
    }, [searchval, id])
    return (
        BrandDetails?.length !== 0 && <div className="">
            <BrandDetailsSeo brandname={Name} location={pathname}></BrandDetailsSeo>
            <RelatedVerifyBanner BrandDetails={BrandDetails} />
            <div className="row  center mx-0 mt-4 mb-4">
                <div className="col-md-3 px-0">
                    {/* <ProductFilter/> */}
                </div>
                <div className="col-md-9">
                    <div>  <SearchBar style={{ background: "#FFFFF", border: "1px solid #31B665" }}

                        value={searchval} onChange={(e) => { Setsearchval(e) }}
                        className={classes.strainTypSearchBar}
                        width={"100%"} placeholder="Search Menu"
                        closeIcon={<button onClick={() => Setsearchval("")}>clear</button>}
                    />
                    </div>
                </div>

            </div>
            <ProductSearchResult RelatedProductResult={BrandProduct} />
        </div>
    )
}
export default RelatedVerifyBrand