import React, { useState, useRef } from "react"
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import dynamic from 'next/dynamic'
// import { useLocation, usenavigate.push, useParams } from "react-router-dom"
import { useRouter } from "next/router";
import useStyles from "../../../../src/styles/style"
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import { ProductSeo, ProductCategorySeo } from "@/component/ScoPage/ProductSeo"
import SkeletonCard from '@/component/skeleton/DashBoardSkeleton/DispensoriesAddressSkeleton';
// import ProductSearchResult from "@/component/productcard/ProductSearchResult"
import Createcontext from "@/hooks/context"
import _, { kebabCase } from "lodash"
import {SubCategoryApibyname } from "@/hooks/apicall/api"
import { modifystr } from "@/hooks/utilis/commonfunction";
import Currentlocation from "@/component/currentlocation/CurrentLocation";
const CategoryProduct = dynamic(() => import('@/component/category/category'), { ssr: true });
const ProductSearchResult = dynamic(() => import('@/component/productcard/ProductSearchResult'), { ssr: true });
import Image from "next/image";
import cookies from 'next-cookies';
import { setCookie } from 'nookies';

const Product = (props) => {
    const navigate = useRouter();
    const { slug } = navigate.query;
    const Category = props.category
    const params = slug ? (slug[_.findIndex(slug, item => !isNaN(parseInt(item)))] || 0) : 0;
    const classes = useStyles()
    const { state, dispatch } = React.useContext(Createcontext)
    const [loading, SetLoading] = React.useState(props.length)
    const [subcategories, setsubcategories] = useState([])
    const [Product, SetProduct] = React.useState(props.product)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    async function ShowCategoryProduct(id, name) {
        SetLoading(true);
        navigate.replace(`/products/${modifystr(name)}/${id}`);
        setSelectedOption(null)
        setsubcategories([])
        // SetLoading(false);
    }
    const selectOption = (option) => {
        SetLoading(true);
        setSelectedOption(option);
        setIsDropdownOpen(false);
        navigate.replace(`/products/${modifystr(slug[0])}/${modifystr(option.name)}/${option.id}`)

    };

    React.useEffect(() => {
        SetLoading(() => {
            return props.loading
        });
        dispatch({ type: 'Location', Location: props?.location.formatted_address })
        dispatch({ type: 'permission', permission: true });
        dispatch({ type: 'Country', Country: props?.location?.country });
        dispatch({ type: 'State', State: props?.location?.state });
        dispatch({ type: 'City', City: props?.location?.city })
        dispatch({ type: 'route', route: props?.location?.route });
    }, [props]);
    React.useEffect(() => {
        if (slug?.length === 3) {
            SubCategoryApibyname(slug[0].toUpperCase()).then((response) => {
                setsubcategories(response.data)
            }).catch((error) => {
                setsubcategories([])
                console.trace(error)
            })
        }
        else {
            if (slug?.length === 2) {
                SubCategoryApibyname(slug[0].toUpperCase()).then((response) => {
                    setsubcategories(response.data)
                }).catch((error) => {
                    setsubcategories([])
                    console.trace(error)
                })
            }
            else {
            }
        }
    }, [state.Location, params])
    function breadcrumCountry(params, name) {
        if (params === "Product") {
            navigate.push(`/products`)
        }
        else if (params === "categoryname") {
            const categoryfind = _.find(Category, function (o) { return o.name === name.toUpperCase() })
            navigate.push(`/products/${categoryfind.name}/${categoryfind.id}`)
        }
    }

    async function moreProduct() {
        const object = {
            City: "",
            Country: 'United-States',
            State: 'New-York',
            limit: Product.length + 10
        };
        const response = await fetch('https://api.cannabaze.com/UserPanel/Get-AllProduct/', {
            method: 'POST', // Assuming you are making a POST request. Change if needed.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        });
        const data = await response.json();
        if (data !== "No Product Found" && data.length !== 0) {
            SetProduct(data);
        }
    }
    // categorya

    return (
        <React.Fragment>
            <div style={{ cursor: "pointer" }}>
                <span onClick={() => navigate.push("/")}>{"Home"}</span>
                {<span> {">"} <span onClick={() => breadcrumCountry("Product")}>Product</span></span>}
                {(navigate?.query?.slug !== undefined) && <span> {">"} <span onClick={() => breadcrumCountry("categoryname", navigate?.query?.slug[0])}>{navigate?.query?.slug[0]}</span></span>}
                {(navigate?.query?.slug !== undefined && navigate?.query?.slug?.length === 3) && <span> {">"} <span >{navigate?.query?.slug[1]}</span></span>}
            </div>
            {!Boolean(props.id) ? <ProductSeo location={navigate?.asPath}></ProductSeo> :
                <ProductCategorySeo categoryname={slug[0]} location={navigate?.asPath} ></ProductCategorySeo>}
            <div className="row">
                <div className="col-12 mt-4">
                    <CategoryProduct Category={Category} ShowCategoryProduct={ShowCategoryProduct} ></CategoryProduct>
                </div>
                {
                    slug?.length <= 3 &&
                    <div className="col-12 mt-sm-4 mt-2">
                        <div className="d-flex justify-content-end align-items-center">
                            <ClickAwayListener onClickAway={() => {
                                setIsDropdownOpen(false)
                            }}>
                                <div className="mydropdown">
                                    <div className="dropdown-toggle" onClick={() => {
                                        setIsDropdownOpen(!isDropdownOpen)
                                    }}>
                                        {selectedOption && (
                                            <Image width={100} height={100} unoptimized={true} src={`${selectedOption.SubCategoryImage}`} alt={selectedOption.name} title={selectedOption.name} className="dropdown-option-image" />
                                        )}
                                        <span className="dropdown-option-label">
                                            {selectedOption ? selectedOption.name : 'Sort by Subcategory '}
                                        </span>
                                        <span className="dropdown-caret"></span>
                                    </div>
                                    <ul className={`dropdown-menu image_dropdown ${isDropdownOpen ? 'open' : ''}`}>
                                        {subcategories?.map((option, index) => (
                                            <li key={index} onClick={() => selectOption(option)}>
                                                <Image width={100} height={100} unoptimized={true} src={`${option.SubCategoryImage}`} alt={option.name} title={option.name} className="dropdown-option-image" />
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
                            props.product?.length !== 0 && props.product !== undefined ?

                                <div className="col-12 mt-sm-4 mt-0">
                                    <ProductSearchResult RelatedProductResult={props.product} title={navigate.query?.slug ? slug[0] : "All Product"} />
                                    {/* <button onClick={moreProduct}>more Product</button> */}
                                </div>
                                :
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
                                                    <Box className={`${classes.loadingBtnTextAndBack}`}  >
                                                        <LoadingButton style={{ width: "100%", height: "100%" }} variant="outlined" loading={false} type={'submit'}>{`Shop now`}</LoadingButton>
                                                    </Box>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                </div>
            </div>
        </React.Fragment>)
}
export default Product
export const getServerSideProps = async (context) => {

    const { req, res } = context;
    let allCookies
    if (req.headers["x-fetchlocation"]) {
        try {
            const jsonObject = JSON.parse(req.headers["x-fetchlocation"]);
            allCookies = jsonObject
        } catch (error) {
            console.error('Error decoding or parsing cookie:', error);
        }
    } else {
        console.log('fetchlocation cookie not found');
    }


    const locationData = allCookies;

    const transformString = (str) => {
        if (!str) {
            return '';
        }
        return str
            .replace(/-/g, " ")
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=60, stale-while-revalidate=59'
    );

    const object = {
        City: transformString(locationData.city),
        Country: transformString(locationData.country),
        State: transformString(locationData.state),
        limit: 20
    };

    let product = [];
    try {
        const apidata = await fetch("https://api.cannabaze.com/UserPanel/Get-Categories/");
        const category = await apidata.json()
        switch (true) {
            case context.params.slug?.length === 2:
                try {
                    const response = await fetch(`https://api.cannabaze.com/UserPanel/Get-ProductByCategory/${context.query.slug[1]}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(object)
                    });

                    const data = await response.json();
                    product = data === "There is no Product" ? [] : data;
                } catch (error) {
                    console.error('Error:', error);
                }
                break;
            case context.params.slug?.length === 3:
                try {
                    const response = await fetch(`https://api.cannabaze.com/UserPanel/Get-ProductBySubCategory/${context.query.slug[2]}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(object)
                    });

                    const data = await response.json();
                    product = data === "There is no Product" ? [] : data;
                } catch (error) {
                    console.error('Error:', error);
                }
                break;
            default:
                const response = await fetch('https://api.cannabaze.com/UserPanel/Get-AllProduct/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(object)
                });

                const data = await response.json();
                if (data !== "No Product Found" && data.length !== 0) {
                    product = data;
                }
                break;
        }
        return {
            props: {
                product: product,
                loading: false,
                location: locationData,
                category: category,
                id: context.params.slug?.length > 1 ? context?.query?.slug[1] : ''
            },
        };

    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            notFound: false,
        };
    }
};