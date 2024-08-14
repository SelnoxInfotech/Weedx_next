import React from "react";
import { FaWheelchair } from "react-icons/fa";
import { MdDoNotDisturb } from "react-icons/md";
import { CiGlobe } from "react-icons/ci";
import { BsFillCarFrontFill, BsTelephone, BsCashCoin } from "react-icons/bs";
import { AiOutlinePlus, AiFillCar } from "react-icons/ai";
import { IoStorefrontSharp, IoLocationOutline } from "react-icons/io5";
import { GrDeliver } from "react-icons/gr";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MdSecurity } from "react-icons/md";
import Openingtime from "./Openingtime";
const StoreDetail1 = ({ storeDetails }) => {
  // console.log(storeDetails ,'storeDetails')
  return (
    <div className="container-fluid container-lg-full mt-3">
      <div className="amenities_container">
        <div className="row center">
          <div className="col-12  ">
            <h2 className="amenties_nameHeading">Amenities</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12 ">
            <ol className="amenities_list">
            
              {storeDetails[0]?.Recreational === true && (
                <li className="amenties_list_items">
                  <p className="m-0 amenities_list_item_paragrap listfontStyle">
                    <BsFillCarFrontFill /> Recreational
                  </p>
                </li>
              )}
              {storeDetails[0]?.CarParking ? (
                <li className="amenties_list_items">
                  <p className="m-0 amenities_list_item_paragrap listfontStyle">
                    <AiFillCar /> Car Parking
                  </p>
                </li>
              ) : null}
              {storeDetails[0]?.High_chairs_available ? (
                <li className="amenties_list_items">
                  <p className="m-0 amenities_list_item_paragrap listfontStyle">
                    <FaWheelchair /> Has Wheel chairs available
                  </p>
                </li>
              ) : null}

              {storeDetails[0]?.Medical ? (
                <li className="amenties_list_items">
                  <p className="m-0 amenities_list_item_paragrap listfontStyle">
                    <AiOutlinePlus /> Medical
                  </p>
                </li>
              ) : null}
              {storeDetails[0]?.Minimum_21_years_or_older ? (
                <li className="amenties_list_items">
                  <p className="m-0 amenities_list_item_paragrap listfontStyle">
                    <MdDoNotDisturb /> 21 years or older
                  </p>
                </li>
              ) : null}

              {storeDetails[0]?.Security_Staff ? (
                <li className="amenties_list_items">
                  <p className="m-0 amenities_list_item_paragrap listfontStyle">
                    <MdSecurity /> Security
                  </p>
                </li>
              ) : null}
              {storeDetails[0]?.Cash_on_Delivery ? (
                <li className="amenties_list_items">
                  <p className="m-0 amenities_list_item_paragrap listfontStyle">
                    <BsCashCoin /> COD
                  </p>
                </li>
              ) : null}
            </ol>
          </div>
        </div>
      </div>
      <div className="row  my-2">
        <div className="col-lg-8 store_detail_container my-2 order-sm-first order-last">
          <div className="row">
            <div className="destop_view">
              <div className="col-12 StoreDetail_paragraph  store_middle_content_top ">
                <p>About Us</p>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: storeDetails[0]?.Stores_Description,
                }}
              ></div>
            </div>
            <div className="mobile_view">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div className="col-12 StoreDetail_paragraph  store_middle_content_top ">
                    <p>About Us</p>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: storeDetails[0]?.Stores_Description,
                    }}
                  ></p>
                </AccordionDetails>
              </Accordion>
            </div>

            <div className="row mx-0">
              {
                (storeDetails[0]?.CurbSide_Pickup && Boolean(storeDetails[0]?.CurbSidePickupHours)) && 
                  <div className="p-md-2 p-0 col-md-5 col-12">
                    <Openingtime
                      storeDetails={storeDetails}
                      heading={"CurbSide PickUp Hours"}
                      type={storeDetails[0]?.CurbSidePickupHours}
                      key={"CurbSidePickupHours"}
                    />
                  </div>
                }
              {
                (storeDetails[0]?.StoreFront && Boolean(storeDetails[0]?.Hours)) && (
                  <div className="p-md-2 p-0 col-md-5 col-12">
                    <Openingtime
                      storeDetails={storeDetails}
                      heading={"Store Hours"}
                      type={storeDetails[0]?.Hours}
                      key={"Hours"}
                    />
                  </div>
                )}
              {
               ( storeDetails[0]?.Delivery && Boolean(storeDetails[0]?.DeliveryHours))&& (
                  <div className="p-md-2 p-0 col-md-5 col-12">
                    <Openingtime
                      storeDetails={storeDetails}
                      heading={"Delivery Hours"}
                      type={storeDetails[0]?.DeliveryHours}
                      key={"DeliveryHours"}
                    />
                  </div>
                )}
            </div>
          </div>
        </div>
        <div className="col-lg-4 storeDetail_container my-2">
          <div className="">
            <h3 className=" store_detail_menu_heading">
              {storeDetails[0]?.Store_Name}
            </h3>
            <div className="col-12">
              <ol className="store_detail_SideMenuBar_order_list">
                {storeDetails[0]?.Stores_Website && (
                  <li className="StoreDetailSidemenuBarList">
                    <CiGlobe />

                    <span className="StoreDetailSideMenu_listItems text-lowercase">
                      {" "}
                      {storeDetails[0]?.Stores_Website}
                    </span>
                  </li>
                )}
                {storeDetails[0]?.Stores_MobileNo && (
                  <li className="StoreDetailSidemenuBarList">
                    <BsTelephone />
                    <span className="StoreDetailSideMenu_listItems">
                      {" "}
                      {storeDetails[0]?.Stores_MobileNo}
                    </span>
                  </li>
                )}
                {storeDetails[0]?.Order_Type && (
                  <li className="StoreDetailSidemenuBarList">
                    <GrDeliver />
                    <span className="StoreDetailSideMenu_listItems">
                      {" "}
                      {storeDetails[0]?.Order_Type}
                    </span>
                  </li>
                )}
                {storeDetails[0]?.Store_Type && (
                  <li className="StoreDetailSidemenuBarList">
                    <IoStorefrontSharp />
                    <span className="StoreDetailSideMenu_listItems">
                      {" "}
                      {storeDetails[0]?.Store_Type}
                    </span>
                  </li>
                )}
                {storeDetails[0]?.CurbSideStreet && (
                  <li className="StoreDetailSidemenuBarList">
                    <IoLocationOutline />
                    <span className="StoreDetailSideMenu_listItems">
                      {" "}
                      {storeDetails[0]?.CurbSideStreet}
                    </span>
                  </li>
                )}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StoreDetail1;
