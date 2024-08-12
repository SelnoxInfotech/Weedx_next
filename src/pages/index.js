import React from "react";
import { useRouter } from "next/router";
import { HomePageSco } from "../component/ScoPage/HomePageSco"
import dynamic from 'next/dynamic'
const HomePageBanner = dynamic(() => import('../component/home/homepagebanner'));
const CategoryProduct = dynamic(() => import('../component/category/category'));
const DeliveryServices = dynamic(() => import('../component/home/deliveryservice'), { ssr: true });
const HomePageWeedBanner = dynamic(() => import('../component/home/HomePageWeedBanner'));
const Map = dynamic(() => import('../component/home/map/map'));
const Staticcontent = dynamic(() => import('../component/home/staticcontent'));
const NewsBlog = dynamic(() => import('../component/home/Newsblog'));
// const HomePageDealsSignup = dynamic(() => import('../component/home/HomePageDealsSignup'));
const FeaturedBrand = dynamic(() => import('@/component/home/FeaturedBrand'));
import Createcontext from "../hooks/context"
export default function Home({ initialData }) {
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
      <HomePageWeedBanner props={initialData.bottembannner}></HomePageWeedBanner>
      <DeliveryServices Skeleton={Skeleton} link={"weed-dispensaries"} title={"Shop Dispensaries Near You"} ></DeliveryServices>
      <FeaturedBrand CardDataArray={initialData.brand} />
      <div className="col-12 border" style={{ height: "300px", position: "relative", top: "15px" }}>
        <Map height={"297px"} width={"100%"}></Map>
      </div>
      <Staticcontent></Staticcontent>
      <NewsBlog></NewsBlog>
      {/* <HomePageDealsSignup></HomePageDealsSignup> */}
    </>
  );
}

export async function getServerSideProps() {
  const handleError = (error) => {
    console.error('Error fetching data:', error);
    return {
      props: {
        initialData: {
          topbanner: [],
          category: [],
          bottembannner: [],
          brand: []
        },
        error: 'Failed to fetch data',
      },
    };
  };

  try {
    const fetchWithTimeout = async (url, options = {}, timeout = 5000) => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(id);
      return response;
    };

    const [banner, callcategory, bannner2, brand] = await Promise.all([
      fetchWithTimeout('https://api.cannabaze.com/UserPanel/Get-AllHomePageBanner/').catch(() => null),
      fetchWithTimeout('https://api.cannabaze.com/UserPanel/Get-Categories/').catch(() => null),
      fetchWithTimeout('https://api.cannabaze.com/UserPanel/Get-PromotionalBanners/').catch(() => null),
      fetchWithTimeout('https://api.cannabaze.com/UserPanel/Get-AllBrand/').catch(() => null),
    ]);

    const [topbanner, category, bottembannner, getbrand] = await Promise.all([
      banner ? banner.json().catch(() => []) : [],
      callcategory ? callcategory.json().catch(() => []) : [],
      bannner2 ? bannner2.json().catch(() => []) : [],
      brand ? brand.json().catch(() => []) : []
    ]);

    const responseData = {
      topbanner: topbanner || [],
      category: category || [],
      bottembannner: bottembannner || [],
      brand: getbrand || []
    };

    return {
      props: {
        initialData: responseData,
      },
      // revalidate: 60,
    };
  } catch (error) {
    return handleError(error);
  }
}


