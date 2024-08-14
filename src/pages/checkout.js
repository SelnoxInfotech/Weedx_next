import DeliveryOption from "@/component/Checkout/DeliveryOption"
import { DeliveryInformation } from "@/component/Checkout/DeliveryInformation"
import Payment from "@/component/Checkout/Payment"
import React from "react"
import AddToCartReview from "@/component/Addtocard/AddToCartReview"
import AddToCartSummary from "@/component/Addtocard/AddToCartSummary"
import Cookies from 'universal-cookie';
import Createcontext from "@/hooks/context"
import { useRouter } from "next/router"

import Axios from "axios"
import ProtectRout from "@/hooks/utilis/ProtectRout"
const CheckOutMainPage = () => {

    const { state, dispatch } = React.useContext(Createcontext)
    const cookies = new Cookies();
    const navigate = useRouter()
    let token_data = cookies.get('User_Token_access')
    let accessToken 
    if (typeof window !== 'undefined') {

         accessToken = localStorage.getItem('User_Token_access');

    }
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
    const [ShowData, SetShowData] = React.useState(false)
    const [ShowDeliveryInformation, SetShowDeliveryInformation] = React.useState(false)
    const [DeliveryOptionData, SetDeliveryOptionData] = React.useState([])
    const location = useRouter();
    const { InputValues, abc , orderBtn } = location?.query
    const [image, setImage] = React.useState()
    const [DefalutImage, SetDefalutimage] = React.useState(false)
    const [Dataimage, setDataImage] = React.useState()
    const [Time, SetTime] = React.useState('');


    const [Details, SetDetails] = React.useState({
        FirstName: '',
        LastName: "",
        DateOfBirth: "",
        MobileNo: "",
        MedicalMarijuanaNumber: "",
        Address: "",
        Email: "",
        Ordertype: '',
    })
    const [CheckOut_Loading, SetLoading] = React.useState(false)
    React.useEffect(() => {
        window.scroll(0, 0)
    }, [ShowData, ShowDeliveryInformation, DeliveryOptionData])
    const config = {
        headers: { Authorization: `Bearer ${token_data}` }
    };
    async function SubmitData() {


        if (image !== undefined) {
            let asdsd = 'Delivery'

            if (state.selectDeliveryoptions === "pickup_btn") {
                asdsd = "Pickup"
            }
            else if (state.selectDeliveryoptions === "CurbsidePickup") {
                asdsd = 'Delivery and Pickup'
            } else if (state.selectDeliveryoptions === "delivery_btn") {
                asdsd = 'Delivery'
            }
      
            const formdata = new FormData();
            formdata.append('IdCard', Dataimage);
            formdata.append('FirstName', Details.FirstName);
            formdata.append('LastName', Details.LastName);
            formdata.append('DateOfBirth', Details.DateOfBirth);
            formdata.append('MobileNo', Details.MobileNo);
            formdata.append('MedicalMarijuanaNumber', Details.MedicalMarijuanaNumber);
            formdata.append('subtotal', state?.Cart_subTotal);
            formdata.append('Product', JSON.stringify(state.AllProduct));
            formdata.append('Store', state.AllProduct[0]?.Store_id);
            formdata.append('Address', state.selectDeliveryoptions === "pickup_btn" ? state.AllProduct[0]?.StoreAddress : state.DeliveryAddress);
            formdata.append('DeliveryTime', Time);
            formdata.append('Email', Details.Email)
            formdata.append('Order_Type', asdsd)
            formdata.append('Country', asdsd === "Delivery" ? state.DeliveryCountry : state.AllProduct[0]?.Country);
            formdata.append('State', asdsd === "Delivery" ? state.DeliveryState : state.AllProduct[0]?.State)
            formdata.append('City', asdsd === "Delivery" ? state.DeliveryCity : state.AllProduct[0]?.City)
            Boolean(state.CoupounAmount)&&   formdata.append('DiscountedAmount',   state?.Cart_subTotal - state.CoupounAmount)
            await Axios.post('https://api.cannabaze.com/UserPanel/Add-Order/',
                formdata,
                config,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                },
                SetLoading(true)
            ).then(response => {
                SetLoading(false)
               
                let datanew = { orterbtn: orderBtn,  ...response.data.data }

                navigate.push({
                    pathname:location.pathname === '/menu-integration/checkout' ?"/menu-integration/order-placed":`/order-placed/${response.data.data.OrderId}`,
                    query: datanew
                }, `/order-placed/${response.data.data.OrderId}`);
                // navigate.push({
                //     pathname:location.pathname === '/menu-integration/checkout' ?"/menu-integration/order-placed":"/order-placed",
                //     query:datanew,
                //   });
                // navigate.push( location.pathname === '/menu-integration/checkout' ?"/menu-integration/order-placed":"/order-placed", { query: datanew })
                dispatch({ type: 'ApiProduct', ApiProduct: !state.ApiProduct })
            }).catch(
                function (error) {
                    SetLoading(false)
                })
           
        }
        else (
            SetDefalutimage(true)
        )

    }
    React.useEffect(() => {
        state.login && Axios.get(`https://api.cannabaze.com/UserPanel/Get-UserProfileOrderDetails/`, config).then((data) => {
            if (data.data.length !== 0) {
                data.data.map((user, key) => {

                    SetDetails({
                        ...Details, MobileNo: user.MobileNo, Email: user.Email, "DateOfBirth": user.DateOfBirth, "FirstName": user.FirstName, "LastName": user.LastName, "MedicalMarijuanaNumber": user.MedicalMarijuanaNumber, "MobileNo": user.MobileNo
                    });

                })


            }

        })

    }, [])
    return (
        <ProtectRout>
            <div className="container">


                <div className="row">
                    <div className="col-md-8 col-lg-6 col-sm-12 col-12">
                        <div className="row ">
                            <div className="col-lg-12">
                                <DeliveryOption Time={Time} SetTime={SetTime} Hours={state?.AllProduct[0]?.StoreHours} DeliveryOptionData={DeliveryOptionData} address={InputValues} SetShowData={SetShowData} />

                            </div>

                        </div>
                        <div className="row ">
                            <div className="col-lg-12">
                                {ShowData === true && <DeliveryInformation SetShowDeliveryInformation={SetShowDeliveryInformation}
                                    image={image}
                                    DefalutImage={DefalutImage}
                                    SetDefalutimage={SetDefalutimage}
                                    setImage={setImage}
                                    Dataimage={Dataimage}
                                    setDataImage={setDataImage}
                                    Details={Details}
                                    SetDetails={SetDetails}

                                />}
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                {ShowDeliveryInformation === true && <Payment SetShowPlaceOrder={SetShowDeliveryInformation} />}
                            </div>

                        </div>

                        <div className="row m-2">
                            <div className="col-lg-12 mx-auto checkout_main_page_addtocart_review font_size_paragraph">
                                <p>Review</p>
                                <AddToCartReview />
                            </div>

                        </div>

                    </div>
                    <div className="col-md-8 col-lg-5 col-sm-12 col-12">
                        <div className="row checkout_main_page_addtocart_margin">
                            <div className="col-lg-12  checkout_main_page_summary">
                                <AddToCartSummary SetDeliveryOptionData={SetDeliveryOptionData} Total={abc} SubmitData={SubmitData}
                                    CheckOut_Loading={CheckOut_Loading}
                                    SetLoading={SetLoading}
                                    Details={Details}
                                    SetDetails={SetDetails}
                                />

                            </div>

                        </div>
                    </div>

                </div>




            </div>
        </ProtectRout>
    )
}
export default CheckOutMainPage

