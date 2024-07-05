import React from "react"
import Skeleton from '@mui/material/Skeleton';
import useStyles from "../../../styles/style";

const HomePageBannerSkeleton = () => {
    const classes = useStyles()

    return (
        <React.Fragment>
           <Skeleton variant="rectangular"  className={classes.bannerskeleton}/>
        </React.Fragment>
    )
}
export default HomePageBannerSkeleton