import React from "react";
import Cookies from 'universal-cookie';
import Axios from 'axios';
import ReactSwitch from "react-switch";
const Notification = ({ Profile, Api, SetApi }) => {
    const cookies = new Cookies();
       let token_data = cookies.get('User_Token_access')
       let accessToken 
       if (typeof window !== 'undefined') {
   
            accessToken = localStorage.getItem('User_Token_access');
   
       }
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
    const [Checked, SetChecked] = React.useState({
        Email: false,
        News_Letter: false,
        Review_Suggestions: false,
    })
    const handleChange = (val) => {
        if (val === "Email" && Checked.Email === true) {
            SetChecked({ ...Checked, "Email": false, News_Letter: false, Review_Suggestions: false })
        }
        else {
            SetChecked({ ...Checked, 'Email': true, News_Letter: true, Review_Suggestions: true })
        }
    }
    const handleChange1 = (val) => {
        switch (true) {
            case val === "News_Letter":
                if (Checked.News_Letter === false) {
                    SetChecked({ ...Checked, News_Letter: true, Email: true })
                }
                else {
                    if (Checked.News_Letter === true && Checked.Review_Suggestions === false) {
                        SetChecked({ ...Checked, Email: false, News_Letter: false })
                    }
                    else {

                        SetChecked({ ...Checked, News_Letter: false })
                    }
                }
                break;
            case val === "Review_Suggestions":

                if (Checked.Review_Suggestions === false) {
                    SetChecked({ ...Checked, Review_Suggestions: true, Email: true })
                }
                else {
                    if (Checked.News_Letter === false && Checked.Review_Suggestions === true) {
                        SetChecked({ ...Checked, Email: false, Review_Suggestions: false })
                    }
                    else {
                        SetChecked({ ...Checked, Review_Suggestions: false })
                    }

                }
                break;
            default:
                return null
        }
    }
    const handleChange2 = (val) => {
        SetChecked({ ...Checked, Push_Notification: !Checked.Push_Notification, Recommendations: !Checked.Recommendations })
    }
    const handleChange3 = (val) => {
        if (val === "Savings" && Checked.Savings === true) {
            SetChecked({ ...Checked, "Savings": false, Order_Updates_Push_Notifications: false, Order_Updates_SMS_Notifications: false })
        }
        else {
            SetChecked({ ...Checked, 'Savings': true, Order_Updates_Push_Notifications: true, Order_Updates_SMS_Notifications: true })
        }
    }
    const handleChange4 = (val) => {
        switch (true) {
            case val === "Order_Updates_Push_Notifications":
                if (Checked.Order_Updates_Push_Notifications === false) {
                    SetChecked({ ...Checked, Order_Updates_Push_Notifications: true, Savings: true })
                }
                else {
                    if (Checked.Order_Updates_Push_Notifications === true && Checked.Order_Updates_Push_Notifications === false) {
                        SetChecked({ ...Checked, Savings: false, Order_Updates_Push_Notifications: false })
                    }
                    else {

                        SetChecked({ ...Checked, Order_Updates_Push_Notifications: false })
                    }
                }
                break;
            case val === "Order_Updates_SMS_Notifications":

                if (Checked.Order_Updates_SMS_Notifications === false) {
                    SetChecked({ ...Checked, Order_Updates_SMS_Notifications: true, Email: true })
                }
                else {
                    if (Checked.Order_Updates_Push_Notifications === false && Checked.Order_Updates_SMS_Notifications === true) {
                        SetChecked({ ...Checked, Savings: false, Order_Updates_SMS_Notifications: false })
                    }
                    else {
                        SetChecked({ ...Checked, Order_Updates_SMS_Notifications: false })
                    }

                }
                break;
            default:
                return null
        }
    }
    React.useEffect(() => {
        Axios.post(`https://api.cannabaze.com/UserPanel/Update-UpdateUserProfile/`,
            {
                EmailBoolean: Checked.Email,
                NewsLetter: Checked.News_Letter ? Checked.News_Letter : false,
                ReviewSuggestions: Checked.Review_Suggestions ? Checked.Review_Suggestions : false,
                PushNotification: Checked.Push_Notification ? Checked.Push_Notification : false,
                Recommendations: Checked.Recommendations ? Checked.Recommendations : false,
                Savings: Checked.Savings ? Checked.Savings : false,
                OrderupdatePushNotification: Checked.Order_Updates_Push_Notifications ? Checked.Order_Updates_Push_Notifications : false,
                OrderupdateSMSNotifications: Checked.Order_Updates_SMS_Notifications ? Checked.Order_Updates_SMS_Notifications : false
            },
            {
                headers: {
                    'Authorization': `Bearer ${token_data}`
                }
                ,
            }
        )
            .then((res) => {
                SetApi(!Api)
            })
            .catch((error) => {

            })
    }, [Checked])
    React.useState(() => {
     if(Boolean(token_data))  { const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };
      
        Axios.get(`https://api.cannabaze.com/UserPanel/Get-GetUserProfile/`,
            config,

        )
            .then((res) => {
                SetChecked({ ...Checked, Email: res.data.EmailBoolean, News_Letter:res.data.NewsLetter,Review_Suggestions:res.data.ReviewSuggestions,
                    Review_Suggestions:res.data.ReviewSuggestions,Push_Notification:res.data.PushNotification,Recommendations:res.data.Recommendations,
                    Savings:res.data.Savings , Order_Updates_Push_Notifications:res.data.OrderupdatePushNotification,Order_Updates_SMS_Notifications:res.data.OrderupdateSMSNotifications

                })
                // SetProfile(res.data)
            })
            .catch((error) => {
                console.error(error)    
            })}
    },[])
    const EmailNotification = [{ heading: "News Letter", subHeading: "Weekly newsletter on the hottest topics and trends in the cannabis community.", Value: "News_Letter" },
    { Value: "Review_Suggestions", heading: "Review Suggestions", subHeading: "Reminders for you to share your experiences about the products and businesses you found on backaroma" }
    ]
    const OrderUpdates = [{ Value: "Order_Updates_Push_Notifications", heading: "Order Updates - Push Notifications", subHeading: "Receive timely updates to track the status of your order" },
    { Value: "Order_Updates_SMS_Notifications", heading: "Order Updates - SMS Notifications", subHeading: "Receive timely updates to track the status of your order" }
    ]
    return (
        <div className="col-12  mt-4">
            <div className="row mx-0 px-0">
                 
                    <div className="notification_col_height2">

                        <section className="notification_content_section">
                            <span className="email_notification_headings">{`Email`}</span>

                        </section>

                    </div>
        
                    <div className="col-lg-8 col-12  EditProfileOnlineOrder_container">
                
                    {
                        EmailNotification.map((items, index) => {

                            return (
                                <div className="row" key={index}>
                                    <div className="col-10 center justify-content-start">

                                        <section className="notification_content_section">
                                            <span className="editProfile_name">{items.heading}</span>
                                            <p className="editProfileLoginParaStyle ellips">{items.subHeading}</p>
                                        </section>

                                    </div>
                                    <div className="col-2 notification_col_ReactSwitch">
                                        <ReactSwitch
                                            onColor={"#D9D9D9"}
                                            onHandleColor={"#31B665"}
                                            height={20}
                                            width={50}
                                            uncheckedIcon={false}
                                            checkedIcon={false}
                                            checked={Checked?.Email === true ? Checked[items.Value] : false}
                                            onChange={() => { handleChange1(items.Value) }}
                                        />
                                    </div>




                                </div>
                            )
                        })
                    }
                  
                    </div>
                    
                  
                        <div className="mt-4 notification_col_height2">

                            <section className="notification_content_section">
                                <span className="email_notification_headings">{`Push Notification`}</span>

                            </section>

                        </div>
                    



                  
                    <div className="col-lg-8 col-12  EditProfileOnlineOrder_container">
                        <div className="row">
                            <div className="col-10 center justify-content-start">

                                <section className="notification_content_section">
                                    <span className="editProfile_name">{`Recommendations`}</span>
                                    <p className="editProfileLoginParaStyle ellips">{`Recommendations of products we think you'll love.`}</p>

                                </section>

                            </div>
                            <div className="col-2 notification_col_ReactSwitch">
                                <ReactSwitch
                                    onColor={"#D9D9D9"}
                                    onHandleColor={"#31B665"}
                                    height={20}
                                    width={50}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    checked={Checked?.Push_Notification}
                                    onChange={() => { handleChange2("Recommendations") }}

                                />
                            </div>



                        </div>
                    </div>
                   
                   
                            <div className="mt-4 notification_col_height2">
                                <section className="notification_content_section">
                                    <span className="email_notification_headings">{`Savings`}</span>
                                    <p className="email_saving_sub_heading">{`Daily updates about savings nearby.`}</p>

                                </section>
                            </div>
                            {/* <div className="col-2 notification_col_ReactSwitch">
                                <ReactSwitch
                                    onColor={"#D9D9D9"}
                                    onHandleColor={"#31B665"}
                                    height={20}
                                    width={60}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    checked={Checked?.Savings}
                                    onChange={() => { handleChange3('Savings') }} />
                            </div> */}
                            <div className="col-lg-8 col-12 EditProfileOnlineOrder_container">
                                
                                {
                                    OrderUpdates.map((items, index) => {
                                        return (
                                            <div className="row" key={index}>
                                                <div className="col-10 center justify-content-start">

                                                    <section className="notification_content_section">
                                                        <span className="editProfile_name">{items.heading}</span>
                                                        <p className="editProfileLoginParaStyle ellips">{items.subHeading}</p>
                                                    </section>

                                                </div>
                                                <div className="col-2 notification_col_ReactSwitch">
                                                    <ReactSwitch
                                                        onColor={"#D9D9D9"}
                                                        onHandleColor={"#31B665"}
                                                        height={20}
                                                        width={50}
                                                        uncheckedIcon={false}
                                                        checkedIcon={false}
                                                        checked={Checked?.Savings === true ? Checked[items.Value] : false}
                                                        onChange={() => { handleChange4(items.Value) }} />
                                                </div>



                                            </div>
                                        )
                                    })
                                }


                            </div>
            </div>
        </div>
    )
}
export default Notification