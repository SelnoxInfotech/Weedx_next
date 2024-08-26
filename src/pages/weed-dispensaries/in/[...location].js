import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useStyles from "@/styles/style";
import dynamic from 'next/dynamic'
const WeedDispansires = dynamic(() => import('../../../component/WeedDispansires/Weed_Dispansires'));
const DispensariesSco = dynamic(() => import('../../../component/ScoPage/dispensariessco'), { ssr: true });
// import { DispensariesSco } from "../ScoPage/dispensariessco"
import Createcontext from "@/hooks/context"
import { useRouter } from 'next/router';
import Wronglocation from "../../../component/skeleton/Wronglocation";
import { modifystr } from "../../../hooks/utilis/commonfunction";
import Location from '../../../hooks/utilis/getlocation';
import Cookies from 'universal-cookie';
import cookie from 'cookie';
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
    const cookies = new Cookies();
    const classes = useStyles()
    const [searchtext, setsearchtext] = React.useState("");
    const navigate = useRouter()
    const { state, dispatch } = React.useContext(Createcontext)
    const [value, setValue] = React.useState(0);
    const [contentdata, setcontentdata] = React.useState([])
    const DispensorShopLocation = [{ name: "Weed Dispensaries in", city: props.formatted_address || state.Location }]
    const locations = props?.formatted_address
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
    //   console.log( props.location)


    // React.useEffect(() => {
    //     dispatch({ type: 'Location', Location: props?.formatted_address  })

    //     // navigate.push(`/weed-dispensaries/${props.location.country || 'default-country'}/${props.location.state || 'default-state'}/${props.location.city || 'default-city'}`,undefined ,  { shallow: false });
    // }, [props])


    React.useEffect(() => {
        console.log(props.isDirectHit, props.location)
        dispatch({ type: 'Location', Location: props?.formatted_address })
        if (props.isDirectHit)
            dispatch({ type: 'permission', permission: true });
        dispatch({ type: 'Country', Country: props?.location?.country });
        dispatch({ type: 'countrycode', countrycode: props.location?.countrycode });
        dispatch({ type: 'State', State: props?.location?.state });
        dispatch({ type: 'statecode', statecode: props?.location?.statecode });
        dispatch({ type: 'City', City: props?.location?.city })
        dispatch({ type: 'citycode', citycode: props?.location?.citycode });
        dispatch({ type: 'route', route: props?.location?.route });
        const setLocation = {
            country: props?.location?.country,
            state: props?.location?.state,
            city: props?.location?.city,
            route:props?.location?.route,
            formatted_address: props?.formatted_address
        };
        const date = new Date();
        date.setTime(date.getTime() + 60 * 60 * 24 * 365); // 1 year expiry
        props.isDirectHit && cookies.set('fetchlocation', JSON.stringify(setLocation), {
            expires: date,
            path: '/' // Set the path where the cookie is accessible
        });

        {
            const { country, state, city, route } = props.location || {};
            // Build the URL based on available location data
            let url = '/weed-dispensaries/in/';
            if (Boolean(route)) {
                url += `${modifystr(country) || 'default-country'}/${modifystr(state) || 'default-state'}/${modifystr(city)}/${modifystr(route)}`;
            }
            else if (Boolean(city)) {
                url += `${modifystr(country) || 'default-country'}/${modifystr(state) || 'default-state'}/${modifystr(city)}`;
            } else if (Boolean(state)) {
                url += `${modifystr(country) || 'default-country'}/${modifystr(state)}`;
            } else if (Boolean(country)) {
                url += modifystr(country);
            } else {
                url = '/weed-dispensaries/default-country'; // Fallback URL
            }

            // Use shallow routing to navigate to the constructed URL

            props.isDirectHit && navigate.replace(url, 0, { shallow: true });
        }
    }, [props.location]);

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
            <DispensariesSco location={navigate?.asPath} format_Address={props?.formatted_address} ></DispensariesSco>
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
                            </div>)
                    })}
                    <p className="m-0">{`Find Nearby Dispensaries in ${props.formatted_address} for Recreational & Medical weed. Browse Top Cannabis Products and Place Orders from Trusted Local Dispensaries.`}</p>
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
                                    <WeedDispansires Store={props.store} location={locations} product={props.product} searchtext={searchtext} setsearchtext={setsearchtext} contentdata={contentdata}  urlcscr = {props.location}/>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <WeedDispansires Store={props.store} location={locations} product={props.product} searchtext={searchtext} setsearchtext={setsearchtext} contentdata={contentdata}  urlcscr = {props.location}/>
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <WeedDispansires Store={props.store} location={locations} product={props.product} searchtext={searchtext} setsearchtext={setsearchtext} contentdata={contentdata}  urlcscr = {props.location}/>
                                </TabPanel>
                                <TabPanel value={value} index={3}>
                                    <WeedDispansires Store={props.store} location={locations} product={props.product} searchtext={searchtext} setsearchtext={setsearchtext} contentdata={contentdata} urlcscr = {props.location} />
                                </TabPanel>
                            </Box>
                        </Box>
                        :
                        <Wronglocation  title={' No dispensaries available'} description={'We apologize, but it appears that there are no dispensaries available in your location. Would you like to enter a different address to search for a nearby dispensary?'} />
                    )
                }
            </div>
        </div>
    );
};
export const getServerSideProps = async (context) => {
    const cookies = cookie.parse(context.req.headers.cookie || '');
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    const { req, query } = context;
    const { headers: { referer }, url } = req;
    const isDirectHit = !referer || referer === req.url;
    // console.log(req.url , "urlx")

    const transformString = (str) => {
        if (typeof str !== "string" || !str.trim()) {
            return '';
        }

        return str
            .replace(/-/g, " ")  // Replace hyphens with spaces
            .split(' ')          // Split the string into an array of words
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  // Capitalize the first letter of each word
            .join(' ');          // Join the words back into a single string
    };

    const locationParams = context.params.location || [];
    let country1 = "", state = "", city = "", formatted_address = "", route = "";

    let type = {
        country: locationParams[0] || "",
        state: locationParams[1] || "",
        city: locationParams[2] || "",
        route: locationParams[3] || ""
    };

    if (isDirectHit) {
        const decodedLocation = locationParams.map((param) => decodeURIComponent(param)).reverse().join(' ');
        const k = await Location(decodedLocation, type);
        country1 = k.country || "";
        state = k.state || "";
        city = k.city || "";
        route = k.route || ""
        formatted_address = k.formatted_address || "";
    } else {
        formatted_address = JSON.parse(cookies.fetchlocation).formatted_address
        country1 = locationParams[0] || "";
        state = locationParams[1] || "";
        city = locationParams[2] || "";
    }

    const object = {
        City: transformString(city) || '',
        Country: transformString(country1) || '',
        State: transformString(state) || '',
    };

    const object1 = {
        ...object,
        limit: 10
    };

    try {
        const response = await fetch('https://api.cannabaze.com/UserPanel/Get-Dispensaries/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch dispensaries');
        }

        const data = await response.json();

        const productResponse = await fetch('https://api.cannabaze.com/UserPanel/Get-AllProduct/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object1)
        });

        if (!productResponse.ok) {
            throw new Error('Failed to fetch products');
        }

        const productData = await productResponse.json();
        const products = productData?.filter(item => item.Store_Type === "dispensary");

        if (data === "No Dispensary in your area") {
            return {
                props: {
                    store: [],
                    product: [],
                    location: {
                        country: country1,
                        state: state,
                        city: city,
                        route: route,
                    },
                    formatted_address: formatted_address,
                    isDirectHit
                }
            };
        } else {
            return {
                props: {
                    store: data,
                    product: products,
                    location: {
                        country: country1,
                        state: state,
                        city: city,
                        route: route,
                    },
                    formatted_address: formatted_address,
                    isDirectHit
                }
            };
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            notFound: true
        };
    }
};


export default Dispensaries;