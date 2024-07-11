import React from "react";
import Newsletter from "@/component/home/HomePageDealsSignup/";
// import { CookiesPolicy } from '../../Component/ScoPage/CommenpageSeo';
// import { Link , useLocation} from 'react-router-dom';
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
const Termsconditions = () => {
  //   const location = useLocation()
  const ref = useRef(null);
  const [allHeigths, setallheight] = React.useState([]);
  const router = useRouter();

  React.useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    let data = [];
    ref.current.childNodes.forEach((item, index) => {
      data.push({
        topheigth: item.offsetTop,
        id: item.id,
        height: item.clientHeight,
      });
    });
    setallheight(data);
  }, []);

  React.useEffect(() => {
    let divElement = document.getElementById("Navbar_box")?.clientHeight;

    allHeigths.forEach((item) => {
      //    if(location.hash === `#${item.id}`){
      //      window.scroll(0 , item.topheigth - divElement)
      //    }
    });
  }, [allHeigths]);

  return (
    <>
      {/* <CookiesPolicy></CookiesPolicy> */}
      <div className="term_condition">
        <div className="container-fluid">
          <div className="tc_hero">
            <h1 className="page_heading"> {` Weedx.io Cookies policy`}</h1>
          </div>

          <div className="row tc_content justify-content-between">
            <div className="col-md-7 tc_main-centent">
              <ol ref={ref}>
                <li id="introduction">
                  <span className="question">{`Introduction`}</span>
                  <span className="answer">
                    {`  Welcome to `}
                    <Link href={'/'}>{`weedx.io`}</Link>
                    {` (the "Website"), owned and operated by selnox infotech ("we," "us," "our"). This Cookie Policy explains how we use cookies and similar tracking technologies when you access or use our Website.
                `}
                  </span>
                </li>
                <li id="what_are_cookies">
                  <span className="question">{`What Are Cookies?`}</span>
                  <span className="answer">
                    {`  Cookies are small text files that are placed on your device when you visit a website. They help websites remember your preferences, enhance your browsing experience, and collect information about your usage.
               `}{" "}
                  </span>
                </li>
                <li id="types_of_Cookies_we_use">
                  <span className="question"> {`Types of Cookies We Use`}</span>
                  <span className="answer">
                    {` We may use the following types of cookies:

                Essential Cookies: These cookies are necessary for the basic functioning of our Website and enable you to access and navigate our Website.

                Analytical/Performance Cookies: These cookies help us analyze how users interact with our Website, allowing us to improve its performance and user experience.

                Functionality Cookies: These cookies remember your preferences and choices, such as language or region settings, to enhance your experience.

                Targeting/Advertising Cookies: These cookies are used to deliver relevant advertisements and content to you based on your interests and online behavior.`}
                  </span>
                </li>
                <li id="how_we_use_cookies">
                  <span className="question">{` How We Use Cookies`}</span>
                  <span className="answer">
                    {` We use cookies for various purposes, including:
                    Recognizing your device when you visit our Website.
                    Remembering your preferences and settings.
                    Analyzing user behavior to improve our Website.
                    Delivering targeted advertisements.`}
                  </span>
                </li>
                <li id="managing_your_cookie_preferences">
                  <span className="question">
                    {" "}
                    {`Managing Your Cookie Preferences`}
                  </span>
                  <span className="answer">
                    {`  You can manage your cookie preferences through your browser settings. Most browsers allow you to control cookies, including accepting or rejecting them and deleting existing cookies.`}
                  </span>
                </li>
                <li id="third_party_cookies">
                  <span className="question"> {`Third-Party Cookies`} </span>
                  <span className="answer">
                    {`    We may allow third-party service providers to place cookies on our Website to analyze user behavior and deliver targeted advertisements. These third-party cookies are subject to the privacy policies of the respective providers.`}
                  </span>
                </li>
                <li id="changes_to_this_cookie_policy">
                  <span className="question">
                    {`Changes to This Cookie Policy`}{" "}
                  </span>
                  <span className="answer">
                    {`  We may update this Cookie Policy to reflect changes in our cookie usage practices. We will post the updated Cookie Policy on this page with a revised "Last Updated" date.`}
                  </span>
                </li>
                <li id="contact_us">
                  <span className="question">{`Contact Us`}</span>
                  <span className="answer">
                    {` If you have any questions, concerns, or requests regarding this Cookie Policy, please contact us at info@weedx.io`}
                  </span>
                </li>
              </ol>
            </div>
            <div className="col-md-4">
              <div className="tc_topic_list">
                <div className="heading_box">
                  <h3 className="text-white m-0 sideTableHeading">{`Table of Contents`}</h3>
                </div>
                <ul>
                  <Link href={{ hash: `#introduction` }}>
                    <li
                      className={
                        router.pathname.includes("#introduction") &&
                        "activeTable"
                      }
                    >{`1.  Introduction `}</li>
                  </Link>
                  <Link href={{ hash: `#what_are_cookies` }}>
                    <li
                      className={
                        router.pathname.includes("#what_are_cookies?") &&
                        "activeTable"
                      }
                    >
                      {" "}
                      {`2. What Are Cookies?`}{" "}
                    </li>
                  </Link>
                  <Link href={{ hash: `#types_of_Cookies_we_use` }}>
                    <li
                      className={
                        router.pathname.includes("#types_of_Cookies_we_use") &&
                        "activeTable"
                      }
                    >
                      {" "}
                      {`3. Types of Cookies We Use `}
                    </li>
                  </Link>
                  <Link href={{ hash: `#how_we_use_cookies` }}>
                    <li
                      className={
                        router.pathname.includes("#how_we_use_cookies<") &&
                        "activeTable"
                      }
                    >{`4. How We Use Cookies`}</li>
                  </Link>
                  <Link href={{ hash: `#managing_your_cookie_preferences` }}>
                    <li
                      className={
                        router.pathname.includes(
                          "#managing_your_cookie_preferences"
                        ) && "activeTable"
                      }
                    >
                      {" "}
                      {`5. Managing Your Cookie Preferences `}
                    </li>
                  </Link>
                  <Link href={{ hash: `#third_party_cookies` }}>
                    <li
                      className={
                        router.pathname.includes("#third_party_cookies") &&
                        "activeTable"
                      }
                    >{`6. Third-Party Cookies`}</li>
                  </Link>
                  <Link href={{ hash: `#changes_to_this_cookie_policy` }}>
                    <li
                      className={
                        router.pathname.includes(
                          "changes_to_this_cookie_policy"
                        ) && "activeTable"
                      }
                    >{`7. Changes to This Cookie Policy `}</li>
                  </Link>
                  <Link href={{ hash: `#contact_us` }}>
                    <li
                      className={
                        router.pathname.includes("#contact_us") && "activeTable"
                      }
                    >
                      {` 8. Contact Us`}{" "}
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Newsletter></Newsletter>
    </>
  );
};

export default Termsconditions;
