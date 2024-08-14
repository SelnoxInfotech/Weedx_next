import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

function StoreDetails({ Despen, locationStore }) {
    const location = useRouter();
    console.log(location.pathname.slice(0, 16) === "/weed-deliveries" , location.pathname.slice(0, 16))
    const tab = location.query.details ? location.query.details[1] : '';

    // Set default meta tags
    let metaTag = {
        title: `Weed dispensary in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name} | Weedx.io`,
        description: `Shop your favorite cannabis products from ${Despen[0]?.Store_Name} Weed dispensary ${Despen[0]?.City}, ${Despen[0]?.State}. High Quality marijuana products near you. Get the best deals and offers now.`
    };

    // Customize meta tags based on conditions
    if (location.pathname.slice(0, 16) === "/weed-deliveries") {
        if (tab === undefined) {
            metaTag = {
                title: `Weed dispensary in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name} | Weedx.io`,
                description: `Shop your favorite cannabis products from ${Despen[0]?.Store_Name} Weed dispensary ${Despen[0]?.City}, ${Despen[0]?.State}. High Quality marijuana products near you. Get the best deals and offers now.`
            };
        } else {
            switch (tab) {
                case 'products':
                    metaTag = {
                        title: `Shop Cannabis ${Despen[0]?.Category || ''} | Weed Dispensary in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name} | Weedx.io`,
                        description: `Browse Product of ${Despen[0]?.Store_Name} marijuana dispensary in ${Despen[0]?.City}, ${Despen[0]?.State}. High Quality cannabis products near you`
                    };
                    break;
                case 'store-details':
                    metaTag = {
                        title: `Weed dispensary in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name} | ${tab.replace("-", " ")} | Weedx.io`,
                        description: `Explore weed dispensary in ${Despen[0]?.City}, ${Despen[0]?.State} with ${Despen[0]?.Store_Name}. Check out store deals and find more savings on Weedx.io.`
                    };
                    break;
                case 'review':
                    metaTag = {
                        title: `${Despen[0]?.Store_Name || 'Weedx.io'} Reviews | Weedx.io`,
                        description: `Discover reviews for ${Despen[0]?.Store_Name || 'Weedx.io'} dispensary and delivery service on Weedx.io. Read user feedback, ratings, and experiences to find the best cannabis products and services near you.`
                    };
                    break;
                case 'deal':
                    metaTag = {
                        title: `Weed dispensary in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name} | ${tab.replace("-", " ")} | Deals | Weedx.io`,
                        description: `Best deals from ${Despen[0]?.Store_Name} marijuana dispensary in ${Despen[0]?.City}, ${Despen[0]?.State}. Get the best deals, offers and discounts on your favorite cannabis products.`
                    };
                    break;
                case 'media':
                case 'menu':
                    metaTag = {
                        title: `Weed dispensary in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name} | ${tab.replace("-", " ")} | Weedx.io`,
                        description: `Discover convenient weed dispensary in ${Despen[0]?.City}, ${Despen[0]?.State} with ${Despen[0]?.Store_Name}. Explore our menu or media on Weedx.io for quality products and easy ordering.`
                    };
                    break;
                default:
                    // Default meta tags if no case matches
                    break;
            }
        }
    } 
    else {
        if (tab === undefined) {
            metaTag = {
                title: `Weed Delivery in ${Despen[0]?.City || ''}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name} | Weedx.io`,
                description: `Shop your favorite cannabis products from ${Despen[0]?.Store_Name} Weed delivery ${Despen[0]?.City}, ${Despen[0]?.State}. High Quality marijuana products near you. Get the best deals and offers now.`
            };
        } else {
            switch (tab) {
                case 'products':
                    metaTag = {
                        title: `Shop Cannabis ${Despen[0]?.SubCategory || ''} | Weed Delivery in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name} | Weedx.io`,
                        description: `Shop your favorite cannabis ${Despen[0]?.SubCategory} from ${Despen[0]?.Store_Name} Weed delivery ${Despen[0]?.City}, ${Despen[0]?.State}. High Quality marijuana products near you. Get the best deals and offers now.`
                    };
                    break;
                case 'store-details':
                    metaTag = {
                        title: `Weed Delivery in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name} | Store Details | Weedx.io`,
                        description: `Explore weed delivery in ${Despen[0]?.City}, ${Despen[0]?.State} with ${Despen[0]?.Store_Name}. Check out store deals and find more savings on Weedx.io.`
                    };
                    break;
                case 'review':
                    metaTag = {
                        title: `${Despen[0]?.Store_Name || 'Weedx.io'} Reviews | Weedx.io`,
                        description: `Discover reviews for ${Despen[0]?.Store_Name || 'Weedx.io'} dispensary and delivery service on Weedx.io. Read user feedback, ratings, and experiences to find the best cannabis products and services near you.`
                    };
                    break;
                case 'deal':
                    metaTag = {
                        title: `Weed Delivery in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name} | Deals | Weedx.io`,
                        description: `Best deals from ${Despen[0]?.Store_Name} marijuana delivery in ${Despen[0]?.City}, ${Despen[0]?.State}. Get the best deals, offers and discounts on your favorite cannabis products.`
                    };
                    break;
                case 'media':
                case 'menu':
                    metaTag = {
                        title: `Weed Delivery in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name} | ${tab.replace("-", " ")} | Weedx.io`,
                        description: `Browse media or menu from ${Despen[0]?.Store_Name} marijuana delivery in ${Despen[0]?.City}, ${Despen[0]?.State}. Get the best cannabis delivery services with high quality products.`
                    };
                    break;
                default:
                    // Default meta tags if no case matches
                    break;
            }
        }
    }

    const reviewSchema = {
        "@context": "https://schema.org",
        "@type": "Store",
        "name": Despen[0]?.Store_Name || '',
        "image": Despen[0]?.Store_Image || '',
        "sku": "0",
        "mpn": "0",
        "description": Despen[0]?.Stores_Description?.replace(/<\/?[^>]+(>|$)/g, "") || '',
        "address": {
            "@type": "PostalAddress",
            "streetAddress": Despen[0]?.Store_Address || '',
            "addressLocality": Despen[0]?.City || '',
            "addressRegion": Despen[0]?.State || '',
            "addressCountry": Despen[0]?.Country || ''
        },
        "review": {
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "bestRating": Despen[0]?.rating ? Despen[0]?.rating.toString() : "0",
                "ratingValue": Despen[0]?.rating ? Despen[0]?.rating.toString() : "0"
            },
            "author": {
                "@type": "Person",
                "name": "weedx"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingCount": Despen[0]?.TotalRating ? Despen[0]?.TotalRating.toString() : "0",
            "ratingValue": Despen[0]?.rating ? Despen[0]?.rating.toString() : "0",
            "reviewCount": Despen[0]?.TotalRating ? Despen[0]?.TotalRating.toString() : "0",
        }
    };

    return (
        <Head>
            <title>{metaTag.title}</title>
            <meta name="title" content={metaTag.title} />
            <meta name="description" content={metaTag.description} />
            <link rel="canonical" href={`https://weedx.io${location.asPath}`} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={metaTag.title} />
            <meta property="og:description" content={metaTag.description} />
            <meta property="og:url" content={`https://weedx.io${location.asPath}`} />
            <meta property="og:image" content={Despen[0]?.Store_Image || ''} />
            <meta property="og:image:alt" content={Despen[0]?.Store_Name || ''} />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={metaTag.title} />
            <meta property="twitter:description" content={metaTag.description} />
            <meta property="twitter:image" content={Despen[0]?.Store_Image || ''} />
            <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
        </Head>
    );
}

export default StoreDetails;
