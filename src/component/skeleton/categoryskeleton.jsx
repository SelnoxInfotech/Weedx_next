"use client"
import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import ScrollContainer from 'react-indiana-drag-scroll';
import Grid from '@mui/material/Grid';
import useStyles from '../../styles/style';

export default function Categoryskeleton() {
  const classes = useStyles()


  return (
    <div className='CategorySkeletons mt-4'>

      <ScrollContainer className="ScrollContainerRelative">

        {[1, 2, 3, 4, 5, 6].map((val, index) => {
          return (

            <Grid item lg={2} md={3} xs={3} key={index}>
              <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Skeleton variant="circular" className={classes.cagetoryskeleton} />
              </Box>
              <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Skeleton variant="text" sx={{ fontSize: '10px', width: "30%" }} />

              </Box>
            </Grid>
          )
        })}



      </ScrollContainer>
    </div>
  );
}