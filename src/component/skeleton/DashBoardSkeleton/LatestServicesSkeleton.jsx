import React from "react";
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
const LatestServicesSkeleton = () => {
    const LatestServiceskeleton = [1, 2, 3,4]
    return (
        <React.Fragment>
            <div className="LatestServiceskeleton">
                <div className="col-12 " style={{ display: "flex", justifyContent: "center",height:"50px"}}>
                    <div className="col-12" style={{height:"50px"}}>
                       <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
                       <Skeleton variant="text" sx={{ height: "25px", width: "24%" }} />
                       </Box>
                       <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
                       <Skeleton variant="text" sx={{ height: "25px", width: "35%" }} />

                       </Box>

                    </div>
                </div>

                <Grid container columnSpacing={2} sx={{ height: "auto", marginTop: "20px" }}>
                    {LatestServiceskeleton.map((val, index) => {
                        return (
                            <Grid item lg={3} md={4} sm={6} xs={12} key={index}>
                                <Skeleton variant="rectangular" sx={{ width: "100%", height: "290px" }} />

                            </Grid>
                        )
                    })}
                </Grid>

            </div>

        </React.Fragment>
    )
}
export default LatestServicesSkeleton