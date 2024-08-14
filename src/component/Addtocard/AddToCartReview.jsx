
import { AiOutlinePlus } from "react-icons/ai"
import { GrFormSubtract } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri"
import React, { useEffect, useState } from "react";
import Axios from 'axios';
import Cookies from 'universal-cookie';
import Createcontext from "@/hooks/context"
import { LoadingButton } from '@mui/lab';
import Link from "next/link";
import { useRouter } from "next/router";
import { modifystr } from '@/hooks/utilis/commonfunction';
import Image from "next/image";
const AddToCartReview = () => {
    const Swal = require('sweetalert2')
    const { state, dispatch } = React.useContext(Createcontext)
    const Navigate = useRouter();
    const cookies = new Cookies();
       let token_data = cookies.get('User_Token_access')
       let accessToken 
       if (typeof window !== 'undefined') {
   
            accessToken = localStorage.getItem('User_Token_access');
   
       }
    if(  Boolean(accessToken) ){ token_data  =  accessToken};
    const [Loadingmines, SetLoadingmines] = React.useState(false);
    const [LoadingPlue, SetLoadingPluse] = React.useState(false);
    const [LoadingDelete, SetLoadingDelete] = React.useState(false);
    const [wondowWidth, setWindowWidth] = useState('')
    const [AfterDiscount, SetAfterDiscount] = React.useState()
    async function DeleteItem(Id, id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to remove this product from Cart!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#31B665',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {

            if (result.isConfirmed) {
                const myPromise = new Promise((resolve, reject) => {
                    if (state.login) {
                        const config = {
                            headers: { Authorization: `Bearer ${token_data}` }
                        };
                        Axios.delete(`https://api.cannabaze.com/UserPanel/DeleteAddtoCart/${id}`,
                            config,
                            SetLoadingDelete(true)
                        )
                            .then(async (res) => {
                                await dispatch({ type: 'ApiProduct', ApiProduct: !state.ApiProduct })
                                SetLoadingDelete(false)
                                resolve();
                            })
                            .catch((error) => {
                                SetLoadingDelete(false)
                                reject();
                            })
                    }
                    else {
                        var obj = JSON.parse(localStorage.getItem("items"));
                        for (var i = 0; i < obj.length; i++) {
                            if (obj[i].Product_id === Id) {
                                obj.splice(i, 1);
                                break;
                            }
                        }
                        if (typeof window !== 'undefined') {
   
                            accessToken = localStorage.getItem('User_Token_access');
                   
                       }
                        resolve();
                    }
                })
                myPromise.then(async () => {
                    dispatch({ type: 'ApiProduct', ApiProduct: !state.ApiProduct })
                    Swal.fire(
                        'Removed!',
                        'Your product has been removed.',
                        'success'
                    )
                })
            }
        })


    }
    async function Quantity(Id, Cart, Event) {

        if (Event?.Price?.Quantity > Event.Cart_Quantity) {
            if (state.login || token_data) {

                const config = {
                    headers: { Authorization: `Bearer ${token_data}` }
                };
                let Arry =
                {
                    Brand_Name: Event.Brand_Name,
                    Product_id: Event.Product_id,
                    Store_id: Event.Store_id,
                    Image_id: Event.Image_id,
                    Price: Event.Price,
                    Cart_Quantity: Event.Cart_Quantity + 1,
                    PriceId: Event.Price.id
                }
                await Axios.post(`https://api.cannabaze.com/UserPanel/Update-AddtoCart/${Id}`,
                    Arry,
                    config,
                    SetLoadingPluse(true)
                ).then((res) => {
                    SetLoadingPluse(false)
                    dispatch({ type: 'ApiProduct', ApiProduct: !state.ApiProduct })

                })
                    .catch((error) => {
                        console.trace(error)
                        SetLoadingPluse(false)
                    })

            } else {
                var obj = JSON.parse(localStorage.getItem("items"));
                var s = obj?.map((arr) => {

                    if (arr.Product_id === Event.Product_id && arr.Price.id === Event.Price.id) {

                        return { ...arr, Cart_Quantity: arr.Cart_Quantity + 1 }
                    }
                    return arr

                })
                localStorage.setItem("items", JSON.stringify(s));

            }
            dispatch({ type: 'ApiProduct', ApiProduct: !state.ApiProduct })
        } else {
            Swal.fire({
                title: " Insufficient Stock",
                text: "The requested quantity exceeds the available stock for this product.",
                footer: `The maximum available quantity for this item is ${Event?.Price?.Quantity}.`,
                timer: 4000,
                imageUrl: 'https://i.ibb.co/k0kZTwd/Empty-Card-Image.png',
                imageAlt: 'Custom image',
                imageWidth: 80,
                imageHeight: 80,
            });
        }
    }
    async function decreaseQuantity(Id, Event) {
        if (state.login || token_data) {
            const config = {
                headers: { Authorization: `Bearer ${token_data}` }
            };

            await Axios.post(`https://api.cannabaze.com/UserPanel/Update-AddtoCart/${Id}`,
                {
                    Product_id: Event.Product_id,
                    Store_id: Event.Store_id,
                    Image_id: Event.Image_id,
                    Price: Event.Price,
                    Cart_Quantity: (Event.Cart_Quantity - 1),
                    PriceId: Event.Price.id

                },
                config,

                SetLoadingmines(true)

            )
                .then((res) => {
                    SetLoadingmines(false)
                    dispatch({ type: 'ApiProduct', ApiProduct: !state.ApiProduct })

                })
                .catch((error) => {
                    console.trace(error)
                    SetLoadingmines(false)
                })


        }

        else {
            var obj = JSON.parse(localStorage.getItem("items"));
            var s = obj?.map((arr) => {
                if (arr.Product_id === Event.Product_id && arr.Price.id === Event.Price.id) {

                    return { ...arr, Cart_Quantity: arr.Cart_Quantity - 1 }
                }
                return arr

            })
            localStorage.setItem("items", JSON.stringify(s));

        }

        dispatch({ type: 'ApiProduct', ApiProduct: !state.ApiProduct })
    }
    function navigate(e) {

        Navigate.push(`/products/${modifystr(e.category)}/${modifystr(e.SubcategoryName)}/${modifystr(e.ProductName)}/${e.Product_id}`)
    }

    useEffect(() => {
        setWindowWidth(window.innerWidth)
        SetAfterDiscount(state.AllProduct)
    }, [state.AllProduct])

    return (
        <React.Fragment>
            <div className="col-12  AddProductCartContainerinner">
                {wondowWidth > 768 ?
                    <>
                        <div className="cartProductHeadings row col-12">
                            <div className='col-5 '><span className='carttableheadings'>Your Item</span></div>
                            <div className='col-2 text-center'><span className='carttableheadings'>Price</span></div>
                            <div className='col-2 text-center'><span className='carttableheadings'>Quantity</span></div>
                            <div className='col-2 text-center'><span className='carttableheadings'>Subtotal</span></div>
                            <div className='col-1 text-end'><span className='carttableheadings'></span></div>
                        </div>
                        <div className=" Add_product_cart_left_container_item" >

                            {AfterDiscount?.map((ele, index) => {
                                let wrigh = Boolean(ele.Price.Weight) ? ele.Price.Weight : `${ele.Price.Unit} Unit`;
                                return (
                          <>
                                    <div className="ssss row py-3 px-0 border-top border-bottom justify-content-center   align-items-center" key={index}>
                                        <div className='row align-items-center col-5'>
                                            <div className="p-0 Add_prod_item_image_cont">
                                                <Link href={`/products/${modifystr(ele.category)}/${modifystr(ele.SubcategoryName)}/${modifystr(ele.ProductName)}/${ele.Product_id}`}>
                                                    <Image 
                                                    width={100}
                                                    height={100}
                                                    src={`${ele.Image}`}
                                                    alt={ele.StoreName}
                                                    title={ele.StoreName} 
                                                    unoptimized={true}
                                                     />
                                                </Link>
                                            </div>
                                            <div className="Add_prod_content_cont ">
                                                <h5 className={`add_prod_cart_p_title ${ele?.Price?.Stock !== "IN Stock" && 'text-danger'}`} onClick={() => { navigate(ele) }}>{ele.ProductName + "(" + wrigh + ")"}</h5>
                                                <h4 className={`add_prod_cart_p ${ele?.Price?.Stock !== "IN Stock" && 'text-danger'}`}>{ele.StoreName}</h4>
                                                {ele?.Price?.Stock !== "IN Stock" && <h3 className='add_prod_cart_p text-danger'>This Product is Out of Stock Now Please remove it from the cart</h3>}
                                            </div>
                                        </div>
                                        <div className="col-2 text-center">
                                            <span className="add_prod_span_amount ">${parseInt(ele.Price.SalePrice)}</span>
                                        </div>
                                        <div className="col-2 text-center">
                                            <div className='AddToCartReviewBtn ' >
                                                <div className='addToCart_btn'>
                                                    {(Loadingmines || ele.Cart_Quantity) > 1 && <LoadingButton loading={Loadingmines} style={{ width: "15px" }} onClick={() => { decreaseQuantity(ele.id, ele) }} >  <GrFormSubtract color='gray' /></LoadingButton>
                                                    }
                                                </div>
                                                <div className='AddToCartCount' style={{ width: "20px" }}>
                                                    <p className='addToCartCountNumber'>{ele.Cart_Quantity}</p>
                                                </div>
                                                <div className='addToCart_btn'>
                                                    <LoadingButton loading={LoadingPlue} className="center" style={{ width: "15px" }} onClick={() => { Quantity(ele.id, ele.Cart_Quantity, ele) }} ><AiOutlinePlus color='gray' /></LoadingButton>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-2 text-center">
                                            <span className="add_prod_span_amount " value={ele.Price.SalePrice * ele.Cart_Quantity} >${parseInt(ele.Price.SalePrice * ele.Cart_Quantity)}</span>
                                        </div>
                                        <div className="col-1 text-center">
                                            <span><LoadingButton loading={LoadingDelete} className="center" style={{ width: "15px" }} onClick={(() => { DeleteItem(ele.Product_id, ele.id) })}> <RiDeleteBin6Line size={20} color='gray' /></LoadingButton></span>
                                        </div>
                                     

                                    </div>
                                       {
                                        Boolean(ele.free) &&     <div className="ssss row py-3 px-0 border-top border-bottom justify-content-center   align-items-center" key={index}>
                                        <div className='row align-items-center col-5'>
                                            <div className="p-0 Add_prod_item_image_cont">
                                                {/* <Link href={`/products/${modifystr(ele.category)}/${modifystr(ele.SubcategoryName)}/${modifystr(ele.ProductName)}/${ele.Product_id}`}> */}
                                                    <Image 
                                                     width={100}
                                                     height={100}        
                                                    src={`${ele.Image}`}
                                                     alt={ele.ProductName}
                                                     title={ele.ProductName}
                                                     unoptimized={true}
                                                     />
                                                {/* </Link> */}
                                            </div>
                                            <div className="Add_prod_content_cont ">
                                                <h5 className={`add_prod_cart_p_title ${ele?.Price?.Stock !== "IN Stock" && 'text-danger'}`} >{ele.ProductName + "(" + wrigh + ")"}</h5>
                                                <h4 className={`add_prod_cart_p ${ele?.Price?.Stock !== "IN Stock" && 'text-danger'}`}>{ele.StoreName}</h4>
                                                {ele?.Price?.Stock !== "IN Stock" && <h3 className='add_prod_cart_p text-danger'>This Product is Out of Stock Now Please remove it from the cart</h3>}
                                            </div>
                                        </div>
                                        <div className="col-2 text-center">
                                            <span className="add_prod_span_amount ">${parseInt(ele.Price.SalePrice)}</span>
                                        </div>
                                        <div className="col-2 text-center">
                                            <div className='AddToCartReviewBtn ' >
                                                <div className='addToCart_btn'>
                                                    {(Loadingmines || ele.Cart_Quantity) > 1 && <LoadingButton disabled loading={Loadingmines} style={{ width: "15px" }} onClick={() => { decreaseQuantity(ele.id, ele) }} >  <GrFormSubtract color='gray' /></LoadingButton>
                                                    }
                                                </div>
                                                <div className='AddToCartCount' style={{ width: "20px" }}>
                                                    <p className='addToCartCountNumber'>{ele.free}</p>
                                                </div>
                                                <div className='addToCart_btn'>
                                                    <LoadingButton disabled loading={LoadingPlue} className="center" style={{ width: "15px" }} onClick={() => { Quantity(ele.id, ele.Cart_Quantity, ele) }} ><AiOutlinePlus color='gray' /></LoadingButton>
                                                </div>
                                            </div>
                                        </div>
                                    
                                     

                                    </div>
                                    }
                          </>
                                )
                            })}

                        </div>
                    </>
                    :
                    <div className="">
                        {AfterDiscount?.map((ele, index) => {
                            let wrigh;
                            if (ele.Price.Weight) {
                                wrigh = ele.Price.Weight;
                            } else {
                                wrigh = `${ele.Price.Unit} Unit`
                            }
                            return (
                                <div className="addtoproduct_card" key={index}>
                                    <div className='mb_addtoproduct_card_img'>
                                        <Link href={`/products/${modifystr(ele.category)}/${modifystr(ele.SubcategoryName)}/${modifystr(ele.ProductName)}/${ele.Sub_Category_id}`}>

                                            <Image
                                            width={100}
                                            height={100}
                                            src={`${ele.Image}`}
                                             alt={ele.ProductName}
                                             title={ele.ProductName}
                                             unoptimized={true}
                                              />
                                        </Link>
                                    </div>
                                    <div className="mb_addtoproduct_card_content">
                                        <div className='d-flex align-items-start'>
                                            <h5 className={`add_prod_cart_p_title col-10 ${ele?.Price?.Stock !== "IN Stock" && 'text-danger'}`} onClick={() => { Navigate.push(ele) }}>{ele.ProductName + "(" + wrigh + ")"}</h5>
                                            <span className='col-2 d-flex justify-content-center align-items-center'><button loading={LoadingDelete} className="center border-0 bg-transparent" onClick={(() => { DeleteItem(ele.Product_id, ele.id) })}> <RiDeleteBin6Line className='delete_icons_add' color='gray' size={22} /></button></span>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-end'>
                                            <div className='AddToCartReviewBtn ' >
                                                <div className='addToCart_btn'>
                                                    {(Loadingmines || ele.Cart_Quantity) > 1 ? <LoadingButton loading={Loadingmines} style={{ width: "15px" }} onClick={() => { decreaseQuantity(ele.id, ele) }} >  <GrFormSubtract color='gray' /></LoadingButton> : <span><LoadingButton loading={LoadingDelete} className="center" style={{ width: "15px" }} onClick={(() => { DeleteItem(ele.Product_id, ele.id) })}> <RiDeleteBin6Line className='delete_icons_add' color='gray' /></LoadingButton></span>}
                                                </div>
                                                <div className='AddToCartCount text-center' >
                                                    <p className='addToCartCountNumber'>{ele.Cart_Quantity}</p>

                                                </div>
                                                <div className='addToCart_btn'>
                                                    <LoadingButton loading={LoadingPlue} className="center" style={{ width: "15px" }} onClick={() => { Quantity(ele.id, ele.Cart_Quantity, ele) }} sx={{
                                                        minWidth: '30px',
                                                    }} ><AiOutlinePlus color='gray' /></LoadingButton>

                                                </div>
                                            </div>
                                            <span className="add_prod_span_amount " value={ele.Price.SalePrice * ele.Cart_Quantity} >${parseInt(ele.Price.SalePrice * ele.Cart_Quantity)}</span>
                                        </div>
                                    </div>





                                </div>
                            )
                        })}
                    </div>


                }
            </div>
        </React.Fragment >
    )
}
export default AddToCartReview