import React from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IconButton } from "@mui/material";
import WhisListCard from "@/component/Whishlist/WhisLists/WhisListComponent/WhisListCards";
import { useRouter } from "next/router";
import { WhislistSeo } from "@/component/ScoPage/CommenpageSeo";
import dynamic from "next/dynamic";
const Currentlocation = dynamic(() => import('@/component/currentlocation/CurrentLocation'));
import Createcontext from "@/hooks/context"
const WhisLists = () => {
    const Navigate = useRouter()
    const { state } = React.useContext(Createcontext)
    return (
        <div className="container-fluid">
             {state.permission === false && <Currentlocation></Currentlocation>}
            <WhislistSeo></WhislistSeo>
            <div className="row">
                <div className="col-12 whislistBackBtn_Container px-0">
                    <span><IconButton onClick={() => Navigate.push('/products')}><MdOutlineKeyboardArrowLeft color="#000000"/></IconButton></span><span onClick={() => Navigate.push(-1)} className="BackPageBtn">Back</span>

                </div>
              
                <WhisListCard/>
            </div>
        </div>
    )
}
export default WhisLists