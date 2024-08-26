import Head from "next/head";

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
        <Head>
            <title> {Productname}</title>
            <meta name='description' content={`${Productnm} - ${ProductCategory} at ${StoreName} - Your Ultimate Cannabis Product in ${City}, ${State}.`} />
            <link rel="canonical" href={`https://www.weedx.io${location}`} />
            <meta name="robots" content={robot}></meta>
            {/* Facebook tags */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={`${Productname}`} />
            <meta property="og:description" content={`${Productnm} - ${ProductCategory} at ${StoreName} - Your Ultimate Cannabis Product in ${City}, ${State}.`} />
            <meta property="og:image" content={image} />
            { /* End Facebook tags */}
            { /* Twitter tags */}
            <meta name="twitter:creator" content={"website"} />
            <meta name="twitter:card" content={"website Dispensaries & `Delivery` Near Me"} />
            <meta name="twitter:title" content={`${Productname}`} />
            <meta name="twitter:description" content={`${Productnm} - ${ProductCategory} at ${StoreName} - Your Ultimate Cannabis Product in ${City}, ${State}.`} />
            <meta property="og:image" content={image} />
           { rating !== 0 &&  <script type="application/ld+json">
                {JSON.stringify(reviewSchema)}
            </script>}

        {/* console.log("djhjk") */}


        </Head>
    )
}

export default ProductDetailsSeo