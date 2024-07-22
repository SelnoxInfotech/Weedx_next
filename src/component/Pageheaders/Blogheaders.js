import SearchBar from '@mkyy/mui-search-bar';
import React from 'react'
import axios from "axios";

const Blogheaders = ({setallblogs}) => {
  const [searchtext, setsearchtext] = React.useState('')
    function Searchbar(e) {
        setsearchtext(e)
        axios.post('https://api.cannabaze.com/UserPanel/Get-BlogSearchApi/', {
          "search": e
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          setallblogs(res.data)
        })
      }
  return (
    <div className='p-md-0 p-2 d-md-flex  justify-content-between align-items-center'>
        <div className='col-lg-3'>
            <h1 className='section_main_title'>{"Blogs"}</h1>
        </div>
       <SearchBar value={searchtext}  onChange={(e)=>Searchbar(e)} style={{ background: "#FFFFF", border: "1px solid #31B665" }} width={"100%"} placeholder="Search Menu" />
    </div>
  )
}
export default Blogheaders