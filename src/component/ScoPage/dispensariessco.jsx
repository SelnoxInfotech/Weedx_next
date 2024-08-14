import Head from 'next/head';
import Createcontext from "../../hooks/context"
import React from "react"
function DispensariesSco({location , format_Address}) {
    const { state } = React.useContext(Createcontext)
    return (
        <Head>
            <title>{` Weed Dispensaries in ${format_Address}| weedx.io |`}</title>
            <meta name="title" content={` Weed Dispensaries in ${format_Address}| weedx.io |`}/>
            <meta name='description' content={`Find Nearby Dispensaries in ${format_Address} for Recreational & Medical weed. Browse Top Cannabis Products and Place Orders from Trusted Local Dispensaries.`} />
            <link rel="canonical" href={`https://www.weedx.io${location}`} /> 
            <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"></meta>
            {/* Facebook tags */}
            <meta property="og:type" content={"website"} />
            <meta property="og:title" content={"Marijuana Dispensaries & Delivery Near Me | weedx.io |"} />
            <meta property="og:description" content={"In weedx.io, find high quality Recreational and Medical Marijuana Dispensaries & Delivery Near you. Order online and get best deals on your weed near you."} />
            <meta property="og:image" content="./logo192.webp"></meta>
            { /* End Facebook tags */}
            { /* Twitter tags */}
            <meta name="twitter:creator" content={"website"} />
            <meta name="twitter:card" content={"Marijuana Dispensaries & Delivery Near Me"} />
            <meta name="twitter:title" content={"Marijuana Dispensaries & Delivery Near Me | weedx.io |"} />
            <meta name="twitter:description" content={"In weedx.io, find high quality Recreational and Medical Marijuana Dispensaries & Delivery Near you. Order online and get best deals on your weed near you."} />
       
            </Head>
    )
}

export default DispensariesSco
