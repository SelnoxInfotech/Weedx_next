import React from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });
import { HomePageSco } from "../component/ScoPage/HomePageSco"
import dynamic from 'next/dynamic'
const HomePageBanner = dynamic(() => import('../component/home/homepagebanner'));
const CategoryProduct = dynamic(() => import('../component/category/category'));
const DeliveryServices = dynamic(() => import('../component/home/deliveryservice'), { ssr: true });
const HomePageWeedBanner = dynamic(() => import('../component/home/HomePageWeedBanner'));
const Map = dynamic(() => import('../component/home/map/map'));
const Staticcontent = dynamic(() => import('../component/home/staticcontent'));
const NewsBlog = dynamic(() => import('../component/home/Newsblog'));
const HomePageDealsSignup = dynamic(() => import('../component/home/HomePageDealsSignup'));
const Currentlocation = dynamic(() => import('../component/currentlocation/CurrentLocation'));
const FeaturedBrand = dynamic(() => import('@/component/home/FeaturedBrand'));
import Createcontext from "../hooks/context"
export default function Home({ initialData }) {
  const { state } = React.useContext(Createcontext)
  const [Category, SetCategory] = React.useState([])
  const [Skeleton, SetSkeleton] = React.useState(true)

  function ShowCategoryProduct(id, name) {

    Navigate(`/products/${name.replace(/%20| /g, "-").toLowerCase()}/${id}`);
  }
  // console.log(initialData.brand)
  return (
    <>
      {/* <Currentlocation></Currentlocation> */}
      <HomePageSco location={useRouter().pathname}></HomePageSco>
      <HomePageBanner props={initialData.topbanner}> </HomePageBanner>
      <CategoryProduct Category={initialData.category} ShowCategoryProduct={ShowCategoryProduct} Skeleton={false}></CategoryProduct>
      <DeliveryServices Skeleton={Skeleton} link={"weed-deliveries"} title={"Delivery services"}></DeliveryServices>
      <HomePageWeedBanner></HomePageWeedBanner>
      <DeliveryServices Skeleton={Skeleton} link={"weed-dispensaries"} title={"Shop Dispensaries Near You"} ></DeliveryServices>
      <FeaturedBrand CardDataArray={initialData.brand} />
      <div className="col-12 border" style={{ height: "300px", position: "relative", top: "15px" }}>
        <Map height={"297px"} width={"100%"}></Map>
      </div>
      <Staticcontent></Staticcontent>
      <NewsBlog></NewsBlog>
      <HomePageDealsSignup></HomePageDealsSignup>
    </>
  );
}


export async function getStaticProps() {
  const handleError = (error) => {
    console.error('Error fetching data:', error);
    return {
      props: {
        initialData: [],
        error: 'Failed to fetch data',
      },
    };
  };

  try {
    const [banner, callcategory, bannner2, brand] = await Promise.all([
      fetch('https://api.cannabaze.com/UserPanel/Get-AllHomePageBanner/').catch(handleError),
      fetch('https://api.cannabaze.com/UserPanel/Get-Categories/').catch(handleError),
      fetch('https://api.cannabaze.com/UserPanel/Get-PromotionalBanners/').catch(handleError),
      fetch('https://api.cannabaze.com/UserPanel/Get-AllBrand/ ').catch(handleError),
    ]);

    const [topbanner, category, bottembannner, getbrand] = await Promise.all([
      banner.json().catch(handleError),
      callcategory.json().catch(handleError),
      bannner2.json().catch(handleError),
      brand.json().catch(handleError)
    ]);


    const responseData = {
      topbanner: topbanner,
      category: category,
      bottembannner: bottembannner,
      brand: getbrand
    };

    return {
      props: {
        initialData: responseData,
      },
      revalidate: 60,
    };
  } catch (error) {
    return handleError(error);
  }
}






