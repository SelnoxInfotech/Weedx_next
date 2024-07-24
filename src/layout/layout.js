import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Createcontext from '../hooks/context';
import dynamic from 'next/dynamic'
const Navbar = dynamic(() => import('../component/navbar'));
const Chartbot = dynamic(() => import('@/component/chartbot/Chartbot') , {ssr:false});

import Footer from '../component/Footer/Footer';
import Loader from '@/component/Loader/Loader';
// import Chartbot from '@/component/chartbot/Chartbot';
const Layout = ({ children }) => {
    const { state, dispatch } = React.useContext(Createcontext)
     const [isload, setisload]=useState(false)
    // useEffect(()=>{
    //     setisload(true)
    //     setTimeout(() => {
    //     setisload(false)
    //       }, 2000);
    // },[state.Location])
    return (
        <div>
        {/* {isload ? <Loader /> : null} */}
        <div className='sticky-top'>
          <Navbar />
        </div>
        <div className='container' id='layout'>
          <Grid item xs={12} md={12} xl={12}>
            <main>{children}</main>
          </Grid>
        </div>
        <Footer />
        <Chartbot></Chartbot>
      </div>
    );
};

export default Layout;