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
import Cookies from 'universal-cookie';
 
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
    const DispensorShopLocation = [{ name: "Weed Dispensaries in", city: props.formatted_address }]
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

    React.useEffect(() => {
        dispatch({ type: 'Location', Location: props?.formatted_address })
        // dispatch({ type: 'permission', permission: true });
        // dispatch({ type: 'Country', Country: props?.location?.country });
        // dispatch({ type: 'countrycode', countrycode: props.location?.countrycode });
        // dispatch({ type: 'State', State: props?.location?.state });
        // dispatch({ type: 'statecode', statecode: props?.location?.statecode });
        // dispatch({ type: 'City', City: props?.location?.city })
        // dispatch({ type: 'citycode', citycode: props?.location?.citycode });
        // dispatch({ type: 'route', route: props?.location?.route });
        // navigate.push(`/weed-dispensaries/${props.location.country || 'default-country'}/${props.location.state || 'default-state'}/${props.location.city || 'default-city'}`,undefined ,  { shallow: false });
    }, [props])

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

                                <h1 className="m-0"> <span className="dispensories_name">{ele.name}</span> <span className="dispensories_city">{ele.city}</span></h1>
                            </div>
                        )
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
                                    <WeedDispansires Store={props.store} location={props.location} product={props.product} searchtext={searchtext} setsearchtext={setsearchtext} contentdata={contentdata} />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <WeedDispansires Store={props.store} location={props.location} product={props.product} searchtext={searchtext} setsearchtext={setsearchtext} contentdata={contentdata} />
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <WeedDispansires Store={props.store} location={props.location} product={props.product} searchtext={searchtext} setsearchtext={setsearchtext} contentdata={contentdata} />
                                </TabPanel>
                                <TabPanel value={value} index={3}>
                                    <WeedDispansires Store={props.store} location={props.location} product={props.product} searchtext={searchtext} setsearchtext={setsearchtext} contentdata={contentdata} />
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


// export const getStaticPaths = async () => {
//     // Fetch the list of locations or define them statically
//     const locations = [
//         ['united-states', 'new-york',],
//     ];

//     const paths = locations.map(location => ({
//         params: { location },
//     }));

//     return { paths, fallback: "blocking" };
// };

export const getServerSideProps = async (context) => {

    const allCookies = new Cookies(context.req.headers.cookie);
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
    const { req, res } = context
    const locationParams = context.params.location;
    // console.log(locationParams)
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=3600, stale-while-revalidate=3600'
    )
    var country1 = "", state = "", city = "", formatted_address = ""
    let type ={
        country:locationParams[0] ||"" , 
        state:locationParams[1] || "",
        city:locationParams[2] || "",
        route: locationParams[3] || ""
    }
    
    console.log(allCookies?.cookies ,  "cookiasdsadsada1111111111111")
    console.log(allCookies.fetchlocation?.country?.toLowerCase() === locationParams[0]
    && allCookies.fetchlocation?.state?.toLowerCase() === locationParams[1]
    && allCookies.fetchlocation?.city?.toLowerCase() === locationParams[2]
    && allCookies.fetchlocation?.route?.toLowerCase() === locationParams[3])
    if (allCookies.fetchlocation?.country?.toLowerCase() === locationParams[0]
        && allCookies.fetchlocation?.state?.toLowerCase() === locationParams[1]
        && allCookies.fetchlocation?.city?.toLowerCase() === locationParams[2]
        && allCookies.fetchlocation?.route?.toLowerCase() === locationParams[3])
         {
        country1 = locationParams[0]
        state = locationParams[1]
        city = locationParams[2]
        formatted_address = allCookies.setlocation.formatted_address
    }
    else {
        const decodedLocation = locationParams.map((param) => decodeURIComponent(param)).join(' ');
        const k = await Location(decodedLocation, type)
        console.log(k)
        country1 = k.country
        state = k.state
        city = k.city
        formatted_address = k.formatted_address
    }


    const object = {
        City: transformString(city) || '',
        Country: transformString(country1) || '',
        State: transformString(state) || '',
    };
    const object1 = {
        City: transformString(city) || '',
        Country: transformString(country1) || '',
        State: transformString(state) || '',
        limit: 10
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


        console.log(object, object1)
        if (data === "No Dispensary in your area") {
            return {
                props: {
                    store: [],
                    product: [],
                    location: object,
                    formatted_address: formatted_address
                },
                // revalidate: 60
            };
        } else {
            return {
                props: {
                    store: data,
                    product: product,
                    location: object,
                    formatted_address: formatted_address
                },
                // revalidate: 60
            };
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            notFound: true,
        };
    }
};
