import React from 'react'
import Bgheader from '@/component/bgheader/Bgheader'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import useStyles from "@/styles/style";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Faqseo} from '@/component/ScoPage/Faq';
const Faq = () => {
    const classes=useStyles()
    const [data , setData]= React.useState([
        {
            title:"What is Weedx.io, and What Does It Offer?",
            paara: `Weedx.io is a platform committed to cannabis exploration and acquisition, connecting users with many 
            cannabis products and facilitating seamless orders from confirmed, licensed stores and dispensaries. `
        },
        {
            title:"How do I locate dispensaries and shops near me on Weedx.io? ",
            paara: `Weedx.io features a comprehensive repository of local dispensaries and shops. Input your region or use place 
            offerings to find dispensaries in your location. `
        },
        {
            title:" What sets Weedx.io apart within the cannabis enterprise?",
            paara: `Weedx.io is more than just a marketplace. We are committed to unbiased journalism, supplying cannabis 
            enthusiasts with a massive supply of facts and gear to understand the ability of the cannabis plant. `
        },
        {
            title:"How do I place an order on Weedx.io? ",
            paara: ` To place an order, browse via our product listings, pick the items you need, and follow the checkout method. 
            It's designed for easy and convenient ordering.
             `
        },
        {
            title:" Can I track my orders on Weedx.io?",
            paara: `Yes, you can ship your orders on Weedx.io. Visit the "My Orders" phase to view order information and reveal 
            shipping development.  `
        },
        {
            title:" Is Weedx.io compliant with local cannabis legal guidelines and regulations?",
            paara: ` We take compliance seriously. We adhere to neighbourhood cannabis legal guidelines and rules and feature 
            age verification methods in the area to maintain a felony and secure platform. `
        },
        {
            title:"How do I file compliance concerns or problems on Weedx.io?",
            paara: ` If you encounter content material or interest that could violate nearby laws or our terms of service, please 
            report it to us. We look at all reviews thoroughly and make suitable movements.`
        },
        {
            title:"Can I be admitted to Weedx.io on each web and mobile structure?             ",
            paara: ` Weedx.io operates on each web and native Android and iOS package, imparting a continuing experience for
            customers on various gadgets.
            `
        },
        {
            title:" How can agencies gain from WeedX for Business?",
            paara: `WeedX for Business offers solutions, advertising, marketing, and a branded e-trade platform. It empowers 
            organisations to extend while navigating complicated cannabis regulations.  `
        },
        {
            title:" How can organisations list their services on WeedX for Business?",
            paara: `To list your commercial enterprise on WeedX for Business, go to our add your business or business section; you
            will get complete help there. `
        },
        {
            title:" What advantages does WeedX for Business provide to cannabis-associated organisations?",
            paara: `By listing on WeedX for Business, your enterprise profits increased visibility, on-platform advertising and 
            marketing opportunities, and admission to extraordinary deals, assisting your products and services in reaching 
            a broader target market. `
        },
        {
            title:" How can I ask Weedx.io's assist team for help?",
            paara: ` You can touch our help crew via the provided touch facts in our Help Center, or you can contact us via our
            Contact Us page. `
        },
        {
            title:" Are there any expenses associated with the use of WeedX for Business?",
            paara: `Don't hesitate to contact our assist team for price information and pricing for WeedX for Business. `
        },
        {
            title:" Is my facts collected on Weedx.io?",
            paara: `We take your privacy seriously and appoint strict security measures to guard your private records. You can 
            examine this in our Privacy Policy. `
        },
        {
            title:"Can I provide feedback or opinions on services and products on Weedx.io?",
            paara: ` Yes, we encourage users to leave opinions and comments to assist others in making knowledgeable decisions 
            and enhance the network's enjoyment.`
        },
        {
            title:"Do I want to create an account to apply for Weedx.io?",
            paara: ` While you couldn't browse our content without an account, you will have an account to get entry to specific 
            functions.`
        },
        {
            title:" Does Weedx.io function in all states and regions?",
            paara: `We operate in areas where cannabis is a felony. Please look at our website or touch support to confirm 
            availability in your area. `
        },
        {
            title:" How do I remain updated with Weedx.io's today's offerings and promotions?",
            paara: ` To stay informed about our modern offerings and promotions, join our newsletter or observe us on our social 
            media channels for ordinary updates.`
        },
        {
            title:"What varieties of cannabis products are available on Weedx.io?",
            paara: `We provide an extensive range of cannabis products, which include flowers, edibles, concentrates, and more. 
            You can explore our product listings to peer at the whole selection.`
        },
        {
            title:"Can I place an order from anywhere, or is there a region limit?",
            paara: ` You can place orders from everywhere, but the availability of products may additionally vary depending on 
            your region and neighbourhood guidelines. Make sure to check product availability at your location.`
        },
        {
            title:"How do I confirm my age to conform with nearby legal guidelines? ",
            paara: `During the registration technique, you'll be requested to verify your age and the usage of a stable and discreet 
            technique to ensure compliance with nearby cannabis legal guidelines. `
        },
        {
            title:"Can I order cannabis products for each scientific and recreational use on Weedx.io?",
            paara: `The availability of scientific and recreational products may vary depending on your vicinity and local rules. 
            You can filter merchandise based totally on your alternatives.
              `
        },
        {
            title:"How can I filter my search to locate precise cannabis products or traces on Weedx.io? ",
            paara: `You can use our search and clear-out options to narrow down your search with the aid of product kind, stress, 
            THC/CBD content, and different criteria to find precisely what you are seeking out.
             `
        },
        {
            title:"For future reference, Can I shop my favoured products and dispensaries on Weedx.io?",
            paara: `Yes, you can create a list of your preferred products and dispensaries in your account for easy access in 
            the future. `
        }
    ])
    React.useEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", 
        });
       
    }, [])
  return (
    <div className='FAQsection'>
        <Faqseo></Faqseo>
        <div className='container-fluid'>
          <Bgheader text="FAQ's  Page"/>
          <div className='faq_centent'>
          {
            data.map((item,index)=>{
                return  <Accordion   key={index} className={classes.faqbox}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${index+1}a-content`}
                                id={`panel${index+1}a-header`}
                                className={classes.faqHeading}
                            >
                            <Typography >{index +1}. {item.title} </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography className={classes.faqParagraph} >
                              {item.paara}
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
            })
          }
            
          
       
     
     
          </div>
        </div>
    </div>
  )
}

export default Faq