import React from "react"
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
const FeaturedBrandSkeleton = () => {
    const FeaturedBrandArray = [1, 2, 3, 4]
    return (
        <React.Fragment>
            <div className="featuredBrandPadding">
                    <Skeleton variant="text" sx={{ width: "24%", height: "30px" }} />
                <Grid container columnSpacing={2} sx={{ height: "auto", marginTop: "20px" }}>
                    {FeaturedBrandArray.map((val, index) => {
                        return (
                            <Grid item lg={3} md={4} sm={6} xs={12}  key={index} sx={{ height: "230px" }}>

                                <Skeleton variant="rectangular" sx={{ width: "100%", height: "160px" }} />
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
export default FeaturedBrandSkeleton