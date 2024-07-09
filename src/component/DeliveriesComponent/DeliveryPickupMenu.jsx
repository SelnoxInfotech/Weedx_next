// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
// import useStyles from "../../../../Style"
// import DeliveryMenuBar from "./DeliveryMenuBar/DeliveryMenuBar"
// import axios from 'axios';
// const DeliveryPickupMenu = () => {
//     const classes = useStyles()
//     const [value, setValue] = React.useState('1');

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };

//     const [Deliverie, SetDelivery] = React.useState([])
//     const [Pickup , SetPickup] = React.useState([])
//     React.useEffect(() => {
//         axios.get(
//             'https://api.cannabaze.com/UserPanel/Get-DeliveryStores/',
//         ).then(response => {
            
//             SetDelivery(response.data)
//         }).catch(
//             function (error) {

//             })
//             axios.get(
//                 'https://api.cannabaze.com/UserPanel/Get-PickupStores/',
//             ).then(response => {
                
//                 SetPickup(response.data)
//             }).catch(
//                 function (error) {
    
//                 })
//     }, [])



//     return (
//         <>
//             <div className="col-lg-12 col-12">
//                 <Box sx={{ width: '100%', typography: 'body1' }}>
//                     <TabContext value={value}>
//                         <Box className={`deliveries_pickup_menu_fontSize ${classes.open_dispensory_tab_background} ${classes.open_dispensory_tab}`} sx={{ borderBottom: 0, borderColor: 'divider' }}>
//                             <TabList onChange={handleChange} aria-label="lab API tabs example">
//                                 <Tab label="Delivery" value="1" />
//                                 <Tab label="Pickup" value="2" />
//                             </TabList>
//                         </Box>
//                         <Box className={classes.delivery_menuBar}>
//                             <TabPanel value="1">
//                                 <DeliveryMenuBar Deliverie={Deliverie} />
//                             </TabPanel>
//                             <TabPanel value="2">
//                                 <DeliveryMenuBar Deliverie={Pickup} />
//                             </TabPanel>
//                         </Box>
//                     </TabContext>
//                 </Box>

//             </div>
//         </>
//     )
// }
// export default DeliveryPickupMenu