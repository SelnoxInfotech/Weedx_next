import React,{useState} from 'react'
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Image from 'next/image';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {modifystr} from '@/hooks/utilis/commonfunction'
const Blogheaders = (props) => {
    const [searchtext, setsearchtext] = useState('')
    const [allblogs, setallblogs] = useState([])
    const router= useRouter()
    // function Searchbar(e) {
    //     setsearchtext(e.target.value)
    //     axios.post('https://api.cannabaze.com/UserPanel/Get-BlogSearchApi/', {
    //       "search": e.target.value
    //     }, {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       }
    //     }).then((res) => {
    //       setallblogs(res.data)
    //     })
    //  }
      React.useEffect(() => {
        const getData = setTimeout(() => {
          axios.post(`https://api.cannabaze.com/UserPanel/Get-BlogSearchApi/`, {
            "search": searchtext
          }, {
            headers: {
              'Content-Type': 'application/json',
            }
          }).then((response) => {
            setallblogs(response.data)
          });
        }, 1000)
    
        return () => clearTimeout(getData)
      }, [searchtext])
  return (
    <div className='p-md-0 p-2 d-md-flex  justify-content-between align-items-center'>
        <div className='col-lg-3'> <h1 className='section_main_title'>{props.title}</h1> </div>
        <ClickAwayListener onClickAway={()=>{setsearchtext('');setallblogs([])}}>
          <div className='customsearchbarbox'>
            { Boolean(searchtext === '') && <span><FaSearch/></span>}
            <input type='text' placeholder='search...'  onChange={(e)=>setsearchtext(e.target.value)} value={searchtext}  />
            {Boolean(searchtext !== '') && <span onClick={()=>{setsearchtext('');setallblogs([])}}><RxCross2 /></span>}

            {Boolean(searchtext !== '')  &&  <div className='searchedlsit'>
                  {Boolean(allblogs.length !==0) ? <ul className='p-0'>
                  { allblogs.map((item , index)=>{
                    return <li key={index}>
                      <Link href={`/${router?.pathname?.substring(1)}/${item?.Url_slug === ("" || null || undefined) ? modifystr(item?.Title) : modifystr(item?.Url_slug)}/${item?.id}`}>
                        <div className='searcheslists'>
                          <div className='searcheslists_image'>
                            <Image width={100} height={100} src={item.Image} alt='image'/>
                          </div>
                          <h3>{item.Title}</h3>
                        </div>
                      </Link>
                    </li>
                  }) }
                  </ul>
                  :
                  <div className='loadingspinner'>
                    <p> Your Data is loading......</p>
                  </div>
                
                }
              </div>
            }
          </div>
        </ClickAwayListener>

    </div>
  )
}
export default Blogheaders