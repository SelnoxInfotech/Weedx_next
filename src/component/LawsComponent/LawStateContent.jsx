import React, {useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
const LawStateContent = ({ head }) => {
  let location = useRouter()
    const [Selected, SetSelected] = React.useState(1)  
    const [divElementHeight, setDivElementHeight] = useState(0);
    useEffect(() => {
        if (typeof document !== 'undefined') {
            const divElement = document.getElementById('Navbar_box');
            setDivElementHeight(divElement ? divElement.clientHeight : 0);
        }
    }, []);
    return (
            <div className="col-lg-11 col-md-12 LawStateContentsContainer " style={{top : divElementHeight}}>
                <div className="heading_box socialIconsContainer"> <h3 className='text-white m-0 sideTableHeading'>Table of Contents</h3> </div>
                <div className="col-12 LawStateContentOlsCol">
                    <ol className="LawStateContentOls" >{head?.map((items, index) => {
                        return (
                                <Link href={{ hash:`#${items.title.replaceAll(' ','_')}`,}}  key={index}>
                                     <li className={location.hash === `#${items.title.replaceAll(' ','_')}` ? 'tableListActive py-3 tableList ' : "py-3 tableList  "}  id={items.title.replaceAll(' ','_')} style={{ color: Selected === items.id ? "#31B665" : "" }} >{items.title}</li>
                                </Link>
                        )
                    })}
                    </ol>
                </div>
            </div>
    )
}
export default LawStateContent