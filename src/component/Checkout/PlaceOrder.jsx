import React from 'react';
import Image from 'next/image';
import Createcontext from "@/hooks/context"
import Cookies from 'universal-cookie';
import { FaRegPaperPlane } from "react-icons/fa";
import { useRouter } from 'next/router';
import Link from 'next/link';

import Axios from 'axios';
const PlaceOrder = ({orderid}) => {
    const location = useRouter();
    const { state, dispatch } = React.useContext(Createcontext)
    const cookies = new Cookies();
    let token_data = cookies.get('User_Token_access')
    let accessToken 
    if (typeof window !== 'undefined') {

         accessToken = localStorage.getItem('User_Token_access');

    }
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
    const [Order, SetOrder] = React.useState([])
    const today = new Date(Order[0]?.OrderId);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // month is zero-based
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formatted = dd + '/' + mm + '/' + yyyy;

    let pricess = {
        Subtotal: 0,
        Delivery: 0,
        Taxes: 0,
        Total: 0,
        Paid: 0,
        discount: 0,
        DueLater: 0
    }
    React.useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };

        Axios.get(`https://api.cannabaze.com/UserPanel/Get-GetOrderBYID/${orderid}`,
            config,
        ).then((res) => {
                SetOrder(res.data)
                dispatch({ type: 'ApiProduct', ApiProduct: !state.ApiProduct })
        }).catch((error) => {
                console.error(error)
        })
        
    }, [])

    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row center p-2">
                    <div className="col-12 col-lg-8 col-sm-10">
                        <div className="order_conform_card">
                            <span><FaRegPaperPlane className='order_conform_card_icons' /></span>
                            <h3 className="card_title">{`Thank You!`}</h3>
                            <p className="card_message">{`You'll receive a confirmation email soon`}</p>
                            <Link href={location.pathname==='/menu-integration/order-placed'?`/menu-integration/MyOrderProductDetail/${Order[0]?.OrderId}`:`/MyOrderProductDetail/${Order[0]?.OrderId}`} className='mt-4'>
                                <button className='trackorderbtn'>{`Track Order`}</button>
                            </Link>
                        </div>

                        <div className='d-flex justify-content-between align-items-center'>
                            <p className="card_message m-0"> <b>{`Order ID`}</b> : #{location.query.OrderId} </p>
                            <p className="card_message m-0"> <b>{`Order Date`}</b> : {formatted} </p>
                        </div>

                        <div className='border row p-3 mb-3'>
                            <div className='col-lg-8'>
                                {
                                    Order[0]?.Product?.map((item , index) => {
                                        pricess.Subtotal += item.TotalPrice + state.DeliveryPrice
                                        pricess.Taxes += 0
                                        pricess.Paid += 0
                                        pricess.discount += item.DiscountedAmount
                                        pricess.DueLater += pricess.Subtotal + item.Price.SalePrice
                                        return (<div key={index} className="place_order_product_cart ">
                                            <div className="place_order_product_cart_image">
                                                <Image 
                                                unoptimized={true}
                                                  width={100}
                                                  height={100} 
                                                className='w-100' src={`${item.Image}`} alt={item.ProductName} title={item.ProductName} />

                                            </div>
                                            <div className="place_order_product_cart_Text">

                                                <h4 className='productname'>{item.ProductName}</h4>
                                                <p className="price"><b>Price</b> : $ {item.TotalPrice}</p>
                                                <p><b>Qty</b> : {item.Cart_Quantity}</p>
                                            </div>
                                        </div>)
                                    })

                                }
                                {

                                }
                            </div>
                            <div className=' col-lg-4 mt-3 mt-lg-0 '>
                                <div className="order_price_details  ml-auto p-sm-3 p-2 border">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>{`Subtotal`}</span>
                                        <span>${pricess.Subtotal}</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>{`Delivery`}</span>
                                        <span>${pricess.Delivery}</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>{`Taxes`}</span>
                                        <span>${state.DeliveryPrice}</span>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div style={{ display: "grid" }}>
                                            <span>{`Total`}</span>
                                            {Boolean(pricess.discount) && <span>{`Discount Amount`}</span>
                                            }
                                        </div >
                                        <div style={{ display: "grid" }}>
                                            {Boolean(pricess.discount) ? <del>${pricess.Subtotal}</del> : <span>${pricess.Subtotal}</span>}
                                            {Boolean(pricess.discount) && <span>${(pricess.Subtotal - pricess.discount)}</span>}
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className="row border place-order_address">

                            <div className="col-md-4 p-sm-4 p-2">
                                <h4>{`Seller Info`}</h4>
                               <p>{`Name`} : {Order[0]?.StoreName}</p>
                                <p>{`Address`} : {Order[0]?.StoreAddress}</p>

                            </div>
                            <div className="col-md-4 p-sm-4 p-2">
                                <h4>{location.query.orterbtn === "pickup_btn" ? "Curbside Pickup" : "Delivery "} {`Address`}</h4>
                                <p>{Order[0]?.Address}</p>
                            </div>
                            <div className="col-md-4 p-sm-4 p-2">
                                <h4>{`Payment Method`}</h4>
                                <p>{`Offline`}</p>
                            </div>
                        </div>
                    </div>

                </div>


            </div> 
        </React.Fragment>
    )
}
export default PlaceOrder