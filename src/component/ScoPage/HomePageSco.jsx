import Head from "next/head"

function HomePageSco({location  }) {
    return (
        <Head>
            <title>{"Marijuana Dispensaries & Delivery Near Me | weedx.io |"}</title>
            <meta name="title" content={`Marijuana Dispensaries & Delivery Near Me | weedx.io |`}/>
            <meta name='description' content={" In weedx.io, find high quality Recreational and Medical Marijuana Dispensaries & Delivery Near you. Order online and get best deals on your weed near you"} />
            <link rel="canonical" href={`https://www.weedx.io`} /> 
            <meta itemProp="name" content="WeedX" />
            <meta name="keywords" content="Marijuana Dispensaries & Delivery Near Me,Marijuana Delivery Near Me,Marijuana Dispensary Near Me,Marijuana Dispensaries & Delivery Near You,Cannabis Dispensary Near You,Cannabis Delivery Near Me,Recreational Cannabis Delivery Near You,Weed Delivery Near Me,Medical Marijuana Near You,Recreational and Medical Marijuana Dispensaries & Delivery Near You,Recreational Weed Services,Trusted Weed Delivery Near Me,Speedy Marijuana Delivery Service,Convenient Cannabis Stores,High-Quality Marijuana Products,Marijuana Dispensaries Open Now  " />
            <meta itemProp="description" content=" In weedx.io, find high quality Recreational and Medical Marijuana Dispensaries & Delivery Near you. Order online and get best deals on your weed near you" />
            <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"></meta>
            {/* Facebook tags */}
            <meta property="og:type" content={"website"} />
            <meta property="og:title" content={"Marijuana Dispensaries & Delivery Near Me | weedx.io |"} />
            <meta property="og:description" content={" In weedx.io, find high quality Recreational and Medical Marijuana Dispensaries & Delivery Near you. Order online and get best deals on your weed near you"} />
            { /* End Facebook tags */}
            { /* Twitter tags */}
            <meta name="twitter:creator" content={"website"} />
            <meta name="twitter:card" content={"Marijuana Dispensaries & Delivery Near Me"} />
            <meta name="twitter:title" content={"Marijuana Dispensaries & Delivery Near Me | weedx.io |"} />
            <meta name="twitter:description" content={" In weedx.io, find high quality Recreational and Medical Marijuana Dispensaries & Delivery Near you. Order online and get best deals on your weed near you"} />
        </Head>
    )
}
export { HomePageSco }
