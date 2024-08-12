import React, { useContext, useEffect, useState } from 'react'
import { AiFillHeart, AiFillEye } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import Link from 'next/link';
import SearchBar from '@mkyy/mui-search-bar';
import useStyles from "@/styles/style.jsx";
import axios from "axios";
import { useRouter } from 'next/router';
import { BlogLike, Post_BlogLike } from "@/hooks/apicall/api.js"
import { FaRegHeart } from "react-icons/fa";
import { BsShareFill } from "react-icons/bs";
import { NewsSeo } from "@/component/ScoPage/NewsSeo";
import DeliveryItemsCardSkeleton from '@/component/skeleton/DeliveryItemsCardSkeleton.jsx';
import _ from "lodash";
import Image from 'next/image';
import Createcontext from '@/hooks/context.js';
import { RWebShare } from "react-web-share";
import Cookies from 'universal-cookie';
import Blogheaders from '@/component/Pageheaders/Blogheaders';
import Loader from '@/component/Loader/Loader.js';
import { modifystr } from "@/hooks/utilis/commonfunction"
import Currentlocation from '@/component/currentlocation/CurrentLocation';
const Allblogs = (props) => {
  const [allblogs, setallblogs] = useState(props.initialData)
  const router = useRouter()
  const { state } = React.useContext(Createcontext)
  const [value, SetValue] = React.useState([])
  const [allLikes, SetallLikes] = React.useState([])
  const [isdata, setisdata] = useState(true)
  const [loader, setloader] = React.useState(true)
  const [searchtext, setsearchtext] = useState('')
  const classes = useStyles()
  const cookies = new Cookies();
  let token_data = cookies.get('User_Token_access')

  let accessToken
  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('User_Token_access');
  }
  if (Boolean(accessToken)) { token_data = accessToken }
  

  function PostLike(item) {

    if (state.login) {
      Post_BlogLike(item?.id, !item.Liked).then((res) => {

        axios.get('https://api.cannabaze.com/UserPanel/GetNewsbyUser/', {

          headers: { Authorization: `Bearer ${token_data}` }

        }).then(async (res) => {
          setallblogs(res.data)
          setloader(false)

          setisdata(true)
        }).catch((err) => {
          console.trace(err)
        })

      }).catch(() => {

      })
    }
    else {
      router.push('/login')
    }
  }
  return (
    <React.Fragment>
      <NewsSeo router={router.pathname.substring(1)} ></NewsSeo>
      {state.permission === false && <Currentlocation></Currentlocation>}
      <div>
        <Blogheaders title={'Latest news'}/>
        {
       
           <div className='blogListWrapper'>
            {
              props.initialData.map((items, index) => {
                return (
                  <div className='row blogListCard mx-0' key={index}>
                    <div className='col-3 p-0 d-flex align-items-center'>
                      <div className='blogCardImg'>
                        <Link href={`/${router.pathname.substring(1)}/${items.Url_slug === ("" || null || undefined) ? modifystr(items.Title) : modifystr(items.Url_slug)}/${items.id}`} key={index}>
                          <Image  unoptimized={true} width={500} height={500}
                            src={`${items.Image}`} alt={items.Alt_Text} title={items.Alt_Text} />
                        </Link>
                      </div>
                    </div>
                    <div className='col-9'>
                      <div className='blogcardText'>
                        <div className='blogDate'> <span>{items.Publish_Date.slice(0, 10)}</span></div>
                        <Link href={`/${router.pathname.substring(1)}/${modifystr(items.Title)}/${items.id}`} key={index}>
                          <h2 className='blogcardHeading'>{items.Title}</h2>
                        </Link>
                        <Link href={`/${router.pathname.substring(1)}/${modifystr(items.Title)}/${items.id}`} key={index}>
                          <p className='blogcardDescription'>   <div dangerouslySetInnerHTML={{ __html: items?.Description.split('</p>')[0] }} /></p>
                        </Link>
                        <div className='row extra_function extra_function_destop '>
                          <div className='col-3'>
                            <span className='action_icons'><AiFillEye /></span>
                            <span>{items.ViewCount} Views</span>
                          </div>
                          <div className='col-3'>
                            <span className='action_icons'><BiCommentDetail /></span>
                            <span>{items.commentCount}</span>
                          </div>
                          <div className='col-3'>


                            <span onClick={(() => { PostLike(items) })} className='action_icons'> {(state?.login && items.Liked) ? <AiFillHeart color={"#31B655"}></AiFillHeart> : <FaRegHeart color="#31B655" />}</span>

                            <span>{items.likeCount}</span>
                          </div>
                          <div className='col-3'>
                            <span className='action_icons'>
                              <RWebShare
                                data={{ url: `https://www.weedx.io/${router.pathname.substring(1)}/${modifystr(items.Title)}/${items.id}` }}
                                sites={["facebook", "twitter", "whatsapp", "telegram", "linkedin", 'mail', 'copy']}
                                onClick={() => console.info("share successful!")}
                                color="#31B665"
                              >
                                <BsShareFill />
                              </RWebShare>

                            </span>
                            <span>{`Share`}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-12'>
                      <div className='row extra_function extra_function_mobile '>
                        <div className='col-3'>
                          <span className='action_icons'><AiFillEye /></span>
                          <span className=''>{items.ViewCount}</span>
                        </div>
                        <div className='col-3'>
                          <span className='action_icons'><BiCommentDetail /></span>
                          <span>{items.commentCount} </span>
                        </div>
                        <div className='col-3'>
                          <span className='action_icons'>

                            {(state?.login && items.Liked) ? <AiFillHeart color={"#31B655"} onClick={() => { PostLike(items) }}></AiFillHeart> : <FaRegHeart onClick={() => { PostLike(items) }} color="#31B655" />}

                            <span>{items.likeCount}</span>
                          </span>
                        </div>
                        <div className='col-3'>
                          <span className='action_icons'>
                          </span>

                        </div>
                      </div>
                    </div>
                  </div>

                )



              })
            }

          </div>
        }
     
      </div>
    </React.Fragment>
  )
}

export default Allblogs



export async function getStaticProps(context) {
  try {
    const res = await axios.get('https://api.cannabaze.com/UserPanel/Get-NewsbyCategorybyCANNABISNEWS/');
    const data = _.orderBy(res.data, ['created'], ['desc']); // Assuming 'created' is a date field

    return {
      props: {
        initialData: data,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        initialData: [],
      },
      revalidate: 60,
    };
  }
}