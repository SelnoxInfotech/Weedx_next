import React from "react";
import { MyOrderSeoDetail } from '@/component/ScoPage/CommenpageSeo';
import Image from 'next/image';
import { AiOutlineLeft } from "react-icons/ai";
import OrderTracking from "@/component/Ordertracking/OrderTracking";
import { IconButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { OrderBYID, Cancel } from "@/hooks/apicall/api";
import { BsFillCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";
import useStyles from "@/styles/style";
import Swal from 'sweetalert2';

const Index = () => {
    const router = useRouter();
    const classes = useStyles();
    const [AllOrder_data, SetAllOrder_data] = React.useState([]);
    const [loading, SetLoading] = React.useState(false);
    React.useEffect(() => {
        OrderBYID(router.query.id)
            .then((res) => {
                SetAllOrder_data(res.data.reverse());
            })
            .catch(console.error);
    }, [router]);

    React.useEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }, []);

    const CancelOrder = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            imageUrl: "/image/warning.png",
            imageClass: "loginsweetimg",
            imageWidth: 60,
            imageHeight: 60,
            showCancelButton: true,
            confirmButtonColor: "#31B655",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                SetLoading(true);
                Cancel(id)
                    .then(() => {
                        return OrderBYID(router.query.id);
                    })
                    .then((res) => {
                        SetAllOrder_data(res.data.reverse());
                    })
                    .finally(() => {
                        SetLoading(false);
                    });
            }
        });
    };

    return (
        <div className="container-fluid">
            <MyOrderSeoDetail />
            <div className="row">
                <div className="col-12 d-flex px-0 productDetails_heading_container">
                    <IconButton onClick={() => router.back()}>
                        <AiOutlineLeft color="#000000" size={20} />
                    </IconButton>
                    <span onClick={() => router.back()} className="productDetails_headings">
                        Product Details
                    </span>
                </div>

                <div className="p-2 mt-4">
                    <div className="col-12 allOrderCard_container border p-3">
                        <div className="imageSectionWrapper">
                            <section className="allOrder_Card_Image_section">
                                <div className="Allorder_img_container">
                                    <Image  width={100}  height={100}
                                        className="Allorder_img"
                                        src={AllOrder_data[0]?.Product[0]?.Image}
                                        alt={AllOrder_data[0]?.Product[0]?.ProductName}
                                        title={AllOrder_data[0]?.Product[0]?.ProductName}
                                    />
                                </div>
                            </section>
                            <section className="allOrder_Card_Content_section">
                                <div className="col-12">
                                    <h1 className="AllOrder_heading">
                                        {AllOrder_data[0]?.Product[0]?.ProductName}
                                    </h1>
                                </div>
                                <div className="w-100 allOrder_span_quantity_div">
                                    <span className="allOrder_span_quantity">
                                        Quantity: {AllOrder_data[0]?.Product[0]?.Cart_Quantity}
                                    </span>
                                    <span className="allOrder_span_quantity">
                                        Brand: {AllOrder_data[0]?.Product[0]?.Brand_Name}
                                    </span>
                                </div>
                                <div className="w-100 allOrder_icons_container">
                                    <span className="allOrder_spanName">
                                        Amount: <span className="Amount_price">
                                            {AllOrder_data[0]?.Product[0]?.Price.SalePrice}
                                        </span>
                                    </span>
                                    <div className="allOrder_icons_div">
                                        <BsFillCircleFill
                                            color={AllOrder_data[0]?.Order_Status === "Cancel" ? "#d33" : "#31B655"}
                                            size={20}
                                        />
                                        <span className="allOrder_spanName">
                                            {AllOrder_data[0]?.Order_Status}
                                        </span>
                                    </div>
                                </div>
                                {AllOrder_data[0]?.Order_Status !== "Cancel" && (
                                    <div>
                                        <LoadingButton
                                            className={classes.cncelbtnorder}
                                            onClick={() => CancelOrder(router.query.id)}
                                            loading={loading}
                                        >
                                            Cancel
                                        </LoadingButton>
                                    </div>
                                )}
                            </section>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 d-lg-flex orderdetailscontainer d-block">
                        <OrderTracking AllOrder_data={AllOrder_data} />
                        <div className="col">
                            <div className="orderTracking_container">
                                <section>
                                    <span className="customerNameFontss">Delivery Address: </span>
                                    <span className="MyOrderDeliveryAddress_subHeading">
                                        {AllOrder_data[0]?.Address}
                                    </span>
                                </section>
                                <div>
                                    <span className="customerNameFontss">Store Name: </span>
                                    <span>{AllOrder_data[0]?.SellerName}</span>
                                </div>
                                <div>
                                    <span className="customerNameFontss">Customer Name: </span>
                                    <span className="customerName">
                                        {AllOrder_data[0]?.username}
                                    </span>
                                </div>
                                <div>
                                    <span className="customerNameFontss">Customer Number: </span>
                                    <span className="customerNumber">
                                        {AllOrder_data[0]?.MobileNo}
                                    </span>
                                </div>
                                <div>
                                    <span className="customerNameFontss">Order ID: </span>
                                    <span className="customerNumber">
                                        {AllOrder_data[0]?.OrderId}
                                    </span>
                                </div>
                                <div>
                                    <span className="customerNameFontss">Payment Method: </span>
                                    <span className="customerNumber">Cash On Delivery</span>
                                </div>

                                <section className="orderDetails_innerSection1">
                                    <div className="ordetailAmount_container">
                                        <span className="amount_spanss">Amount</span>
                                        <span className="amount_spanss">
                                            $ {AllOrder_data[0]?.subtotal}
                                        </span>
                                    </div>
                                </section>
                                <section className="orderDetails_innerSection2">
                                    <div className="ordetailAmount_container">
                                        <span className="amount_spanss">Total</span>
                                        <span className="totalAmounts">
                                            $ {AllOrder_data[0]?.subtotal}
                                        </span>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
