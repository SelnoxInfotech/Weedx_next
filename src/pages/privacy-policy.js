import React from 'react'
import Newsletter from '@/Component/home/HomePageDealsSignup/';
// import {PrivacyPolicy}  from "../../Component/ScoPage/CommenpageSeo";
import { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
const Privacypolicy = () => {

  const router = useRouter()
  const ref = useRef(null);
  const [allHeigths,setallheight] = React.useState([])
 

  React.useEffect(()=>{
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    }); 
        let data =[]
        ref.current.childNodes.forEach((item , index)=>{
    
            data.push({
                topheigth: item.offsetTop,
                id : item.id,
                height : item.clientHeight
            })   
        })
        setallheight(data)
    
  },[])

React.useEffect(() => {
     let divElement = document.getElementById('Navbar_box')?.clientHeight
      
       allHeigths.forEach((item)=>{
      
    })
  }, [allHeigths])
  return (
    <>
    <div className='term_condition'>
      {/* <PrivacyPolicy></PrivacyPolicy> */}
      <div className="container-fluid">
        <div className="tc_hero">
          <h1 className="page_heading">  Weedx.io Privacy policy  </h1>
        </div>

        <div className="row tc_content justify-content-between">
         <div className="col-md-7 tc_main-centent"> 
            <ol  ref={ref}>
              <li id='introduction'>
                <span className='question'> {`Introduction`}</span>
                <span className="answer">
               {` Welcome to weedx.io (the "Website"), owned and operated by selnox infotech  ("we," "us," "our"). This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you access or use our Website.`}
                </span>
              </li>
              <li id='information_we_collect'>
                <span className='question'>{`Information We Collect`}</span>
                <span className="answer">
              {`  We may collect the following types of information:

                Personal Information: This may include your name, email address, contact information, and any other information you provide when using our Website.

                Usage Information: We may collect information about how you access and use our Website, including your IP address, device information, browser type, and pages you visit.`}
                </span>
              </li>
              <li id='how_we_use_your_information'>
                <span className='question'>{`How We Use Your Information`}</span>
                <span className="answer">
                    {`We may use your information for various purposes, including:
                    Providing and improving our services.
                    Communicating with you, including responding to your inquiries and requests.
                    Customizing and enhancing your experience on our Website.
                    Complying with legal and regulatory requirements.`}
              </span>
              </li>
              <li id='sharing_your_information'>
                <span className='question'>{`Sharing Your Information`}</span>
                <span className="answer">
              {`  We may share your information with third parties for the following purposes:
                Service Providers: We may share your information with third-party service providers who assist us in delivering and improving our services.
                Legal Requirements: We may disclose your information to comply with legal obligations or respond to lawful requests from authorities.`}
                </span>
              </li>
              <li id='cookies_and_tracking_technologies'>
                <span className='question'>{`Cookies and Tracking Technologies`}</span>
                <span className="answer">
             {`   We may use cookies and similar tracking technologies to collect information about your browsing activities on our Website. You can manage your cookie preferences through your browser settings.`}
                </span>
              </li>
              <li id='your_choices'>
                <span className='question'> {`Your Choices`} </span>
                <span className="answer">
                {`You can access and update your personal information by [provide instructions for updating information]. You may also opt-out of receiving promotional communications from us.`}

                </span>
              </li>
              <li id='security'>
                <span className='question'> {`Security`} </span>
                <span className="answer">
               {` We take reasonable measures to protect your information from unauthorized access and use. However, no data transmission over the internet is entirely secure, and we cannot guarantee the security of your information.`}
                </span>
              </li>
              <li id="children's_privacy">
                <span className='question'>{`Children's Privacy`}</span>
                <span className="answer">
              {`  Our Website is not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you believe we have collected information from a child under 18, please contact us immediately.`}
                </span>
              </li>
              <li id='changes_to_this_privacy_policy'>
                <span className='question'>{`Changes to This Privacy Policy`}</span>
                <span className="answer">
               {` We may update this Privacy Policy to reflect changes to our information practices. We will post the updated Privacy Policy on this page with a revised "Last Updated" date.`}
                </span>
              </li>
              <li id='contact_us'>
                <span className='question'>{`Contact Us`}</span>
                <span className="answer">
                {`If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at `}<a  href = "mailto:info@weedx.io">{`info@weedx.io`}</a> .
                </span>
              </li> 
            </ol>
         </div>
         <div className="col-md-4"> 
           <div className="tc_topic_list">
            <div className="heading_box">
            <h3 className='text-white m-0 sideTableHeading'>{`Table of Contents`}</h3>
            </div>
            <ul>
               <Link href={{ hash:`#introduction`,}} ><li  className={router.pathname.includes( "#introduction") && "activeTable"  }>{`1. Introduction`} </li></Link>
               <Link href={{ hash:`#information_we_collect`,}} ><li  className={router.pathname.includes( "#information_we_collect") && "activeTable"  }>{`2. Information We Collect`}</li></Link>
               <Link href={{ hash:`#how_we_use_your_information`,}} ><li className={router.pathname.includes( "#how_we_use_your_information") && "activeTable"  }> {`3. How We Use Your Information`}  </li></Link>
               <Link href={{ hash:`#sharing_your_information`,}} ><li className={router.pathname.includes( "#sharing_your_information") && "activeTable"  }>{`4. Sharing Your Information`}</li></Link>
               <Link href={{ hash:`#cookies_and_tracking_technologies`,}} ><li  className={router.pathname.includes( "#cookies_and_tracking_technologies") && "activeTable"  }>{` 5. Cookies and Tracking Technologies `}</li></Link>
               <Link href={{ hash:`#your_choices`,}} ><li  className={router.pathname.includes( "#your_choices") && "activeTable"  }> {`6. Your Choices`}</li></Link>
               <Link href={{ hash:`#security`,}} ><li  className={router.pathname.includes( "#security") && "activeTable"  }> {` 7. Security `}</li></Link>
               <Link href={{ hash:`#children's_privacy`,}} ><li className={router.pathname.includes( "#children's_privacy") && "activeTable"  }> {`8. Children's Privacy`} </li></Link>
               <Link href={{ hash:`#changes_to_this_privacy_policy`,}} ><li  className={router.pathname.includes( "#changes_to_this_privacy_policy") && "activeTable"  }>  {`9. Changes to This Privacy Policy`} </li></Link>
               <Link href={{ hash:`#contact_us`,}} ><li  className={router.pathname.includes( "#contact_us") && "activeTable"  }>{`10. Contact Us`} </li></Link>
            </ul>
           </div>
         </div>
        </div>
      </div>
    </div>
    <Newsletter></Newsletter>
    </>
  )
}

export default Privacypolicy