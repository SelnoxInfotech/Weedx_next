import React from "react"
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import { Paper } from "@mui/material";
import useStyles from "../../../../Style";
const DispensoriesAddressSkeleton = () => {
    const DispensoriesAddressSkeletonArr = [1, 2, 3, 4, 5, 6,6,6,6,6,6,6,6,6,6]
    const classes = useStyles()
    return (
        <React.Fragment>
            <div className="">

                <Box>
                    <Skeleton variant="text" sx={{ width: "30%", height: "25px" }} className={classes.dispensoriesAddressSkeletonHeading} />
                </Box>
                <Grid container columnSpacing={2} sx={{ height: "auto", marginTop: "20px" }}>
                    {DispensoriesAddressSkeletonArr.map((val, index) => {
                        return (
                            <Grid item lg={2.4} md={4}  xs={6}  key={index} sx={{ height: "450px" }}>
                                <Paper sx={{ height: "420px" }}>
                                       <Skeleton variant="rectangular" sx={{ width: "100%", height: "200px", borderRadius: "10px" }} />
                                    <Box sx={{ width: "100%", paddingLeft: "15px", marginTop: "10px" }}>
                                        <Skeleton variant="text" sx={{ width: "35%" }} />
                                    </Box>
                                    <Box sx={{ width: "100%", paddingLeft: "15px", marginTop: "10px" }}>
                                        <Skeleton variant="text" sx={{ width: "70%" }} />
                                    </Box>
                                    <Box sx={{ width: "100%", paddingLeft: "15px", marginTop: "10px" }}>
                                        <Skeleton variant="text" sx={{ width: "35%" }} />
                                    </Box>
                                    <Box sx={{ width: "100%", paddingLeft: "15px", marginTop: "10px" }}>
                                        <Skeleton variant="text" sx={{ width: "70%" }} />
                                    </Box>
                                    <Box sx={{ width: "100%", paddingLeft: "15px",paddingRight:"15px", marginTop: "30px" }}>
                                        <Skeleton variant="rectangular" sx={{ width: "100%",height:"35px",borderRadius:"30px" }} />
                                    </Box>
                                </Paper>
                            </Grid>
                        )
                    })}


                </Grid>
            </div>


        </React.Fragment>
    )
}
export default DispensoriesAddressSkeleton