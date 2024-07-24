import React, {useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
const LawStateContent = ({ head , refrence }) => {
    const router = useRouter();
    
        React.useEffect(() => {
          refrence.current.childNodes.forEach((item, index) => {
            window.scrollTo((item.offsetTop+item.clientHeight), 0);
          });
        
        }, [router.query.slug]);
      
       
   
        return (
            <div className="col-lg-11 col-md-12 LawStateContentsContainer" >
                <div className="heading_box socialIconsContainer"> <h3 className='text-white m-0 sideTableHeading'>Table of Contents</h3> </div>
                <div className="col-12 LawStateContentOlsCol">
                    <ol className="LawStateContentOls" >{head?.map((items, index) => {
                        return( <Link href={{ hash:`#${items.title.replaceAll(' ','_')}`,}}  key={index}>
                                <li className={router.pathname.includes(`#${items.title.replaceAll(' ','_')}`) ? 'tableListActive py-3 tableList ' : "py-3 tableList  "}  id={items.title.replaceAll(' ','_')} >{items.title}</li>
                            </Link> )
                        })}
                    </ol>
                </div>
            </div>
    )
}
export default LawStateContent