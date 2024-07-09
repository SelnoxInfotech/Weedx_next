import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import "@/styles/globals.css";
import layout from "../layout/layout"
import layout1 from "../layout/layout1"
import { Context } from "../hooks/context"
const layouts = {
  default: layout,
  layout1: layout1,
};
export default function App({ Component, pageProps }) {

  const Layout = layouts[Component.layout] || layouts.default;

  return (
    <Context>
      <Layout>
      <GoogleOAuthProvider  clientId="418178406595-vqsd5staarqh0pibnho4l4s63gio1bm4.apps.googleusercontent.com">
        <Component {...pageProps} />
        </GoogleOAuthProvider>
      </Layout>
    </Context>
  );
}
