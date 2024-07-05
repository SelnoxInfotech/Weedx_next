import React from "react"
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
const DashBoardMap=()=>{
    return(
        <React.Fragment>
            <Grid container  sx={{height:"auto"}}>
                <Grid item xs={12} sx={{height:"270px"}}>
                        <Skeleton variant="rectangular" sx={{height:"270px",width:"100%"}}/>

                </Grid>
            </Grid>
        </React.Fragment>
    )
}
export default DashBoardMap