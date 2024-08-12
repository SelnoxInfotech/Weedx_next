import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import useStyles from '../../../../../Style';
import DeliveryItemsCard from "./DeliveryItemsCards";
import Createcontext from "../../../../../Hooks/Context"
import { Delivery } from '../../../../Component/ScoPage/Deliveries';
import { GetAllDelivery } from "../../../../../Api/Api"
import { useLocation } from 'react-router-dom';
const DeliveryMenuBar = () => {
    const location =  useLocation()
    const { state } = React.useContext(Createcontext)
    const [idload , setidload]= React.useState(false)
    const [Deliverie, SetDelivery] = React.useState([])
    React.useEffect(() => {
           setidload(true)
            const object = { City: state.City.replace(/-/g, " ") , State: state.State.replace(/-/g, " "), Country: state.Country.replace(/-/g, " ") }
            GetAllDelivery(object).then((response) => {
                if (response?.length !== 0) {
                    SetDelivery(response)
                    setidload(false)
                }
                else{
                    SetDelivery([])
                    setidload(false)
                }
            })
    }, [state])
    const classes = useStyles()
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <React.Fragment>
            <div className="col-lg-12 col-11 delivery_menuBar_container px-0 mt-4">
                <Delivery location={location.pathname}></Delivery>
                <Box className={``} sx={{ width: '100%', typography: 'body1', }}>
                    <TabContext value={value}>
                        <Box className={`${classes.open_dispensory_tab_background} ${classes.open_dispensory_tab}`} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList scrollButtons={false} variant="scrollable" onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Order Online" value="1" />
                                {/* <Tab label="Order now" value="2" />
                                <Tab label="Best of WeedX" value="3" /> */}
                                {/* <Tab label="Recreational" value="4" /> */}

                            </TabList>
                        </Box>
                        <Box className={`${classes.deliverItemCardPadding}`}>
                            <TabPanel value="1" ><DeliveryItemsCard Deliverie={Deliverie} /></TabPanel>
                            <TabPanel value="2"><DeliveryItemsCard Deliverie={Deliverie} /></TabPanel>
                            <TabPanel value="3"><DeliveryItemsCard Deliverie={Deliverie} /></TabPanel>
                        </Box>
                    </TabContext>
                </Box>
            </div>
          {/* {idload &&  <Loader/>} */}
        </React.Fragment>
    )
}
export default DeliveryMenuBar