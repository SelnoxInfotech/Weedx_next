import VerifyBrands from "./BrandComponent/VerifyBrands"
import React from "react";
const Brand=()=>{
    return(
        <React.Fragment>
        <div className="">
            <div className=" brands_containers_height">
                <div className="col-12 col-sm-10 brandHeading">
                   
                    <VerifyBrands/>
                </div>
            </div>

        </div>
        </React.Fragment>
    )
}
export default Brand