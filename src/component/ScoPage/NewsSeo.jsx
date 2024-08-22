import Head from "next/head"

function NewsSeo({location}) {
    console.log(location)
 
    if(location === 'blogs'){
        return (
            <Head>
                <title>{"Weedx Blog: Cannabis Knowledge & Industry Insights."}</title>
                <meta name="title" content={`Weedx Blog: Cannabis Knowledge & Industry Insights.`}/>
                <meta name='description' content={" Stay informed with the WeedX Blog! Get the latest tips, trends, and expert insights on all things cannabis. Enhance your knowledge and stay ahead in the industry."} />
                <link rel="canonical" href={`https://www.weedx.io/${location}`} /> 
                <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"></meta>
                <meta property="og:type" content={"website"} />
                <meta property="og:title" content={"Weedx Blog: Cannabis Knowledge & Industry Insights."} />
                <meta property="og:description" content={" Stay informed with the WeedX Blog! Get the latest tips, trends, and expert insights on all things cannabis. Enhance your knowledge and stay ahead in the industry."} />
                <meta name="twitter:creator" content={"website"} />
                <meta name="twitter:card" content={"Marijuana Dispensaries & Delivery Near Me"} />
                <meta name="twitter:title" content={"Weedx Blog: Cannabis Knowledge & Industry Insights."} />
                <meta name="twitter:description" content={" Stay informed with the WeedX Blog! Get the latest tips, trends, and expert insights on all things cannabis. Enhance your knowledge and stay ahead in the industry."} />
            </Head>
        )
    }else{
   
        return (
            <Head>
                <title>{"Today's Latest Cannabis and Marijuana News | weedx.io"}</title>
                <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"></meta>
                <meta name='description' content={" Weedx.io: Your trusted source for the latest cannabis industry news, updates, trends, and insights. Discover breaking stories and expert analysis here."} />
                <link rel="canonical" href={`https://www.weedx.io/${location}`} /> 
                {/* Facebook tags */}
                <meta property="og:type" content={"website"} />
                <meta property="og:title" content={"Today's Latest Cannabis and Marijuana News | weedx.io"} />
                <meta property="og:description" content={" Weedx.io: Your trusted source for the latest cannabis industry news, updates, trends, and insights. Discover breaking stories and expert analysis here."} />
                { /* End Facebook tags */}
    
                { /* Twitter tags */}
                <meta name="twitter:creator" content={"website"} />
                <meta name="twitter:card" content={"Marijuana Dispensaries & Delivery Near Me"} />
                <meta name="twitter:title" content={"Today's Latest Cannabis and Marijuana News | weedx.io"} />
                <meta name="twitter:description" content={" Weedx.io: Your trusted source for the latest cannabis industry news, updates, trends, and insights. Discover breaking stories and expert analysis here."} />
            </Head>
        )
    }
}
function SingleNewsSeo({Title ,Description ,location}) {
    
    return (
        <Head>
            <title>{`${Title} | weedx.io`}</title>
            <meta name="title" content={`${Title} | weedx.io`}/>
            <meta name='description' content={Description} />
            <link rel="canonical" href={`https://www.weedx.io${location}`} /> 
            <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"></meta>
            
            {/* Facebook tags */}
            <meta property="og:type" content={"website"} />
            <meta property="og:title" content={`${Title} | weedx.io`} />
            <meta property="og:description" content={Description} />
            { /* End Facebook tags */}

            { /* Twitter tags */}
            <meta name="twitter:creator" content={"website"} />
            <meta name="twitter:card" content={"Marijuana Dispensaries & Delivery Near Me"} />
            <meta name="twitter:title" content={`${Title} | weedx.io`} />
            <meta name="twitter:description" content={Description} />
        </Head>
    )
}
export {NewsSeo , SingleNewsSeo }
