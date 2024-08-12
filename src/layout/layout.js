import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Createcontext from '../hooks/context';
import dynamic from 'next/dynamic'
const Navbar = dynamic(() => import('../component/navbar'));
const Chartbot = dynamic(() => import('@/component/chartbot/Chartbot') , {ssr:false});
import CheckAgeEligbilityPopup from '@/component/CheckAgeEligblityPopup/CheckAgeEligbilityPopup';
import CookiesAccept
 from '@/component/CookiesAccept/CookiesAccept';
import Cookies from 'universal-cookie';
import Footer from '../component/Footer/Footer';
// import Chartbot from '@/component/chartbot/Chartbot';
const Layout = ({ children }) => {
   
  const cookies = new Cookies();
    const { state, dispatch } = React.useContext(Createcontext)  
    React.useEffect(()=>{
      let date = new Date();
      date.setTime(date.getTime() + (30*24*60*60*1000))
      if (!cookies.get('CookiesAcceptAll')) {
          cookies.set('CookiesAcceptAll', 0, { expires: date })
      }
      if (!cookies.get('Marketing')) {
          cookies.set('Marketing', 0, { expires: date })
      }
      if (!cookies.get('Analytical')) {
          cookies.set('Analytical', 0, { expires: date })
      }
      dispatch({ type: 'Cookies', Cookies: cookies.get("CookiesAcceptAll") })
      dispatch({ type: 'CookiesMarketing', CookiesMarketing: cookies.get("Marketing") })
      dispatch({ type: 'CookiesAnalytical', CookiesAnalytical: cookies.get("Analytical") })
  },[])
    return (
        <div>
          <div className='sticky-top'>
              <Navbar />
            </div>
            <CheckAgeEligbilityPopup value={cookies.get("CheckAge") === undefined ? true : false}/>
            {
                parseInt(state.Cookies) === 0 && <CookiesAccept></CookiesAccept>
            }
            
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