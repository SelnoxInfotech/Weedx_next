import React from 'react'
import Link from "next/link";
import { useRouter } from "next/router";
const Cockiestable = ({referal}) => {
    const [allHeigths, setallheight] = React.useState([]);
    const router = useRouter();
    React.useEffect(() => {
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
      let data = [];
      referal.current.childNodes.forEach((item, index) => {
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
  )
}

export default Cockiestable