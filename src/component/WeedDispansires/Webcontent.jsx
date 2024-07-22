import React, { useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from "next/link";
import Neighborhood from "./loactoncomponent/Neighborhood";
import Zipcode from "./loactoncomponent/Zipcode";
import {GetProduct} from '../../hooks/apicall/api'
const WebContent = ({ state, Store = [], modifystr, from , url }) => {
    const [Product, SetProduct] = React.useState([])    
    function getediblelist() {
        Store?.forEach((item) => {
            item?.Category?.forEach((items) => {
                if ("EDIBLES" in items) {
                }
            })
        })
    }
    useEffect(() => {
        Store?.forEach((item) => {
            item?.Category?.forEach((items) => {
                if ("EDIBLES" in items) {
                }
            })
        })
    }, [Store])
    useEffect(()=>{
        const object = {
            City: state.City.replace(/-/g, " "),
            Country: state.Country.replace(/-/g, " "),
            State: state.State.replace(/-/g, " ")
        }
       
        GetProduct(object).then((response) => {
           
            if(url === 'dispensaries'){
                let desinesery =response?.data?.filter((item)=>{
                    return item.Store_Type==="dispensary"
                })
                SetProduct(desinesery)
            }else{
                let desinesery =response?.data?.filter((item)=>{
                    return item.Store_Type==="delivery"
                })
                SetProduct(desinesery)
            }
        })
    },[state])
    return (
        <div >
            <div className="col-12 webContent">
                <h2 className="section_main_title">{`Discover the Best Cannabis ${from} in ${state.Location}`} </h2>
                <div style={{ display: "grid", gap: "8px" }}>
                    <p>{`Explore top-rated weed ${from} in ${state.Location} with Weedx.io. Our platform simplifies the search for trusted recreational and medical ${from} conveniently located near you in ${state.Location} `}</p>
                    <h3>{`Top Weed  ${from} in ${state.Location}:`}</h3>
                    {Boolean(Store?.length) && <ul>
                        {   Store?.filter((item ) => item.rating >= 4)?.map((items , index) => {
                                return <li key={index}><Link href={`/weed-${url}/${items.Store_Name.replace(/\s/g, '-').toLowerCase()}/${"review"}/${items.id}`}>{items.Store_Name}</Link></li>
                            }).length ===0
                            ?
                            Store?.slice(1,10).map((items , index) => {
                                return <li key={index}><Link href={`/weed-${url}/${items.Store_Name.replace(/\s/g, '-').toLowerCase()}/${"review"}/${items.id}`}>{items.Store_Name}</Link></li>
                            })
                            :
                            Store?.filter((item) => item.rating >= 4)?.map((items , index) => {
                                return <li key={index}><Link href={`/weed-${url}/${items.Store_Name.replace(/\s/g, '-').toLowerCase()}/${"review"}/${items.id}`}>{items.Store_Name}</Link></li>
                            }).slice(0,10)
                        }

                    </ul>
                    }
                    {Boolean(Product?.length) && <>
                            <h3>{`Top Selling Weed ${from} Products in ${state.Location}:`}</h3>
                            <ul> { Product?.slice(0,10)?.map((items , index) => {
                                return <li key={index}><Link href={`/products/${modifystr(items.category_name)}/${modifystr(items.SubcategoryName)}/${modifystr(items.Product_Name)}/${items.id}`}>{items.Product_Name}</Link></li>
                            }) } </ul>
                    </>
                    }
                    <h3>{`Neighborhood weed ${from} Locations  Near ${state.Location}:`}</h3>
                    <Neighborhood></Neighborhood>
                    <h3>{`Zip Codes in ${state.Location} Area:`}</h3>
                    <Zipcode></Zipcode>
                    <h3>{`Popular Searches in ${state.Location}`}</h3>
                    <ul>
                        <li>{`Newest weed ${from} in ${state.Location}`}</li>
                        <li>{`${from} in ${state.Location} with Curbside Pickup`}</li>
                        <li>{`Marrijuana ${from} in ${state.Location} with Delivery Options`}</li>
                        <li>{`Weed ${from} in ${state.Location} Open Late`}</li>
                        <li>{`Medical Cannabis ${from} in ${state.Location}`}</li>
                        <li>{`Recreational Cannabis ${from} in ${state.Location}`}</li>
                        <li>{`cannabis ${from} close to me near ${state.Location}`}</li>
                        <li>{`${from} near me that are open in ${state.Location}`}</li>
                        <li>{`weeds shop near me in ${state.Location}`}</li>
                    </ul>
                </div>
            </div>
            <h3 className="section_main_title">{`FAQs`}</h3>
                {Boolean(Store.length) && <div className="row">
                    <div className="col-lg-6 webContent my-2">
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" >
                                <h3 >{` What are the best weed ${from} in ${state.Location}? `}</h3>
                            </AccordionSummary>
                            <AccordionDetails>
                                <p>
                                    {` Some of the top-rated ${from} in ${state.Location} include `}
                                    <Link href={`/weed-${url}/${modifystr(Store[0]?.Store_Name.toLowerCase())}/${Store[0]?.id}`}>{Store[0]?.Store_Name}</Link>,
                                    <Link href={`/weed-${url}/${modifystr(Store[1]?.Store_Name.toLowerCase())}/${Store[1]?.id}`}>{Store[1]?.Store_Name}</Link> {`and`}
                                    <Link href={`/weed-${url}/${modifystr(Store[2]?.Store_Name.toLowerCase())}/${Store[2]?.id}`}>{Store[2]?.Store_Name}</Link> 
                                
                                </p>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="col-lg-6 webContent my-2">
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" >
                                <h3 >{` Where can I find cannabis ${from} near [Popular Landmark]? `}</h3>
                            </AccordionSummary>
                            <AccordionDetails>
                                <p> {`Popular ${from} near ${state.Location} include `}
                                    <Link href={`/weed-${url}/${modifystr(Store[0]?.Store_Name.toLowerCase())}/${Store[0].id}`}>{Store[0]?.Store_Name}</Link>,
                                    <Link href={`/weed-${url}/${modifystr(Store[1]?.Store_Name.toLowerCase())}/${Store[1]?.id}`}>{Store[1]?.Store_Name}</Link>
                                    {`and`}
                                    <Link href={`/weed-${url}/${modifystr(Store[2]?.Store_Name.toLowerCase())}/${Store[2]?.id}`}>{Store[2]?.Store_Name}</Link>
                                
                                </p>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="col-lg-6 webContent my-2">
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" >
                                <h3 >{` What Weed ${from} offer the best prices in ${state.Location}? `}</h3>
                            </AccordionSummary>
                            <AccordionDetails>
                                <p>{`${from} known for their competitive pricing in ${state.Location} include `}
                                    <Link href={`/weed-${url}/${modifystr(Store[0]?.Store_Name.toLowerCase())}/${Store[0]?.id}`}>{Store[0]?.Store_Name}</Link>,
                                    <Link href={`/weed-${url}/${modifystr(Store[1]?.Store_Name.toLowerCase())}/${Store[1]?.id}`}>{Store[1]?.Store_Name}</Link>
                                    {`and `}
                                    <Link href={`/weed-${url}/${modifystr(Store[2]?.Store_Name.toLowerCase())}/${Store[2]?.id}`}>{Store[2]?.Store_Name}</Link>
                            </p>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="col-lg-6 webContent my-2">
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" >
                                <h3 >{`  Which cannabis ${from} in ${state.Location}  have the best selection of edibles?`}</h3>
                            </AccordionSummary>
                            <AccordionDetails>
                                <p>{`${from} with a wide variety of edibles in ${state.Location} include  `}
                                    <Link href={`/weed-${url}/${modifystr(Store[0]?.Store_Name.toLowerCase())}/${Store[0]?.id}`}>{Store[0]?.Store_Name}</Link>,
                                    <Link href={`/weed-${url}/${modifystr(Store[1]?.Store_Name.toLowerCase())}/${Store[1]?.id}`}>{Store[1]?.Store_Name}</Link>
                                    {` and `} <Link href={`/weed-${url}/${modifystr(Store[2]?.Store_Name.toLowerCase())}/${Store[2]?.id}`}>{Store[2]?.Store_Name}</Link>
                                    </p>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="col-lg-6 webContent my-2">
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" >
                                <h3 >{`What are the best marijuana ${from} for first-time visitor in ${state.Location}?  `}</h3>
                            </AccordionSummary>
                            <AccordionDetails>
                                <p> {`Friendly and informative ${from} for first-time visitors in ${state.Location} include `}
                                    <Link href={`/weed-${url}/${modifystr(Store[0]?.Store_Name.toLowerCase())}/${Store[0]?.id}`}>{Store[0]?.Store_Name}</Link>,
                                    <Link href={`/weed-${url}/${modifystr(Store[1]?.Store_Name.toLowerCase())}/${Store[1]?.id}`}>{Store[1]?.Store_Name}</Link>
                                    {` and `}
                                    <Link href={`/weed-${url}/${modifystr(Store[2]?.Store_Name.toLowerCase())}/${Store[2]?.id}`}>{Store[2]?.Store_Name}</Link>
                                
                                                                            </p>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="col-lg-6 webContent my-2">
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" >
                                <h3 >{` Which weed ${from} in ${state.Location} offer online ordering and pickup? `}</h3>
                            </AccordionSummary>
                            <AccordionDetails>
                                <p>
                                    {`${from} offering convenient online ordering and pickup in ${state.Location} include `}
                                    <Link href={`/weed-${url}/${modifystr(Store[0]?.Store_Name.toLowerCase())}/${Store[0]?.id}`}>{Store[0]?.Store_Name}</Link>{`,`}
                                    <Link href={`/weed-${url}/${modifystr(Store[1]?.Store_Name.toLowerCase())}/${Store[1]?.id}`}>{Store[1]?.Store_Name}</Link>
                                    {` and `} <Link href={`/weed-${url}/${modifystr(Store[2]?.Store_Name.toLowerCase())}/${Store[2]?.id}`}>{Store[2]?.Store_Name}</Link>
                                    
                                    
                                </p>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="col-lg-6 webContent my-2">
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" >
                                <h3 >{`What are the best marijuana ${from} for medical cannabis in ${state.Location}? `}</h3>
                            </AccordionSummary>
                            <AccordionDetails>
                                <p>{`Highly recommended medical cannabis ${from} in ${state.Location} include  `}
                                    <Link href={`/weed-${url}/${modifystr(Store[0]?.Store_Name.toLowerCase())}/${Store[0]?.id}`}>{Store[0]?.Store_Name}</Link>{`,`}
                                    <Link href={`/weed-${url}/${modifystr(Store[1]?.Store_Name.toLowerCase())}/${Store[1]?.id}`}>{Store[1]?.Store_Name}</Link>
                                    {` and`}  <Link href={`/weed-${url}/${modifystr(Store[2]?.Store_Name.toLowerCase())}/${Store[2]?.id}`}>{Store[2]?.Store_Name}</Link>
                                
                                </p>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className="col-lg-6 webContent my-2">
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" >
                                <h3 >{`Which cannabis ${from} in ${state.Location} are open late? `}</h3>
                            </AccordionSummary>
                            <AccordionDetails>
                                <p> {` ${from} with extended hours in ${state.Location} include `}
                                    <Link href={`/weed-${url}/${modifystr(Store[0]?.Store_Name.toLowerCase())}/${Store[0]?.id}`}>{Store[0]?.Store_Name}</Link>{`,`}
                                    <Link href={`/weed-${url}/${modifystr(Store[1]?.Store_Name.toLowerCase())}/${Store[1]?.id}`}>{Store[1]?.Store_Name}</Link>
                                    {`and`}  <Link href={`/weed-${url}/${modifystr(Store[2]?.Store_Name.toLowerCase())}/${Store[2]?.id}`}>{Store[2]?.Store_Name}</Link> </p>
                            </AccordionDetails>
                        </Accordion>
                    </div>

                </div>}
        </div>
    )
}

export default WebContent