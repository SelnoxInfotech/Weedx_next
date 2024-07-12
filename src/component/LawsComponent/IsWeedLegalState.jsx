import React from "react"
const IsWeedLegalState = ({head , description2}) => {
    const myRef = React.useRef();
    return (
    
            <div  ref={myRef} className={head.replaceAll(' ','_')}>
 
                <h2 id="isweedLegalHeadings" className="isweedLegalHeading">{head}</h2>

                <div className="col-12"  >
                    <section className="isWeedLegalParagraph">
                       {description2}
                    </section>
                </div>

            </div>

      
    )
}
export default IsWeedLegalState