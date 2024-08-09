
import React, { useEffect } from "react";
// import { useParams, usenavigate.push, useLocation, Link } from "react-router-dom";
import { useRouter } from "next/router";
import Image from 'next/image'
import axios from "axios";
import useStyles from "../../../styles/style"
import ProductFilter from "../../../component/Filter/ProductFilter";
import ProductList from "../../../component/productcard/ProductList";
import { BsLayoutSplit } from "react-icons/bs"
import { MdOutlineBrandingWatermark } from "react-icons/md"
import { MdOutlinePriceChange } from "react-icons/md"
import { BsStripe } from "react-icons/bs"
import { GiWeightScale } from "react-icons/gi"
import _ from "lodash"
import NewFlavourBanner from "../../../component/StoreDetails/NewFlavourBanner";
import StoreDetailMenuItem from "../../../component/StoreDetails/StoreDetailComponent/StoreDetailMenuItem";
import CategoryProduct from "../../../component/category/category";
import ComponentStoreDetails from "../../../component/StoreDetails/StoreDetailComponent/ComponentStoreDetails"
import { AiOutlineDeploymentUnit } from "react-icons/ai";
// import { ProductHelpFull } from '../../Product/ProductApi'
import Review from "../../../component/Review/Review";
import { StoreDetails } from "../../../component/ScoPage/StoreDetails"
import { Store_Add_Review, Store_OverAllGet_Review, Store_Get_UserComment, Store_Get_Review, Delete_StoreReview, StoreHelpFull } from "../../../hooks/apicall/api";
import Createcontext from "../../../hooks/context"
import Loader from "../../../component/Loader/Loader";
import gifimage from '../../../../public/image/gif.svg'
// import { Embedded } from "../../../Component/ScoPage/Embedded";
// import Menuintregrate from "../../StoreDetail/StoreDetailComponent/Menuintregrate";
// import { useLoaderData } from 'react-router-dom';
import DispensoriesAddressSkeleton from "../../../component/skeleton/DashBoardSkeleton/DispensoriesAddressSkeleton";
import { modifystr } from "../../../hooks/utilis/commonfunction";
import Swal from 'sweetalert2';
import Link from "next/link";
import { useParams } from 'next/navigation'
export default function DispensoriesDetails(props) {
    const {id , tab} =  props.params
    const  data  = false
    // const params = useParams()
    const navigate= useRouter()
    const { state, dispatch } = React.useContext(Createcontext)
    const location = useRouter()
    const params = useRouter();
    const [reviewtype, setReviewtype] = React.useState('All')
    // const index = _.findIndex(params.query.details, item => !isNaN(parseInt(item)));
    //  const id =12

    // const { tab, Category, StoreName } = params
    const classes = useStyles()
    const [Category, SetCategory] = React.useState([])
    const [DespensariesData, SetDespensariesProductData] = React.useState([])
    const [reviewloading, setReviewloading] = React.useState(false)
    const [productload, setProductload] = React.useState(true)
    const [Despen, SetDespens] = React.useState([])
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
         if(Boolean(data)){

            SetDespens(data)
            dispatch({ type: 'Embeddedstore', Embeddedstore: data })
         }
         else {
            axios.get(`https://api.cannabaze.com/UserPanel/Get-StoreById/${id}`, {
            }).then(response => {
                if (response.data.length === 0) {
                    navigate.push("/404")
                } else {
                    SetDespens(response.data)
                    if (Boolean(location.pathname.slice(0, 16) === "/weed-deliveries") || Boolean(location.pathname.slice(0, 18) === "/weed-dispensaries")) {
                        if (Boolean(location.pathname.slice(0, 16) === "/weed-deliveries" && modifystr(response.data[0].Store_Name) !== StoreName)) {
                            if (Boolean(tab)) {
    
                                navigate.push(`/weed-deliveries/${modifystr(response.data[0].Store_Name)}/${tab}/${id}`, { replace: false })
                            }
                            else {
                                navigate.push(`/weed-deliveries/${modifystr(response.data[0].Store_Name)}/${id}`, { replace: false })
                            }
                        }
                        else {
                            if (modifystr(response.data[0].Store_Name) !== StoreName) {
                                if (Boolean(tab)) {
    
                                    navigate.push(`/weed-dispensaries/${modifystr(response.data[0].Store_Name)}/${tab}/${id}`, { replace: false })
                                }
                                else {
                                    navigate.push(`/weed-dispensaries/${modifystr(response.data[0].Store_Name)}/${id}`, { replace: false })
                                }
                            }
                        }
                    }
                    else if (Boolean(location.pathname.slice(0, 17) === "/menu-integration")) {
    
                        if (Boolean(location.pathname.slice(0, 17) === "/menu-integration" && modifystr(response.data[0].Store_Name) !== StoreName)) {
                            if (Boolean(tab)) {
    
                                navigate.push(`/menu-integration/${modifystr(response.data[0].Store_Name)}/${tab}/${id}`, { replace: false })
                            }
                            else {
                                navigate.push(`/menu-integration/${modifystr(response.data[0].Store_Name)}/${id}`, { replace: false })
                            }
                        }
    
    
    
                    }
                    // Boolean(location.pathname.slice(0 ,16) === "/weed-deliveries" &&  response.data[0].Store_Name !== StoreName) && navigate.push(`/weed-deliveries/${modifystr(response.data[0].Store_Name)}/${id}` , { replace: true })
                }
    
            }).catch((error) => {
            })
         }

        axios.post("https://api.cannabaze.com/UserPanel/Get-CategoryByStore/ ",
            {
                "Store_Id": parseInt(id)
            }
        ).then(async response => {
            const d = []
            response.data.map( async (data) => {
               await d.push(data[0])
                var uniqueUsersByID = await _.uniqBy(d, 'id'); //removed if had duplicate id
                SetCategory(uniqueUsersByID)
                if (Category !== undefined) {
                   uniqueUsersByID.forEach((data) => {
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
        axios.get(`https://api.cannabaze.com/UserPanel/Get-ProductAccordingToDispensaries/${id}`, {
        }).then(response => {
            SetDespensariesProductData(response.data)
            setProductload(false)
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
           if(Boolean(location.pathname.slice(0, 16) === "/weed-deliveries")  || Boolean(location.pathname.slice(0, 18) === "/weed-dispensaries")) {

               navigate.push(`${location.pathname.slice(0, 16) === "/weed-deliveries" ? "/weed-deliveries" : "/weed-dispensaries"}/${modifystr(Despen[0]?.Store_Name.toLowerCase())}/${modifystr(item.toLowerCase())}/${id}`)
           }
           else {
            navigate.push(`/menu-integration/${modifystr(Despen[0]?.Store_Name.toLowerCase())}/${modifystr(item.toLowerCase())}/${id}`)
        
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
                if(Boolean(location.pathname.slice(0, 16) === "/weed-deliveries")  || Boolean(location.pathname.slice(0, 18) === "/weed-dispensaries")) {
                    window.history.replaceState(null, '', `${location.pathname.slice(0, 16) === "/weed-deliveries" ? "/weed-deliveries" : "/weed-dispensaries"}/${modifystr(Despen[0]?.Store_Name.toLowerCase())}/${"menu"}/${modifystr(name.toLowerCase())}/${id}`);
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
    const [scroll, SetScroll] = React.useState(true)

    // React.useEffect(() => {
    //     if (scroll) {
    //         document.documentElement.scrollTo({
    //             top: 0,
    //             left: 0,
    //             behavior: "instant",
    //         });
    //         SetScroll(() => false)
    //     }

    // }, [])
    // const Swal = require('sweetalert2')
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

    return (
        <div>{
            !Despen.length ? <Loader /> : 
            <div>
                <p> {(location.pathname.slice(0, 18) === "/weed-dispensaries" || location.pathname.slice(0, 16) === "/weed-deliveries") &&
                    <div style={{ fontSize: '12px' }} > <span style={{ fontSize: '12px', cursor: 'pointer' }} onClick={() => navigationtab(location.pathname.slice(0, 18) === "/weed-dispensaries" ? '/weed-dispensaries' : "/weed-deliveries")}> {location.pathname.slice(0, 18) === "/weed-dispensaries" ? 'weed-dispensaries' : "weed-deliveries"}</span>
                        {" >"} <span style={{ fontSize: '12px', cursor: 'pointer' }} onClick={() => navigationtab(location.pathname.slice(0, 18) === "/weed-dispensaries" ? '/weed-dispensaries' : "/weed-deliveries", params.StoreName, id)}> {params.StoreName}</span>
                        {Boolean(params?.tab) && <span> {" > "}{params?.tab}</span>}
                    </div>
                }</p>
                {Boolean((location.pathname.slice(0, 18) === "/weed-dispensaries" || location.pathname.slice(0, 16) === "/weed-deliveries"))
                    ?
                    <StoreDetails Despen={Despen} locationStore={location.pathname}></StoreDetails>
                    :
                    // <Embedded Despen={Despen} locationStore={location.pathname}></Embedded>
                    ""

                }
                <div className="container-fluid product_container" >
            
                  { !location.pathname.includes('/menu-integration') && <NewFlavourBanner delBtn={Despen}></NewFlavourBanner>}
                    <div className="row">
                        <div className="col-12">
                         {Boolean((location.pathname.slice(0, 18) === "/weed-dispensaries" || location.pathname.slice(0, 16) === "/weed-deliveries")) &&   <StoreDetailMenuItem tab={tab || "Menu"} SelectionTab={SelectionTab}></StoreDetailMenuItem>}
                        </div>
                        {
                            (tab === 'menu' || tab === undefined) &&
                            <React.Fragment>
                             {!productload ?<> {!location.pathname.includes('/menu-integration') ? 
                                 (   Boolean(DespensariesData?.length)?
                                    <>
                                        <CategoryProduct Category={Category} ShowCategoryProduct={ShowCategoryProduct}> </CategoryProduct>
                                        <div className="col-12 productCat_cont" style={{ display: "contents" }}>
                                            <ProductFilter Store_id={Despen[0]?.id}
                                            id={id}
                                                ProductFilterData={ProductFilterData}
                                                Setarr1={SetDespensariesProductData}
                                                arr={DespensariesData}
                                            />
                                            <div className={location.pathname.includes('/menu-integration') ? "col-12 col-lg-9 col-xxl-10 prod_cat_right_sec":"col-12 col-lg-9 col-xxl-10"}>
                                                <ProductList arr={DespensariesData}  link={Boolean(location.pathname.slice(0, 18) === "/weed-dispensaries" || location.pathname.slice(0, 16) === "/weed-deliveries") ?"products" :"menu-integration"}/>
                                            </div>
                                        </div>
                                    </>
                                    :
                                      <div id='oopss'>
                                        <div id='error-text'>
                                            <Image unoptimized={true} src={gifimage.src} alt="no product" width={400} height={400}/>
                                            <span>{`Menu Not Available`}</span>
                                            <p class="p-a">{`This business hasn't posted its menu on Weedx.io yet. Click below to discover other nearby businesses`}</p>
                                            <span onClick={()=>{navigate.push(-1)}} class="back">{`VIEW OTHER BUSINESSES`}</span>
                                        </div>
                                      </div>
                                 ):
                                    (  !productload ? 
                                    ( Boolean(DespensariesData.length)?<div className="col-12 productCat_cont" style={{ display: "contents" }}>
                                        <ProductFilter Store_id={Despen[0]?.id}
                                            ProductFilterData={ProductFilterData}
                                            Setarr1={SetDespensariesProductData}
                                            arr={DespensariesData}
                                            id={id}
                                        />
                                        <div className={location.pathname.includes('/menu-integration') ? "col-12 col-lg-9 col-xxl-10 prod_cat_right_sec":"col-12 col-lg-9 col-xxl-10"}>
                                            <ProductList arr={DespensariesData}  link={Boolean(location.pathname.slice(0, 18) === "/weed-dispensaries" || location.pathname.slice(0, 16) === "/weed-deliveries") ?"products" :"menu-integration"}/>
                                        </div>
                                    </div>
                                    :
                                    <div id='oopss'>
                                        <div id='error-text'>
                                            <Image unoptimized={true} width={100} height={100} src={gifimage.src} alt="no product"/>
                                            <span>{`Menu Not Available`}</span>
                                            <p class="p-a">{`This business hasn't posted its menu on Weedx.io yet. Click below to discover other nearby businesses `}</p>
                                            <span class="back">{`VIEW OTHER BUSINESSES`}</span>
                                        </div>
                                    </div>)
                                    :
                                    <DispensoriesAddressSkeleton/>
                                    )
                                }
                                </>:
                                <DispensoriesAddressSkeleton/>}
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
                                    <div className="iconcircl"><Image  unoptimized={true} width={100} height={100} src={'/image/nodeal.png'} className="nodealsicon" alt="no Deals" title="no Deals" /></div>
                                </div>
                                <h3 className="noreview_title">{`Discover More Savings Soon!`}</h3>
                                <p className="noreview_description w-lg-50 ">{`It looks like there are no active deals at the moment at `}<Link target="_blank" href={`/weed-dispensaries/${Despen[0]?.Store_Name.toLowerCase().replaceAll(" ", "-")}/${Despen[0]?.id}`}><b>{Despen[0]?.Store_Name}</b></Link>{`. Don't worry, though – our partnered stores frequently update their promotions. Be sure to check back regularly for exciting discounts and special offers on your favorite products.`}</p>
                                <p className="noreview_description w-lg-50">{`In the meantime, explore the diverse range of products available at `}<Link target="_blank" href={`/weed-dispensaries/${Despen[0]?.Store_Name.toLowerCase().replaceAll(" ", "-")}/${Despen[0]?.id}`}><b>{Despen[0]?.Store_Name}</b></Link>{`. We're constantly working to bring you the best deals, so stay tuned for upcoming promotions.`}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        }
        </div>
    )
}



export async function getServerSideProps(context) {
 
     const index = _.findIndex(context.params.details, item => !isNaN(parseInt(item)));

    return {
      props: {
        params: {
          id: context.params.details[index] ,
          tab: !isNaN(parseInt(context.params.details[1])) ? "menu" : context.params.details[1] // Handle case where id might be undefined
        }
      }
    };
  }