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
import cookie from 'cookie';
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
      <DeliveryServices Skeleton={Skeleton} link={"weed-deliveries"} title={"Delivery services"} data={initialData.GetDelivery} location={initialData.formatted_address}></DeliveryServices>
      <HomePageWeedBanner props={initialData.bottembannner}></HomePageWeedBanner>
      <DeliveryServices Skeleton={Skeleton} link={"weed-dispensaries"} title={"Shop Dispensaries Near You"}  data={initialData.Dispensaries} location={initialData.formatted_address}></DeliveryServices>
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

const transformString = (str) => {
  if (typeof str !== "string" || !str.trim()) {
    return '';
  }

  return str
    .replace(/-/g, " ")  // Replace hyphens with spaces
    .split(' ')          // Split the string into an array of words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  // Capitalize the first letter of each word
    .join(' ');          // Join the words back into a single string
};

export async function getServerSideProps(context) {
  const cookies = cookie.parse(context.req.headers.cookie || '');
  const object = {
    City: transformString(JSON.parse(cookies.fetchlocation).city) || '',
    Country: transformString(JSON.parse(cookies.fetchlocation).country) || '',
    State: transformString(JSON.parse(cookies.fetchlocation).state) || '',
    limit:10 
  };

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

    const [banner, callcategory, bannner2, brand, GetDelivery , Dispensaries] = await Promise.all([
      fetchWithTimeout('https://api.cannabaze.com/UserPanel/Get-AllHomePageBanner/').catch(() => null),
      fetchWithTimeout('https://api.cannabaze.com/UserPanel/Get-Categories/').catch(() => null),
      fetchWithTimeout('https://api.cannabaze.com/UserPanel/Get-PromotionalBanners/').catch(() => null),
      fetchWithTimeout('https://api.cannabaze.com/UserPanel/Get-AllBrand/').catch(() => null),
      fetchWithTimeout('https://api.cannabaze.com/UserPanel/Get-GetDeliveryStoresHomepage/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
      }).catch(() => null),
      fetchWithTimeout('https://api.cannabaze.com/UserPanel/Get-Dispensaries/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
      }).catch(() => null),
    ]);

    const [topbanner, category, bottembannner, getbrand, GetDelivery1 , Dispensaries1] = await Promise.all([
      banner ? banner.json().catch(() => []) : [],
      callcategory ? callcategory.json().catch(() => []) : [],
      bannner2 ? bannner2.json().catch(() => []) : [],
      brand ? brand.json().catch(() => []) : [],
      GetDelivery ? GetDelivery.json().catch(() => []) : [],
      Dispensaries ? Dispensaries.json().catch(() => []) : []
    ]);
    const responseData = {
      topbanner: topbanner || [],
      category: category || [],
      bottembannner: bottembannner || [],
      brand: getbrand || [],
      GetDelivery: GetDelivery1 || [],
      Dispensaries :Dispensaries1 || [],
      formatted_address:JSON.parse(cookies.fetchlocation).formatted_address  
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


