import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import "@/styles/globals.css";
import "@/styles/customstyle.module.css"
import layout from "../layout/layout"
import React from "react";
import layout1 from "../layout/layout1"
import { Context } from "../hooks/context"
import Currentlocation from "@/component/currentlocation/CurrentLocation";
import CheckAgeEligbilityPopup from "@/component/CheckAgeEligblityPopup/CheckAgeEligbilityPopup";
import { useRouter } from "next/router";
import Router from 'next/router';
import NProgress from 'nprogress';
import Cookies from 'universal-cookie';
import 'nprogress/nprogress.css';
const layouts = {
  default: layout,
  layout1: layout1,
};
export default function App({ Component, pageProps }) {
  const router = useRouter()
  const cookies = new Cookies();
  const Layout = layouts[Component.layout] || layouts.default;
  const isNotWeedPath = !/^\/weed-(deliveries|dispensaries)\/in\/.+/.test(router.pathname);
  React.useEffect(() => {
    NProgress.configure({ showSpinner: false });
    const handleStart = () => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleStop);
    Router.events.on('routeChangeError', handleStop);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleStop);
      Router.events.off('routeChangeError', handleStop);
    };
  }, []);
  return (
    <GoogleOAuthProvider clientId="418178406595-vqsd5staarqh0pibnho4l4s63gio1bm4.apps.googleusercontent.com">
      <Context>
        <Layout>
       { isNotWeedPath &&  <CheckAgeEligbilityPopup  value={(cookies.get("CheckAge") && cookies.get("fetchlocation") )=== undefined ? true : false}></CheckAgeEligbilityPopup>}
        {isNotWeedPath && <Currentlocation></Currentlocation>   }
          <Component {...pageProps} />
        </Layout>
      </Context>
    </GoogleOAuthProvider>
  );
}
