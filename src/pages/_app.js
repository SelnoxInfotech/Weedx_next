import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import "@/styles/globals.css";
import layout from "../layout/layout"
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import layout1 from "../layout/layout1"
import { Context } from "../hooks/context"
import Head from 'next/head';
const layouts = {
  default: layout,
  layout1: layout1,
};
export default function App({ Component, pageProps }) {

  const Layout = layouts[Component.layout] || layouts.default;

  return (
    <GoogleOAuthProvider clientId="418178406595-vqsd5staarqh0pibnho4l4s63gio1bm4.apps.googleusercontent.com">
      <Context>
        <Layout>
          <Component {...pageProps} />

          <div className='col-10 ' style={{
            textAlign: "end",
            position: "sticky",
            bottom: 0
          }}>
            <div >   <FloatingWhatsApp
              phoneNumber="15303858664"
              accountName="WeedX.io support"
              avatar="/WEEDX(1).png" // Ensure this path is correct or replace with your avatar URL
              statusMessage="Typically replies in less than a minute"
              chatMessage="Hello! How can we help you today?" // Correct prop for default message
              message="Hello! How can we help you today?"
              allowEsc
              allowClickAway
              className='whatsappbox'
              notification
              notificationDelay={60000}
              buttonClassName='whatsappbutton'
              chatboxClassName='whatsappcharboxcustom'
              notificationClassName='nottywhatsapp'
              notificationSound
              styles={{ zIndex: 9999 }}
            /></div>
          </div>
        </Layout>
      </Context>
    </GoogleOAuthProvider>
  );
}
