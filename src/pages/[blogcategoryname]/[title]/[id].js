import React, { useRef } from "react";
import { IoChevronBack } from "react-icons/io5"
import { IoIosArrowDown } from "react-icons/io"
import { IoIosArrowUp } from "react-icons/io"
import { IconButton } from "@material-ui/core";
import useStyles from "@/styles/style";
import RecentPost from "@/component/BlogComponent/RecentPost";
import RecentPostComment from "@/component/BlogComponent/RecentPostComment.jsx";
import Newsletter from "@/component/home/HomePageDealsSignup";
import { BsFillShareFill } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import Select from '@mui/material/Select';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { IoEyeSharp } from "react-icons/io5";
import { AiFillHeart } from "react-icons/ai";
import Image from "next/image";
import BlogPaginate from "@/component/BlogComponent/BlogPaginate.jsx";
import BlogSkeleton from '@/component/skeleton/BlogSkeleton'
import { BsThreeDotsVertical } from "react-icons/bs"
import Createcontext from "@/hooks/context";
import { BlogLike, Get_Comment, Post_BlogLike } from "@/hooks/apicall/api"
import _ from "lodash"
import Cookies from 'universal-cookie';
import { RWebShare } from "react-web-share";
import { WhisList } from "@/component/Whishlist/WhisList";
// import { useLocation, useParams  } from "react-router-dom";
import axios from "axios";
import { SingleNewsSeo } from "@/component/ScoPage/NewsSeo";
import { modifystr } from "@/hooks/utilis/commonfunction";
import { useRouter } from "next/router";
import Link from "next/link";
const Blogs = (props) => {
    let News = props.data[0]
    const ref = useRef(null)
    const classes = useStyles()
    const router = useRouter()
    const { state } = React.useContext(Createcontext)
    const [value, SetValue] = React.useState([])
    const [Getlikes, SetLikes] = React.useState([])
    const [Getcommnet, Setcommnet] = React.useState([])
    const id = router?.query?.sluge;
    // const [News, SetNews] = React.useState({})
    const [WishList, SetWishList] = React.useState(false)
    const [ViewCount, SetViewCount] = React.useState(0)
    const cookies = new Cookies();
    let token_data = cookies.get('User_Token_access')
    let accessToken
    if (typeof window !== 'undefined') {
        accessToken = localStorage.getItem('User_Token_access');
    }
    if (Boolean(accessToken)) { token_data = accessToken }

    function PostLike(like) {
        if (state.login) {
            Post_BlogLike(News?.id, !like).then((res) => {
                BlogLike(News.id).then((res) => {
                    SetLikes(res.data.Like)
                    SetValue({ ...value, "LinkCount": res.data.LikeCount })
                }).catch((error) => {
                    console.error(error)
                })
            }).catch(() => {

            })
        }
        else {
            SetWishList(true)
        }
    }

    function color() {
        const l = _.find(Getlikes, function (n) {
            return n?.user === state?.Profile?.id;
        })
        return l
    }
    //  React.useEffect(()=>{
    //    Boolean(Boolean(Object.keys(News).length)) && 

    //    name !== (News.Url_slug === ("" || null || undefined) ?  modifystr(News.Title) : modifystr(News.Url_slug)) && navigate( `/${News.category_name === "BLOGS" ? "blogs" :"cannabis-news"}/${News.Url_slug === ("" || null || undefined) ?  modifystr(News.Title) : modifystr(News.Url_slug)}/${News.id}` , { replace: true });

    //  },[News])

    const [ShowCards, SetShowCards] = React.useState(false)
    const [CommentCardArrays, SetCommentCardArray] = React.useState()
    // React.useEffect(() => {
    //     SetCommentCardArray(Getcommnet.UserComment)

    // }, [Getcommnet.UserComment])
    const [currentPage, setCurrentPage] = React.useState(1);
    const [postsPerPage] = React.useState(5);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentPosts = CommentCardArrays?.slice(indexOfFirstPost, indexOfLastPost);
    let usercomment = currentPosts?.filter((item) => {
        return item.user === state?.Profile.id
    })
    let newdata = currentPosts?.filter((item, index) => {
        return item.user !== state.Profile.id
    })
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const previousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const nextPage = () => {
        if (currentPage !== Math.ceil(CommentCardArrays?.length / postsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };
    function scrolltocomment() {
        SetShowCards(true)

        let horiheight = ref.current.children[4].offsetTop - document.getElementById('Navbar_box').clientHeight
        // document.documentElement.scrollTo({
        //     top: horiheight,
        //     left: 0,
        //     behavior: "smooth",
        // });
    }
    function handleDelete(id) {

        axios.delete(`https://api.cannabaze.com/UserPanel/Delete-Comment/${id}`,
            {
                headers: { Authorization: `Bearer ${token_data}` }
            },).then((response) => {
                Get_Comment(id).then((res) => {
                    Setcommnet({ ...Getcommnet, "CommentCounts": res.data.CommentCounts, 'UserComment': res.data.Comments })
                }).catch((error) => {
                    console.error(error)
                })
            })
    }
    async function GetComment(id) {
        await Get_Comment(id).then((res) => {

            Setcommnet({ ...Getcommnet, "CommentCounts": res.data.CommentCounts, 'UserComment': res.data.Comments })
        }).catch((error) => {
            console.error(error)
        })
    }


    if (!Object.keys(News).length) {
        return <BlogSkeleton />
    }


    else {

        // console.log(News)
        return (
            <React.Fragment>
                <SingleNewsSeo Title={News?.Meta_title} Description={News?.Meta_Description} location={props.url}></SingleNewsSeo>
                <div className="container" >
                    <div className="row mx-1" ref={ref}>
                        <div className="col-12 w-100 row align-items-center justify-content-between blog_searchBar_container px-0">
                            <section className=" col-2 backButton_section">
                                <div className="col-12 backBtnCol_searchBar_height">
                                    <Link href={props.category === 'blogs' ? "/blogs" : "/cannabis-news"}><span style={{ marginLeft: "-4px", cursor: 'pointer' }}> <IoChevronBack color="#000000" size={20} /></span></Link>
                                    <Link href={props.category === 'blogs' ? "/blogs" : "/cannabis-news"}><span onClick={() => { Location?.pathname?.split('/')[1] === "cannabis-news" ? router.push(Location?.pathname?.split('/')[1] === "cannabis-news" ? '/cannabis-news' : '/blogs') : router.push('/blogs') }} style={{ cursor: 'pointer' }} className="blogBackSpan">Back</span></Link>
                                </div>
                            </section>
                        </div>

                        <div className="p-0 blogEditorContainer">
                            <div className=" UserNmae_Blog">

                                <div className="UserNmae">

                                </div>
                            </div>
                            <section className="blog_Image" style={{ backgroundImage: `url(${News.Image})` }} >
                                <div className="overlay_blog"></div>
                                <h1 className="blog_Title ">{News?.Title}</h1>
                            </section>
                            <div className="blog_text_container"  >
                                <div className="blogEditorPaddings ">

                                    <div className="linkTaginsideEditer" dangerouslySetInnerHTML={{ __html: News?.Description }} />
                                </div>
                            </div>
                            <div className="blog_text_container" >

                                <div className="col-12 Linkofblog ">
                                    <div className="col BlogSocal" id="center1">

                                        <RWebShare
                                            data={{ url: "https://www.weedx.io" + props.url }}
                                            sites={["facebook", "twitter", "whatsapp", "telegram", "linkedin", 'mail', 'copy']}
                                            onClick={() => console.info("share successful!")}
                                            color="#31B665" >
                                            <IconButton>
                                                <BsFillShareFill size={16}></BsFillShareFill>
                                            </IconButton>
                                        </RWebShare>

                                        <div className="blogViewCounts destop_view">Share</div>
                                    </div>
                                    <div className="col viewsBlog" id="center1">
                                        <IconButton>
                                            <IoEyeSharp></IoEyeSharp>
                                        </IconButton>

                                        <span className="blogViewCounts">{News.ViewCount} <span className="destop_view">Views</span></span>


                                    </div>

                                    <div className="col viewsBlog BlogSocal" id="center1" onClick={scrolltocomment}>

                                        <IconButton>
                                            <BiCommentDetail />
                                        </IconButton>
                                        <span className="blogViewCounts">{Getcommnet.CommentCounts} <span className="destop_view"> Comment</span> </span>

                                    </div>
                                    <div className="col viewsBlog BlogSocal like" id="center1">
                                        <IconButton onClick={(() => { PostLike(color()?.like) })}>
                                            <AiFillHeart 
                                            // color={state?.login && color()?.like && "#31B665"}
                                            ></AiFillHeart>
                                        </IconButton>
                                        <span className="blogViewCounts">{value?.LinkCount}</span>
                                    </div>
                                </div>


                            </div>
                        </div>
                        {WishList && <WhisList open1={WishList} SetWishList={SetWishList}></WhisList>}
                        <RecentPost />
                        <RecentPostComment scrolltocomment={scrolltocomment} id={id} GetUserComment={Getcommnet} SetUserComment={Setcommnet} Get={GetComment} />
                        <div>
                            <section className="px-0" id="blodComment">
                                <div className="col-12 blogsCommentCountCol">
                                    <div className="col-6">
                                        <h2 className="blogsCommentheadings">Comments ({CommentCardArrays?.length})</h2>
                                    </div>
                                    <div className="col-6 blogCommentCardArrowBtn">
                                        {ShowCards ? (
                                            <IconButton onClick={() => SetShowCards(!ShowCards)}><IoIosArrowUp /></IconButton>
                                        ) : (
                                            <IconButton onClick={() => SetShowCards(!ShowCards)}><IoIosArrowDown /></IconButton>

                                        )}

                                    </div>
                                </div>
                                {
                                    ShowCards && (
                                        <section>

                                            {
                                                (state.login && Boolean(usercomment?.length)) &&
                                                usercomment?.map((val, index) => {

                                                    const CommentDate = val.created_at.slice(0, 10).split("-").reverse().join("-")
                                                    return (
                                                        <div className="border blogCommentEachCards" key={index}>

                                                            <div className="col-12 blogsCommentCardDateCol">
                                                                <span className="blogsCommentCardDate">{CommentDate}</span>

                                                            </div>
                                                            <div className="col-12 d-flex align-items-center">
                                                                <div className="commentCardImages">
                                                                    <div className="imageContainer">
                                                                        <Image unoptimized={true} width={500} height={500} src={`${val.image}`} className="blogsCommentImages" alt={val.username} title={val.username} />
                                                                    </div>
                                                                </div>
                                                                <div className="commentCradContentSection">
                                                                    <h2 className="blogCommentName">{val.username}</h2>
                                                                    <div className="col-12">
                                                                        <p className="blogUserComments">{val.comment}</p>
                                                                    </div>

                                                                </div>
                                                                {state.login && state?.Profile?.id === val.user && (
                                                                    <div className="col d-flex justify-content-center align-items-center">
                                                                        {/* <IconButton> <BsThreeDotsVertical color="#31B665" size={20} /></IconButton> */}
                                                                        <span className='userreviewaction'> {
                                                                            <Select

                                                                                IconComponent={BsThreeDotsVertical} labelId="demo-simple-select-error-label"
                                                                                sx={{
                                                                                    boxShadow: "none",
                                                                                    padding: '0',

                                                                                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                                                                                    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                                                                    {
                                                                                        border: 0,
                                                                                        outline: "none"

                                                                                    },
                                                                                    "& .MuiSelect-select": {
                                                                                        padding: '0 10px !important'
                                                                                    },
                                                                                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                                                                    {
                                                                                        border: 0,
                                                                                        outline: "none"
                                                                                    },
                                                                                    "&.Mui-focused .MuiSelect-icon": { color: "#31B665" },
                                                                                    "&:hover": {
                                                                                        ".MuiSelect-icon": {
                                                                                            color: "#31B665"
                                                                                        }
                                                                                    },
                                                                                }}
                                                                            >
                                                                                <List className={classes.orderEditList}>
                                                                                    <ListItem button className={classes.orderEditListitem} onClick={() => handleDelete(val.id)}>
                                                                                        <AiFillDelete color='31B665' />
                                                                                        Delete
                                                                                    </ListItem>
                                                                                    <ListItem button className={classes.orderEditListitem}>

                                                                                        <FaEdit color='31B665' />
                                                                                        Edit
                                                                                    </ListItem>                                                                                                      
                                                                                </List>
                                                                            </Select>

                                                                        }</span>
                                                                    </div>
                                                                )}




                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }

                                            {newdata?.map((val, index) => {

                                                const CommentDate = val.created_at.slice(0, 10).split("-").reverse().join("-")
                                                return (
                                                    <div className="border blogCommentEachCards" key={index}>

                                                        <div className="col-12 blogsCommentCardDateCol">
                                                            <span className="blogsCommentCardDate">{CommentDate}</span>

                                                        </div>
                                                        <div className="col-12 d-flex justify-content-center">
                                                            <div className="commentCardImages">
                                                                <div className="imageContainer">
                                                                    <Image unoptimized={true} width={500} height={500}
                                                                        src={`${val.image}`} className="blogsCommentImages" alt={val.username} title={val.username} />
                                                                </div>
                                                            </div>
                                                            <div className="commentCradContentSection">
                                                                <h2 className="blogCommentName">{val.username}</h2>
                                                                <div className="col-12">
                                                                    <p className="blogUserComments">{val.comment}</p>
                                                                </div>

                                                            </div>
                                                            {state.login && state?.Profile?.id === val.user && (
                                                                <div className="col d-flex justify-content-center align-items-center">
                                                                    <IconButton> <BsThreeDotsVertical color="#31B665" size={20} /></IconButton>

                                                                </div>
                                                            )}




                                                        </div>
                                                    </div>
                                                )
                                            })}

                                            <BlogPaginate
                                                postsPerPage={postsPerPage}
                                                totalPosts={CommentCardArrays.length}
                                                paginate={paginate}
                                                previousPage={previousPage}
                                                nextPage={nextPage}
                                            />
                                        </section>
                                    )}
                            </section>
                        </div>

                    </div>
                </div>
                <Newsletter />
            </React.Fragment>
        )
    }
}


export async function getStaticPaths() {
    // No paths pre-generated at build time
    const paths = [];

    return {
        paths,
        fallback: 'blocking', // Generate pages on-demand
    };
}

export async function getStaticProps(context) {
    try {
        const { id, blogcategoryname } = context.params;

        const res = await fetch(`https://api.cannabaze.com/UserPanel/Get-GetNewsById/${id}`);
        if (!res.ok) {
            throw new Error('Failed to fetch');
        }

        const data = await res.json();
        // console.log(data)
        return {
            props: {
            
                    data: data,
                    url: "context.resolvedUrl",
                    category: blogcategoryname,
                
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            },
        };
    }
}

export default Blogs


