
import { AiFillLike } from "react-icons/ai"
import { BsStar, BsStarFill } from "react-icons/bs";
import Dialog from "@mui/material/Dialog";
import { RiCloseCircleFill } from "react-icons/ri";
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { Pagination, Navigation } from 'swiper/modules';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import { AiOutlineLike } from "react-icons/ai";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { AiTwotoneLike } from "react-icons/ai";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { MdVerified } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import { BsThreeDotsVertical } from "react-icons/bs"
import useStyles from "../../../styles/style";
import { useRouter } from "next/router";
import React from 'react';
import Badge from '@mui/material/Badge';
import ReportReviewPopup from '../ReviewPopup/ReportReviewPopup';
import Cookies from 'universal-cookie';
import { useState } from 'react';
import Createcontext from "../../../hooks/context"
import { Menuintegration_login } from '../../Login/menu-integration_login';
import Image from "next/image";
const RelatedReview = ({ handleEdit, storeDetails, AllReview, handleDelete, HellFull}) => {
    const cookies = new Cookies();
    let token_data = cookies.get('User_Token_access')
    const [open, setOpen] = React.useState(false)
    let accessToken 
    if (typeof window !== 'undefined') {

         accessToken = localStorage.getItem('User_Token_access');

    }
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
    const [imageopup , setImagepopup] = useState(false)
    const [sliderdata,setsliderdata]= useState({
    image:[],
    video:[],
    index:0,
    })
    const classes = useStyles();
    const navigate = useRouter();
    const location = useRouter()
    const { state, dispatch } = React.useContext(Createcontext);
    const [readopen, setreadopen] = useState('');
    function textgive(text , id) {
        let arrofstr = text?.split(' ');
        let finalstr = ""
        if (arrofstr?.length >= 100 && readopen !== id) {

            for (let i = 0; i < 100; i++) {
                finalstr += `${arrofstr[i]} `
            }
        } else {
            finalstr = text
        }
        return finalstr
    }

    const moveObject = (arr, targetKey, targetValue, newIndex) => {
        try {
            const target = arr.find(value => value[targetKey] === targetValue)
            if (target === undefined) {
                return arr;

            }
            else {
                const newArray = arr.filter(value => value[targetKey] !== targetValue)
                newArray.splice(newIndex, 0, target);
                return newArray;
            }
        }
        catch {
            return arr;
        }
    }

 
    function calculateTImefromDate(value){
        //  new Date() = 'Mon Nov 20 2023 13:00:15 GMT+0530 (India Standard Time)'
      let diffTime = Math.abs(new Date().valueOf() - new Date(value).valueOf());
      let months = Math.trunc( diffTime / (24*60*60*1000)/30);
      let days = diffTime / (24*60*60*1000);
      let hours = (days % 1) * 24;
      let minutes = (hours % 1) * 60;
      let secs = (minutes % 1) * 60;
      [days, hours, minutes, secs] = [Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)]
     
     if(months !==0){
        return months + " Month ago"
     }else if(days !== 0)
      {
        return days + " days ago"
      }
      else if(hours !== 0){
        return hours + " hours ago"
      }
      else if(minutes !== 0){
        return minutes + " minutes ago"
      }
      else {
        return secs + " secs ago"
      }
    }

    function readmoreopen(id){
        if(readopen === id){
            setreadopen('')
        }else{
            setreadopen(id)
        }
    }
    function openimageslider(element, type, index ){
        setImagepopup(true)
        let a= type==='video' ? element.images.length : index
            sliderdata.image=element.images
            sliderdata.video=element.videos
            sliderdata.index=a
    }

    return (
        <React.Fragment>
            <div className='container-fluid'>
                <div className="row center reviewCardWrapper">
                    {(state.login ? moveObject(AllReview, 'user', state.Profile.id, 0) : AllReview)?.map((ele, index) => {
                        const text = ele?.comment;
                        return (
                            <div className="w-100 related_review_container" key={index}>
                                        <p className='reviewdateTexyt'>{calculateTImefromDate(ele.created_at)}</p>
                                        <div className='review_date'>
                                           
                                            <span className='userreviewaction'> {
                                                state.login &&
                                                state.Profile.id === ele.user && 
                                                <>
                                                    <Select IconComponent={BsThreeDotsVertical} labelId="demo-simple-select-error-label"
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
                                                        }}>
                                                        <List className={classes.orderEditList}>


                                                            <ListItem button className={classes.orderEditListitem} onClick={() => handleDelete(ele.id)}>
                                                                <AiFillDelete color='31B665' /> Delete
                                                            </ListItem>
                                                            <ListItem button className={classes.orderEditListitem} onClick={() => handleEdit()}>
                                                                <FaEdit color='31B665' />  Edit
                                                            </ListItem>
                                                        </List>
                                                    </Select>
                                                </>
                                            }</span>
                                        </div>
                                        <div className="reviwerName_rating">

                                            <div className='reviewSectionRating'>
                                                {ele.rating && new Array(ele.rating).fill(null).map(( data , index) => (
                                                    <BsStarFill key={index} size={16} color="#31B665" className="product_search_rating_star" />
                                                ))}

                                                {new Array(5 - ele.rating).fill(null).map(( data , index) => (
                                                    <BsStar  key={index} size={16} color="#31B665" className="product_search_rating_star" />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2 py-sm-0 py-4 ">
                                            <div className="related_img_container">

                                                <div className="related_review_image">

                                                    <Image
                                                    unoptimized={true}
                                                       width={100}
                                                       height={100}
                                                        className='realted_review_images'
                                                        src={`${ele?.userImage}`}
                                                        alt="userImage"
                                                        title='userImages'
                                                    />
                                                </div>

                                            </div>
                                            <div className="related_review_content">
                                                <p className='reviews_writer'>{ele.username}</p>
                                            </div>
                                            <span>
                                                <Tooltip title="Verified">
                                                <IconButton>
                                                    <MdVerified color={'#31B655'} size={22}/>
                                                    </IconButton>
                                                </Tooltip>
                                            </span>
                                        </div>
                                        <h3 className='reviews_title'>{ele.Title}</h3>
                                        {textgive(text) &&
                                            <div className='review_description_container'>
                                              <p>{textgive(text ,ele.id )}   {text?.split(' ')?.length >= 100 && <span className='band_shlebtn' onClick={() => readmoreopen(ele.id)}>...Read {ele.id !==readopen ? "More" : "Less"}</span>}</p>
                                            </div>
                                        }
                                        {
                                            ele.images.length !== 0 &&  <div className='reviewImagewrapper'>
                                                {
                                                    ele.images.map((item , index)=>{
                                                         return     <div key={index} className='reviewimagebox' onClick={()=>openimageslider(ele , 'image' ,index)}>
                                                                        <Image unoptimized={true} width={100} height={100} src={item.image} className='reviewImage' alt='review image' title='review image'/>
                                                                    </div>
                                                    })
                                                }
                                                {
                                                    ele.videos.map((item , index)=>{
                                                         return     <div key={index} className='reviewvideobox' >
                                                                        <video  autoPlay={false} onClick={()=>{  openimageslider(ele , 'video' , index)}} muted  src={item.video} className='reviewVideo' alt='video'/>
                                                                    </div>
                                                    })
                                                }
                                             
                                            </div>
                                        }
                                     
                                        {   
                                            ele.Reply !== null && "Reply" in ele && ele.Reply !== "" &&
                                            <div className='container-fluid mx-2 review_reply'>
                                                <div className="d-flex gap-2">
                                                    <div className="related_img_container">
                                                        <div className="related_review_image">
                                                            <Image
                                                               unoptimized={true}
                                                                width={100} 
                                                                height={100}
                                                                className='realted_review_images'
                                                                src={`${storeDetails?.Store_Image}`}
                                                                alt={storeDetails?.Store_Image}
                                                                title={storeDetails?.Store_Image}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="related_review_content">

                                                        <h3 className='reviews_title'>Response from the Owner</h3>
                                                        <p className='reviews_writer'>{storeDetails?.Store_Name}</p>
                                                        <div className='review_date'>

                                                            <p>{calculateTImefromDate(ele?.ReplyTime)}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className='review_description_container'>
                                                
                                                    <p>{textgive(ele.Reply , `${ele.id}reply`)}   {ele.Reply?.split(' ')?.length >= 100 && <span className='band_shlebtn' onClick={() => {readmoreopen(`${ele.id}reply`)}}>...Read {`${ele.id}reply` !== readopen ? "More" : "Less"}</span>}</p>
                                                </div>

                                            </div>
                                        }

                                <div className='related_review_footer '>

                                    <div className='related_review_footer_paragraph ellipsis'  onClick={() =>{  state?.login ? HellFull(ele) : (location.pathname.includes('/menu-integration') ? setOpen(true):  navigate('/login') ) }}>
                                            <Badge badgeContent={ele?.count} className={classes.sliderLink_badge}>
                                               {ele?.helpfull?.includes(state?.Profile?.id) ? <AiTwotoneLike color='#31B655' size={25}/> : <AiOutlineLike color='#31B655' size={25} />} 
                                            </Badge>
                                            
                                    </div>
                                    <div className=' ellipsis'>  <ReportReviewPopup />  </div>


                                </div>
                               
                            </div>
                        )
                    })}
                </div>
            </div>
            <Dialog
        open={imageopup}
        onClose={()=>{setImagepopup(false)}}
        className={classes.WriteReviewDialog}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 writeReviewContainer px-0">
              <div className="col-12 writeReviewCloseIconContainer">
                <IconButton onClick={()=>{setImagepopup(false)}} aria-label="closebutton">
                  <RiCloseCircleFill color="#949494" size={24} />
                </IconButton>
              </div>
              <div className='Reviewimageslidewrapper'>
                   <Swiper
                    pagination={{
                    type: 'fraction',
                    }}
                    initialSlide={sliderdata.index}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                   >
                    {
                        sliderdata?.image?.map((item , index)=>{
                            return  <SwiperSlide key={index}> <div className='Reviewimageslidebox'><Image  unoptimized={true} width={100} height={100} src={item.image} alt='review image' title='review image'/></div></SwiperSlide>
                        })
                    }
                     {
                        sliderdata?.video?.map((item, index )=>{
                            return  <SwiperSlide  key={index} > <div className='Reviewimageslidebox'>  <video  autoPlay={true} muted controls src={item.video} className='reviewVideo' alt='video'/></div></SwiperSlide>
                        })
                    }
                        {/* <SwiperSlide> <div className='Reviewimageslidebox'></div></SwiperSlide> */}
                        
                   </Swiper>
             </div>
            </div>
          </div>
        </div>
           </Dialog >
           {
                                  open && <Menuintegration_login open={open} setOpen={setOpen}></Menuintegration_login>
                                }
        </React.Fragment>
    )
}
export default RelatedReview












