import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
const Termandcondition = ({refplace}) => {
  const router = useRouter()

  return (
    <div className="tc_topic_list">
        <div className="heading_box"><h3 className='text-white m-0 sideTableHeading'>{`Table of Contents`}</h3></div>
        <ul>
            <Link href={{ hash:`#acceptance_of_terms`,}} > <li className={router.pathname.includes( `#acceptance_of_terms`) && "activeTable"  }>1. Acceptance of Terms </li></Link>
            <Link href={{ hash:`#eligibility_to_use_website`,}} > <li className={router.pathname.includes(`#eligibility_to_use_website`) && "activeTable"  }> 2.  Eligibility to Use Website </li></Link>
            <Link href={{ hash:`#verification_of_age`,}} > <li className={router.pathname.includes( `#verification_of_age`) && "activeTable"  }>  3. Verification of Age  </li></Link>
            <Link href={{ hash:`#privacy_policy`,}} > <li className={router.pathname.includes(`#privacy_policy`) && "activeTable"  }>  4.  Privacy Policy</li></Link>
            <Link href={{ hash:`#user_registration`,}} > <li className={router.pathname.includes( `#user_registration`) && "activeTable"  }> 5.  User Registration </li></Link>
            <Link href={{ hash:`#online_ordering_&_Delivery_Services`,}} > <li className={router.pathname.includes( `#online_ordering_&_Delivery_Services`) && "activeTable"  }> 6.   Online Ordering & Delivery Services</li></Link>
            <Link href={{ hash:`#dispensary_and_retailer_listings`,}} > <li className={router.pathname.includes(`#dispensary_and_retailer_listings`) && "activeTable"  }>  7. Dispensary and Retailer Listings </li></Link>
            <Link href={{ hash:`#compliance_with_local_laws`,}} > <li className={router.pathname.includes(`#compliance_with_local_laws`) && "activeTable"  }>  8.  Compliance with Local Laws </li></Link>
            <Link href={{ hash:`#intellectual_property`,}} > <li className={router.pathname.includes( `#intellectual_property`) && "activeTable"  }>  9. Intellectual Property </li></Link>
            <Link href={{ hash:`#limitation_of_liability`,}} > <li className={router.pathname.includes(`#limitation_of_liability`) && "activeTable"  }> 10.  Limitation of Liability </li></Link>
            <Link href={{ hash:`#changes_to_terms`,}} > <li className={router.pathname.includes(`#changes_to_terms`) && "activeTable"  }>  11. Changes to Terms  </li></Link>
            <Link href={{ hash:`#termination`,}} > <li className={router.pathname.includes( `#termination`) && "activeTable"  }> 12. Termination  </li></Link>
        </ul>
  </div>
  )
}

export default Termandcondition