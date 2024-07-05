import React from 'react';
import Grid from '@mui/material/Grid';
import Createcontext from '../hooks/context';
import Navbar from "../component/navbar"
import Footer from '../component/Footer/Footer';
const Layout = ({ children }) => {
    const { state, dispatch } = React.useContext(Createcontext)
    return (
        <div>
            <div className='sticky-top '>
                <Navbar></Navbar>
            </div>
            <div className='container ' id='layout'>
                <Grid item={true} xs={12} md={12} xl={12}>
                    <main>{children}</main>
                </Grid>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;