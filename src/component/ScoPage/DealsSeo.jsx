import { Helmet } from 'react-helmet-async';
import Createcontext from "../../../Hooks/Context"
import React from "react"
function DealsSeo() {
    return (
        <Helmet>
            <title> {`Get the best marijuana Deals Near You | weedx.io  `}</title>
            <meta name="title" content={`Get the best marijuana Deals Near You | weedx.io `}/>
            <meta name='description' content={`Get the best marijuana Deals Near You on weedx.io. Find special sales, promo codes, coupons, and discounts from cannabis dispensaries in your neighborhood`} />
            <link rel="canonical" href={`https://www.weedx.io/deals`} /> 
            <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"></meta>
            {/* Facebook tags */}
            <meta property="og:type" content="website"/>
            <meta property="og:title" content={"Get the best marijuana Deals Near You | weedx.io "} />
            <meta property="og:description" content={"Get the best marijuana Deals Near You on weedx.io. Find special sales, promo codes, coupons, and discounts from cannabis dispensaries in your neighborhood"} />
            { /* End Facebook tags */}
            { /* Twitter tags */}
            <meta name="twitter:creator" content={"website"} />
            <meta name="twitter:card" content={"website Dispensaries & Delivery Near Me"} />
            <meta name="twitter:title" content={"Get the best marijuana Deals Near You | weedx.io "} />
            <meta name="twitter:description" content={"Get the best marijuana Deals Near You on weedx.io. Find special sales, promo codes, coupons, and discounts from cannabis dispensaries in your neighborhood"} />
        </Helmet>
    )
}


export  {DealsSeo } 