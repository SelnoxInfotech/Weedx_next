import Createcontext from "@/hooks/context"
import Link from "next/link";
import React from "react";
const Sitemap = () => {
    const { state } = React.useContext(Createcontext)

    const pages = [
        { page: "Home", link: "/" },
        { page: "Dispensaries", link: `/weed-dispensaries/in/${state?.Country?.toLowerCase()}/${state?.State?.toLowerCase()}/${state?.City?.toLowerCase()}` },
        { page: "deliveries", link: `/weed-deliveries/in/${state?.Country?.toLowerCase()}/${state?.State?.toLowerCase()}/${state?.City?.toLowerCase()}` },
        { page: "All News", link: "/cannabis-news" },
        { page: "brands", link: `/brands` },
        { page: "products", link: `/products` },
        { page: "learn", link: `/learn` },
        { page: "About us", link: "/aboutus" },
        { page: "Faq's", link: "/faq" },
        { page: "Help Center", link: "/helpcenter" },
        { page: "Terms & Conditions", link:"/terms-and-conditions"},
        {page:"Cookies policy" , link:"/cookies-policy"},
        {page:"Privacy policy" ,  link:"/privacy-policy"},
    ]
    return (
        <div >
            {
                pages.map((data , index) => {
                    return (
                        <Link  key={index} href={data.link} >
                            <p style={{ color: "#31B665" }}>{data.page}</p>
                        </Link>
                    )
                })
            }

        </div>
    );
};

export default Sitemap;