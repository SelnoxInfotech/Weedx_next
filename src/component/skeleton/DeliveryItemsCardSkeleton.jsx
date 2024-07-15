import React from "react"
import Skeleton from '@mui/material/Skeleton';

const DeliveryItemsCardSkeleton = () => {
    const DeliverItemsCardArray = [1, 2, 3, 4, 5, 6]
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="col-md-8 col-12 DeliveryItemsCardSkeleton">
                    {DeliverItemsCardArray.map((items, index) => {
                        return (
                            <React.Fragment key={index}>
                                <div className="col-12 eachDeliveryItemsCardLeftSkeleton">
                                    <div className="col-12 d-flex ">
                                        <div className="col-4 DeliveryItemsCardLeftSkeleton">
                                            <Skeleton variant="rectangular" sx={{ height: "150px", width: "90%", borderRadius: "10px" }} />

                                        </div>
                                        <div className="col-8 DeliveryItemsCardRightSkeleton d-flex">
                                            <div className="col-6 deliveryItemFirstRightSide">
                                                <Skeleton variant="text" sx={{ height: "20px", width: "90%", }} />
                                                <Skeleton variant="text" sx={{ height: "20px", marginTop: "10px", width: "60%", }} />
                                                <Skeleton variant="text" sx={{ height: "20px", width: "70%", marginTop: "10px", }} />


                                            </div>
                                            <div className="col-6 deliveryItemRightSide">
                                                <Skeleton variant="text" sx={{ height: "20px", width: "90%", }} />
                                                <Skeleton variant="text" sx={{ height: "20px", width: "60%", marginTop: "10px", }} />
                                                <Skeleton variant="text" sx={{ height: "20px", width: "80%", marginTop: "10px", }} />
                                                <Skeleton variant="text" sx={{ height: "20px", width: "60%", marginTop: "10px", }} />
                                                <Skeleton variant="text" sx={{ height: "20px", width: "90%", marginTop: "10px", }} />

                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-12 DeliveryItemsCardRightSkeletonBtn">
                                    <Skeleton variant="text" sx={{ height: "20px", width: "30%", }} />

                                    <Skeleton variant="text" sx={{ height: "50px", width: "20%",borderRadius:"25px" }} />

                                    </div>
                                </div>

                            </React.Fragment>
                        )
                    })}


                </div>

            </div>

        </React.Fragment>
    )
}
export default DeliveryItemsCardSkeleton