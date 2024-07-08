import React from 'react';
import Createcontext from "../../../hooks/context"
import axios from 'axios';
const Zipcode = () => {
    // https://api.cannabaze.com/VendorPanel/Get-CountryFilter/
    const { state } = React.useContext(Createcontext)
    const [AllZipcode, SetZipcode] = React.useState([])
    // console.log(state)
    React.useEffect(() => {
        if (Boolean(state.havecity)   && Boolean(state.City)) {
            axios.post(`https://api.cannabaze.com/VendorPanel/Get-CountryFilter/`,
                {

                    "AdministratorArea": "administrative_area_level_2",
                    "search": state.City.replace(/-/g, " ")

                }
            ).then((res) => {
                res.data === "Not Found" ? SetZipcode([]) : SetZipcode(res.data)
            })
        }
        else {
            Boolean(state.havestate)&& axios.post(`https://api.cannabaze.com/VendorPanel/Get-CountryFilter/`,
                {

                    "AdministratorArea": "administrative_area_level_1",
                    "search": Boolean(state.State) ?  state.State.replace(/-/g, " ") : state.Country

                }
            ).then((res) => {
                res.data === "Not Found" ? SetZipcode([]) : SetZipcode(res.data)
            })
        }
    }, [state])


    // console.log(AllZipcode)
    return (
        <div className='d-flex flex-wrap ' style={{ gap: "5px" }}>
        {
            AllZipcode?.length === 0 ? <p>no zip code  {state.Location}</p> :
            AllZipcode?.map((data , index) => {
                // console.log(data)
                return <p key={index}> { data.zip} |</p>
            })
        }

    </div>
    );
};

export default Zipcode;