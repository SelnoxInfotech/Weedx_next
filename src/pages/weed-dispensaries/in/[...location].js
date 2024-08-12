import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useStyles from "@/styles/style";
import dynamic from 'next/dynamic'
const WeedDispansires = dynamic(() => import('../../../component/WeedDispansires/Weed_Dispansires'));
import Createcontext from "@/hooks/context"
// import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
// import { useSession } from 'next-session';
import { useRouter } from 'next/router';
import axios, { Axios } from "axios";
import { DespensioriesItem } from '../../../hooks/apicall/api';
import Wronglocation from "../../../component/skeleton/Wronglocation";
import { modifystr } from "../../../hooks/utilis/commonfunction";
import Loader from "../../../component/Loader/Loader";
import Location from '../../../hooks/utilis/getlocation';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
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



const Dispensaries = (props) => {

    const classes = useStyles()
    const [searchtext, setsearchtext] = React.useState("");
    const navigate = useRouter()
    const Location = useRouter()
    const { state, dispatch } = React.useContext(Createcontext)
    const [value, setValue] = React.useState(0);

    const [contentdata, setcontentdata] = React.useState([])
    const DispensorShopLocation = [{ name: "Weed Dispensaries in", city: props.location.formatted_address }]
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // React.useEffect(() => {
    //     const sendPostRequest = () => {
    //         axios.post(
    //             `https://api.cannabaze.com/UserPanel/Update-SiteMap/14`,
    //             {
    //                 j: 'https://www.weedx.io' + modifystr(Location?.pathname.replace(/\/+$/, ""))
    //             }
    //         ).then((res) => {
    //         }).catch((err) => {
    //         });
    //     };


    //     const timeoutId = setTimeout(sendPostRequest, 2000);

    //     return () => clearTimeout(timeoutId);
    // }, [Location]);

    // React.useEffect(() => {

    //     if (searchtext !== "") {
    //         const getData = setTimeout(() => {
    //             const json = {
    //                 "store": searchtext,
    //                 "City": state.City,
    //                 "Country": state.Country?.replace(/-/g, " "),
    //                 "State": state.State?.replace(/-/g, " "),
    //             }
    //             Axios.post(`https://api.cannabaze.com/UserPanel/FilterDispensaries/`,
    //                 json
    //             ).then(function (response) {
    //                 setloader(true)
    //                 SetStore(() => response?.data);
    //             })
    //                 .catch(function (error) {
    //                     setloader(true)
    //                     console.trace(error);
    //                 });
    //         }, 1000)
    //         return () => clearTimeout(getData)
    //     } else {
    //         const sendPostRequest = () => {
    //             try {
    //                 const object = { City: state.City.replace(/-/g, " "), "Country": state.Country?.replace(/-/g, " "), "State": state.State?.replace(/-/g, " "), }
    //                 // state.Country !== "" && DespensioriesItem(object)
    //                 //     .then((res) => {

    //                 //         if (res === "No Dispensary in your area") {
    //                 //         }
    //                 //         else {
    //                 //             SetStore(res)
    //                 //         }
    //                 //         setloader(true)

    //                 //     })

    //                 axios.post(`https://api.cannabaze.com/UserPanel/Get-WebpageDescriptionDispensary/`, { ...object }

    //                 ).then((res) => {
    //                     setcontentdata(res.data)
    //                 })

    //             } catch (error) {

    //             }
    //         }
    //         const timeoutId = setTimeout(sendPostRequest, 1000);
    //         return () => clearTimeout(timeoutId);
    //     }
    // }, [searchtext, state])

React.useEffect(()=>{
    dispatch({ type: 'Location', Location: props.location.formatted_address })
    dispatch({ type: 'permission', permission: true });
    dispatch({ type: 'Country', Country: props.location.country});
    dispatch({ type: 'countrycode', countrycode: props.location.countrycode });
    dispatch({ type: 'State', State: props.location.state });
    dispatch({ type: 'statecode', statecode: props.location.statecode });
    dispatch({ type: 'City', City: props.location.city })
    dispatch({ type: 'citycode', citycode: props.location.citycode});
    dispatch({ type: 'route', route: props.location.route });
},[props])

    function breadcrumCountry(country, state1, city) {
        if (Boolean(city)) {
            dispatch({ type: 'route', route: "" })
            dispatch({ type: 'Location', Location: state.City })
            navigate.push(`/weed-dispensaries/in/${modifystr(state.Country.toLowerCase())}/${modifystr(state.State.toLowerCase())}/${modifystr(state.City.toLowerCase())}`)
        }
        else if (Boolean(state1)) {
            dispatch({ type: 'Location', Location: state.State })
            dispatch({ type: 'City', City: "" })
            dispatch({ type: 'route', route: "" })
            navigate.push(`/weed-dispensaries/in/${modifystr(state.Country)}/${modifystr(state?.State)}`)
        }
        else if (Boolean(country)) {
            dispatch({ type: 'State', State: "" })
            dispatch({ type: 'City', City: "" })
            dispatch({ type: 'route', route: "" })
            dispatch({ type: 'Location', Location: state.Country })
            navigate.push(`/weed-dispensaries/in/${modifystr(state.Country.toLowerCase())}/`)
        }

    }

    return (
                <div className="w-100 mx-auto  dispensaries_centers">
                    <div className="w-100">
                        <div className="headerBoxdescription">
                            <div style={{ cursor: "pointer" }}>

                                <span onClick={() => navigate.push("/")}>{"Home"}</span>
                                {Boolean(props.location.country) && <span> {">"} <span onClick={() => breadcrumCountry("Country")}>{props.location.country}</span></span>}
                                {Boolean(props.location.state) && <span> {">"} <span onClick={() => breadcrumCountry("Country", "state")}>{props.location.state}</span></span>}
                                {Boolean(props.location.city) && <span> {">"} <span onClick={() => { Boolean(props.location.route) && breadcrumCountry("Country", "state", "City") }}>{props.location.city}</span></span>}
                                {Boolean(props.location.route) && <span> {">"} <span>{props.location.route}</span></span>}
                            </div>
                            {DispensorShopLocation?.map((ele, index) => {
                                return (
                                    <div key={index}>

                                        <h1 className="m-0"> <span className="dispensories_name">{ele.name}</span> <span className="dispensories_name">{ele.city}</span></h1>
                                    </div>
                                )
                            })}
                            <p className="m-0">{`Find Nearby Dispensaries in ${props.location.formatted_address} for Recreational & Medical weed. Browse Top Cannabis Products and Place Orders from Trusted Local Dispensaries.`}</p>
                        </div>
                    </div>
                    <div className="w-100 dispensory_menu my-2">
                        {
                                (props.store?.length !== 0 ?
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
                                                <WeedDispansires Store={props.store} location={props.location} product={props.product} searchtext={searchtext} setsearchtext={setsearchtext} contentdata={contentdata} />
                                            </TabPanel>
                                            <TabPanel value={value} index={1}>
                                                <WeedDispansires Store={props.store} location={props.location} product={props.product} searchtext={searchtext} setsearchtext={setsearchtext} contentdata={contentdata} />
                                            </TabPanel>
                                            <TabPanel value={value} index={2}>
                                                <WeedDispansires Store={props.store} location={props.location}  product={props.product} searchtext={searchtext} setsearchtext={setsearchtext} contentdata={contentdata} />
                                            </TabPanel>
                                            <TabPanel value={value} index={3}>
                                                <WeedDispansires Store={props.store} location={props.location} product={props.product}  searchtext={searchtext} setsearchtext={setsearchtext} contentdata={contentdata} />
                                            </TabPanel>
                                        </Box>

                                    </Box>
                                    :

                                     <Wronglocation title={' No dispensaries available'} description={'We apologize, but it appears that there are no dispensaries available in your location. Would you like to enter a different address to search for a nearby dispensary?'} />
                                    
                                    
                                )
                        }

                    </div>
                </div>
    );
};

