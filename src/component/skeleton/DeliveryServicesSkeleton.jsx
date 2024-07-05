import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import useStyles from '../../styles/style';

const DeliverServiceSkeleton = () => {
    const data = [1, 2, 3, 4];
    const classes = useStyles()
    return (
        <React.Fragment>
            <div className='col-12 DeliveryServicesSkeleton'>

                <Box>
                    <Skeleton sx={{ width: "35%", height: "30px", marginTop: "10px" }} />
                </Box>
                <Box className="deliverySkeletonBox">

                    <Grid container rowSpacing={0}
                        columnSpacing={2}>
                        {data.map((items, index) => {
                            return (
                                <Grid item md={3} xs={6} key={index} className={classes.deliverySkeletoncard}>
                                    <Skeleton sx={{ width: "100%", height: "258px", borderRadius: "12px", marginBottom: "-27px" }} />
                                    <Skeleton sx={{ width: "100%", height: "30px", marginBottom: "-4px" }} />
                                    <Skeleton sx={{ width: "100%", height: "30px", marginBottom: "-4px" }} />
                                    <Skeleton sx={{ width: "70%", height: "30px", marginBottom: "-4px" }} />


                                </Grid>
                            )
                        })}



                    </Grid>

                </Box>
            </div>



        </React.Fragment>
    )
}
export default DeliverServiceSkeleton