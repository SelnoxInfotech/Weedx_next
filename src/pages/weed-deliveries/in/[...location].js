// import DeliveryPickupMenu from "./DeliveriesComponent/DeliveryPickupMenu"
// import DeliveryMenuBar from "./DeliveriesComponent/DeliveryMenuBar/DeliveryMenuBar  "
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Createcontext from "../../../hooks/context"
// import { useLocation, usenavigate.push, Link } from "react-router-dom"
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import axios from "axios"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import useStyles from '../../../styles/style';
import dynamic from 'next/dynamic'
const DeliveryItemsCard = dynamic(() => import('../../../component/DeliveriesComponent/DeliveryMenuBar/DeliveryItemsCards'), { ssr: true });
const Text = dynamic(() => import('../../../layout/text'), { ssr: true });
// import DeliveryItemsCard from "../../../component/DeliveriesComponent/DeliveryMenuBar/DeliveryItemsCards";
import { Delivery } from '../../../component/ScoPage/Deliveries';
import Wronglocation from "../../../component/skeleton/Wronglocation"
import Loader from "../../../component/Loader/Loader";
// import Neighborhood from "../Dispansires/DispansiresComponent/loactoncomponent/Neighborhood";
// import Zipcode from "../Dispansires/DispansiresComponent/loactoncomponent/Zipcode";
import WebContent from "../../../component/WeedDispansires/Webcontent";
import { modifystr } from "../../../hooks/utilis/commonfunction";
import RoutingDespen from '../../../hooks/utilis/Routingdespen';
import Location from '../../../hooks/utilis/getlocation';
import Cookies from 'universal-cookie';
import cookie from 'cookie';
const Deliveries = (props) => {
    const cookies = new Cookies();
    // console.log(props)
    const { state, dispatch } = React.useContext(Createcontext)
    const locations = props.formatted_address
    const Location = useRouter()
    const navigate = useRouter()
    // console.log(props)

    const [contentdata, setcontentdata] = React.useState([])


    React.useEffect(() => {
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
            console.log(country, state, city, route)
            // Build the URL based on available location data
            let url = '/weed-deliveries/in/';
            if (route) {
                url += `${modifystr(country) || 'default-country'}/${modifystr(state) || 'default-state'}/${modifystr(city)}/${modifystr(route)}`;
            }
            else if (city) {
                url += `${modifystr(country) || 'default-country'}/${modifystr(state) || 'default-state'}/${modifystr(city)}`;
            } else if (state) {
                url += `${modifystr(country) || 'default-country'}/${modifystr(state)}`;
            } else if (country) {
                url += modifystr(country);
            } else {
                url = '/weed-deliveries/default-country'; // Fallback URL
            }

            // Use shallow routing to navigate to the constructed URL

            props.isDirectHit && navigate.replace(url, 0, { shallow: true });
        }
    }, [props.location]);





    const classes = useStyles()
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    function breadcrumCountry(country, state1, city) {
        if (Boolean(city)) {
            dispatch({ type: 'route', route: "" })
            dispatch({ type: 'Location', Location: state.City })
            navigate.replace(`/weed-deliveries/in/${modifystr(state.Country.toLowerCase())}/${modifystr(state.State.toLowerCase())}/${modifystr(state.City.toLowerCase())}`)
        }
        else if (Boolean(state1)) {
            dispatch({ type: 'Location', Location: state.State })
            dispatch({ type: 'City', City: "" })
            dispatch({ type: 'route', route: "" })
            navigate.replace(`/weed-deliveries/in/${modifystr(state.Country)}/${modifystr(state?.State)}`)
        }
        else if (Boolean(country)) {
            dispatch({ type: 'State', State: "" })
            dispatch({ type: 'City', City: "" })
            dispatch({ type: 'route', route: "" })
            dispatch({ type: 'Location', Location: state.Country })
            navigate.replace(`/weed-deliveries/in/${modifystr(state.Country.toLowerCase())}/`)
        }

    }
    return (
        // <RoutingDespen>
        <div>
            <div style={{ cursor: "pointer" }}>
                <span onClick={() => navigate.push("/")}>{"Home"}</span>
                {Boolean(state.Country) && <span> {">"} <span onClick={() => breadcrumCountry("Country")}>{state.Country}</span></span>}
                {Boolean(state.State) && <span> {">"} <span onClick={() => breadcrumCountry("Country", "state")}>{state.State}</span></span>}
                {Boolean(state.City) && <span> {">"} <span onClick={() => { Boolean(state.route) && breadcrumCountry("Country", "state", "City") }}>{state.City}</span></span>}
                {Boolean(state.route) && <span> {">"} <span>{state.route}</span></span>}

            </div>
            <div className="container-fluid">
                <div className="row  deliveries_centers">
                    <div className="headerBoxdescription">
                        <h1 className="m-0">
                            <span className="dispensories_name">Weed Delivery In </span>
                            <span className="dispensories_name">{locations}</span></h1>
                        {/* <Text data= {state.Location}></Text> */}
                        <p className="m-0">{`Find Nearby Weed Delivery in  ${locations}  for Recreational & Medical Uses. Browse Top Cannabis Products and Place Orders from Trusted weed delivery near you.`}</p>

                    </div>

                    <div className="col-lg-12 col-11 delivery_menuBar_container px-0 mt-4">
                        <Delivery location={Location.asPath} formatted_address={props?.formatted_address} ></Delivery>
                        {
                            (Boolean(props?.store.length) ?

                                <Box className={``} sx={{ width: '100%', typography: 'body1', }}>
                                    <TabContext value={value}>
                                        <Box className={`${classes.open_dispensory_tab_background} ${classes.open_dispensory_tab}`} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <TabList scrollButtons={false} variant="scrollable" onChange={handleChange} aria-label="lab API tabs example">
                                                <Tab label="Order Online" value="1" />
                                                <Tab label="Order now" value="2" />
                                                <Tab label="Best of WeedX" value="3" />
                                                {/* <Tab label="Recreational" value="4" /> */}

                                            </TabList>
                                        </Box>
                                        <Box className={`${classes.deliverItemCardPadding}`}>
                                            <TabPanel value="1"><DeliveryItemsCard Deliverie={props?.store} /></TabPanel>
                                            <TabPanel value="2"><DeliveryItemsCard Deliverie={props?.store} /></TabPanel>
                                            <TabPanel value="3"><DeliveryItemsCard Deliverie={props?.store} /></TabPanel>
                                        </Box>
                                    </TabContext>
                                </Box>
                                :
                                <Wronglocation title={'No deliveries available'} description={`Delivery service isn't available at your location. Would you like to try a different address ?`} />)

                        }
                    </div>
                    {contentdata.length !== 0 &&
                        contentdata?.Faq[0]?.title !== '' &&
                        <>  <h3 className="section_main_title">FAQs</h3>

                            <div className="row">
                                {
                                    contentdata?.Faq?.map((item, index) => {
                                        return <div className="col-lg-6 webContent my-2" key={index}> <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                <h3 >{item.title}</h3>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <p>{item.answer}</p>
                                            </AccordionDetails>
                                        </Accordion></div>
                                    })
                                }

                            </div></>}


                    {Boolean(props?.store) &&
                        <WebContent modifystr={modifystr} product={props?.product} Store={props?.store} state={state} from={"delivery"} url={'deliveries'} location={locations}></WebContent>
                    }
                </div>
            </div>

        </div>
    )
}
export default Deliveries

