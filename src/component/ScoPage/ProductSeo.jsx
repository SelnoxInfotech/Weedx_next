import { Helmet } from 'react-helmet-async';
import React from "react"
import { useLocation } from "react-router-dom"
function ProductDetailsSeo({ Productname, Productnm, ProductCategory, StoreName, TotalRating , image, rating, City, State, location,sellername,price, robot, Description,category,id,Subcategorge }) {
  
    const reviewSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": Productnm,
        "image": image,
        "sku": "0",
        "mpn": "0",
        "description": Description.replace(/<\/?[^>]+(>|$)/g, ""),
        "offers": {
            "@type": "Offer",
            "url":  `https://www.weedx.io/products/${category}/${Subcategorge}/${Productnm}/${id}`,
            "priceCurrency": "USD",
            "price": price,
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": sellername
            }
        },
        "review": {
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "bestRating":rating.toString(),
                "ratingValue":rating.toString()
            },
            "author": {
                "@type":"Person",
                "name":"weedx"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingCount":rating.toString(),
            "ratingValue":rating.toString(),
            "reviewCount": TotalRating?.toString(),
        }
    };

    return (
        <Helmet>
            <title> {`${Productname}  `}</title>
            <meta name="title" content={`${Productname}`} />
            <meta name='description' content={`${Productnm} - ${ProductCategory} at ${StoreName} - Your Ultimate Cannabis ${useLocation().pathname.slice(0, 16) === "/weed-deliveries" ? `Delivery` : `Dispensary`} in ${City}, ${State}.`} />
            <link rel="canonical" href={`https://www.weedx.io${location}`} />
            <meta name="robots" content={robot}></meta>
            {/* Facebook tags */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={`${Productname}`} />
            <meta property="og:description" content={`${Productnm} - ${ProductCategory} at ${StoreName} - Your Ultimate Cannabis ${useLocation().pathname.slice(0, 16) === "/weed-deliveries" ? `Delivery` : `Dispensary`} in ${City}, ${State}.`} />
            { /* End Facebook tags */}
            { /* Twitter tags */}
            <meta name="twitter:creator" content={"website"} />
            <meta name="twitter:card" content={"website Dispensaries & `Delivery` Near Me"} />
            <meta name="twitter:title" content={`${Productname}`} />
            <meta name="twitter:description" content={`${Productnm} - ${ProductCategory} at ${StoreName} - Your Ultimate Cannabis ${useLocation().pathname.slice(0, 16) === "/weed-deliveries" ? `Delivery` : `Dispensary`} in ${City}, ${State}.`} />

           { rating !== 0 &&  <script type="application/ld+json">
                {JSON.stringify(reviewSchema)}
            </script>}
        </Helmet>
    )
}


function ProductSeo({ location, review }) {

    return (


        <Helmet>
            <title>{"Shop High-Quality Marijuana products Near You | weedx.io |"}</title>
            <meta name="title" content={`Shop High-Quality Marijuana products Near You | weedx.io |`} />
            <meta name='description' content={"Shop High-Quality Marijuana products from top brands near you. Recreational and Medical Marijuana Dispensaries & Delivery Near me. Order online from weedx.io"} />
            <link rel="canonical" href={`https://www.weedx.io${location}`} />
            <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"></meta>
            {/* Facebook tags */}
            <meta property="og:type" content={"website"} />
            <meta property="og:title" content={"Shop High-Quality Marijuana products Near You | weedx.io |"} />
            <meta property="og:description" content={"Shop High-Quality Marijuana products from top brands near you. Recreational and Medical Marijuana Dispensaries & Delivery Near me. Order online from weedx.io"} />
            { /* End Facebook tags */}
            { /* Twitter tags */}
            <meta name="twitter:creator" content={"website"} />
            <meta name="twitter:card" content={"Marijuana Dispensaries & Delivery Near Me"} />
            <meta name="twitter:title" content={"Shop High-Quality Marijuana products Near You | weedx.io |"} />
            <meta name="twitter:description" content={"Shop High-Quality Marijuana products from top brands near you. Recreational and Medical Marijuana Dispensaries & Delivery Near me. Order online from weedx.io"} />



        </Helmet>
    )
}

function ProductCategorySeo({ categoryname, location }) {
    return (

        <Helmet>
            <title>{`Find Cannabis ${categoryname.charAt(0).toUpperCase() + categoryname.slice(1)} Near You | weedx.io |`}</title>
            <meta name="title" content={`Find Cannabis ${categoryname.charAt(0).toUpperCase() + categoryname.slice(1)} Near You | weedx.io |`} />
            <meta name='description' content={` weedx.io best place to find your favorite Cannabis ${categoryname.charAt(0).toUpperCase() + categoryname.slice(1)} Near You. Explore different strains from different brands with different deals and offers.`} />
            <link rel="canonical" href={`https://www.weedx.io${location}`} />
            <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"></meta>
            {/* Facebook tags */}
            <meta property="og:type" content={"website"} />
            <meta property="og:title" content={`Find Cannabis ${categoryname.charAt(0).toUpperCase() + categoryname.slice(1)} Near You | weedx.io |`} />
            <meta property="og:description" content={` weedx.io best place to find your favorite Cannabis ${categoryname.charAt(0).toUpperCase() + categoryname.slice(1)} Near You. Explore different strains from different brands with different deals and offers.`} />
            { /* End Facebook tags */}
            { /* Twitter tags */}
            <meta name="twitter:creator" content={"website"} />
            <meta name="twitter:card" content={"Marijuana Dispensaries & Delivery Near Me"} />
            <meta name="twitter:title" content={`Find Cannabis ${categoryname.charAt(0).toUpperCase() + categoryname.slice(1)} Near You | weedx.io |`} />
            <meta name="twitter:description" content={` weedx.io best place to find your favorite Cannabis ${categoryname.charAt(0).toUpperCase() + categoryname.slice(1)} Near You. Explore different strains from different brands with different deals and offers.`} />
        </Helmet>
    )
}





export { ProductDetailsSeo, ProductSeo, ProductCategorySeo }



// =
// Either 'offers', 'review' or 'aggregateRating' should be specified