import React, { useState } from "react";
import Image from "next/image";
import useStyles from "../../styles/style";
import { Swiper, SwiperSlide } from "swiper/react";
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import { BsShareFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import MenuItem from '@mui/material/MenuItem';
import { WishListPost } from "@/component/Whishlist/WishListApi_"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RWebShare } from "react-web-share";
import axios from "axios";
import Cookies from 'universal-cookie';
import Createcontext from "../../hooks/context"
import "swiper/css";
import "swiper/css/pagination";
import { Rating } from '@mui/material';
import { Pagination } from 'swiper/modules';
import _ from "lodash"
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Link from "next/link";
import { useRouter } from "next/router";
import AddToCartPopUp from "../../component/Addtocard/AddToCartPopUp/AddToCartPopUp";
import { WhisList } from '@/component/Whishlist/WhisList'
import Loader from "../../component/Loader/Loader";
import { modifystr } from "../../hooks/utilis/commonfunction";

const NewProductDetailsCards = ({ Product, DiscountedValue, Price, SetPrice, quentity, setquentity, dynamicWeight, setdynamicWeight, link = "/products" }) => {

    const cookies = new Cookies();
    const location = useRouter()
    const [displaypic, Setdisplaypic] = useState('');
    let p = Product?.images === undefined ? "" : Product?.images[0].image;
    const classes = useStyles();
    let token_data = cookies.get('User_Token_access')
    let accessToken
    if (typeof window !== 'undefined') {

        accessToken = localStorage.getItem('User_Token_access');

    }
    if (Boolean(accessToken)) { token_data = accessToken };
    const [CartClean, SetCartClean] = React.useState(false)
    const [productdescription, setproductdescription] = React.useState(false)
    const [startload, setstartload] = React.useState(false)
    const { state, dispatch } = React.useContext(Createcontext)

    const [AddTOCard, SetAddToCard] = React.useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem("items");
            const initialValue = JSON.parse(saved);
            return initialValue || []
        }
    })
    const [NewData, SetNewData] = React.useState([])
    const [Whishlist, SetWishList] = React.useState(false)
    const [SelectVariant, SetSelectVariant] = React.useState('')
    const Addtocard = async (Event) => {
        if (token_data) {
            const AddData = _.filter(Price, Price => Price.Product_id === Event.id);
            const h = Event?.Prices[0].Price
            const PriceArrry = h.find((data) => data.id === parseInt(AddData[0]?.Item_id) && data)
            let PriceIndex = PriceArrry === undefined ? Event?.Prices[0].Price[0] : PriceArrry;

            const config = {
                headers: { Authorization: `Bearer ${token_data}` }
            };
            SetNewData({
                Product_id: Event?.id,
                Store_id: Event?.Store_id,
                Image_id: Event?.images[0]?.id,
                Price: PriceIndex,
                Cart_Quantity: quentity,
                PriceId: PriceIndex?.id,
                category: Event.category_name,
                Sub_Category_id: Event.Sub_Category_id,
                SubcategoryName: Event.SubcategoryName,
                StoreName: Event.StoreName,
                CoupounField: DiscountedValue.DiscountType === "" ? null : DiscountedValue,
                PromoCodeid: DiscountedValue.id,
                CustomerGets: DiscountedValue.DiscountType === 'Buy X get Y' ? DiscountedValue.CustomerGets : null,
                City: Event.Store_City,
                State: Event.Store_State,
                Country: Event.Store_Country

            })
            await axios.post("https://api.cannabaze.com/UserPanel/Add-AddtoCart/",

                {
                    Brand_Id: Event.Brand_id,
                    Product_id: Event.id,
                    Store_id: Event.Store_id,
                    Image_id: Event.images[0].id,
                    Price: PriceIndex,
                    Cart_Quantity: quentity,
                    PriceId: PriceIndex?.id,
                    category: Event.category_name,
                    Sub_Category_id: Event.Sub_Category_id,
                    SubcategoryName: Event.SubcategoryName,
                    StoreName: Event.StoreName,
                    CoupounField: DiscountedValue.DiscountType === "" ? null : DiscountedValue,
                    PromoCodeid: DiscountedValue.id,
                    CustomerGets: DiscountedValue.DiscountType === 'Buy X get Y' ? DiscountedValue.CustomerGets : null,
                    City: Event.Store_City,
                    State: Event.Store_State,
                    Country: Event.Store_Country
                }
                , config
            ).then(response => {
                if (response.data === "Empty Add to Cart") {
                    SetCartClean(true)
                }
                dispatch({ type: 'ApiProduct', ApiProduct: !state.ApiProduct })
            }).catch(
                function (error) {
                    if (error.response.status === 406) {
                        alert("This Product " + error.response.data[0])
                    }
                })
        }
        else {
            const AddData = _.filter(Price, Price => Price.Product_id === Event.id);
            const h = Event?.Prices[0].Price
            const PriceArrry = h.find((data) => data.id === parseInt(AddData[0]?.Item_id) && data)
            let PriceIndex = PriceArrry === undefined ? Event?.Prices[0].Price[0] : PriceArrry;

            const Arry = {
                Image: Event.images[0].image,
                Product_id: Event.id,
                Store_id: Event.Store_id,
                Image_id: Event.images[0].id,
                Price: PriceIndex,
                Cart_Quantity: quentity,
                ProductName: Event.Product_Name,
                StoreCurbsidePickup: Event.StoreCurbsidePickup,
                StoreDelivery: Event.StoreDelivery,
                StorePickup: Event.StorePickup,
                StoreAddress: Event.StoreAddress,
                category: Event.category_name,
                Sub_Category_id: Event.Sub_Category_id,
                SubcategoryName: Event.SubcategoryName,
                StoreName: Event.StoreName,
                CoupounField: DiscountedValue.DiscountType === "" ? null : DiscountedValue,
                PromoCodeid: DiscountedValue.id,
                CustomerGets: DiscountedValue.DiscountType === 'Buy X get Y' ? DiscountedValue.CustomerGets : null,
                City: Event.Store_City,
                State: Event.Store_State,
                Country: Event.Store_Country

            }
            SetNewData(Arry)
            if (AddTOCard.length !== 0) {
                if (AddTOCard.find((data) => { return data.Store_id === Event.Store_id })) {
                    const t = AddTOCard.filter((data) => { return data.Product_id === Event.id && data.Price.id === PriceIndex.id })
                    if (t.length > 0) {
                        SetAddToCard(AddTOCard.map((Cart) => {
                            if (Cart.Product_id === Event.id && Cart.Price.id === PriceIndex.id) {
                                return { ...Cart, Cart_Quantity: Cart.Cart_Quantity + quentity }
                            }
                            return Cart
                        }))
                        dispatch({ type: 'ApiProduct', ApiProduct: !state.ApiProduct })
                    }
                    else {
                        SetAddToCard([...AddTOCard, Arry])
                        dispatch({ type: 'ApiProduct', ApiProduct: !state.ApiProduct })
                    }
                }
                else {
                    SetCartClean(true)
                }
            }
            else {
                SetAddToCard([Arry])
                dispatch({ type: 'ApiProduct', ApiProduct: !state.ApiProduct })
            }
            // dispatch({ type: 'Cart_subTotal' })
        }
    }

    React.useEffect(() => {
        localStorage.setItem('items', JSON.stringify(AddTOCard))

    }, [AddTOCard])


    // React.useEffect(() => {
    //     document.documentElement.scrollTo({
    //         top: 0,
    //         left: 0,
    //         behavior: "instant", // Optional if you want to skip the scrolling animation
    //     });
    //     setTimeout(() => {
    //         setstartload(false)
    //     }, "1000");

    // }, [])

    function k(id) {

        Product?.Prices?.map((item) => {
            let vl = item.Price.filter((items) => {
                if (items.id === parseInt(id)) {
                    SetSelectVariant(items)
                    setdynamicWeight(items.SalePrice)
                    return items.SalePrice
                }
            })
            return vl[0]
        })

    }
    async function PriceSelect(Product1, Item) {

        SetPrice(Price => {
            return Price.filter(Price => Price.Product_id !== Product1)
        })
        SetPrice(Price => [...Price, { Product_id: Product1, Item_id: Item }]);
        Product?.Prices?.map((item) => {
            let vl = item.Price.filter((items) => {
                if (items.id === parseInt(Item)) {
                    SetSelectVariant(items.id)
                    setdynamicWeight(items.SalePrice)
                    return items.SalePrice
                }
            })
            return vl[0]
        })
    }
    const handleWhishList = (id) => {
        if (state.login === false) {
            SetWishList(!Whishlist)
        }
        else {
            WishListPost(id).then(async (res) => {
                if (res.data.data === 'Remove From WishList') {
                    dispatch({ type: 'WishList', WishList: { ...state.WishList, [id]: !state.WishList[id] } })
                }
                else {
                    dispatch({ type: 'WishList', WishList: { ...state.WishList, [id]: true } })
                }
            }).catch((err) => { });
        }
    }
    const Swal = require('sweetalert2')
    function incressQuanity() {
        let val = Boolean(dynamicWeight) ? dynamicWeight : Product?.Prices[0]?.Price[0].SalePrice
        Product?.Prices[0]?.Price?.forEach((item, index) => {

            if (item.SalePrice === val && item.Quantity - 1 >= quentity) {
                setquentity(quentity + 1)
            } else if (item.SalePrice === val && item.Quantity - 1 <= quentity) {

                Swal.fire({
                    title: " Insufficient Stock",
                    text: "The requested quantity exceeds the available stock for this product.",
                    footer: `The maximum available quantity for this item is ${item.Stock === "Out of Stock" ? "0" : quentity}.`,
                    timer: 4000,
                    imageUrl: 'https://i.ibb.co/k0kZTwd/Empty-Card-Image.png',
                    imageAlt: 'Custom image',
                    imageWidth: 80,
                    imageHeight: 80,
                });

            } else if (item.SalePrice === val && item.Quantity === 1) {
                Swal.fire({
                    title: " Insufficient Stock  ",
                    text: "The requested quantity exceeds the available stock for this product.",
                    imageUrl: 'https://i.ibb.co/k0kZTwd/Empty-Card-Image.png',
                    imageAlt: 'Custom image',
                    footer: `The maximum available quantity for this item is 1.`,
                    imageWidth: 60,
                    imageHeight: 60,
                    timer: 4000
                });
            }

        })
    }



    React.useEffect(() => {
        if (Product.length !== 0) {
            SetSelectVariant(Product?.Prices[0]?.Price[0]?.id)
        }
    }, [Product])
    return (
        <React.Fragment>
            {
                <div className=" w-100">
                    <div className={location.pathname.includes('/menu-integration') ? "menuintregarteproductpage newProductDetailsContainer  position-relative  mt-4" : " newProductDetailsContainer  position-relative  mt-4"}>
                        <div className="newProductDetailsCardLeftCol">
                            <div className="">
                                <div className="newProductDetailsUpperimage_container">
                                    <Image className="newProductDetails_upper_image"
                                        width={100}
                                        unoptimized={true}
                                        height={100}
                                        src={Boolean(displaypic) ? displaypic : Product?.images[0]?.image}
                                        alt={Product?.Product_Name}
                                        title={Product?.Product_Name} />

                                </div>
                                {
                                    Product?.images?.length > 1 && <div className=" newProductDetailsLowerImage_container">
                                        <Swiper
                                            breakpoints={{
                                                540: {
                                                    slidesPerView: 3,
                                                    spaceBetween: 20,
                                                },
                                                768: {
                                                    slidesPerView: 4,
                                                    spaceBetween: 40,
                                                },
                                                991: {
                                                    slidesPerView: 3,
                                                    spaceBetween: 20,
                                                },
                                                1124: {
                                                    slidesPerView: 4,
                                                    spaceBetween: 10,
                                                },
                                                1490: {
                                                    slidesPerView: 4,
                                                    spaceBetween: 20,
                                                },
                                            }}
                                            slidesPerView={4}
                                            spaceBetween={10}
                                            pagination={{
                                                clickable: false,
                                            }}


                                            modules={[Pagination]}
                                            className="mySwiper"
                                        >
                                            {Product?.images?.map((items, index) => {
                                                return (
                                                    <SwiperSlide key={index}>

                                                        <div className="col-12 NewProductDetails_image_container">
                                                            <Image
                                                                unoptimized={true}
                                                                width={100}
                                                                height={100}
                                                                className="NewProductDetails_image"
                                                                src={items.image}
                                                                alt={Product?.Product_Name}
                                                                title={Product?.Product_Name}
                                                                onClick={() => { Setdisplaypic(items?.image) }} />

                                                        </div>

                                                    </SwiperSlide>

                                                )
                                            })}

                                        </Swiper>
                                    </div>
                                }


                            </div>
                        </div>
                        <div className="newProductdetails_rightSideContent_container">
                            <h1 className="newProductDetails_heading">{Product?.Product_Name}</h1>
                            <div className=" ">
                                <Link href={`/${link}/${modifystr(Product?.StoreName)}/${Product?.Store_id}`}>
                                    <h3 className="newProductDetails_subHeadingss">By {Product.StoreName}</h3>
                                </Link>
                            </div>
                            <div className="newProductDetailsButon">
                                {Product.THC !== 0 && <button className="newProductdetailsButtonss">{Product.THC}% THC</button>}
                                {Product.CBD !== 0 && <button className="newProductdetailsButtonss">{Product.CBD}% CBD</button>}
                                {Product.strain !== "None" && <button className="newProductdetailsButtonss">{Product.strain}</button>}


                            </div>
                            <div className="col-12 mt-2">
                                <p>
                                    <Rating name="read-only" className={`mx-2 ${classes.homePageStarIconscolor}`} value={Product.rating === null ? 0 : parseInt(Product?.rating)} size="small" readOnly />
                                    <span>
                                    </span><span className="mx-2">{Product.rating === null ? 0 : Product.rating + ".0"} {Product?.TotalRating !== 0 ? `(${Product?.TotalRating})` : `(0)`} </span>
                                </p>
                            </div>
                            <div className="col-12 productDetailsCardWeigth">
                                <span className="newProduct_Weight">
                                    {Product?.Prices?.map((item) => {
                                        let vl = item.Price.map((item) => {
                                            if (item.Weight) {
                                                return 'Weight :'
                                            } else {
                                                return ` Unit :`
                                            }

                                        })
                                        return vl[0]
                                    })
                                    }
                                </span><span className="mx-3 newProd_grms productDetailsCardWeigthOptions">
                                    {

                                        Product?.Prices?.map((data) => data.Price.length)[0] > 1 ?
                                            <Select

                                                className={classes.weightSelectbox}
                                                // onChange={(e) => {
                                                //     setquentity(1)
                                                //     k(e.target.value)
                                                // }}
                                                value={SelectVariant}
                                                onChange={(e) => {

                                                    PriceSelect(Product.id, e.target.value)
                                                    // setquentity(1),
                                                    // k(e.target.value)
                                                }
                                                }
                                            >
                                                {
                                                    Product?.Prices[0]?.Price?.map((item, index) => {

                                                        if (Boolean(item.Weight)) {
                                                            // return <option value={item.id} key={index}>{item.Weight}</option>
                                                            return <MenuItem value={item.id} key={index}>{item.Weight}</MenuItem>
                                                        } else {
                                                            // return <option n value={item.id} key={index} >{item.Unit} Unit</option>
                                                            return <MenuItem value={item.id} key={index}>{item.Unit} unit</MenuItem>
                                                        }

                                                    })
                                                }
                                            </Select> :
                                            Product?.Prices?.map((item) => {
                                                let vl = item.Price.map((item) => {
                                                    if (Boolean(item.Weight)) {
                                                        return item.Weight
                                                    } else {
                                                        return `${item.Unit} Unit`
                                                    }
                                                })
                                                return vl[0]
                                            })
                                    }
                                </span>
                            </div>
                            <div className="col-12 productDetailsCardQuestity">
                                <span className="newProduct_Weight">Quantity : </span>
                                <span className="mx-3 newProd_grms">
                                    <div className="qty_selector">
                                        <span className="qty_btn" onClick={() => { if (quentity > 1) { setquentity(quentity - 1) } }}>-</span>
                                        <span className="qty_input">{quentity}</span>
                                        <span className="qty_btn" onClick={() => { incressQuanity() }}>+</span>
                                    </div>
                                </span>
                            </div>
                            <div className="col-12">
                                <p className="d-flex">
                                    <span className="newProduct_doller_price d-flex">

                                        $ {
                                            DiscountedValue?.Reflect
                                                ?
                                                < div className="DisplayDiscount" >
                                                    <span>
                                                        {
                                                            parseInt(dynamicWeight) !== 0
                                                                ? parseInt(dynamicWeight * quentity) - ((Boolean(DiscountedValue?.Percentage) ? (dynamicWeight * quentity) * parseInt(DiscountedValue?.Percentage) / 100 : parseInt(DiscountedValue.Amount)))
                                                                :
                                                                Product?.Prices?.map((data) => { return ((data.Price[0].SalePrice * quentity - (Boolean(DiscountedValue?.Percentage) ? parseInt((data.Price[0].SalePrice * quentity) * parseInt(DiscountedValue?.Percentage) / 100) : parseInt(DiscountedValue.Amount)))) })
                                                        }
                                                    </span>
                                                    <strike >{parseInt(dynamicWeight) !== 0 ? dynamicWeight : Product?.Prices?.map((data) => data.Price[0].SalePrice * quentity)}</strike>
                                                </div>
                                                :
                                                parseInt(dynamicWeight) !== 0 ? (dynamicWeight * quentity).toFixed(1) : Product?.Prices?.map((data) => (data.Price[0].SalePrice * quentity).toFixed(1))


                                        }
                                    </span>
                                    <span className="mx-3 newProduct_Gms">/ {quentity} piece</span>
                                    {
                                        DiscountedValue?.Reflect && <span className="mx-3 newProduct_Gms" style={{ color: "#31B665" }}>Offer Applied</span>
                                    }
                                </p>
                            </div>
                            <div className="col-12">
                                {
                                    Product?.Prices?.map((data, index) => {
                                        if (dynamicWeight === 0) {
                                            if (data.Price[0]) {
                                                if (data.Price[0].Stock === "IN Stock") {
                                                    return (
                                                        <Box key={index} className={`   ${classes.loadingBtnTextAndBack}`} >
                                                            <LoadingButton onClick={() => { Addtocard(Product) }} variant="outlined" >Add To Cart</LoadingButton>
                                                        </Box>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <Box key={index} >
                                                            <LoadingButton className={`${classes.odsbtn}`}>Out of Stock</LoadingButton>
                                                        </Box>
                                                    )
                                                }
                                            }
                                        }
                                        else {
                                            return (
                                                data.Price.map((arry, index) => {
                                                    if (SelectVariant === arry.id) {
                                                        if (arry.Stock === "IN Stock") {
                                                            return (
                                                                <Box key={index} className={`${classes.loadingBtnTextAndBack}`} >
                                                                    <LoadingButton onClick={() => { Addtocard(Product) }} variant="outlined" >Add To Cart</LoadingButton>
                                                                </Box>
                                                            )
                                                        }
                                                        else {
                                                            return (
                                                                <Box key={index}>
                                                                    <LoadingButton className={`${classes.odsbtn}`}>Out of Stock</LoadingButton>
                                                                </Box>
                                                            )
                                                        }

                                                    }
                                                })
                                            )


                                        }
                                    })

                                }


                                {
                                    CartClean && <AddToCartPopUp CartClean={"center"} SetCartClean={SetCartClean} NewData={NewData} SetAddToCard={SetAddToCard} />
                                }
                            </div>
                            <div className="productdetailsaccordion">


                                <Accordion className={classes.productdescription}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        Product Details
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className='newProductAboutUs_description' dangerouslySetInnerHTML={{ __html: Product?.Product_Description }} />
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </div>
                        <div className='position-absolute w-auto top-0 p-2  end-0'>

                            <IconButton onClick={() => { handleWhishList(Product?.id) }} aria-label="Example">
                                {
                                    state.login ? state.WishList[Product?.id] ? <AiFillHeart color="31B665"></AiFillHeart> : <AiOutlineHeart color="31B665" /> : <AiOutlineHeart color="31B665" />
                                }
                            </IconButton>
                            <span className="shareiconcontainer">
                                {/* <RWebShare
                                    // data={{ url: window.location.href }}
                                    sites={["facebook", "twitter", "whatsapp", "telegram", "linkedin", 'mail', 'copy']}
                                    onClick={() => console.info("share successful!")}
                                    color="#31B665" >
                                    <BsShareFill />
                                </RWebShare> */}
                            </span>

                        </div>
                    </div>

                    {location?.pathname?.includes('/menu-integration') && <Loader/>
                    }
                    {Whishlist && <WhisList open1={Whishlist} SetWishList={SetWishList}></WhisList>}
                </div >
            }
        </React.Fragment>
    )
}
export default NewProductDetailsCards