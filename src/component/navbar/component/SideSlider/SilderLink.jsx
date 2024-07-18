"use client"
import React, { useEffect } from "react";
import Grid from "@mui/system/Unstable_Grid";
import { AiFillHeart } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
// import { Link, useLocation } from "react-router-dom";
import Link from "next/link";
import { useRouter } from 'next/router';
import SearchBar from "../searchbar";
import Badge from "@mui/material/Badge";
import useStyles from "../../../../styles/style";
import IconButton from "@mui/material/IconButton";
import Notification from "../Notification";
export default function DashBoardLink({ state  }) {
  const classes = useStyles()
  const [current_route, Setcurrent_route] = React.useState();
  const [notify, setnotify] = React.useState(false);
  const [textnotify, settextnotify] = React.useState(false);
  const location = useRouter();
  const [notificationdata, Setnotificationdata] = React.useState([]);
  const [totalnotify, Settotalnotify] = React.useState([]);
  React.useEffect(() => {
    Setcurrent_route(location.pathname);
  }, [location]);

  useEffect(() => {
    settextnotify(!textnotify)
  }, [notificationdata])

  const scrollToTop = () => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  };
  const getDeliveryHref = () => {
    if (state.Country && state.State && state.City && state.route) {
      return `/weed-deliveries/in/${state.Country.toLowerCase()}/${state.State.toLowerCase()}/${state.City.toLowerCase()}/${state.route.toLowerCase()}`;
    } else if (state.Country && state.State && state.City) {
      return `/weed-deliveries/in/${state.Country.toLowerCase()}/${state.State.toLowerCase()}/${state.City.toLowerCase()}`;
    } else if (state.Country && state.State) {
      return `/weed-deliveries/in/${state.Country.toLowerCase()}/${state.State.toLowerCase()}`;
    } else if (state.Country) {
      return `/weed-deliveries/in/${state.Country.toLowerCase()}`;
    } else {
      return '/'; // Default fallback if no valid state is provided
    }
  };
  const getDispensariesHref = () => {
    if (state?.Country && state?.State && state?.City && state?.route) {
      return `/weed-dispensaries/in/${state?.Country.toLowerCase()}/${state.State.toLowerCase()}/${state?.City.toLowerCase()}/${state?.route.toLowerCase()}`;
    } else if (state?.Country && state?.State && state?.City) {
      return `/weed-dispensaries/in/${state.Country.toLowerCase()}/${state.State.toLowerCase()}/${state.City.toLowerCase()}`;
    } else if (state?.Country && state?.State) {
      return `/weed-dispensaries/in/${state.Country.toLowerCase()}/${state.State.toLowerCase()}`;
    } else if (state?.Country) {
      return `/weed-dispensaries/in/${state.Country.toLowerCase()}`;
    } else {
      return '/'; // Default fallback if no valid state is provided
    }
  };


  return (
    <React.Fragment>
      <div className="container-fluid Top p-sm-0 p-2 m-0 mt-sm-4">
        <Grid container spacing={2}>
          <Grid
            xs={8}
            md={9}
            display={{ xs: "none", md: "block", lg: "block" }}
          >
            <div className="col nav_list1">
              <ul className="p-0">
                <Link
                  href={getDispensariesHref()}
                  id={`${current_route?.slice(0, 18) === "/weed-dispensaries"
                      ? "Active"
                      : ""
                    }`}
                >
                  {" "}
                  <li>Dispensaries </li>
                </Link>
                <Link
                  href={getDeliveryHref()}
                  id={`${current_route?.slice(0, 16) === "/weed-deliveries"
                      ? "Active"
                      : ""
                    }`}
                >
                  <li>Deliveries</li>
                </Link>

                <Link
                  onClick={scrollToTop}
                  href="/products"
                  id={`${current_route === "/products" ? "Active" : ""}`}
                >
                  <li>Product</li>
                </Link>

                <Link
                  href="/deals"
                  id={`${current_route === "/deals" ? "Active" : ""}`}
                >
                  <li onClick={scrollToTop}>Deals</li>
                </Link>
                <Link
                  href="/learn/laws-and-regulation"
                  id={`${current_route === "/learn/laws-and-regulation" ? "Active" : ""}`}
                >
                  <li>Law</li>
                </Link>

              </ul>
            </div>
          </Grid>

          <Grid
            xs={6}
            md={3}

            spacing={2}
            display={{ xs: "none", md: "block", lg: "block" }}
          >
            <div className=" col-12  addyocardIcon  ">
              <Link href="/whislists">
                <Badge
                  badgeContent={
                    state.login
                      ? Object.values(state.WishList).reduce(
                        (a, item) => a + item,
                        0
                      )
                      : 0
                  }
                  className={classes.sliderLink_badge}
                >
                  <IconButton
                    className={classes.navBarButton_icons}
                    aria-label="whislist"
                  >
                    <AiFillHeart color="#858585" size={22}></AiFillHeart>
                  </IconButton>
                </Badge>
              </Link>
              <div className="notification_icon">
                <Badge
                  badgeContent={
                    state.login ? (totalnotify?.length === state?.Profile?.RemovedNotification?.length ? 0 : (totalnotify?.length - state?.Profile?.RemovedNotification?.length) > 0 ? totalnotify?.length - state?.Profile?.RemovedNotification?.length : 0) : notificationdata?.length
                  }
                  className={classes.sliderLink_badge}
                  onClick={() => {
                    // setnotify(()=>!notify);
                    setnotify((notify)=>!notify);
                  }}
                >
                  <IconButton
                    className={classes.navBarButton_icons}
                    aria-label="notification"
                  >
                    {" "}
                    <IoIosNotifications
                      color="#858585"
                      size={23}
                    ></IoIosNotifications>{" "}
                  </IconButton>
                </Badge>

                <Notification
                  notify={notify}
                  setnotify={setnotify}
                  notificationdata={notificationdata}
                  Setnotificationdata={Setnotificationdata}
                  Settotalnotify={Settotalnotify}
                ></Notification>
              </div>
              <Link href="/cart">
                <Badge
                  className={`state.LoadingApi ? "animated bounce" : " " ${classes.sliderLink_badge}`}
                  badgeContent={
                    state.AllProduct?.length > 0
                      ? state.AllProduct?.length
                      : null
                  }
                >
                  <IconButton
                    className={classes.navBarButton_icons}
                    aria-label="shopping-cart"
                  >
                    <MdOutlineShoppingCart
                      color="#858585"
                      size={22}
                    ></MdOutlineShoppingCart>
                  </IconButton>
                </Badge>
              </Link>
            </div>
          </Grid>
          <Grid
            xs={12}
            md={8}
            xl={8}
            display={{ xs: "block", md: "none", lg: "none" }}
          >
            <SearchBar />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