export default Dispensaries;


export const getStaticPaths = async () => {
    // Fetch the list of locations or define them statically
    const locations = [
        ['united-states', 'new-york',],
    ];

    const paths = locations.map(location => ({
        params: { location },
    }));

    return { paths, fallback: "blocking" };
};

export const getStaticProps = async (context) => {

    
    const locationParams = context.params.location;
    const decodedLocation = locationParams.map((param) => decodeURIComponent(param)).join(' ');
    const k = await Location(decodedLocation)

    const transformString = (str) => {
        return str
            .replace(/-/g, " ")  // Replace hyphens with spaces
            .split(' ')          // Split the string into an array of words
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalize the first letter of each word
            .join(' ');          // Join the words back into a single string
    };

    const object = {
        City: transformString(k.city || ''),
        Country: transformString(k.country || ''),
        State: transformString(k.state || ''),
    };
    const object1 = {
        City: transformString(k.city || ''),
        Country: transformString(k.country || ''),
        State: transformString(k.state || ''),
        limit:10
    };
    let product = [];
    try {
        const response = await fetch('https://api.cannabaze.com/UserPanel/Get-Dispensaries/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch');
        }

        const data = await response.json();

        const GetProduct = async (obj) => {
            const productResponse = await fetch('https://api.cannabaze.com/UserPanel/Get-AllProduct/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });

            if (!productResponse.ok) {
                throw new Error('Failed to fetch products');
            }

            const productData = await productResponse.json();
            return productData;
        };
 
        const productData = await GetProduct(object1);
        product = productData?.filter(item => item.Store_Type === "dispensary");

        if (data === "No Dispensary in your area") {
            return {
                props: {
                    store: [],
                    product: [],
                    location:k
                },
                revalidate: 60
            };
        } else {
            return {
                props: {
                    store: data,
                    product: product ,
                    location:k
                },
                revalidate: 60
            };
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            notFound: true,
        };
    }
};
