import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Bgheader from '@/component/bgheader/Bgheader';
import useStyles from "@/styles/style";
import { HelpcenterSeo } from "@/component/ScoPage/Faq"
const Helpcenter = () => {
    const [allheight, setallheighth] = React.useState([])
    React.useEffect(() => {
        let navheight = document.getElementById('Navbar_box')?.clientHeight
        let heighr = []
        for (let i = 1; i < 13; i++) {
            let divElement = document.querySelector(`#help${i}`);
            let elemHeight = divElement.offsetTop;
            heighr.push(elemHeight - navheight)
        }
        setallheighth(heighr)
    }, [])
    const classes = useStyles()
    function scrolltocontent(listno) {
        let navheight = document.getElementById('Navbar_box')?.clientHeight
        let a = allheight[listno - 1]
        window.scrollTo(0, a);
    }

    return (
        <div className='helpcenter'>
            <HelpcenterSeo></HelpcenterSeo>
            <div className='container-fluid'>
                {/* <Bgheader text="Welcome To The WeedX.io Help Center" /> */}
                <div className='bgHedaer'>
                    <div className='text_on_Learn_banner'>
                        <h1>{'Welcome To The WeedX.io Help Center'}</h1>
                    </div>
                </div>
                <div className='helpcenterConent row'>
                    <div className="col-lg-8 col-12">


                        <h2 className='helpHeading'>{`1. Getting Started `}</h2>
                        <div className="help_contentBox" id='help1'>
                            <h3 className="helpTitle">{`Registering an Account`}</h3>
                            <p className='helpDescription'>{`To start your journey with WeedX.Io, you'll want to create an account.
                                Click the "Sign Up" button and follow the activities to provide your attributes.
                                Make sure to use correct details, particularly while verifying your age, as
                                we are devoted to complying with neighbourhood legal guidelines.`}</p>
                        </div>
                        <div className="help_contentBox" id='help2'>
                            <h3 className="helpTitle">{`Logging In`}</h3>
                            <p className='helpDescription'>{`If you already have an account, click on the "Login" button. Enter your email
                                and password, and you're ready to explore WeedX.Io's offerings.`}</p>
                        </div>
                        <div className="help_contentBox" id='help3'>
                            <h3 className="helpTitle">
                                {` Updating Your Profile`}
                            </h3>
                            <p className='helpDescription'>{`Keep your profile statistics current by navigating to the "My Profile" section.
                                You can change your email, password, and personal info here.`}</p>
                        </div>


                        <h2 className='helpHeading'> {`  2. Online Ordering and Delivery Services`}</h2>
                        <div className="help_contentBox" id='help4'>
                            <h3 className="helpTitle">{`Placing an Order`}</h3>
                            <p className='helpDescription'>{`Our platform offers the benefit of ordering cannabis products online. Browsethe listings, upload your desired gadgets in your
                                cart, and continue to checkout. Follow the simple steps to confirm your order, and we'll cope with the relaxation.`}</p>
                        </div>
                        <div className="help_contentBox" id='help5'>
                            <h3 className="helpTitle">{`Tracking Your Order`}</h3>
                            <p className='helpDescription'>{`Where is your order? You can track it in real-time by going to the "My Orders" section. You will locate order information and a
                                live map to reveal the delivery progress here.`}
                            </p>

                        </div>
                        <div className="help_contentBox" id='help6'>
                            <h3 className="helpTitle">{`Delivery Information`}</h3>
                            <p className='helpDescription'>{`We prioritize safety and compliance. When your order is ready for shipping, our licensed drivers will carry it in your area
                                discreetly and securely. For extra statistics on our transport guidelines, visit our Delivery Guidelines segment.`}</p>
                        </div>

                        <h2 className='helpHeading'>{`3. Dispensary and Retailer Listings`}</h2>
                        <div className="help_contentBox" id='help7'>
                            <h3 className="helpTitle">{`Finding Dispensaries`}</h3>
                            <p className='helpDescription'>{`Explore a widespread selection of dispensaries on our platform. Use the quest function to discover dispensaries in your
                                region and filter your seek based on alternatives inclusive of product types, scores, and extras. Click on a dispensary to
                                view exact records and reviews.`}
                            </p>
                        </div>
                        <div className="help_contentBox" id='help8'>
                            <h3 className="helpTitle">{`Exploring Retailers`}</h3>
                            <p className='helpDescription'>{`In addition to dispensaries, we also provide listings for outlets providing various cannabis-associated products. Discover
                                the perfect retailer for your needs and study opinions from the community to make knowledgeable choices.`}</p>
                        </div>
                        <div className="help_contentBox" id='help9'>
                            <h3 className="helpTitle">{`Reviews and Ratings`}</h3>
                            <p className='helpDescription'>{`We value your entry. Leave opinions and rankings for the dispensaries and stores you've visited to help others make
                                knowledgeable selections. Your comments are a precious part of our network.`}</p>
                        </div>


                        <h2 className='helpHeading'> {`4. Compliance with Local Laws`}</h2>
                        <div className="help_contentBox" id='help10'>
                            <h3 className="helpTitle">{`Age Verification`}</h3>
                            <p className='helpDescription'>{`WeedX.Io is committed to making sure that every customer is of legal age. During registration, you may be required to
                                verify your age securely and discreetly. This is essential to maintain compliance with local laws.`}</p>
                        </div>
                        <div className="help_contentBox" id='help11'>
                            <h3 className="helpTitle">{`Legal Guidelines`}</h3>
                            <p className='helpDescription'>{`We take compliance critically. Please familiarise yourself with your local cannabis laws and guidelines. We aim to offer
                                a stress-free and safe platform for all customers. If you have concerns or questions about compliance, check out our law
                                section for help.`}
                            </p>
                        </div>
                        <div className="help_contentBox" id='help12'>
                            <h3 className="helpTitle">{`Reporting Compliance Concerns`}
                            </h3>
                            <p className='helpDescription'>{`If you come upon any content material or hobby that you accept as accurate that can violate neighbourhood laws or our
                                terms of the carrier, please file it to us. We check all reports well and make suitable movements to preserve a compliant
                                environment.`}
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-3 d-lg-block d-none">
                        <div className="help_toc">
                            <div className="help_tocHeading_box">
                                <h3 className='sideTableHeading'>{`Table of Contents`}</h3>
                            </div>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    className={classes.helpaccordionHeading}
                                >
                                    <Typography>{`1. Getting Started`}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>

                                    <ul>
                                        <li className='cursor_pointer  tbhelplist' onClick={() => { scrolltocontent(1) }}>{`Registering an Account`}</li>
                                        <li className='cursor_pointer tbhelplist' onClick={() => { scrolltocontent(2) }}>{`Logging In`}</li>
                                        <li className='cursor_pointer tbhelplist' onClick={() => { scrolltocontent(3) }}> {`Updating Your Profile`} </li>
                                    </ul>

                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    className={classes.helpaccordionHeading}
                                >
                                    <Typography> {`2. Online Ordering and Delivery Services`}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>

                                    <ul>
                                        <li className='cursor_pointer tbhelplist' onClick={() => { scrolltocontent(4) }}>{`Placing an Order`}</li>
                                        <li className='cursor_pointer tbhelplist' onClick={() => { scrolltocontent(5) }}>{`Tracking Your Order`}</li>
                                        <li className='cursor_pointer tbhelplist' onClick={() => { scrolltocontent(6) }}>{`Delivery Information`}</li>
                                    </ul>

                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    className={classes.helpaccordionHeading}
                                >
                                    <Typography>{`3. Dispensary and Retailer Listings`}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>

                                    <ul>
                                        <li className='cursor_pointer tbhelplist' onClick={() => { scrolltocontent(7) }}>{`Finding Dispensaries`}</li>
                                        <li className='cursor_pointer tbhelplist' onClick={() => { scrolltocontent(8) }}>{`Exploring Retailers`}</li>
                                        <li className='cursor_pointer tbhelplist' onClick={() => { scrolltocontent(9) }}>{`Reviews and Ratings`}</li>
                                    </ul>

                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    className={classes.helpaccordionHeading}
                                >
                                    <Typography>{`4. Compliance with Local Laws`}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul>
                                        <li className='cursor_pointer tbhelplist' onClick={() => { scrolltocontent(10) }}>{`Age Verification`}</li>
                                        <li className='cursor_pointer tbhelplist' onClick={() => { scrolltocontent(11) }}>{`Legal Guidelines`}</li>
                                        <li className='cursor_pointer tbhelplist' onClick={() => { scrolltocontent(12) }}>{`Reporting Compliance Concerns`}</li>
                                    </ul>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Helpcenter