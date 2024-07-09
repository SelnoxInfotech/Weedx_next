import { Helmet } from "react-helmet-async"


function FourZeroFour() {
    return (
        <Helmet>
            <title>{"404 | weedx.io |"}</title>
            <meta name="title" content={`Learn everything about you favorite Cannabis | weedx.io |`}/>
            <meta name='description' content={"Learn everything about your favorite Cannabis. Read this guide on weedx.io to understand the laws related to marijuana and about its legalization worldwide."} />
            <link rel="canonical" href={`https://www.weedx.io/404/`} /> 
            <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"></meta>
            {/* Facebook tags */}
            <meta property="og:type" content={"website"} />
            <meta property="og:title" content={"Learn everything about you favorite Cannabis | weedx.io |"} />
            <meta property="og:description" content={"Learn everything about your favorite Cannabis. Read this guide on weedx.io to understand the laws related to marijuana and about its legalization worldwide."} />
            { /* End Facebook tags */}
            { /* Twitter tags */}
            <meta name="twitter:creator" content={"website"} />
            <meta name="twitter:card" content={"Marijuana Dispensaries & Delivery Near Me"} />
            <meta name="twitter:title" content={"Learn everything about you favorite Cannabis | weedx.io |"} />
            <meta name="twitter:description" content={"Learn everything about your favorite Cannabis. Read this guide on weedx.io to understand the laws related to marijuana and about its legalization worldwide."} />
        </Helmet>
    )
}

export {FourZeroFour}