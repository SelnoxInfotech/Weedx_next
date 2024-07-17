import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import Content from "./LawContentsJson"
import { modifystr } from "@/hooks/utilis/commonfunction";


const LawsOptions = () => {
    const [Values, SetValues] = React.useState([])
    return (
        <div className="col-12 lawsContainer my-4">
                {Content?.map((items ,index) => {
                return (
                    <ol className="laws_ol" key={index}>
                        <li className="lawoptionMainList " >
                            <div className="col-12 lawsListStyle px-2" onClick={() => SetValues({ ...Values, [items.id]: !Values[items.id] })}>
                                <span className="listCountryName">{items.name}</span><span><MdOutlineKeyboardArrowDown color="#707070" size={22} /></span>
                            </div>
                            {Values[items.id] === true && (
                                <div className="border lawsDropDownList px-2 col-12 ">
                                    <ol className="lawssoptionStyle law_Inner_OPtionList_Ol">
                                        {items?.state?.map((val, index) => {
                                            return (

                                                <Link href={{
                                                    pathname: `/learn/laws-and-regulation/${'cannabis-Law-in-'+modifystr(val.name)}/${val.id }`,
                                                }}
                                                    key={index}
                                                >
                                                    <li >
                                                        <Image src={'/image/weedleaf.webp'} 
                                                        className="lawOPtionListImage" 
                                                        width={100}
                                                        unoptimized={true}
                                                        height={100}
                                                        alt={val.name}
                                                        title={val.name}
                                                        />
                                                        <span className="lawOptionCountry_state_List">{val.name}</span>
                                                    </li>
                                                </Link>
                                            )
                                        })}
                                    </ol>

                                </div>
                            )}
                        </li>
                    </ol>
                )

            })}

        </div>
    )
}
export default LawsOptions