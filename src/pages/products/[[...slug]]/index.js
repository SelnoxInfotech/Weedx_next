import React, { useState } from "react"
import CategoryProduct from "../../../component/category/category"
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import ClickAwayListener from '@mui/material/ClickAwayListener';
// import { useLocation, usenavigate.push, useParams } from "react-router-dom"
import { useRouter } from "next/router";
import useStyles from "../../../styles/style"
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import { ProductSeo, ProductCategorySeo } from "../../../component/ScoPage/ProductSeo"
import SkeletonCard from '../../../component/skeleton/DashBoardSkeleton/DispensoriesAddressSkeleton';
import ProductSearchResult from "../../../component/productcard/ProductSearchResult"
import Createcontext from "../../../hooks/context"
import _ from "lodash"
import { GetProduct, CategoryProductsearch, SubcategoryProduct , SubCategoryApibyname } from "../../../hooks/apicall/api"
import { modifystr } from "../../../hooks/utilis/commonfunction";
import Currentlocation from "@/component/currentlocation/CurrentLocation";
const Product = () => {
    const navigate= useRouter();
    const { slug } = navigate.query;
    const params = slug ? (slug[_.findIndex(slug, item => !isNaN(parseInt(item)))] || 0) : 0;
    const classes = useStyles()
    const location = useRouter()
    const { state } = React.useContext(Createcontext)
    const [loading, SetLoading] = React.useState(true)
    const [subcategories, setsubcategories] = useState([])
    const [Product, SetProduct] = React.useState([])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    async function ShowCategoryProduct(id, name) {
        await navigate.push(`/products/${modifystr(name.toLowerCase())}/${id}`);
        await setSelectedOption(null)
        setsubcategories([])
    }
    const selectOption = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
        navigate.push(`/products/${modifystr(slug[0].toLowerCase())}/${modifystr(option.name.toLowerCase())}/${option.id}`)

    };
    const [Category, SetCategory] = React.useState([])
    const [C, f] = React.useState('')
    React.useEffect(() => {
        const fetchData = async () => {
            const apidata = await fetch("https://api.cannabaze.com/UserPanel/Get-Categories/");
            const data = await apidata.json()
            SetCategory(data)
        }
        fetchData()
    }, [])
    React.useEffect(() => {
        if (slug?.length === 3) {
            SetLoading(true)
            const object = {
                City: state.City.replace(/-/g, " "),
                Country: state.Country.replace(/-/g, " "),
                State: state.State.replace(/-/g, " ")
            }
            SubcategoryProduct(object, params).then((response) => {

                SetLoading(false)
                if (response !== "No Product Found") {
                    f(response[0]?.category_name)
                    SetProduct(response)
                }
            })
            SubCategoryApibyname(slug[0].toUpperCase()).then((response) => {
                setsubcategories(response.data)
            }).catch((error) => {
                setsubcategories([])
                console.trace(error)
            })
           
        }
        else {
            if (slug?.length === 2) {
                const object = {
                    City: state.City.replace(/-/g, " "),
                    Country: state.Country.replace(/-/g, " "),
                    State: state.State.replace(/-/g, " ")
                }
                SetLoading(true)
                CategoryProductsearch(object, params).then((response) => {
                    if (response !== "No Product Found") {
                        SetLoading(false)
                        f(response[0]?.category_name)
                        SetProduct(response)
                        SubCategoryApibyname(slug[0].toUpperCase()).then((response) => {
                            setsubcategories(response.data)
                        }).catch((error) => {
                            setsubcategories([])
                            console.trace(error)
                        })
                    }
                    else {
                        SetLoading(false)
                        SetProduct(response?.data?.data)
                    }
                })
            }
            else {
                // Get All Product
                const object = {
                    City: state.City.replace(/-/g, " "),
                    Country: state.Country.replace(/-/g, " "),
                    State: state.State.replace(/-/g, " ")
                }
                SetLoading(true)
                GetProduct(object).then((response) => {
                    if (response.data !== "No Product Found") {
                        SetProduct(response.data)
                        if (response.data.length !== 0) {
                            SetLoading(false)
                            f("All Product")
                        }
                        else {
                            SetLoading(false)
                            
                            SetProduct(response.data)
                        }
                    }
                })
            }
        }
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
          }); 
    }, [state.Location, params])
    function breadcrumCountry(params ,  name) {
        if (params === "Product") {
            navigate.push(`/products`)
        }
        else if (params === "categoryname") {
         const categoryfind = _.find(Category, function(o) { return o.name ===  name.toUpperCase()})
            navigate.push(`/products/${categoryfind.name.toLowerCase()}/${categoryfind.id}` )
        }
    }
    return (
        <React.Fragment>
                  {state.permission === false && <Currentlocation></Currentlocation>}
            <div style={{cursor:"pointer"}}>
                <span onClick={() => navigate.push("/")}>{"Home"}</span>
                {<span> {">"} <span onClick={() => breadcrumCountry("Product")}>Product</span></span>}
                {Boolean(params.categoryname) && <span> {">"} <span onClick={() => breadcrumCountry("categoryname" , params.categoryname)}>{params.categoryname}</span></span>}
                {Boolean(params.subCategory) && <span> {">"} <span >{params.subCategory}</span></span>}
            </div>
            {!params.id ? <ProductSeo location={location?.pathname}></ProductSeo> :
            <ProductCategorySeo categoryname={slug[0]} location={location?.pathname} ></ProductCategorySeo>}
       
                <div className="row">
                    <div className="col-12 mt-4">
                        <CategoryProduct Category={Category} ShowCategoryProduct={ShowCategoryProduct}></CategoryProduct>
                    </div>
                    {
                       slug?.length <= 2 &&
                        <div className="col-12 mt-sm-4 mt-2">
                            <div className="d-flex justify-content-end align-items-center">
                                <ClickAwayListener onClickAway={() => {
                                    setIsDropdownOpen(false)
                                }}>
                                    <div className="mydropdown ">
                                        <div className="dropdown-toggle" onClick={() => {
                                            setIsDropdownOpen(!isDropdownOpen)
                                        }}>
                                            {selectedOption && (
                                                <img  src={`${selectedOption.SubCategoryImage}`} alt={selectedOption.name} title={selectedOption.name} className="dropdown-option-image" />
                                            )}
                                            <span className="dropdown-option-label">
                                                {selectedOption ? selectedOption.name : 'Sort by Subcategory '}
                                            </span>
                                            <span className="dropdown-caret"></span>
                                        </div>
                                        <ul className={`dropdown-menu image_dropdown ${isDropdownOpen ? 'open' : ''}`}>
                                            {subcategories?.map((option, index) => (
                                                <li key={index} onClick={() => selectOption(option)}>
                                                    <img  src={`${option.SubCategoryImage}`} alt={option.name} title={option.name} className="dropdown-option-image" />
                                                    <span className="dropdown-option-label">{option.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </ClickAwayListener>
                            </div>
                        </div>
                    }
                    <div className="col-12 center">
                        {
                            loading ?
                               
                                <div className="col-12">
                                    <SkeletonCard />
                                </div>
                                :
                                Product?.length !== 0 && Product !== undefined  ?

                                    <div className="col-12 mt-sm-4 mt-0">
                                        <ProductSearchResult RelatedProductResult={Product} CategoryName={C} />
                                    </div> :
                                    <div className="container-fluid Product_Empty_container">
                                        <div className="row">
                                            <div className="col-12 EmtyCard_container">
                                                <div className="row">
                                                    <div className="col-12 image_container">
                                                        <div className="Empty_card_image">
                                                            <Box className={classes.muiIcons}>
                                                              <MdOutlineProductionQuantityLimits size={45} />
                                                            </Box>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 center height_empty_div_heading">
                                                        <h2>{`No Product Found`}</h2>
                                                    </div>
                                                    <div className="col-md-6 col-12 center height_empty_div_paragraph mx-auto text-center my-3 ">
                                                        <p>{`Apologies, this page is currently empty, but stay tuned as we're working to bring you exciting products soon!`}</p>
                                                    </div>
                                                    <div className="col-12 center height_Empty_btnDiv mt-2">
                                                        <Box  className={`${classes.loadingBtnTextAndBack}`}  >
                                                            <LoadingButton  style={{width:"100%",height:"100%"}} variant="outlined" loading={false} type={'submit'}>{`Shop now`}</LoadingButton>
                                                        </Box>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> }
                    </div>
                </div>
   
        </React.Fragment>
    )
}
export default Product


