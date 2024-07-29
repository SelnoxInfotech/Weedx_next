// import DeliveryPickupMenu from "./DeliveriesComponent/DeliveryPickupMenu"
// import DeliveryMenuBar from "./DeliveriesComponent/DeliveryMenuBar/DeliveryMenuBar  "
import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Createcontext from "../../../hooks/context"
// import { useLocation, usenavigate.push, Link } from "react-router-dom"
import { useRouter } from 'next/router';
import axios from "axios"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import useStyles from '../../../styles/style';
import dynamic from 'next/dynamic'
const DeliveryItemsCard = dynamic(() => import('../../../component/DeliveriesComponent/DeliveryMenuBar/DeliveryItemsCards') , {ssr:true});
const Text = dynamic(() => import('../../../layout/text') , {ssr:true});
// import DeliveryItemsCard from "../../../component/DeliveriesComponent/DeliveryMenuBar/DeliveryItemsCards";
import { Delivery } from '../../../component/ScoPage/Deliveries';
import { GetAllDelivery } from "../../../hooks/apicall/api"
import Wronglocation from "../../../component/skeleton/Wronglocation"
import Loader from "../../../component/Loader/Loader";
// import Neighborhood from "../Dispansires/DispansiresComponent/loactoncomponent/Neighborhood";
// import Zipcode from "../Dispansires/DispansiresComponent/loactoncomponent/Zipcode";
import WebContent from "../../../component/WeedDispansires/Webcontent";
import { modifystr } from "../../../hooks/utilis/commonfunction";
import RoutingDespen from '../../../hooks/utilis/Routingdespen';
import Location from '../../../hooks/utilis/getlocation';
import Cookies from 'universal-cookie';

const Deliveries = (props) => {
    const { state, dispatch } = React.useContext(Createcontext)

    const Location = useRouter()
    const navigate = useRouter()
    // console.log(props)

    const [contentdata, setcontentdata] = React.useState([])

    React.useEffect(() => {
        dispatch({ type: 'Location', Location: props?.location.formatted_address })
        dispatch({ type: 'permission', permission: true });
        dispatch({ type: 'Country', Country: props?.location.country });
        dispatch({ type: 'countrycode', countrycode: props?.location.countrycode });
        dispatch({ type: 'State', State: props?.location.state });
        dispatch({ type: 'statecode', statecode: props?.location.statecode });
        dispatch({ type: 'City', City: props?.location.city })
        dispatch({ type: 'citycode', citycode: props?.location.citycode });
        dispatch({ type: 'route', route: props?.location.route });

    }, [props])
    // console.log(props)



    const classes = useStyles()
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    function breadcrumCountry(country, state1, city) {
        if (Boolean(city)) {
            dispatch({ type: 'route', route: "" })
            dispatch({ type: 'Location', Location: state.City })
            navigate.push(`/weed-deliveries/in/${modifystr(state.Country.toLowerCase())}/${modifystr(state.State.toLowerCase())}/${modifystr(state.City.toLowerCase())}`)
        }
        else if (Boolean(state1)) {
            dispatch({ type: 'Location', Location: state.State })
            dispatch({ type: 'City', City: "" })
            dispatch({ type: 'route', route: "" })
            navigate.push(`/weed-deliveries/in/${modifystr(state.Country)}/${modifystr(state?.State)}`)
        }
        else if (Boolean(country)) {
            dispatch({ type: 'State', State: "" })
            dispatch({ type: 'City', City: "" })
            dispatch({ type: 'route', route: "" })
            dispatch({ type: 'Location', Location: state.Country })
            navigate.push(`/weed-deliveries/in/${modifystr(state.Country.toLowerCase())}/`)
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
                            <span className="dispensories_city">{props?.location.formatted_address }</span></h1>
                            {/* <Text data= {state.Location}></Text> */}
                        <p className="m-0">{`Find Nearby Weed Delivery in  ${props?.location.formatted_address}  for Recreational & Medical Uses. Browse Top Cannabis Products and Place Orders from Trusted weed delivery near you.`}</p>

                    </div>

                    <div className="col-lg-12 col-11 delivery_menuBar_container px-0 mt-4">
                        <Delivery location={Location.asPath}></Delivery>
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
                    {/* <div className="col-12 webContent">
                        <h2 className="section_main_title">{contentdata?.Title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: contentdata?.Content }} />
                    </div> */}
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
                        <WebContent modifystr={modifystr} product={props?.product} Store={props?.store} state={state} from={"delivery"} url={'deliveries'} location={props?.location}></WebContent>
                    }
                </div>
            </div>

        </div>
    )
}
export default Deliveries


export const getStaticPaths = async () => {
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

    const k = await Location(decodedLocation);

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
        limit: 10
    };

    try {
        const response = await GetAllDelivery(object);
        const data = await response;

        const fetchProducts = async (obj) => {
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

        const fetchWebContent = async (obj) => {
            const webResponse = await fetch('https://api.cannabaze.com/UserPanel/Get-AllProduct/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });

            if (!webResponse.ok) {
                throw new Error('Failed to fetch web content');
            }

            const webContentData = await webResponse.json();
            return webContentData;
        };

        const productData = await fetchProducts(object1);
        const WebContent = await fetchWebContent(object1);

        const product = productData?.filter(item => item.Store_Type === "delivery");

        if (data.length === 0) {
            return {
                props: {
                    store: [],
                    product: [],
                    location: k,
                    WebContent
                }
            };
        } else {
            return {
                props: {
                    store: data,
                    product: product,
                    location: k,
                    WebContent
                }
            };
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            notFound: true,
        };
    }
};


