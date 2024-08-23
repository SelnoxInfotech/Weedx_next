import React from 'react'
import {ClickAwayListener} from '@mui/base/ClickAwayListener';
import axios from 'axios';
import _ from 'lodash';
import Cookies from 'universal-cookie';
import { RxCross2 } from "react-icons/rx";
import Createcontext from "@/hooks/context"
import Link from 'next/link';
import Image from 'next/image';
import { modifystr } from '@/hooks/utilis/commonfunction';
export default function Notification({ notify, setnotify,Settotalnotify, Setnotificationdata, notificationdata }) {
    const cookies = new Cookies();
    let token_data = cookies.get('User_Token_access')
    let accessToken 
    if (typeof window !== 'undefined') {

         accessToken = localStorage.getItem('User_Token_access');

    }
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
    const { state , dispatch } = React.useContext(Createcontext)
    function calculateTImefromDate(value) {
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

    React.useEffect(() => {
        if (state.login) {
            const config = {
                headers: { Authorization: `Bearer ${token_data}` }
            }
            axios.get(`https://api.cannabaze.com/UserPanel/GetUserNotificationByLogin/`,
                config,
            ).then((res) => { 
                let datax = []
                res.data.forEach((item, index) => {
                  
                    if (item.Order.length !== 0) {
                     
                        datax.push({
                            Image: item.Order[0].StoreImages,
                            title: `Thank you for ordering with WeedX.io! Your order #${item.Order[0].OrderId} is confirmed for $${item.Order[0].subtotal}.`,
                            date: item.Order[0].OrderDate,
                            link: `/MyOrderProductDetail/${item.Order[0].OrderId}`,
                            Id: item.Notification
                        })
                    }
                    if (item.blog.length !== 0) {
                       
                        datax.push({
                            Image: item.blog[0].Image,
                            title: item.blog[0].Title,
                            date: item.blog[0].created,
                            link: `/${item.blog[0].category_name==="BLOGS"? "blogs":"cannabis-news"}/${modifystr(item.blog[0].Title)}/${item.blog[0].id}`,
                            Id:item.Notification
                        })
                    }

                

                })
                let newddt = _.sortBy(datax, function (dateObj) {
                    return dateObj.date;
                });
                Settotalnotify(newddt)
              
                Setnotificationdata(newddt.reverse())

            }).catch((err) => {

            })
        }
        else {
            axios.get(`https://api.cannabaze.com/UserPanel/GetUserNotification/`,
            ).then((respones) => {
               
                if(Boolean(respones?.data)){
                    let newdata = respones.data.Blog.map((data) => {
                        return { "link": `/${data.category_name==="BLOGS"? "blogs":"cannabis-news"}/${modifystr(data.Title)}/${data.id}`, 'title': data.Title, "image": data.Image, 'date': data.created }
                    })
                    Setnotificationdata(()=>newdata)

                }
                else {
                    Setnotificationdata([{ ...notificationdata, "link": `/`, 'title': "Welcome TO WeedX" }])
                }
            }).catch((err) => {

            })
        }
    }, [state.login])

    function ClearAll() {
        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        }
        let ab = notificationdata.map((item)=>{
            return item.Id
        })
   
        axios.post(`https://api.cannabaze.com/UserPanel/ClearNotification/`,
            {
                Clear: ab
            },
            config
        ).then((respones) => {
            dispatch({ type: 'ApiProduct', ApiProduct: !state.ApiProduct })
                Setnotificationdata([])
            
        }).catch((err) => {

        })
    }
    function Clear(e) {
        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        }
        axios.post(`https://api.cannabaze.com/UserPanel/ClearNotification/`,
            {
                Clear: [e.Id]
            },
            config
        ).then((respones) => {

            axios.get(`https://api.cannabaze.com/UserPanel/GetUserNotificationByLogin/`,
            config,
                ).then((res) => {

                  
                    let datax = []
                    res.data.forEach((item, index) => {

                        if (item.Order.length !== 0) {
                         
                            datax.push({
                                Image: item.Order[0].IdCard,
                                title: `Thank you for ordering with WeedX.io! Your order #${item.Order[0].OrderId} is confirmed for $${item.Order[0].subtotal}.`,
                                date: item.Order[0].OrderDate,
                                link: `/MyOrderProductDetail/${item.Order[0].OrderId}`,
                                Id: item.Notification
                            })
                        }
                        if (item.blog.length !== 0) {
                           
                            datax.push({
                                Image: item.blog[0].Image,
                                title: item.blog[0].Title,
                                date: item.blog[0].updated,
                                link: `/cannabis-news/${modifystr(item.blog[0].Title)}/${item.blog[0].id}`,
                                Id:item.Notification
                            })
                        }
                    })
                    let newddt = _.sortBy(datax, function (dateObj) {
                        return dateObj.date;
                    });
                    dispatch({ type: 'ApiProduct', ApiProduct: !state.ApiProduct })
                    Setnotificationdata(newddt.reverse())

                }).catch((err) => {
                })
        }).catch((err) => {

        })
    }

    function removenotify(data){
      let ab= notificationdata.filter((item ,index)=>{
        return item.title !== data.title
      })
     Setnotificationdata(ab)
    }


    //  console.log(notificationdata.length , state?.login)
    return (
        notify &&
        <ClickAwayListener onClickAway={() => { setnotify(false) }}>
            <div className={`notificationList ${!Boolean(notificationdata?.length) && "nonewnotify"} `}>


                <div className='notificationHeader'>
                    <h4 className='notifytitle'>{`Notification`}</h4>
                  { ( Boolean(notificationdata?.length > state?.Profile?.RemovedNotification?.length ) && state?.login ) && <span className='clearNotify' onClick={() => ClearAll()}> <RxCross2 /> </span>}
                </div>
                {
                    Boolean(state?.login) ?
                    <div className='notificationContainer'>  
                    { 
                        Boolean(notificationdata?.length > state?.Profile?.RemovedNotification?.length)
                        ?
                            notificationdata?.map((data, index) => {
                                    if(Boolean(!state.Profile.RemovedNotification.includes(data.Id))){
                                        return (
                                            <div key={index} className='notification_box'>

                                                <Link href={data.link} onClick={()=>{setnotify(false)}}>
                                                    <div className="notification_img">
                                                        <div className="notiimgCircle">
                                                            <Image  unoptimized={true} width={100} height={100} src={data.Image} alt={data.title} title={data.title} />
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="notifytext w-100" >
                                                    <div className='d-flex justify-content-between align-items-center'> 
                                                     <Link href={data.link} onClick={()=>{setnotify(false)}}> <div className="d-flex align-items-center justify-content-between gap-5"> <h4 className="notititle">{data.title} </h4></div></Link>
                                                           <span className='cursor-pointer' onClick={(e) => Clear(data)}><RxCross2 size={15} color={"#000"} /></span>
                                                    </div>



                                                    <Link href={data.link} onClick={()=>{setnotify(false)}}>
                                                          <div className="d-flex align-items-center justify-content-between gap-5">
                                                            <span className="notify_date ">{calculateTImefromDate(data.date)}</span>
                                                          </div>  
                                                    </Link>

                                                </div>

                                            </div>
                                        )
                                    }
                            })
                        :
                        <div className='w-100 h-100 d-flex align-items-center justify-content-center '>{`No New Notification`}</div>
                    }
                    </div>
                    :
                    <div className='notificationContainer'>
                    { 
                        Boolean(notificationdata.length !==0)
               
                        ?
                            notificationdata?.map((data, index) => {
                               
                        
                                return (
                                        <div key={index} className='notification_box'>

                                            <Link href={data.link} onClick={()=>{setnotify(false) ; removenotify(data)}}>
                                                <div className="notification_img">
                                                    <div className="notiimgCircle">
                                                        <Image unoptimized={true} width={100} height={100} src={data?.image} alt={data.title} title={data.title} onError={() => this.img.src = '/image/weedx.io logo.png'} />
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="notifytext w-100" >
                                                <div className='d-flex justify-content-between align-items-center'> <Link href={data.link} onClick={()=>{setnotify(false); removenotify(data)}}>    <span className="notify_date ">{calculateTImefromDate(data.date)}</span> </Link> </div>
                                                <Link href={data.link} onClick={()=>{setnotify(false); removenotify(data)}}>  <div className="d-flex align-items-center justify-content-between gap-5"><h4 className="notititle">{data.title} </h4> </div>  </Link>

                                            </div>

                                        </div>
                                    )
                                
                            
                            })
                        :
                        <div className='w-100 h-100 d-flex align-items-center justify-content-center '>{`No New Notification`}</div>
                    }
                    </div>
                }
            </div>
        </ClickAwayListener>

    )
}
