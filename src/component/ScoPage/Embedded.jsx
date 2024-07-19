import Head from "next/head"
import { useLocation, useParams } from "react-router-dom"
import React from "react"
function Embedded({ Despen, locationStore  }) {
    const [MetaTag, SetMetaTag] = React.useState({ title: "", discription: "" })
    const location = useLocation()
    const params = useParams()
    const { tab, Category, SubCategory } = params
    React.useEffect(() => {
        if (location.pathname.slice(0, 16) !== "/weed-deliveries") {
            if (tab === undefined) {
                SetMetaTag({
                    ...MetaTag, title: `Weed dispensary in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name}| Weedx.io`,
                    discription: `Shop your favorite cannabis products from ${Despen[0]?.Store_Name} Weed dispensary ${Despen[0]?.City}, ${Despen[0]?.State}. High Quality marijuana products near you. Get the best deals and offers now. `
                })
            }
            else {
                switch (tab) {
                    case 'products':
                        if (SubCategory !== undefined) {
                            SetMetaTag({
                                ...MetaTag, title: `Shop Cannabis ${SubCategory} | Weed Dispensary in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name} | Weedx.io`,
                                discription: `Browse Product of ${Despen[0]?.Store_Name} marijuana dispensary in ${Despen[0]?.City}, ${Despen[0]?.State}. High Quality cannabis products near you `
                            })
                        }
                        else {
                            if (Category) {

                                SetMetaTag({
                                    ...MetaTag, title: `Shop Cannabis ${Category} | Weed Dispensary in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name} | Weedx.io`,
                                    discription: `Shop your favorite cannabis ${Category} from ${Despen[0]?.Store_Name} Weed dispensary ${Despen[0]?.City}, ${Despen[0]?.State}. High Quality marijuana products near you. Get the best deals and offers now`
                                })
                            }

                            else {
                                SetMetaTag({
                                    ...MetaTag, title: `Weed dispensary in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name}| ${tab.replace("-", "")} | Weedx.io`,
                                    discription: `Browse Product of ${Despen[0]?.Store_Name} marijuana dispensary in ${Despen[0]?.City}, ${Despen[0]?.State}. High Quality cannabis products near you `
                                })
                            }
                        }


                        break;
                    case 'store-details':
                        SetMetaTag({
                            ...MetaTag, title: `Weed dispensary in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name}| ${tab.replace("-", " ")} | Weedx.io`,
                            discription: ` Explore weed dispensary in   ${Despen[0]?.City}, ${Despen[0]?.State} with ${Despen[0]?.Store_Name}. Check out store deals and find more savings on Weedx.io. `
                        })
                        break;
                    case 'review':
                        SetMetaTag({
                            ...MetaTag, title: `${Despen[0]?.Store_Name !== null ? Despen[0]?.Store_Name : "Weedx.io"}  Reviews | Weedx.io`,
                            discription: `Discover reviews for ${Despen[0]?.Store_Name !== null ? Despen[0]?.Store_Name : "Weedx.io"} dispensary and delivery service on WeedX.io. Read user feedback, ratings, and experiences to find the best cannabis products and services near you.`
                        })
                        break;
                    case 'deal':
                        SetMetaTag({
                            ...MetaTag, title: `Weed dispensary in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name}| ${tab.replace("-", " ")}| Deals | Weedx.io`,
                            discription: `Best deals from ${Despen[0]?.Store_Name} marijuana dispensary in ${Despen[0]?.City}, ${Despen[0]?.State}. Get the best deals, offers and discounts on your favorite cannabis products.`
                        })
                        break;
                    case 'media':
                        SetMetaTag({
                            ...MetaTag, title: `Weed dispensary in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name}| ${tab.replace("-", " ")} | Weedx.io`,
                            discription: `Browse media and updates from ${Despen[0]?.Store_Name} marijuana dispensary in  ${Despen[0]?.City}, ${Despen[0]?.State}. Get the best cannabis dispensary services with high quality products`
                        })
                        case 'menu':
                            SetMetaTag({
                                ...MetaTag, title: `Weed dispensary in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name}| ${tab.replace("-", " ")} | Weedx.io`,
                                discription: `Discover convenient weed dispensary in ${Despen[0]?.City}  ${Despen[0]?.State} with ${Despen[0]?.Store_Name}  Explore our menu on Weedx.io for quality products and easy ordering.`
                            })
                        break;
                    default:
                    // code block
                }
            }
        }
        else {
            if (tab === undefined) {

                SetMetaTag({
                    ...MetaTag, title: `Weed Delivery in ${Boolean(Despen[0]?.City) ?Despen[0]?.City :  ''}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name}| Weedx.io`,
                    discription: `Shop your favorite cannabis products from ${Despen[0]?.Store_Name} Weed delivery ${Despen[0]?.City}, ${Despen[0]?.State}. High Quality marijuana products near you. Get the best deals and offers now. 
                    `
                })  

            }
            else {
                switch (tab) {
                    case 'products':
                        if (SubCategory !== undefined) {
                            SetMetaTag({
                                ...MetaTag, title: `Shop Cannabis ${SubCategory}| Weed Delivery in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name} | Weedx.io`,
                                discription: `Shop your favorite cannabis ${SubCategory} from  ${Despen[0]?.Store_Name}  Weed delivery ${Despen[0]?.City}, ${Despen[0]?.State}. High Quality marijuana products near you. Get the best deals and offers now.`
                            })
                        }
                        else {
                            if (Category) {

                                SetMetaTag({
                                    ...MetaTag, title: `Shop Cannabis ${Category} | Weed Delivery in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name} | Weedx.io`,
                                    discription: `Shop your favorite cannabis ${Category} from ${Despen[0]?.Store_Name} Weed Delivery ${Despen[0]?.City}, ${Despen[0]?.State}. High Quality marijuana products near you. Get the best deals and offers now`
                                })
                            }

                            else {
                                SetMetaTag({
                                    ...MetaTag, title: `Weed Delivery in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name} | Products | Weedx.io`,
                                    discription: `Browse Store Menu of ${Despen[0]?.Store_Name} marijuana delivery in ${Despen[0]?.City}, ${Despen[0]?.State}. High Quality cannabis products near you `
                                })
                            }
                        }
                        break;
                    case 'store-details':
                        SetMetaTag({
                            ...MetaTag, title: `Weed Delivery in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name}  | Store Details | Weedx.io`,
                            discription: `Explore weed delivery in  ${Despen[0]?.City}, ${Despen[0]?.State} with ${Despen[0]?.Store_Name}. Check out store deals and find more savings on Weedx.io `
                        })
                        break;
                    case 'review':
                        SetMetaTag({
                            ...MetaTag, title: `${Despen[0]?.Store_Name !== null ? Despen[0]?.Store_Name : 'Weedx.io'} Reviews | weedx.io `,
                            discription: `Discover reviews for  ${Despen[0]?.Store_Name} dispensary and delivery service on WeedX.io. Read user feedback, ratings, and experiences to find the best cannabis products and services near you.`
                        })
                        break;
                    case 'deal':
                        SetMetaTag({
                            ...MetaTag, title: `Weed Delivery in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name} | Deals | Weedx.io`,
                            discription: `Best deals from ${Despen[0]?.Store_Name} marijuana Delivery in ${Despen[0]?.City}, ${Despen[0]?.State}. Get the best deals, offers and discounts on your favorite cannabis products.`
                        })
                        break;
                    case 'media':
                        SetMetaTag({
                            ...MetaTag, title: ` Weed Delivery in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name} | Media | Weedx.io`,
                            discription: ` Browse media and updates from ${Despen[0]?.Store_Name}  marijuana delivery in ${Despen[0]?.City}, ${Despen[0]?.State}. Get the best cannabis delivery Services with high qualtiy products.`
                        })
                    case 'menu':
                        SetMetaTag({
                            ...MetaTag, title: ` Weed Delivery in ${Despen[0]?.City}, ${Despen[0]?.State} | ${Despen[0]?.Store_Name} | Menu | Weedx.io`,
                            discription: ` Discover convenient weed delivery in ${Despen[0]?.City}  ${Despen[0]?.State} with ${Despen[0]?.Store_Name}  Explore our menu on Weedx.io for quality products and easy ordering.`
                        })
                        break;
                    default:
                    // code block
                }
            }
        }

    }, [params, Despen])

    return (
        <Head>
            <title>{MetaTag.title}</title>
            <meta name="title" content={`Marijuana Dispensaries & Delivery Near Me | weedx.io |`} />
            <meta name='description' content={MetaTag.discription} />
            <link rel="canonical" href={`https://www.weedx.io${locationStore}`} />
            <meta itemProp="name" content="WeedX" />
            <meta itemProp="description" content={MetaTag.discription} />
            <meta name="robots" content="NOINDEX,INDEXIFEMBEDDED" />
            {/* Facebook tags */}
            <meta property="og:type" content={"website"} />
            <meta property="og:title" content={MetaTag.title} />
            <meta property="og:description" content={MetaTag.discription} />
            { /* End Facebook tags */}
            { /* Twitter tags */}
            <meta name="twitter:creator" content={"website"} />
            <meta name="twitter:card" content={"Marijuana Dispensaries & Delivery Near Me"} />
            <meta name="twitter:title" content={MetaTag.title} />
            <meta name="twitter:description" content={MetaTag.discription} />
        </Head>
    )
}
export { Embedded }
