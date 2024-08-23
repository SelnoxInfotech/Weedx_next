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
const NewsBlog = dynamic(() => import('../component/home/Newsblog'),  { ssr: true });
// const HomePageDealsSignup = dynamic(() => import('../component/home/HomePageDealsSignup'));
const FeaturedBrand = dynamic(() => import('@/component/home/FeaturedBrand'));
import cookie from 'cookie';
import Currentlocation from "@/component/currentlocation/CurrentLocation";
import Createcontext from "@/hooks/context";
import { modifystr } from "@/hooks/utilis/commonfunction";
export default function Home({ initialData }) {
  const { state, dispatch } = React.useContext(Createcontext);
  const [Skeleton, SetSkeleton] = React.useState(true)
  const Navigate =  useRouter()
  function ShowCategoryProduct(id, name) {

    Navigate.push(`/products/${modifystr(name)}/${id}`);
  }

  return (
    <>
     {state.permission && <Currentlocation></Currentlocation>}
      <HomePageSco location={useRouter().pathname}></HomePageSco>
        <HomePageBanner props={initialData.topbanner}> </HomePageBanner>
        <CategoryProduct Category={initialData.category} ShowCategoryProduct={ShowCategoryProduct} Skeleton={false}></CategoryProduct>
        <DeliveryServices Skeleton={Skeleton} link={"weed-deliveries"} title={"Delivery services"} data={initialData.GetDelivery}  initialData={initialData} location={initialData.formatted_address}></DeliveryServices>
        <HomePageWeedBanner props={initialData.bottembannner}></HomePageWeedBanner>
        <DeliveryServices Skeleton={Skeleton} link={"weed-dispensaries"} title={"Shop Dispensaries Near You"} data={initialData.Dispensaries} initialData={initialData} location={initialData.formatted_address}></DeliveryServices>
        <FeaturedBrand CardDataArray={initialData.brand} />
        <div className="col-12 border" style={{ height: "300px", position: "relative", top: "15px" }}>
          <Map height={"297px"} width={"100%"}></Map>
        </div>
        <Staticcontent></Staticcontent>
        <NewsBlog data={initialData.news}></NewsBlog>
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
  // console.log(context.req.headers['x-fetchlocation'], "index page")
  const cookies = JSON.parse(context.req.headers['x-fetchlocation'] || '');
  const object = {
    City: transformString(cookies.city) || '',
    State: transformString(cookies.state) || '',
    Country: transformString(cookies.country) || '',
    limit: 10
  };
  for (const key in object) {
    if (object[key] === '') {
      delete object[key];
    }
  }



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

    const [banner, callcategory, bannner2, brand, GetDelivery, Dispensaries, news] = await Promise.all([
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
      fetchWithTimeout('https://apiv2.cannabaze.com/UserPanel/Get-News/').catch(() => null),
    ]);

    const [topbanner, category, bottembannner, getbrand, GetDelivery1, Dispensaries1 , news1] = await Promise.all([
      banner ? banner.json().catch(() => []) : [],
      callcategory ? callcategory.json().catch(() => []) : [],
      bannner2 ? bannner2.json().catch(() => []) : [],
      brand ? brand.json().catch(() => []) : [],
      GetDelivery ? GetDelivery.json().catch(() => []) : [],
      Dispensaries ? Dispensaries.json().catch(() => []) : [],
      news ? news.json().catch(() => []) : []
    ]);
    const responseData = {
      topbanner: topbanner || [],
      category: category || [],
      bottembannner: bottembannner || [],
      brand: getbrand || [],
      GetDelivery: GetDelivery1 || [],
      Dispensaries: Dispensaries1 || [],
      news:news1,
      formatted_address: cookies.formatted_address,
      City: transformString(cookies.city) || '',
      State: transformString(cookies.state) || '',
      Country: transformString(cookies.country) || '',
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


