import React from 'react'
// import Newsletter from '../../Component/Newsletter/HomePageDealsSignup';
// import { TermsAndConditions } from '../../Component/ScoPage/CommenpageSeo';
import { useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Termsconditions = () => {
  const location = useLocation()
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
       
       if(location.hash === `#${item.id}`){
       
         window.scroll(0 , item.topheigth - divElement)
       }
    })
  }, [location,allHeigths])

  return (
    <>
      <div className='term_condition'>
        <TermsAndConditions></TermsAndConditions>
        <div className="container-fluid">
          <div className="tc_hero">
            <h1 className="page_heading">  Website Terms and Conditions  </h1>
          </div>

          <div className="row tc_content justify-content-between" >
          <div className="col-md-7 tc_main-centent"> 
              <ol ref={ref} >
                <li id='acceptance_of_terms'>
                  <span className='question'>Acceptance of Terms</span>
                  <span className="answer">
                      By accessing or using weedx.io, you agree to abide by these 
                      Terms and Conditions. If you do not agree with any part of these 
                      terms, you should not use the website.
                  </span>
                </li>
                <li id='eligibility_to_use_website'>
                  <span className='question'>Eligibility to Use Website</span>
                  <span className="answer">
                    By using weedx.io, you represent and warrant that you are at 
                    least 18 years of age or the legal age for cannabis consumption 
                    in your jurisdiction. If you are under the legal age for cannabis 
                    consumption in your jurisdiction, you may not use this website.
                  </span>
                </li>
                <li id='verification_of_age'>
                  <span className='question'>Verification of Age</span>
                  <span className="answer">weedx.io reserves the right to verify the age of users and may 
                        request additional information or documentation to confirm 
                        eligibility. Failure to provide accurate age information or comply 
                        with age verification requests may result in the suspension or 
                        termination of your account and access to the website.</span>
                </li>
                <li id='privacy_policy'>
                  <span className='question'>Privacy Policy</span>
                  <span className="answer">Your use of the website is also governed by our <Link to={'/privacy-policy'}>Privacy Policy</Link>, 
                    which can be found. By using the website, you consent to 
                    the practices outlined in the <Link to={'/privacy-policy'}>Privacy Policy</Link>.</span>
                </li>
                <li id='user_registration'>
                  <span className='question'>User Registration</span>
                  <span className="answer">
                    To access certain features of the website, you may be required 
                    to register for an account. You are responsible for maintaining 
                    the confidentiality of your account information and for all 
                    activities that occur under your account.
                  </span>
                </li>
                <li id='online_ordering_&_Delivery_Services'>
                  <span className='question'> Online Ordering and Delivery Services </span>
                  <span className="answer">
                    <b>a.</b> Online ordering and delivery services may be available in certain areas. Users are responsible for 
                    compliance with local laws regarding the purchase and consumption of cannabis.
                    </span>
                    <span className="answer">
                    <b>b.</b> weedx.io is not responsible for the quality, safety, or legality of the products offered by dispensaries or
                    retailers listed on the platform.
                  </span>
                </li>
                <li id='dispensary_and_retailer_listings'>
                  <span className='question'>  Dispensary and Retailer Listings </span>
                  <span className="answer">
                  <b>a.</b> Dispensary and retailer listings are provided for informational purposes only. weedx.io does not 
                  endorse or guarantee the quality of products or services offered by listed dispensaries or retailers.
                  </span>
                  <span className="answer">
                  <b>b.</b> Users are encouraged to conduct their research and due diligence before making any purchases.
                   </span>
                </li>
                <li id='compliance_with_local_laws'>
                  <span className='question'>   Compliance with Local Laws</span>
                  <span className="answer">
                    Users are responsible for ensuring compliance with local laws and regulations regarding the possession, 
                    purchase, and use of cannabis. weedx.io does not provide legal advice.
                  </span>
                </li>
                <li id='intellectual_property'>
                  <span className='question'> Intellectual Property </span>
                  <span className="answer">
                  <b> {`a.`}</b> {`The content and materials on weedx.io, including logos, text, images, and trademarks, are protected by 
                  intellectual property rights and are the property of weedx.io.`}
                  </span>
                  <span className="answer">
                  <b>{`b.`}</b>{` Users may not use, reproduce, or distribute any content from the website without prior written 
                  permission.`}
                  </span>
                </li>
                <li id='limitation_of_liability'>
                  <span className='question'>  Limitation of Liability</span>
                  <span className="answer">
                    {`  weedx.io is not liable for any direct, indirect, incidental, special, or consequential damages arising out of 
                      or in any way connected to the use of the website.`}

                  </span>
                </li> 
                <li id='changes_to_terms'>
                  <span className='question'> Changes to Terms</span>
                  <span className="answer">
                {`  weedx.io reserves the right to modify or revise these Terms and Conditions at any time without notice. 
                    Your continued use of the website after such changes will constitute your acceptance of the revised 
                    terms.`}
                  </span>
                </li>
                <li id='termination'>
                  <span className='question' >Termination</span>
                  <span className="answer">
                   {` weedx.io reserves the right to terminate or suspend your account and access to the website at its 
                    discretion, without prior notice, for any violation of these terms or for any other reason.`}

                  </span>
                </li>

              </ol>
          </div>
          <div className="col-md-4"> 
            <div className="tc_topic_list">
              <div className="heading_box">
              <h3 className='text-white m-0 sideTableHeading'>Table of Contents</h3>
              </div>
              <ul>
                 <Link to={{ hash:`#acceptance_of_terms`,}} > <li className={location.hash === `#acceptance_of_terms` && "activeTable"  }>1. Acceptance of Terms </li></Link>
                 <Link to={{ hash:`#eligibility_to_use_website`,}} > <li className={location.hash ===`#eligibility_to_use_website` && "activeTable"  }> 2.  Eligibility to Use Website </li></Link>
                 <Link to={{ hash:`#verification_of_age`,}} > <li className={location.hash === `#verification_of_age` && "activeTable"  }>  3. Verification of Age  </li></Link>
                 <Link to={{ hash:`#privacy_policy`,}} > <li className={location.hash ===`#privacy_policy` && "activeTable"  }>  4.  Privacy Policy</li></Link>
                 <Link to={{ hash:`#user_registration`,}} > <li className={location.hash === `#user_registration` && "activeTable"  }> 5.  User Registration </li></Link>
                 <Link to={{ hash:`#online_ordering_&_Delivery_Services`,}} > <li className={location.hash === `#online_ordering_&_Delivery_Services` && "activeTable"  }> 6.   Online Ordering & Delivery Services</li></Link>
                 <Link to={{ hash:`#dispensary_and_retailer_listings`,}} > <li className={location.hash ===`#dispensary_and_retailer_listings` && "activeTable"  }>  7. Dispensary and Retailer Listings </li></Link>
                 <Link to={{ hash:`#compliance_with_local_laws`,}} > <li className={location.hash ===`#compliance_with_local_laws` && "activeTable"  }>  8.  Compliance with Local Laws </li></Link>
                 <Link to={{ hash:`#intellectual_property`,}} > <li className={location.hash === `#intellectual_property` && "activeTable"  }>  9. Intellectual Property </li></Link>
                 <Link to={{ hash:`#limitation_of_liability`,}} > <li className={location.hash ===`#limitation_of_liability` && "activeTable"  }> 10.  Limitation of Liability </li></Link>
                 <Link to={{ hash:`#changes_to_terms`,}} > <li className={location.hash ===`#changes_to_terms` && "activeTable"  }>  11. Changes to Terms  </li></Link>
                 <Link to={{ hash:`#termination`,}} > <li className={location.hash === `#termination` && "activeTable"  }> 12. Termination  </li></Link>
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

export default Termsconditions