export async function GetAllDelivery(object) {
    try {
        const response = await fetch('https://api.cannabaze.com/UserPanel/Get-DeliveryStores/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object),
        });

        const data = await response.json();

        if (data.length) {
            const result = data.reduce((acc, current) => {
                const x = acc.find(item => item.id === current.id);
                if (!x) {
                    const newCurr = {
                        Store_Name: current.Store_Name,
                        Category: [{ [current.Category]: current.ProductCount }],
                        id: current.id,
                        Store_Image: current.Store_Image,
                        Store_Address: current.Store_Address,
                        rating: current.rating,
                        TotalRating: current.TotalRating,
                        DeliveryTime: current.SetbyMin,
                        DeliveryPrice: current.DeliveryPrice,
                    };
                    return acc.concat([newCurr]);
                } else {
                    const currData = x.Category.filter(d => d === current.Category);
                    if (!currData.length) {
                        x.Category.push({ [current.Category]: current.ProductCount });
                    }
                    return acc;
                }
            }, []);

            return result;
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
}

export const getServerSideProps = async (context) => {

    const cookies = cookie.parse(context.req.headers.cookie || '');
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    const { req, query } = context;
    const { headers: { referer }, url } = req;
    const isDirectHit = !referer || referer === req.url;


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
    let country1 = "", state = "", city = "", formatted_address = "" , route="";

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
        route= k.route ,
        formatted_address = k.formatted_address || "";

    } else {
        formatted_address = JSON.parse(cookies.fetchlocation).formatted_address
        country1 = locationParams[0] || "";
        state = locationParams[1] || "";
        city = locationParams[2] || "";
        route= locationParams[3] || "";
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
        const response = await GetAllDelivery(object);
        // const data = await response;
        const data = await response;
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
                        route:route,
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
                        route:route,
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
