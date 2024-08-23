import React, { useEffect } from "react"
import NewProductDetailsCards from "../../../../../../component/productcard/NewProductDetailsCards"
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import ProductSearchResult from "../../../../../../component/productcard/ProductSearchResult"
import Axios from "axios";
import dynamic from 'next/dynamic'
// import { useParams, usenavigate.push, useLocation } from 'react-router-dom';
import { useRouter } from "next/router";
import Review from "../../../../../../component/Review/Review"
import { AiOutlineLeft } from "react-icons/ai";
const ProductDetailsSeo = dynamic(() => import('../../../../../../component/ScoPage/ProductDetailsSeo'));
import { product_OverAllGet_Review, Product_Add_Review, Product_Get_UserComment, Product_Get_Review, Delete_Review, ProductHelpFull } from "../../../../../../hooks/utilis/ProductApi"
import Createcontext from "../../../../../../hooks/context"
import _ from 'lodash'
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../../../../../../component/Loader/Loader";
import { modifystr } from "../../../../../../hooks/utilis/commonfunction";
const usePlaceholderStyles = makeStyles(theme => ({
  placeholder: {
    color: "#aaa",
    fontWeight: '400'
  }
}));
const NewProductDetails = (props) => {

  //  const {ProductDetailsSeo} =  Seo
  // console.log(props.data[0]?.Store_id , "potpduct")  
  const { id } = props.id;
  const StoreProduct =  props.likeproduct
  const [discount, setdiscount] = React.useState({
    Product: id,
    Amount: '',
    Reflect: false,
    Percentage: '',
    CouponMassage: "",
    DiscountType: ""
  });

  const { state } = React.useContext(Createcontext)
  const navigate = useRouter();
  const [Product, SetProduct] = React.useState(props.data[0])
  const [reviewloading, setReviewloading] = React.useState(false)
  // const [StoreProduct, SetStoreProduct] = React.useState([])
  const [Despen, SetDespens] = React.useState([])
  const [api, SetApi] = React.useState(false)
  const [Rating, SetRating] = React.useState()
  const [AllReview, SetReview] = React.useState([])
  const [Price, SetPrice] = React.useState([])
  const [j, h] = React.useState([])
  const [quentity, setquentity] = React.useState(1);
  const [dynamicWeight, setdynamicWeight] = React.useState(0);
  const [GetProductReview, SetGetProductReview] = React.useState({
    value: 0,
    comment: '',
    Title: "",
    media: [],
    popup: false
  })

  React.useEffect(() => {
    // Axios(`https://api.cannabaze.com/UserPanel/Get-ProductById/${id}`, {
    // }).then(response => {
    //   if (response.data.length === 0) {
    //     navigate.push('/404')
    //   }
    //   else {
    // const validation =  `/products/${modifystr(response.data[0].category_name)}/${modifystr(response.data[0].SubcategoryName)}/${modifystr(response.data[0].Product_Name)}/${response.data[0].id}` || `/menu-integration/${modifystr(response.data[0].category_name)}/${modifystr(response.data[0].SubcategoryName)}/${modifystr(response.data[0].Product_Name)}/${response.data[0].id}`
    // if((location.pathname !==  validation)){
    //   if(location.pathname === `/menu-integration/${modifystr(response.data[0].category_name)}/${modifystr(response.data[0].SubcategoryName)}/${modifystr(response.data[0].Product_Name)}/${response.data[0].id}`){
    //     navigate.push(`/menu-integration/${modifystr(response.data[0].category_name)}/${modifystr(response.data[0].SubcategoryName)}/${modifystr(response.data[0].Product_Name)}/${response.data[0].id}`)
    //   }
    //   else{

    //     navigate.push(`/products/${modifystr(response.data[0].category_name)}/${modifystr(response.data[0].SubcategoryName)}/${modifystr(response.data[0].Product_Name)}/${response.data[0].id}`)
    //   }
    //   }
    // SetProduct(() => {
    //   return response.data[0]
    // })

    // h(response.data[0].Prices[0].Price?.filter((data) => {
    //   if (data.id === parseInt(Price[0]?.Item_id)) {
    //     return data
    //   }
    //   else {
    //     if (data.id === 1) {
    //       return data
    //     }
    //   }
    // })
    // )
    Axios.get(`https://api.cannabaze.com/UserPanel/Get-StoreById/${props.data[0]?.Store_id}`, {
    }).then(response => {
      SetDespens(response.data[0])

    })
    // Axios.post(`https://api.cannabaze.com/UserPanel/YouMayAlsoLike/`,
    //   {
    //     category: props.data[0].category_id,
    //     store_id: props.data[0].Store_id
    //   }
    // ).then(response => {
    //   SetStoreProduct(response.data)
    // }).catch(
    //   function (error) {
    //   })

    // }

    // .catch(
    //   function (error) {
    //     navigate.push('/404')
    //   })


  }, [id])


  React.useEffect(() => {
    product_OverAllGet_Review(props.data[0].id).then((res) => {

      SetRating(res?.data)
    }).catch(() => { })
  }, [props.data[0].id, api])

  React.useEffect(() => {

    if (state.login && state.Profile.id !== undefined && props.data[0].id !== undefined) {
      Product_Get_UserComment(state.Profile.id, props.data[0].id).then((res) => {

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
  }, [api, state.Profile, Product])
  const onSubmit = (data) => {
    const formdata = new FormData();
    let a = GetProductReview?.media?.forEach((item) => {
      if (item?.type.includes('image')) {
        formdata.append('multipleimages', item)
      }
    })
    let b = GetProductReview?.media?.forEach((item) => {
      if (item?.type.includes('video')) {
        formdata.append('multiplevideos', item)
      }
    })
    formdata.append('product', Product.id)
    formdata.append('rating', GetProductReview.value)
    formdata.append('Title', GetProductReview.Title)
    formdata.append('comment', GetProductReview.comment)


    setReviewloading(true)
    Product_Add_Review(formdata).then((res) => {
      SetGetProductReview({ ...GetProductReview, 'popup': false })
      SetApi(!api)
      setReviewloading(false)
    }).catch(() => {
      setReviewloading(false)

    })
  };

  React.useEffect(() => {
    Product_Get_Review(Product.id).then((res) => {
      SetReview(() => {
        return res.data
      })
      var Obj = _.find(res.data, { user: state.Profile.id });
      SetGetProductReview({ ...GetProductReview, 'popup': false, 'value': Obj.rating, 'Title': Obj.Title, 'comment': Obj.comment })
    }).catch((e) => {
      console.error(e)
    })
  }, [props.data[0], api])

  function handleDelete(id) {
    Delete_Review(id).then((res) => {
      res.data.status === 'success' && SetApi(!api)
    })
  }
  function handleEdit() {
    SetGetProductReview({ ...GetProductReview, 'popup': true })
  }
  function HellFull(ReviewId, UserId) {

    ProductHelpFull(ReviewId.id, state.Profile.id).then((res) => {
      SetApi(!api)
    }).catch(() => {
    })
  }


  // React.useEffect(() => {
  //   h(Price.length !== 0 && Product.Prices[0].Price.filter((data) => data.id === parseInt(Price[0].Item_id)))
  // }, [Price])

  function discountype(type, amount) {
    switch (type) {
      case "PercentageDiscount":
        return `Get ${amount}%  OFF`
        break;

      default:
      // code block
    }
  }
  const [copyed, setcopyed] = React.useState('');

  useEffect(() => {
    if (copyed !== '') {
      setTimeout(() => setcopyed(''), 2000)
    }
  }, [copyed])

  const location = useRouter()
  if (!StoreProduct.length) {
    return location?.pathname?.includes('/menu-integration') ? '' : <Loader />
  }

  //  React.useEffect(()=>{
  //   console.log(location.pathname === `products/${modifystr(Product.category_name)}/${modifystr(Product.SubcategoryName)}/${modifystr(Product.Product_Name)}/${Product.id}`)
  //   if (location.pathname === `products/${modifystr(Product.category_name)}/${modifystr(Product.SubcategoryName)}/${modifystr(Product.Product_Name)}/${Product.id}`) {
  //     console.log("true")
  //    }
  //  },[Product])
  // console.log(`${modifystr(Product.category_name)}/${modifystr(Product.SubcategoryName)}/${modifystr(Product.Product_Name)}` )


  return (
    <div className="container-fluid">

      <ProductDetailsSeo
        robot={location.pathname.slice(0, 9) === "/products" ? "INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1" : "NOINDEX,INDEXIFEMBEDDED"}
        rating={props.data[0]?.rating || 0}
        image={props.data[0]?.images[0]?.image || "/image/weedx.io%20logo.png"}
        category={props.data[0].category_name}
        Subcategorge={props.data[0].SubcategoryName}
        id={props.data[0].id}
        price={props.data[0]?.Prices[0]?.Price[0]?.SalePrice}
        sellername={props.data[0].StoreName}
        Description={props.data[0].Product_Description}
        Productnm={props.data[0].Product_Name}
        Productname={`Buy ${props.data[0].Product_Name} at ${props.data[0].StoreName} on WeedX.io - Your Trusted Marketplace`}
        ProductCategory={props.data[0].category_name}
        StoreName={props.data[0].StoreName}
        City={props.data[0].Store_City}
        State={props.data[0].Store_State}
        location={location.asPath}
        TotalRating={props.data[0].TotalRating}
      ></ProductDetailsSeo>
      <span
        onClick={() => {
          const isOnProductsPage = location.pathname.slice(0, 9) === "/products";
          const prevUrl = location?.state?.prevuisurl;

          if (isOnProductsPage) {
            if (prevUrl && prevUrl !== '/products') {
              navigate.push(prevUrl);
            } else {
              navigate.push('/products');
            }
          } else {
            navigate.push(-1); // Go back to the previous page
          }
        }}
        className="BackPageBtn"
      >
        <AiOutlineLeft size={22} /> Back to products
      </span>
      <NewProductDetailsCards link={location.pathname.slice(0, 9) === "/products" ? props.data[0].Store_Type === "dispensary" ? "weed-dispensaries" : "weed-deliveries" : "menu-integration"} dynamicWeight={dynamicWeight} setdynamicWeight={setdynamicWeight} quentity={quentity} setquentity={setquentity} Product={props.data[0]} DiscountedValue={discount} Price={Price} SetPrice={SetPrice} />
      {Boolean(props.data[0]?.copuon?.length) && <div className="offerlist">
        <h2 className="section_main_title">Offers</h2>
        <div className="offerlistwrapper">
          {
            props.data[0].copuon?.map((item, index) => {
              return <div className="offercard" key={index}>
                <div className="leftcoupon">
                  <span>Use Code</span>
                  <span onClick={() => { navigator.clipboard.writeText(item.CouponCode); setcopyed(item.CouponCode) }}>{item.CouponCode} {copyed === item.CouponCode && <span className="copytooltip"> copied</span>}  </span>
                  <span>T&C</span>
                </div>
                <div className="rightcoupon">
                  <span>{discountype(item.DiscountType, item.PercentageAmount)}</span>
                  <span>Shopping Above {item.MinimumOrderValue}/-</span>
                  <Link href="/"><span>View All Product</span></Link>
                </div>
              </div>
            })
          }
        </div>
      </div>}
      {Boolean(StoreProduct?.length !== 0) &&
        <ProductSearchResult link={location.pathname.slice(0, 9) === "/products" ? "products" : "menu-integration"} RelatedProductResult={props.likeproduct} currentProductID={props.data[0].id} title={'You may also like'} CategoryName={props.data[0]} />
      }

      <Review
        delBtn={Despen}
        reviewloading={reviewloading}
        reviewtype={'Product'}
        HellFull={HellFull}
        storeID={null}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        Rating={Rating}
        onSubmit={onSubmit}
        GetProductReview={GetProductReview}
        SetGetProductReview={SetGetProductReview}
        AllReview={AllReview}
        SetReview={SetReview}
        type={"product"}
      ></Review>



    </div>
  )
}
export default NewProductDetails


// export async function getServerSideProps(context) {
//   const { id } = context.params;

//   // Replace `id` with actual dynamic value in your API call
//   const res = await fetch(`https://api.cannabaze.com/UserPanel/Get-ProductById/${id}`);
//   const data = await res.json();
//   const response = await fetch('https://api.cannabaze.com/UserPanel/YouMayAlsoLike/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       category: data[0].category_id,
//       store_id: data[0].Store_id,
//     }),
//   });

//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }

//   const responseData = await response.json();


//   return {
//     props: {
//       data,
//       id: id ,// Pass the fetched data to your component as a prop
//       likeproduct: responseData
//     }
//   };
// }


export async function getServerSideProps(context) {
  const { category, subcategory, name, id } = context.params;

  // Fetch the product data by id
  const res = await fetch(`https://api.cannabaze.com/UserPanel/Get-ProductById/${id}`);
  const data = await res.json();

  if (!data || data.length === 0) {
    return {
      notFound: true,
    };
  }

  const actualCategory = modifystr(data[0].category_name); 
  const actualSubcategory = modifystr(data[0].SubcategoryName); 
  const actualName = modifystr(data[0].Product_Name); 
  if (actualCategory !== category || actualSubcategory !== subcategory || actualName !== name || id === data[0].id ) {
 
    return {
        notFound: true, // Redirect to 404 if no data found
    };
  }

  const response = await fetch('https://api.cannabaze.com/UserPanel/YouMayAlsoLike/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      category: data[0].category_id,
      store_id: data[0].Store_id,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const responseData = await response.json();

  return {
    props: {
      data,
      id, 
      likeproduct: responseData,
    },
  };
}
