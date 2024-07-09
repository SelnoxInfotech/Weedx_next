import { Helmet } from "react-helmet-async"

function LearnSeo({location}) {
    return (
        <Helmet>
            <title>{"Learn everything about you favorite Cannabis | weedx.io |"}</title>
            <meta name="title" content={`Learn everything about you favorite Cannabis | weedx.io |`}/>
            <meta name='description' content={"Learn everything about your favorite Cannabis. Read this guide on weedx.io to understand the laws related to marijuana and about its legalization worldwide."} />
            <link rel="canonical" href={`https://www.weedx.io${location}`} /> 
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
function Law({location}) {
    return (
        <Helmet>
            <title>{"Learn About Laws and Regulation in U.S. States | weedx.io |"}</title>
            <meta name="title" content={`Learn About Laws and Regulation in U.S. States | weedx.io |`}/>
            <meta name='description' content={" Select a state or country to learn about recreational and medical cannabis laws and regulation in the US and its states. Read on to find a weed marijuana dispensary and delivery near you."} />
            <link rel="canonical" href={`https://www.weedx.io${location}`} /> 
            <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"></meta>
            {/* Facebook tags */}
            <meta property="og:type" content={"website"} />
            <meta property="og:title" content={"Learn About Laws and Regulation in U.S. States | weedx.io |"} />
            <meta property="og:description" content={" Select a state or country to learn about recreational and medical cannabis laws and regulation in the US and its states. Read on to find a weed marijuana dispensary and delivery near you."} />
            { /* End Facebook tags */}

            { /* Twitter tags */}
            <meta name="twitter:creator" content={"website"} />
            <meta name="twitter:card" content={"Marijuana Dispensaries & Delivery Near Me"} />
            <meta name="twitter:title" content={"Learn About Laws and Regulation in U.S. States | weedx.io |"} />
            <meta name="twitter:description" content={" Select a state or country to learn about recreational and medical cannabis laws and regulation in the US and its states. Read on to find a weed marijuana dispensary and delivery near you."} />
        </Helmet>
    )
}

function LawState({Title,State , location}) {
    return (
        <Helmet>
            <title>{`${Title} | Laws and Regulation | weedx.io | `}</title>
            <meta name="title" content={`${Title} | Laws and Regulation | weedx.io | `}/>
            <meta name='description' content={`${Title} . Learn about cannabis laws and regulation in the country ${State}. Learn more about the important information you should be aware of here`} />
            <link rel="canonical" href={`https://www.weedx.io${location}`} /> 
            <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"></meta>
            {/* Facebook tags */}
            <meta property="og:type" content={"website"} />
            <meta property="og:title" content={`${Title} | Laws and Regulation | weedx.io | `} />
            <meta property="og:description" content={`${Title} . Learn about cannabis laws and regulation in the country ${State}. Learn more about the important information you should be aware of here`} />
            { /* End Facebook tags */}

            { /* Twitter tags */}
            <meta name="twitter:creator" content={"website"} />
            <meta name="twitter:card" content={"Marijuana Dispensaries & Delivery Near Me"} />
            <meta name="twitter:title" content={`${Title} | Laws and Regulation | weedx.io | `} />
            <meta name="twitter:description" content={`${Title} . Learn about cannabis laws and regulation in the country ${State}. Learn more about the important information you should be aware of here`} />
        </Helmet>
    )
}

function StrainSeo({location}) {
    return (
        <Helmet>
            <title>{"Discover Weed Strains: Indica, Sativa, Hybrid | weedx.io |"}</title>
            <meta name="title" content={`Discover Weed Strains: Indica, Sativa, Hybrid | weedx.io |`}/>
            <meta name='description' content={" Discover weed strains Indica, Sativa & Hybrid. Learn about these strains closely to choose best suited cannabis product. Get delivery and dispensary near you."} />
           <link rel="canonical" href={`https://www.weedx.io${location}`} /> 
           <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"></meta>
            {/* Facebook tags */}
            <meta property="og:type" content={"website"} />
            <meta property="og:title" content={"Discover Weed Strains: Indica, Sativa, Hybrid | weedx.io |"} />
            <meta property="og:description" content={" Discover weed strains Indica, Sativa & Hybrid. Learn about these strains closely to choose best suited cannabis product. Get delivery and dispensary near you."} />
            { /* End Facebook tags */}

            { /* Twitter tags */}
            <meta name="twitter:creator" content={"website"} />
            <meta name="twitter:card" content={"Marijuana Dispensaries & Delivery Near Me"} />
            <meta name="twitter:title" content={"Discover Weed Strains: Indica, Sativa, Hybrid | weedx.io |"} />
            <meta name="twitter:description" content={" Discover weed strains Indica, Sativa & Hybrid. Learn about these strains closely to choose best suited cannabis product. Get delivery and dispensary near you."} />
        </Helmet>
    )
}
// function HistorySeo({location}) {
//     return (
//         <Helmet>
//             <title>{"Explore Cannabis History | WeedX.io Articles"}</title>
//             <meta name="title" content={'Explore Cannabis History | WeedX.io Articles'}/>
//             <meta name='description' content={" Explore the history of cannabis prohibition and legalization on WeedX.io. Learn about dispensary POS systems and their importance in the cannabis industry."} />
//            <link rel="canonical" href={`https://www.weedx.io${location}`} /> 
//            <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"></meta>
//             {/* Facebook tags */}
//             <meta property="og:type" content={"website"} />
//             <meta property="og:title" content={"Discover Weed Strains: Indica, Sativa, Hybrid | weedx.io |"} />
//             <meta property="og:description" content={" Explore the history of cannabis prohibition and legalization on WeedX.io. Learn about dispensary POS systems and their importance in the cannabis industry."} />
//             { /* End Facebook tags */}

//             { /* Twitter tags */}
//             <meta name="twitter:creator" content={"website"} />
//             <meta name="twitter:card" content={"Marijuana Dispensaries & Delivery Near Me"} />
//             <meta name="twitter:title" content={"Discover Weed Strains: Indica, Sativa, Hybrid | weedx.io |"} />
//             <meta name="twitter:description" content={" Explore the history of cannabis prohibition and legalization on WeedX.io. Learn about dispensary POS systems and their importance in the cannabis industry."} />
//         </Helmet>
//     )
// }

function ProductSeo({location}) {
    return (
        <Helmet>
            <title>{"Learn About Cannabis Products | WeedX.io Articles"}</title>
            <meta name="title" content={'Learn About Cannabis Products | WeedX.io Articles'}/>
            <meta name='description' content={" Discover informative articles about various cannabis products on WeedX.io. Explore insights, reviews, and recommendations to enhance your cannabis experience."} />
           <link rel="canonical" href={`https://www.weedx.io${location}`} /> 
           <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"></meta>
            {/* Facebook tags */}
            <meta property="og:type" content={"website"} />
            <meta property="og:title" content={"Discover Weed Strains: Indica, Sativa, Hybrid | weedx.io |"} />
            <meta property="og:description" content={" Discover informative articles about various cannabis products on WeedX.io. Explore insights, reviews, and recommendations to enhance your cannabis experience."} />
            { /* End Facebook tags */}

            { /* Twitter tags */}
            <meta name="twitter:creator" content={"website"} />
            <meta name="twitter:card" content={"Marijuana Dispensaries & Delivery Near Me"} />
            <meta name="twitter:title" content={"Discover Weed Strains: Indica, Sativa, Hybrid | weedx.io |"} />
            <meta name="twitter:description" content={" Discover informative articles about various cannabis products on WeedX.io. Explore insights, reviews, and recommendations to enhance your cannabis experience."} />
        </Helmet>
    )
}   

export { LearnSeo,Law , StrainSeo, LawState , ProductSeo }
