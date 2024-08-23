
import React, { useEffect } from "react";
// import { useParams, usenavigate.push, useLocation, Link } from "react-router-dom";
import { useRouter } from "next/router";
import axios from "axios";
import dynamic from 'next/dynamic'
import useStyles from "../../../styles/style"
// import ProductFilter from "../../../component/Filter/ProductFilter";
const ProductFilter = dynamic(() => import('../../../component/Filter/ProductFilter'), { ssr: true });
const ProductList = dynamic(() => import('../../../component/productcard/ProductList'), { ssr: true });
// import ProductList from "../../../component/productcard/ProductList";
import { BsLayoutSplit } from "react-icons/bs"
import { MdOutlineBrandingWatermark } from "react-icons/md"
import { MdOutlinePriceChange } from "react-icons/md"
import { BsStripe } from "react-icons/bs"
import { GiWeightScale } from "react-icons/gi"
import _ from "lodash"
// import NewFlavourBanner from "../../../component/StoreDetails/NewFlavourBanner";
const NewFlavourBanner = dynamic(() => import('../../../component/StoreDetails/NewFlavourBanner'), { ssr: true });
// import StoreDetailMenuItem from "../../../component/StoreDetails/StoreDetailComponent/StoreDetailMenuItem";
const StoreDetailMenuItem = dynamic(() => import('../../../component/StoreDetails/StoreDetailComponent/StoreDetailMenuItem'), { ssr: true });
import CategoryProduct from "../../../component/category/category";
// import ComponentStoreDetails from "../../../component/StoreDetails/StoreDetailComponent/ComponentStoreDetails"
const ComponentStoreDetails = dynamic(() => import('../../../component/StoreDetails/StoreDetailComponent/ComponentStoreDetails'), { ssr: true });
import { AiOutlineDeploymentUnit } from "react-icons/ai";
// import { ProductHelpFull } from '../../Product/ProductApi'
import Review from "../../../component/Review/Review";
const StoreDetails = dynamic(() => import('../../../component/ScoPage/StoreDetails'), { ssr: true });
// import { StoreDetails } from "../../../component/ScoPage/StoreDetails"
import { Store_Add_Review, Store_OverAllGet_Review, Store_Get_UserComment, Store_Get_Review, Delete_StoreReview, StoreHelpFull } from "../../../hooks/apicall/api";
import Createcontext from "../../../hooks/context"
import Loader from "../../../component/Loader/Loader";

