import { Helmet } from 'react-helmet-async';
import Createcontext from "../../../Hooks/Context"
import React from "react"
function BrandSeo({ location }) {
    const { state } = React.useContext(Createcontext)
    return (
        <Helmet>
            <title> {`Shop from Top Marijuana Brands Near You | weedx.io |  `}</title>
            <meta name="title" content={`Shop from Top Marijuana Brands Near You | weedx.io | `} />
            <meta name='description' content={`Shop high-quality Recreational and Medical Marijuana from top brands Near you. Order online and get the best delivery, dispensaries, and deals on weedx.io`} />
            <link rel="canonical" href={`https://www.weedx.io${location}`} />
            <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"></meta>
            {/* Facebook tags */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={"Shop from Top Marijuana Brands Near You | weedx.io | "} />
            <meta property="og:description" content={"Shop high-quality Recreational and Medical Marijuana from top brands Near you. Order online and get the best delivery, dispensaries, and deals on weedx.io"} />
            { /* End Facebook tags */}
            { /* Twitter tags */}
            <meta name="twitter:creator" content={"website"} />
            <meta name="twitter:card" content={"website Dispensaries & Delivery Near Me"} />
            <meta name="twitter:title" content={"Shop from Top Marijuana Brands Near You | weedx.io | "} />
            <meta name="twitter:description" content={"Shop high-quality Recreational and Medical Marijuana from top brands Near you. Order online and get the best delivery, dispensaries, and deals on weedx.io"} />
        </Helmet>
    )
}

function BrandDetailsSeo({ brandname, location }) {
    const { state } = React.useContext(Createcontext)
    return (
        <Helmet>
            <title> {` ${brandname} | Top Marijuana Brand Near You | weedx.io |  `}</title>
            <meta name="title" content={`${brandname} | Top Marijuana Brand Near You | weedx.io |`} />
            <meta name='description' content={`Shop high-quality Recreational and Medical Marijuana from top Brands Near you from ${brandname}. Online Order, delivery, dispensaries, and deals on weedx.io.`} />
            <link rel="canonical" href={`https://www.weedx.io${location}`} />
            <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"></meta>
            {/* Facebook tags */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={"Shop from Top Marijuana Brands Near You | weedx.io | "} />
            <meta property="og:description" content={`Shop high-quality Recreational and Medical Marijuana from top Brands Near you from ${brandname}. Online Order, delivery, dispensaries, and deals on weedx.io.`} />
            { /* End Facebook tags */}
            { /* Twitter tags */}
            <meta name="twitter:creator" content={"website"} />
            <meta name="twitter:card" content={"website Dispensaries & Delivery Near Me"} />
            <meta name="twitter:title" content={"Shop from Top Marijuana Brands Near You | weedx.io | "} />
            <meta name="twitter:description" content={`Shop high-quality Recreational and Medical Marijuana from top Brands Near you from ${brandname}. Online Order, delivery, dispensaries, and deals on weedx.io.`} />

         
        </Helmet>
    )
}

export { BrandSeo, BrandDetailsSeo } 
