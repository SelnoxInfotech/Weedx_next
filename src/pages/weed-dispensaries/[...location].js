import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useStyles from "../../styles/style";
import dynamic from 'next/dynamic'
const WeedDispansires = dynamic(() => import('../../component/WeedDispansires/Weed_Dispansires'));
import Createcontext from "../../hooks/context"
// import { useLocation, useParams, usenavigate.push } from "react-router-dom";

import { useRouter } from 'next/router';
import axios, { Axios } from "axios";
import { DespensioriesItem } from '../../hooks/apicall/api';
import Wronglocation from "../../component/skeleton/Wronglocation";
import { modifystr } from "../../hooks/utilis/commonfunction";
import Loader from "../../component/Loader/Loader";
import RoutingDespen from '../../hooks/utilis/Routingdespen';




function TabPanel(props) {

    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography variant="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



const Dispensaries = () => {
    const classes = useStyles()
    const [searchtext, setsearchtext] = React.useState("");
    const navigate = useRouter()
    const Location = useRouter()
    const { state, dispatch } = React.useContext(Createcontext)
    const [value, setValue] = React.useState(0);
    const [Store, SetStore] = React.useState([]);
    const [loader, setloader] = React.useState(false);
    const [contentdata, setcontentdata] = React.useState([])
    const DispensorShopLocation = [{ name: "Weed Dispensaries in", city: state.Location }]
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        const sendPostRequest = () => {
            axios.post(
                `https://api.cannabaze.com/UserPanel/Update-SiteMap/14`,
                {
                    j: 'https://www.weedx.io' + modifystr(Location?.pathname.replace(/\/+$/, ""))
                }
            ).then((res) => {
            }).catch((err) => {
            });
        };


        const timeoutId = setTimeout(sendPostRequest, 2000);

        return () => clearTimeout(timeoutId);
    }, [Location]);

    React.useEffect(() => {

        if (searchtext !== "") {
            const getData = setTimeout(() => {
                const json = {
                    "store": searchtext,
                    "City": state.City,
                    "Country": state.Country?.replace(/-/g, " "),
                    "State": state.State?.replace(/-/g, " "),
                }
                Axios.post(`https://api.cannabaze.com/UserPanel/FilterDispensaries/`,
                    json
                ).then(function (response) {
                    setloader(true)
                    SetStore(() => response?.data);
                })
                    .catch(function (error) {
                        setloader(true)
                        console.trace(error);
                    });
            }, 1000)
            return () => clearTimeout(getData)
        } else {
            const sendPostRequest = () => {
                try {
                    const object = { City: state.City.replace(/-/g, " "), "Country": state.Country?.replace(/-/g, " "), "State": state.State?.replace(/-/g, " "), }
                    state.Country !== "" && DespensioriesItem(object)
                        .then((res) => {

                            if (res === "No Dispensary in your area") {
                            }
                            else {
                                SetStore(res)
                            }
                            setloader(true)

                        })

                    axios.post(`https://api.cannabaze.com/UserPanel/Get-WebpageDescriptionDispensary/`, { ...object }

                    ).then((res) => {
                        setcontentdata(res.data)
                    })

                } catch (error) {

                }
            }
            const timeoutId = setTimeout(sendPostRequest, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [searchtext, state])



    return (
        <RoutingDespen>
            <div className="row  dispensaries_centers">
                <div className="col-12 col-sm-12">
                    <div className="headerBoxdescription">
                        <div style={{ cursor: "pointer" }}>

                            <span onClick={() => navigate.push("/")}>{"Home"}</span>
                            {Boolean(state.Country) && <span> {">"} <span onClick={() => breadcrumCountry("Country")}>{state.Country}</span></span>}
                            {Boolean(state.State) && <span> {">"} <span onClick={() => breadcrumCountry("Country", "state")}>{state.State}</span></span>}
                            {Boolean(state.City) && <span> {">"} <span onClick={() => { Boolean(state.route) && breadcrumCountry("Country", "state", "City") }}>{state.City}</span></span>}
                            {Boolean(state.route) && <span> {">"} <span>{state.route}</span></span>}
                        </div>
                        {DispensorShopLocation?.map((ele, index) => {
                            return (
                                <div key={index}>

                                    <h1 className="m-0"> <span className="dispensories_name">{ele.name}</span> <span className="dispensories_city">{ele.city}</span></h1>
                                </div>
                            )
                        })}
                        <p className="m-0">{`Find Nearby Dispensaries in ${state?.Location} for Recreational & Medical weed. Browse Top Cannabis Products and Place Orders from Trusted Local Dispensaries.`}</p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 dispensory_menu my-2">
                    {
                        loader ?
                            (Store?.length !== 0 ?
                                <Box className={`dispensories_tabss ${classes.dispensory_tab_background}`} sx={{ width: '100%' }}>
                                    <Box className={classes.open_dispensory_tab} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs scrollButtons={false} variant="scrollable" sx={{ justifyContent: 'space-around' }} value={value} onChange={handleChange} aria-label="basic tabs example">
                                            <Tab label="Open" {...a11yProps(0)} />
                                            <Tab label="Storefronts" {...a11yProps(1)} />
                                            <Tab label="delivery" {...a11yProps(2)} />
                                            <Tab label="Order online" {...a11yProps(3)} />
                                        </Tabs>
                                    </Box>
                                    <Box sx={{ "& .MuiBox-root": { paddingLeft: "0px", paddingRight: "0px", paddingTop: "20px" } }}>
                                        <TabPanel value={value} index={0}>
                                            <WeedDispansires Store={Store} SetStore={SetStore} searchtext={searchtext} setsearchtext={setsearchtext} contentdata={contentdata} />
                                        </TabPanel>
                                        <TabPanel value={value} index={1}>
                                            <WeedDispansires Store={Store} SetStore={SetStore} searchtext={searchtext} setsearchtext={setsearchtext} contentdata={contentdata} />
                                        </TabPanel>
                                        <TabPanel value={value} index={2}>
                                            <WeedDispansires Store={Store} SetStore={SetStore} searchtext={searchtext} setsearchtext={setsearchtext} contentdata={contentdata} />
                                        </TabPanel>
                                        <TabPanel value={value} index={3}>
                                            <WeedDispansires Store={Store} SetStore={SetStore} searchtext={searchtext} setsearchtext={setsearchtext} contentdata={contentdata} />
                                        </TabPanel>
                                    </Box>

                                </Box>
                                :

                                <Wronglocation title={' No dispensaries available'} description={'We apologize, but it appears that there are no dispensaries available in your location. Would you like to enter a different address to search for a nearby dispensary?'} />

                            )
                            :
                            <Loader />
                    }

                </div>


            </div>
        </RoutingDespen>

    );
};

export default Dispensaries;