import ProgressBar from "./ProgressBar"
import { AiFillStar } from "react-icons/ai"
import React from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import useStyles from "../../../styles/style"
import WriteReviewPopup from "../ReviewPopup/WriteReviewPopup"
const OverAllReview = ({ Rating, api,noReview,AllReview, SetApi  ,onSubmit,reviewloading,  GetProductReview, SetGetProductReview}) => {
    const classes = useStyles()
  
    const testData = [
        { starValue: 5, bgcolor: "#31B665", completed: Rating?.FiveStar },
        { starValue: 4, bgcolor: "#31B665", completed: Rating?.FourStar },
        { starValue: 3, bgcolor: "#31B665", completed: Rating?.ThreeStar },
        { starValue: 2, bgcolor: "#31B665", completed: Rating?.TwoStar },
        { starValue: 1, bgcolor: "#31B665", completed: Rating?.OneStar },

    ];
    return (
        <div className="w-100 ">
            
            
                    <div className="overall_review_container">
                        <div className="">
                            <div className="m-2 text-end">
                                <WriteReviewPopup onSubmit={onSubmit}   GetProductReview={GetProductReview} reviewloading={reviewloading} SetGetProductReview={SetGetProductReview}  api={api} SetApi={SetApi} />
                             
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-xxl-3 col-12 left_circularbar_container">
                                <div className="row">

                                    <div className="col-lg-12 left_circularbar">
                                        <div style={{ width: 100, height: 100 }}>
                                            <CircularProgressbar 
                                                value={( Rating?.AverageReview *100 /5).toFixed(1) } text={Rating?.AverageReview.toFixed(1)}     styles={{
                                                
                                                    path: {
                                                    
                                                    stroke: `#31B665`,
                                                    strokeLinecap: 'butt', 
                                                    transition: 'stroke-dashoffset 0.5s ease 0s',
                                                    transform: 'rotate(0.25turn)',
                                                    transformOrigin: 'center center',
                                                    },
                                                    trail: {
                                                    stroke: '#8F8F8F',
                                                    strokeLinecap: 'butt',
                                                    transform: 'rotate(0.25turn)',
                                                    transformOrigin: 'center center',
                                                    },
                                                    text: {
                                                    
                                                    fill: '#000',
                                                    
                                                    fontSize: '22px',
                                                    },
                                                    background: {
                                                    fill: '#31B665',
                                                    },
                                                }} />
                                        </div>
                                        <p>{AllReview?.length} Review</p>
                                    </div>

                                </div>

                            </div>
                            <div className="col-xxl-9 col-12  right_horizontal_bar">
                                <div className="row">    
                                    <div className="col-lg-12">             
                                        {testData.map((item, idx) => {
                                        
                                            return (
                                                <div className="row  mt-2 px-4" key={idx}>
                                                    <div className="col-1 overall_flex ">
                                                        <span>{item.starValue}</span> <span><AiFillStar className={classes.disp_star_color} /></span>
                                                    </div>
                                                    <div className="col-10 overAll_Progress_center over_col_height ">
                                                        <ProgressBar    bgcolor={item.bgcolor} completed={item.completed} />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                            </div> 

                        </div>

                    </div>
            
        </div>
    )
}
export default OverAllReview