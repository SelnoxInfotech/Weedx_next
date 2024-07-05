import React from "react"
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
const StrainTypeCardSkeleton = () => {
    const LatestServicesSkeleton = [1, 2, 3, 4]
    return (
        <React.Fragment>
            <div className="StrainTypeCardSkeleton">
                <Skeleton variant="text" sx={{ height: "25px", width: "24%" }} />

                <Grid container columnSpacing={2} sx={{ height: "auto", marginTop: "20px" }}>
                    {LatestServicesSkeleton.map((val, index) => {
                        return (
                            <Grid item md={3} sm={6} xs={12} key={index}>
                                <Skeleton variant="rectangular" sx={{ width: "100%", height: "250px" }} />
                                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "10px" }}>
                                    <Skeleton variant="text" sx={{ height: "25px", width: "50%" }} />
                                </Box>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>

        </React.Fragment>
    )
}
export default StrainTypeCardSkeleton