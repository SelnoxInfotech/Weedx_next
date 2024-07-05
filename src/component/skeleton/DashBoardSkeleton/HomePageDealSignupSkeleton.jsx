import React from "react"
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { Paper } from "@mui/material";
import useStyles from "../../../../Style";
const HomePageDealSignupSkeleton = () => {
    const classes=useStyles()
    return (
        <React.Fragment>
            <Paper variant="outlined" className="px-4" sx={{ display: "grid", alignItems: "center", JustifyContent: "center", height: "280px" }}>

                <Grid container rowSpacing={1} columnSpacing={2} sx={{ height: "100px"}}>

                    <Grid item md={4} xs={12}>
                        <Skeleton variant="text" sx={{ height: "30px", width: "80%", }}/>

                    </Grid>
                    <Grid item md={4} xs={12} sx={classes.HomePageDealSignUpSkeleton}>
                        <Skeleton variant="rectangular" sx={{ height: "40px", width: "100%", borderRadius: "30px" }} />

                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Skeleton variant="rectangular" sx={{ height: "40px", width: "100%", borderRadius: "30px" }} />

                    </Grid>
                    <Grid item md={4} xs={12}>

                    <Skeleton variant="text" sx={{ width: "30%" }} />

                    </Grid>

                </Grid>
            </Paper>



        </React.Fragment>
    )
}
export default HomePageDealSignupSkeleton