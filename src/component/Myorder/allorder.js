import Image from "next/image";
import { BsFillCircleFill } from "react-icons/bs";
import React from "react";
import { LoadingButton } from "@mui/lab";
import Box from '@mui/material/Box';
import Link from "next/link";
import useStyles from '@/styles/style'
import { useRouter } from "next/router";
const AllOrder = ({ AllOrder_data,ordertype,CencelOrder ,loading}) => {
  const router = useRouter()
  const classes = useStyles()
  return (
    <div className="container-fluid">
    
          <div className="row center  ">
            {AllOrder_data?.map((val, index) => {
              return (
                <React.Fragment key={index}>
                  <div className=" col-lg-10 rounded   AllOrderContainer px-0 mt-4">
                    <div className="orderdetailsheader">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-2">  <p className="sellerName_date">{`Order ID : `}{val.OrderId}  </p>   <div className="d-flex gap-1 align-items-center">
                                      <BsFillCircleFill color={val.Order_Status === "Cancel" ? "#fb0000" : "#45d37d"} size={16} />
                                      <span className="allOrder_spanName">
                                        {val.Order_Status}
                                      </span>
                                    </div>
                                    </div>
                          <p className="sellerName_date">{`SubTotal : `}{val.subtotal}</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        
                          <h2 className="sellerName_date">
                           {` Seller Name :`} {val.SellerName}
                          </h2>
                    
                          <span className="sellerName_date ">
                            {val.OrderDate.slice(0, 10)}
                          </span>
                      
                      </div>
                    </div>
                    <div className="p-3">
                     
                       {val.Product.map((items, index) => {
                        return (
                      
                          <div key={index} className="place_order_product_cart ">
                          <div className="place_order_product_cart_image">
                              <Image 
                              unoptimized={true}
                            width={100} 
                            height={100}
                               className='w-100' src={`${items.Image}`} alt={items.ProductName} title={items.ProductName} />
                          </div>
                          <div className="place_order_product_cart_Text">
                              <h4 className='productname'>{items.ProductName}</h4> 
                              <p className="price"><b>{`Price`}</b>{` : $`} {items.TotalPrice}</p>  
                              <p><b>{`Qty`}</b> : {items.Cart_Quantity}</p>
                          </div>
                          </div>
                        
                        );
                      })}
                    </div>
                    <div className="row mx-0 py-2 ">
                      <div className="viewOrderDetals d-flex align-items-center justify-content-end gap-3">
                        {router.pathname.slice(0, 21) ===
                        "/MyOrderProductDetail" ? (
                          ""
                        ) : (
                          <>
                          <div className=" ">
                            <Link href={`/MyOrderProductDetail/${val.OrderId}`}>
                              <LoadingButton className={classes.cncelbtnorder}>{`view details`}</LoadingButton>
                            </Link>
                          </div>
                          {
                            val.Order_Status !=="Cancel" &&
                             <div><LoadingButton loading={false} className={classes.cncelbtnorder}  onClick={() => { CencelOrder(val.OrderId) }}>{`Cancel`} </LoadingButton></div>}
                         </>
                        )}
                      </div>
                    
                    </div>
                  </div>
                  {
                     ordertype==="Pending Order" &&  <div className=" col-lg-10  text-end   border-0 p-0">
                <Box className={`  ${classes.Cencell}  `}
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "10px"

                    }}   >  <LoadingButton loading={false} onClick={() => { CencelOrder(val.OrderId) }}>{`Cancel`} </LoadingButton> </Box>
                    </div>
                  }
                </React.Fragment>
              );
            })}
          
          </div>
      
    </div>
  );
};
export default AllOrder;