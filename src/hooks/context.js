import React, { useReducer, createContext } from 'react';
import Reducer from './reduser'
import Cookies from 'universal-cookie';
import axios from 'axios';

import { WishListget } from '@/component/Whishlist/WishListApi_';
import { StaticImages } from '@/hooks/apicall/api';
const Createcontext = createContext();
const cookies = new Cookies();
const login = cookies.get("User_Token_access")
const log = login ? true : false


const initialUser = {

    login: log,
    ApiProduct: false,
    AllProduct: [],
    DeliveryOption: false,
    DeliveryInformation: false,
    Cart_subTotal: "",
    LoadingApi: false,
    Order_place: false,
    Dispensories: [],
    // Set location From Check Age 
    DefalutLocation: "",
    // Set Location From  Google  AutoComplete
    Location: "",
    permission: true,
    LocationData: [],
    cookies: 1,
    CookiesMarketing: 1,
    CookiesAnalytical: 1,
    DeliveryAddress: "",
    selectDeliveryoptions: "",
    Profile: [],
    GoogleImage: "",
    WishList: [],
    // Get For Routing 
    Country: "",
    State: "",
    City: "",
    route: "",
    // End
    // StaticImage
    StaticImage: [],
    //  Loading Circule
    Loading: false,
    // Coupoun :
    PromoCode: "",
    Coupoun: [],
    CoupounAmount: "",
    locationFocus: false,
    // Delivery Address
    DeliveryCountry: "",
    DeliveryCity: "",
    DeliveryState: "",
    // Coupoun Code 
    coupoun_code: "",
    // Delvery Price
    DeliveryPrice: "",
    MinimumOrderPrice: "",
    Embeddedstore:[],
//   Neighborhood Locations and zip code 
      havecity : false,
      havestate: false,
      havecountry : false ,
      countrycode:"",
      citycode:"",
      statecode:"",
//    call locatonapi in delivery dispansier
       location_Api:true


}
function Context(props) {
    const [state, dispatch] = useReducer(Reducer, initialUser)

    
    React.useEffect(() => {
        const cookies = new Cookies();
        let logi = cookies.get("User_Token_access")
        let accessToken 
        if (typeof window !== 'undefined') {
    
             accessToken = localStorage.getItem('User_Token_access');
    
        }
        if(  Boolean(accessToken) ){ logi  =  accessToken}
        dispatch({ type: 'DefalutLocation', DefalutLocation: cookies.get("Location") })
        dispatch({ type: 'LoadingApi', LoadingApi: true })

        if (Boolean(logi) || Boolean(accessToken)) {
            dispatch({ type: 'Login', login: true })
            axios.get("https://api.cannabaze.com/UserPanel/Get-Addtocart/", {
                headers: { Authorization: `Bearer ${logi}` }
            }).then(async function (response) {
                const CarTProduct = await response?.data;
                dispatch({ type: 'AllProduct', AllProduct: CarTProduct })
                dispatch({ type: 'LoadingApi', LoadingApi: false })
                let AllTotal = 0
                let CoupounAmount = 0
                CarTProduct.map((data1) => {
                    if (data1.Coupon !== "") {
                        dispatch({ type: 'coupoun_code', coupoun_code: data1.Coupon })
                    }
                    if (Boolean(data1.Coupon)) {
                        if (data1?.DiscountedAmount === 0) {

                            // CoupounAmount +=  parseInt(data1?.TotalPrice)
                        }
                        else {

                            CoupounAmount += parseInt(data1?.DiscountedAmount) - parseInt(data1?.TotalPrice)
                        }
                    }

                    return AllTotal += parseInt(data1?.TotalPrice)
                })

                CarTProduct.length === 0 && dispatch({ type: 'coupoun_code', coupoun_code: '' })
                dispatch({ type: "MinimumOrderPrice", MinimumOrderPrice: CarTProduct[0].MinimumOrderPrice })
              
                // CarTProduct[0].DeliveryPrice === 0
                dispatch({ type: "CoupounAmount", CoupounAmount: Math.abs(CoupounAmount) })
                if (CarTProduct[0].DeliveryPrice !== 0) {
                    if (AllTotal > CarTProduct[0].MinimumOrderPrice){
                        dispatch({ type: 'Cart_subTotal', Cart_subTotal: AllTotal })
                        dispatch({ type: "DeliveryPrice", DeliveryPrice: 0 })
                    }
                    else{
                        dispatch({ type: 'Cart_subTotal', Cart_subTotal: AllTotal + CarTProduct[0].DeliveryPrice})
                        dispatch({ type: "DeliveryPrice", DeliveryPrice: CarTProduct[0].DeliveryPrice })
                    }
                }
                else {
                    dispatch({ type: 'Cart_subTotal', Cart_subTotal: AllTotal  })
                    dispatch({ type: "DeliveryPrice", DeliveryPrice: 0 })
                }

            })
                .catch(function (error) {
                    return error
                })
            axios.get(`https://api.cannabaze.com/UserPanel/Get-GetUserProfile/`,
                { headers: { Authorization: `Bearer ${logi}` } }
            )
                .then((res) => {
                    dispatch({ type: 'Profile', Profile: res.data })
                })
                .catch((error) => {
                    console.error(error)
                })
                    WishListget().then((res) => {
                    let object = {};
                    res.data.map((data) => {
                    const l = data.id
                    object[l] = true
                    return data
                      })
                    dispatch({ type: 'WishList', WishList: object })
                   }
       
                ).catch((err) => { });
        }
        else {
            const data = localStorage?.getItem("items")
            const length = data === null ? [] : JSON.parse(data)

            if (data === null) {
                dispatch({ type: 'AllProduct', AllProduct: [] })
            }
            else if (data.length === 0) {
                dispatch({ type: 'AllProduct', AllProduct: [] })
            }
            else {
                const data = localStorage?.getItem("items")
                dispatch({ type: 'AllProduct', AllProduct: length })
                let AllTotal = 0
                JSON.parse(data)?.map((data1) => {

                    return AllTotal += parseInt(data1.Price.SalePrice * data1.Cart_Quantity);
                })
                dispatch({ type: 'LoadingApi', LoadingApi: false })
                dispatch({ type: 'Cart_subTotal', Cart_subTotal: AllTotal })
            }
        }
        StaticImages().then((response) => {
            dispatch({ type: 'StaticImage', StaticImage: response?.data?.data[0] })
        }).catch((error) => {
            dispatch({ type: 'StaticImage', StaticImage: [] })
            console.trace(error)
        })

    }, [state.ApiProduct, state.login])



    return (

        <Createcontext.Provider value={{ state, dispatch }} container>
            {props?.children}
        </Createcontext.Provider>

    )

}
export default Createcontext;
export { Context }