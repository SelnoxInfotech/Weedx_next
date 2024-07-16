import React, { useState } from 'react'
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { BsStar, BsStarFill } from "react-icons/bs";
import { IconButton } from "@mui/material";
// import { useLocation, userouter.push } from "react-router-dom";
import { useRouter } from 'next/router';
import axios from 'axios'
import Button from '@mui/material/Button';
import Image from 'next/image';
import Cookies from 'universal-cookie';
import { AiOutlineLike } from "react-icons/ai";
import { AiTwotoneLike } from "react-icons/ai";
import Badge from '@mui/material/Badge';
import Createcontext from "@/hooks/context"
import useStyles from "@/styles/style";
import { StoreHelpFull } from '@/hooks/apicall/api';
import { ProductHelpFull } from '@/hooks/utilis/ProductApi'
import { Menuintegration_login } from '@/component/Menuintregation/Menuintregation';
const Myreview = ({ data1, data2 }) => {
    const classes = useStyles()
    const [allproductreiew, setallproductreviews] = useState([])
    const [allstorereiew, setallstorereviews] = useState([])
    const cookies = new Cookies();
    const [open, setOpen] = React.useState(false)
    const { state, dispatch } = React.useContext(Createcontext);
    function HellFull(ReviewId) {
        if (state.login) {
            ProductHelpFull(ReviewId.id, state.Profile.id).then((res) => {
                axios.get('https://api.cannabaze.com/UserPanel/Get-ProductReviewbyUser/',
                    {
                        headers: { Authorization: `Bearer ${token_data}` }
                    }).then((res) => {
                        setallproductreviews(res.data)
                    })
            }).catch((error) => {
                console.trace(error)
            })
        }
    }
    let router = useRouter()
    let token_data = cookies.get('User_Token_access')
    let accessToken
    if (typeof window !== 'undefined') {
        accessToken = localStorage.getItem('User_Token_access');
    }
    if (Boolean(accessToken)) { token_data = accessToken }
    // React.useEffect(()=>{
    //     if(state.login){
    //     axios.get('https://api.cannabaze.com/UserPanel/Get-ProductReviewbyUser/',
    //     {
    //         headers: { Authorization: `Bearer ${token_data}` }
    //     }).then((res)=>{
    //         setallproductreviews(res.data)
    //     })
    //     axios.get(`https://api.cannabaze.com/UserPanel/Get-StoreReviewbyUser/`, {
    //         headers: { Authorization: `Bearer ${token_data}` }
    //     }).then((response)=>{
    //         setallstorereviews(response.data)
    //     })
    //     }
    // },[])

    const [readopen, setreadopen] = useState(true);
    function textgive(text) {
        let arrofstr = text?.split(' ');
        let finalstr = ""
        if (arrofstr?.length >= 100 && readopen) {

            for (let i = 0; i < 100; i++) {
                finalstr += `${arrofstr[i]} `
            }
        } else {
            finalstr = text
        }
        return finalstr
    }


    function calculateTImefromDate(value) {
        //  new Date() = 'Mon Nov 20 2023 13:00:15 GMT+0530 (India Standard Time)'
        let diffTime = Math.abs(new Date().valueOf() - new Date(value).valueOf());
        let months = Math.trunc(diffTime / (24 * 60 * 60 * 1000) / 30);
        let days = diffTime / (24 * 60 * 60 * 1000);
        let hours = (days % 1) * 24;
        let minutes = (hours % 1) * 60;
        let secs = (minutes % 1) * 60;
        [days, hours, minutes, secs] = [Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)]

        if (months !== 0) {
            return months + " Month ago"
        } else if (days !== 0) {
            return days + " days ago"
        }
        else if (hours !== 0) {
            return hours + " hours ago"
        }
        else if (minutes !== 0) {
            return minutes + " minutes ago"
        }
        else {
            return secs + " secs ago"
        }
    }
    function helpfullStoe(ReviewId) {
        if (state.login) {
            StoreHelpFull(ReviewId.id, state.Profile.id).then((res) => {
                axios.get(`https://api.cannabaze.com/UserPanel/Get-StoreReviewbyUser/`, {
                    headers: { Authorization: `Bearer ${token_data}` }
                }).then((response) => {
                    setallstorereviews(response.data)

                })
            }).catch(() => {
            })
        }
    }
    return (
        <div className='container'>
            <div className='myreviewContainer'>
                <div className='w-100 d-flex gap-2 align-items-center my-4'>
                    <span><IconButton onClick={() => router.push('-1')}><MdOutlineKeyboardArrowLeft color="#000000" /></IconButton></span><span onClick={() => router.push(-1)} className="BackPageBtn">Back</span>
                </div>
                <div className="col-12 mt-sm-4 mt-2  fontStyle"><h1 className="section_main_title ">My Reviews</h1></div>
                <div className='reviews'>

                    {

                        data1?.map((item,index) => {
                            return <div key={index} className='myreviewBox'>
                                <div className='reviewHeaders mb-sm-4 mb-3 d-flex gap-3'>
                                    <div className='productReviewImg'>
                                        <div className='productreview_imgcircle'>

                                            <Image width={400} height={400}
                                                src={item?.Product.images[0]?.image}
                                                alt='Profile'
                                                title='Profile'
                                                className="Navbar_profile_imgs"
                                            />
                                        </div>
                                    </div>
                                    <div className='productReviewText'>
                                        <h2 className='producRRRtitle'>{item.review.ProductName}</h2>
                                        <h4>{calculateTImefromDate(item.review.created_at)}</h4>
                                    </div>
                                </div>
                                <div className="product_cart_review">
                                    {Boolean(item.rating) && new Array(item?.review?.rating).fill(null).map((data, index) => (
                                        <BsStarFill key={index} size={16} color="#31B665" className="product_search_rating_star" />
                                    ))}

                                    {new Array(5 - item.review?.rating).fill(null).map((data , index) => (
                                        <BsStar  key={index} size={16} color="#31B665" className="product_search_rating_star" />
                                    ))}
                                </div>
                                <h2 className="Myreview_titile">{item.review.Title}</h2>
                                <p className='myreviewComment'>{item.review.comment}</p>
                                {item.review.Reply !== null && <div className='replyByvenderreview'>
                                    <div className='container-fluid mx-2 review_reply'>
                                        <div className="d-flex gap-2">
                                            <div className="related_img_container">
                                                <div className="related_review_image">
                                                    <Image width={100} height={100}
                                                        className='realted_review_images'
                                                        src={item?.review.StoreImage}
                                                        alt="userImage"
                                                        title="userImage"
                                                    />
                                                </div>
                                            </div>
                                            <div className="related_review_content">

                                                <h3 className='reviews_title'>Response from the Owner</h3>
                                                <p className='reviews_writer'>{item?.review.Store_Name}</p>
                                                <div className='review_date'>

                                                    <p>{calculateTImefromDate(item?.review.ReplyTime)}</p>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='review_description_container'>

                                            <p>{textgive(item.Reply)}   {item?.Reply?.split(' ')?.length >= 100 && <span className='band_shlebtn' onClick={() => setreadopen(!readopen)}>...Read {readopen ? "More" : "Less"}</span>}</p>
                                        </div>

                                    </div>
                                </div>}
                                <div className='myreview_footer text-end px-3'>
                                    <Badge badgeContent={item?.review.count} className={classes.sliderLink_badge} >
                                        {item?.review.helpfull?.includes(state?.Profile?.id) ? <AiTwotoneLike color='#31B655' size={25} onClick={() => { state?.login ? HellFull(item.review) : router.push('/login') }} /> : <AiOutlineLike color='#31B655' size={25} onClick={() => { state.login ? HellFull(item.review) : router.push("/login") }} />}
                                    </Badge>

                                </div>
                            </div>
                        })

                    }
                    {

                        data2?.length !== 0 &&
                        data2?.map((item, index) => {
                            return <div key={index} className='myreviewBox'>
                                <div className='reviewHeaders mb-sm-4 mb-3 d-flex gap-3'>
                                    <div className='productReviewImg'>
                                        <div className='productreview_imgcircle'>

                                            < Image width={100} height={100}
                                                src={item?.StoreImage}
                                                alt='Profile'
                                                title='Profile'
                                                className="Navbar_profile_imgs" />
                                        </div>
                                    </div>
                                    <div className='productReviewText'>
                                        <h2 className='producRRRtitle'>{item.StoreName}</h2>
                                        <h4>{calculateTImefromDate(item.created_at)}</h4>
                                    </div>
                                </div>
                                <div className="product_cart_review">
                                    {Boolean(item.rating) && new Array(item?.rating).fill(null).map((data , index) => (
                                        <BsStarFill size={16} color="#31B665" key={index} className="product_search_rating_star" />
                                    ))}
                                    {new Array(5 - item?.rating).fill(null).map((data, index) => (
                                        <BsStar size={16} color="#31B665" key={index} className="product_search_rating_star" />
                                    ))}
                                </div>
                                <h2 className="Myreview_titile">{item.Title}</h2>
                                <p className='myreviewComment'>{item.comment}</p>
                                {item.Reply !== null && <div className='replyByvenderreview'>
                                    <div className='container-fluid mx-2 review_reply'>
                                        <div className="d-flex gap-2">
                                            <div className="related_img_container">
                                                <div className="related_review_image">
                                                    < Image width={100} height={100}
                                                        className='realted_review_images'
                                                        src={item?.StoreImage}
                                                        alt="userImage"
                                                        title="userImage"
                                                    />
                                                </div>
                                            </div>
                                            <div className="related_review_content">

                                                <h3 className='reviews_title'>Response from the Owner</h3>
                                                <p className='reviews_writer'>{item?.StoreName}</p>
                                                <div className='review_date'>

                                                    <p>{calculateTImefromDate(item?.ReplyTime)}</p>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='review_description_container'>

                                            <p>{textgive(item?.Reply)}   {item?.Reply?.split(' ')?.length >= 100 && <span className='band_shlebtn' onClick={() => setreadopen(!readopen)}>...Read {readopen ? "More" : "Less"}</span>}</p>
                                        </div>

                                    </div>
                                </div>}
                                <div className='myreview_footer text-end px-3'>
                                    <Badge badgeContent={item?.count} className={classes.sliderLink_badge} >
                                        {item?.helpfull?.includes(state?.Profile?.id) ? <AiTwotoneLike color='#31B655' size={25} onClick={() => { state?.login ? helpfullStoe(item) : (router.pathname.includes('/menu-integration') ? setOpen(true) : router.push('/login')) }} /> : <AiOutlineLike color='#31B655' size={25} onClick={() => { state.login ? helpfullStoe(item) : (router.pathname.includes('/menu-integration') ? setOpen(true) : router.push('/login')) }} />}
                                    </Badge>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            {
                open && <Menuintegration_login open={open} setOpen={setOpen}></Menuintegration_login>
            }
        </div>
    )
}

export default Myreview
export const getServerSideProps = async () => {
    try {
        const [response1, response2] = await Promise.all([
            axios.get('https://api.cannabaze.com/UserPanel/Get-StoreReviewbyUser/'),
            axios.get('https://api.cannabaze.com/UserPanel/Get-ProductReviewbyUser/')
        ]);

        return {
            props: {
                data1: response1.data,
                data2: response2.data
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                data1: null,
                data2: null
            }
        };
    }
};