import DispensoriesAddressSkeleton from "../../../component/skeleton/DashBoardSkeleton/DispensoriesAddressSkeleton";
import { modifystr } from "../../../hooks/utilis/commonfunction";
import Swal from 'sweetalert2';
import gifimage from '../../../../public/image/gif.svg'
import Link from "next/link";
import Image from "next/image";
export default function DispensoriesDetails(props) {
    const navigate = useRouter()
    const { id, storeData, product } = props.params
    let tab = (navigate.query.details.length === 2) ? "menu" : navigate.query.details[1]
    const Despen = [storeData] || []
    const DespensariesData = product
    const data = false
    const { state, dispatch } = React.useContext(Createcontext)
    const location = useRouter()
    const params = useRouter();
    const [reviewtype, setReviewtype] = React.useState('All')
    const classes = useStyles()
    const [category, SetCategory] = React.useState([])
    const [reviewloading, setReviewloading] = React.useState(false)
    const [productload, setProductload] = React.useState(false)
    const [Rating, SetRating] = React.useState()
    const [api, SetApi] = React.useState(false)
    const [AllReview, SetReview] = React.useState([])
    const [GetProductReview, SetGetProductReview] = React.useState({
        value: 0,
        comment: '',
        Title: "",
        media: [],
        popup: false
    })
    React.useEffect(() => {
        if (Boolean(data)) {

            SetDespens(data)
            dispatch({ type: 'Embeddedstore', Embeddedstore: data })
        }
        axios.post("https://api.cannabaze.com/UserPanel/Get-CategoryByStore/ ",
            {
                "Store_Id": parseInt(id)
            }
        ).then(async response => {
            const d = []
            response.data.map((data) => {
                d.push(data[0])
                var uniqueUsersByID = _.uniqBy(d, 'id'); //removed if had duplicate id
                SetCategory(uniqueUsersByID)
                if (Category !== undefined) {
                    uniqueUsersByID.map((data) => {
                        if (Category === data.name.toLowerCase()) {
                            ShowCategoryProduct(data.id, Category)
                        }
                        return data

                    })
                }

                return data
            })
        }).catch(
            function (error) {
            })
    }, [id])

    useEffect(() => {

        if (reviewtype === "All") {
            axios.get(`https://api.cannabaze.com/UserPanel/Get-AllAverage/${id}`).then((res) => {
                SetRating(res.data)

            }).catch(() => { })
        } else if (reviewtype === "product") {
            axios.get(`https://api.cannabaze.com/UserPanel/Get-AverageofProduct/${id}`).then((res) => {
                SetRating(res.data)

            }).catch(() => { })
        } else {
            Store_OverAllGet_Review(id).then((res) => {
                SetRating(res)

            }).catch(() => { })
        }
    }, [reviewtype, id, api])

    function SelectionTab(item) {
        if (Boolean(location.asPath.slice(0, 16) === "/weed-deliveries") || Boolean(location.asPath.slice(0, 18) === "/weed-dispensaries")) {

            navigate.replace(`${location.asPath.slice(0, 16) === "/weed-deliveries" ? "/weed-deliveries" : "/weed-dispensaries"}/${modifystr(Despen[0]?.Store_Name)}/${modifystr(item)}/${id}`, 0, { shallow: true })
        }
        else {
            navigate.replace(`/menu-integration/${modifystr(Despen[0]?.Store_Name)}/${modifystr(item)}/${id}`, 0, { shallow: true })

        }

    }
    function ShowCategoryProduct(Id, name) {
        dispatch({ type: 'Loading', Loading: true })
        axios.post(`https://api.cannabaze.com/UserPanel/Get-filterProductbyStoreandCategory/`,
            {
                "Store_Id": parseInt(id),
                "Category_Id": Id
            }
        ).then(response => {
            dispatch({ type: 'Loading', Loading: false })
            if (Category !== name) {
                if (Boolean(location.asPath.slice(0, 16) === "/weed-deliveries") || Boolean(location.asPath.slice(0, 18) === "/weed-dispensaries")) {
                    window.history.replaceState(null, '', `${location.asPath.slice(0, 16) === "/weed-deliveries" ? "/weed-deliveries" : "/weed-dispensaries"}/${modifystr(Despen[0]?.Store_Name)}/${"menu"}/${modifystr(name)}/${id}`);
                }
            }
            SetDespensariesProductData(response.data)
            setProductload(false)
        }).catch(
            function (error) {

            })
    }
    const ProductFilterData = [{ Id: 1, Name: "Category", Type1: "Flower", Type2: "CBD", Icons: <BsLayoutSplit className={classes.muiIcons} /> },
    { Id: 2, Name: "Brand", Type1: "Leafly", Type2: "CBD", Icons: <MdOutlineBrandingWatermark className={classes.muiIcons} /> },
    { Id: 3, Name: "Strain", Type1: "Indica", Type2: "Hybrid", Icons: <BsStripe className={classes.muiIcons} /> },
    { Id: 4, Name: "Price", Type1: "Any", Type2: "$25", Price: "$100", Icons: <MdOutlinePriceChange className={classes.muiIcons} /> },
    { Id: 5, Name: "Weight", Type1: "Any", Type2: "$25", Price: "$100", Icons: <GiWeightScale className={classes.muiIcons} /> },
    { Id: 6, Name: "Unit", Type1: "Any", Type2: "$25", Price: "$100", Icons: <AiOutlineDeploymentUnit className={classes.muiIcons} /> },
    ]

    useEffect(() => {
        if (reviewtype === "product") {
            axios.post('https://api.cannabaze.com/UserPanel/GetallProductReviewbyStore/', {
                "store": id
            }).then((res) => {
                SetReview(res.data)
            })
        } else if (reviewtype === "store") {
            Store_Get_Review(id).then((res) => {
                SetReview(() => {
                    return res.data
                })
                var Obj = _.find(res.data, { user: state.Profile.id });
                SetGetProductReview({ ...GetProductReview, 'popup': false, 'value': Obj.rating, 'Title': Obj.Title, 'comment': Obj.comment })
            }).catch((e) => {
                console.error(e)
            })
        } else {

            Store_Get_Review(id).then((res) => {


                axios.post('https://api.cannabaze.com/UserPanel/GetallProductReviewbyStore/', {
                    "store": id
                }).then((response) => {
                    SetReview([...res.data, ...response.data])
                })
            }).catch((e) => {
                console.error(e)
            })

        }
    }, [reviewtype, id, api])
    React.useEffect(() => {
        if (state.login && state.Profile.id !== undefined && id !== undefined) {
            Store_Get_UserComment(state.Profile.id, id).then((res) => {

                if (res.data.length !== 0) {
                    SetGetProductReview({
                        ...GetProductReview, "comment": res.data[0]?.comment,
                        "Title": res.data[0]?.Title, "value": res.data[0]?.rating
                    })
                }
                else {
                    SetGetProductReview({
                        ...GetProductReview, "comment": '',
                        "Title": '', "value": 0
                    })
                }
            }).catch((error) => {
                console.trace(error)
            })

        }
    }, [state.Profile, id, api])
    const onSubmit = () => {

        const formdata = new FormData();
        let a = GetProductReview?.media?.filter((item) => {
            return item?.type.includes('image')
        })
        let b = GetProductReview?.media?.filter((item) => {
            return item?.type.includes('video')
        })
        formdata.append('Store', id)
        formdata.append('rating', GetProductReview.value)
        formdata.append('Title', GetProductReview.Title)
        formdata.append('comment', GetProductReview.comment)
        for (let i = 0; i < a.length; i++) {
            formdata.append('multipleimages', a[i]);
        }
        for (let i = 0; i < b.length; i++) {
            formdata.append('multiplevideos', b[i]);
        }


        setReviewloading(true)
        Store_Add_Review(formdata).then((res) => {

            SetGetProductReview({ ...GetProductReview, 'popup': false })
            SetApi(!api)
            setReviewloading(false)

        }).catch(() => {
            setReviewloading(false)

        })
    };

    function handleDelete(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You are sure to want to delete this comment",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#31B655",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Delete_StoreReview(id).then((response) => {
                    response.data.status === 'success' && SetApi(!api)
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your comment has been deleted.",
                        icon: "success"
                    });
                })

            }
        });

    }
    function handleEdit() {
        SetGetProductReview({ ...GetProductReview, 'popup': true })
    }
    function HellFull(ReviewId) {
        if ("ProductName" in ReviewId) {
            ProductHelpFull(ReviewId.id, state.Profile.id).then((res) => {
                SetApi(!api)
            }).catch(() => {
            })
        } else {
            StoreHelpFull(ReviewId.id, state.Profile.id).then((res) => {
                SetApi(!api)
            }).catch(() => {
            })
        }
    }
    function navigationtab(route, store, id) {

        if (Boolean(store)) {

            navigate.push(`${route}/${store.toLowerCase()}/${id}`)
        }
        else if (Boolean(route)) {
            if (Boolean(state.City)) {
                navigate.push(`${route}/in/${state.Country.toLowerCase()}/${state.State.toLowerCase()}/${state.City.toLowerCase()}`)
            }
            else if (Boolean(state.State)) {
                navigate.push(`${route}/in/${modifystr(state.Country)}/${modifystr(state.State)}`)
            }
            else {
                navigate.push(`${(route)}/in/${modifystr(state.Country)}`)
            }
        }
    }
    // console.log(params.asPath ,'dfhgfhxfn fdb xhxf')
    return (
      
            // !Despen.length ? <Loader /> 
            // : 
            <div>
                {/* <div> 
                    {(location.asPath.slice(0, 18) === "/weed-dispensaries" || location.asPath.slice(0, 16) === "/weed-deliveries") &&
                    <div style={{ fontSize: '12px' }} > <span style={{ fontSize: '12px', cursor: 'pointer' }} onClick={() => navigationtab(location.asPath.slice(0, 18) === "/weed-dispensaries" ? '/weed-dispensaries' : "/weed-deliveries")}> {location.asPath.slice(0, 18) === "/weed-dispensaries" ? 'weed-dispensaries' : "weed-deliveries"}</span>
                        {" >"} <span style={{ fontSize: '12px', cursor: 'pointer' }} onClick={() => navigationtab(location.asPath.slice(0, 18) === "/weed-dispensaries" ? '/weed-dispensaries' : "/weed-deliveries", params.StoreName, id)}> {params.StoreName}</span>
                        {Boolean(params?.tab) && <span> {" > "}{params?.tab}</span>}
                    </div>
                }
                </div> */}
                <div>
                    {Boolean((location.asPath.slice(0, 18) === "/weed-dispensaries" || location.asPath.slice(0, 16) === "/weed-deliveries"))
                    ?
                    <StoreDetails Despen={Despen} locationStore={location.asPath}></StoreDetails>
                    :
                    // <Embedded Despen={Despen} locationStore={location.asPath}></Embedded>
                    ""
}
                        <div>

                            <span style={{ fontSize: '12px', cursor: 'pointer' }} onClick={() => navigationtab(location.asPath.slice(0, 18) === "/weed-dispensaries" ? '/weed-dispensaries' : "/weed-deliveries")}> {location.asPath.slice(0, 18) === "/weed-dispensaries" ? 'weed-dispensaries' : "weed-deliveries"}</span>
                            {" >"} 
                            <span style={{ fontSize: '12px', cursor: 'pointer' }} onClick={() => navigationtab(location.asPath.slice(0, 18) === "/weed-dispensaries" ? '/weed-dispensaries' : "/weed-deliveries", modifystr(Despen[0]?.Store_Name) , id)}>{Despen[0]?.Store_Name}</span>
                            {Boolean(params?.tab) && <span> {" > "}{params?.tab}</span>}
                        </div>
                    
                </div>
                {Boolean((location.asPath.slice(0, 18) === "/weed-dispensaries" || location.asPath.slice(0, 16) === "/weed-deliveries"))
                    ? <StoreDetails Despen={Despen} locationStore={location.asPath}></StoreDetails>  :  ""
                }
                <div className="container-fluid product_container" >
                    {!location.asPath.includes('/menu-integration') && <NewFlavourBanner delBtn={Despen}></NewFlavourBanner>}
                    <div className="row">
                        <div className="col-12">
                            {Boolean((location.asPath.slice(0, 18) === "/weed-dispensaries" || location.asPath.slice(0, 16) === "/weed-deliveries")) && <StoreDetailMenuItem tab={tab || "Menu"} SelectionTab={SelectionTab}></StoreDetailMenuItem>}
                        </div>
                        {
                            (tab === 'menu' || tab === undefined) &&
                            <React.Fragment>
                                {!productload ? <> {!location.asPath.includes('/menu-integration') ?
                                    (Boolean(DespensariesData.length) ?
                                        <>
                                            <CategoryProduct Category={category} ShowCategoryProduct={ShowCategoryProduct}> </CategoryProduct>
                                            <div className="col-12 productCat_cont" style={{ display: "contents" }}>
                                                <ProductFilter Store_id={Despen[0]?.id}
                                                    id={id}
                                                    ProductFilterData={ProductFilterData}
                                                    Setarr1={DespensariesData}
                                                    arr={DespensariesData}
                                                />
                                                <div className={location.asPath.includes('/menu-integration') ? "col-12 col-lg-9 col-xxl-10 prod_cat_right_sec" : "col-12 col-lg-9 col-xxl-10"}>
                                                    <ProductList arr={DespensariesData} link={Boolean(location.asPath.slice(0, 18) === "/weed-dispensaries" || location.asPath.slice(0, 16) === "/weed-deliveries") ? "products" : "menu-integration"} />
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <div id='oopss'>
                                            <div id='error-text'>
                                                <Image unoptimized={true} width={100} height={100} src={gifimage.src} alt="no product" />
                                                <span>{`Menu Not Available`}</span>
                                                <p className="p-a">{`This business hasn't posted its menu on Weedx.io yet. Click below to discover other nearby businesses`}</p>
                                                <span onClick={() => { navigate.push(`/weed-deliveries/in/${Despen[0]?.Country &&  Despen[0]?.Country.replaceAll(" " , '-').toLowerCase()}/${Despen[0]?.State &&  Despen[0]?.State.replaceAll(" " , '-').toLowerCase()}/${Despen[0]?.City &&  Despen[0]?.City.replaceAll(" " , '-').toLowerCase()}`) }} className="back">{`VIEW OTHER BUSINESSES`}</span>
                                            </div>
                                        </div>
                                    ) :
                                    (!productload ?
                                        (Boolean(DespensariesData.length) ? <div className="col-12 productCat_cont" style={{ display: "contents" }}>
                                            <ProductFilter Store_id={Despen[0]?.id}
                                                ProductFilterData={ProductFilterData}
                                                Setarr1={SetDespensariesProductData}
                                                arr={DespensariesData}
                                                id={id}
                                            />
                                            <div className={location.asPath.includes('/menu-integration') ? "col-12 col-lg-9 col-xxl-10 prod_cat_right_sec" : "col-12 col-lg-9 col-xxl-10"}>
                                                <ProductList arr={DespensariesData} link={Boolean(location.asPath.slice(0, 18) === "/weed-dispensaries" || location.asPath.slice(0, 16) === "/weed-deliveries") ? "products" : "menu-integration"} />
                                            </div>
                                        </div>
                                            :
                                            <div id='oopss'>
                                                <div id='error-text'>
                                                    <Image unoptimized={true} width={100} height={100} src={gifimage.src} alt="no product" />
                                                    <span>{`Menu Not Available`}</span>
                                                    <p className="p-a">{`This business hasn't posted its menu on Weedx.io yet. Click below to discover other nearby businesses `}</p>
                                                    <span className="back">{`VIEW OTHER BUSINESSES`}</span>
                                                </div>
                                            </div>)
                                        :
                                        <DispensoriesAddressSkeleton />
                                    )
                                }
                                </> :
                                    <DispensoriesAddressSkeleton />}
                            </React.Fragment>
                        }
                        {
                            tab === 'store-details' && <ComponentStoreDetails storeDetails={Despen}></ComponentStoreDetails>
                        }
                        {
                            tab === 'review' && <Review
                                HellFull={HellFull}
                                type={`store`}
                                reviewtype={reviewtype}
                                setReviewtype={setReviewtype}
                                delBtn={Despen}
                                handleEdit={handleEdit}
                                reviewloading={reviewloading}
                                handleDelete={handleDelete}
                                Rating={Rating}
                                onSubmit={onSubmit}
                                GetProductReview={GetProductReview}
                                SetGetProductReview={SetGetProductReview}
                                AllReview={AllReview}
                                SetReview={SetReview}></Review>
                        }
                        {
                            tab === 'deals' && <div className="noReview">
                                <div className="noreviewicon">
                                    <div className="iconcircl"> <Image unoptimized={true} width={100} height={100} src={'/image/nodeal.png'} className="nodealsicon" alt="no Deals" title="no Deals" /></div>
                                </div>
                                <h3 className="noreview_title">{`Discover More Savings Soon!`}</h3>
                                <p className="noreview_description w-lg-50 ">{`It looks like there are no active deals at the moment at `}<Link target="_blank" href={`/weed-dispensaries/${modifystr(Despen[0]?.Store_Name)}/${Despen[0]?.id}`}><b>{Despen[0]?.Store_Name}</b></Link>{`. Don't worry, though – our partnered stores frequently update their promotions. Be sure to check back regularly for exciting discounts and special offers on your favorite products.`}</p>
                                <p className="noreview_description w-lg-50">{`In the meantime, explore the diverse range of products available at `}<Link target="_blank" href={`/weed-dispensaries/${modifystr(Despen[0]?.Store_Name)}/${Despen[0]?.id}`}><b>{Despen[0]?.Store_Name}</b></Link>{`. We're constantly working to bring you the best deals, so stay tuned for upcoming promotions.`}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>

    )
}




export async function getStaticPaths() {
    // Fetch all possible paths here
    // Example: const paths = [{ params: { storeId: '1' } }, { params: { storeId: '2' } }];
    const paths = []; // Return an empty array to generate no pages at build time

    return {
        paths,
        fallback: 'blocking', // Set to 'blocking' to generate pages on-demand
    };
}
export async function getStaticProps(context) {
    const storeId = _.findIndex(context.params.details, item => !isNaN(parseInt(item)));
    console.log(context.params.details[storeId])
    // console.log(context.params.details[storeId])
    let data = [];
    let productdata = []
    try {
        const response = await axios.get(`https://api.cannabaze.com/UserPanel/Get-StoreById/${context.params.details[storeId]}`);
        const product = await axios.get(`https://api.cannabaze.com/UserPanel/Get-ProductAccordingToDispensaries/${context.params.details[storeId]}`);
        productdata = product.data
        data = response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    if (data.length === 0) {
        return {
            notFound: true, // Redirect to 404 if no data found
        };
    }

    return {
        props: {
            params: {
                id: context.params.details[storeId],
                tab: !isNaN(parseInt(context.params.details[1])) ? "menu" : context.params.details[1],
                storeData: data[0],
                product: productdata
            }
        },
    };
}


