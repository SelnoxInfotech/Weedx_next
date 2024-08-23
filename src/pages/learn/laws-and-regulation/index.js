'use client'
import React,{useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Newsletter from "@/component/home/HomePageDealsSignup"
import LawsOptions from '@/component/LawsComponent/LawsOptions'
import Bgheader from '@/component/bgheader/Bgheader';
import { useRouter } from 'next/router';
import useStyles from '../../../styles/style';
import Link from 'next/link';
import Content from '@/component/LawsComponent/LawContentsJson'
import  {Law} from '@/component/ScoPage/LearnSeo';
const Index = (props) => {
    const router = useRouter();
    const classes = useStyles();
    const [value, setValue] = useState(router?.pathname);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        router.push(newValue)
    };
    return (
        <div className='container-fluid'>
            <Law location={router.asPath}></Law>
                <div className='row'>
            <div className='col-12'>
                <Box className={``} sx={{ width: '100%', typography: 'body1', }}>
                    <TabContext value={value}>
                        <Box className={`${classes.learn_tab_background} ${classes.learn_tab}`} sx={{ marginLeft: "-5px", borderColor: 'divider' }}>
                            <TabList scrollButtons={false} variant="scrollable" onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Law" value="/learn/laws-and-regulation" />
                                    <p className='Lawsection_New' onClick={()=>{ router.push('/cannabis-news')}}> {`All News`}</p>
                                    <p  className='Lawsection_New' onClick={()=>{ router.push('/blogs')}}> {`Blogs`}</p>
                                {/* <Tab label="All News" value="" onClick={()=>{ router.push('/cannabis-news')}} /> */}
                                {/* <Tab label="Blogs" value="" onClick={()=>{ router.push('/blogs')}} /> */}

                                    </TabList>
                                </Box>
                                <Box className={`${classes.learnTabPadding}`}>
                                    <TabPanel value="/learn/laws-and-regulation"> 
                                    <div>
                                        {/* <Law location={useLocation().pathname}></Law> */}
                                        <div className="row ">
                                            <h1 className="canabisLawMainHeadings">{`Cannabis Law in USA, Canada & Internationals`}</h1>
                                            <Bgheader  text="Law"/>
                                            <LawsOptions data={Content} />
                                        </div>
                                    </div>
                                    </TabPanel>
                                </Box>
                            </TabContext>
                        </Box>
                    </div>

                </div>
                <Newsletter />
            </div>
     
    );
};

export default Index;

