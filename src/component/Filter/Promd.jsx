import React, { useState } from "react"
import { FiChevronRight, FiChevronLeft } from "react-icons/fi"
import { IoIosArrowDown } from "react-icons/io"
import useStyles from "../../../Style"

import ClickAwayListener from '@mui/base/ClickAwayListener';
import Axios from "axios"
import _ from "lodash"
import { FormControl, Grid, MenuItem, Select } from "@mui/material"
import SearchBar from 'material-ui-search-bar';
import { useParams, useNavigate, useLocation } from "react-router-dom"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { PriceFilter } from "../../../Api/Api"
import Createcontext from "../../../Hooks/Context"
import Loader from "../Loader/Loader";
const ProductFilter = ({ ProductFilterData, arr, Setarr1, Store_id }) => {
    const classes = useStyles()
    const { id } = useParams()
    const { state, dispatch } = React.useContext(Createcontext)
    const [select, setselect] = useState("Sort by A to Z")
    const [weightitems, setweightitems] = useState([])
    const [loading, setloading] = useState(false)
    const [stainitems, setstainitems] = useState([])
    const [OpenEvent, SetOpenEvent] = useState(null);
    const [OpenSortedData, SetOpenSortedData] = useState(null);
    const [Filter, SetFilter] = useState([])
    const [SubCategory, SetSubCategory] = useState([])
    const [catname, setcatname] = useState('')
    const [catname2, setcatname2] = useState('')
    const SortedArrayData = [{ Id: 1, name: "Sort by" }]
    const SortedData = [{ type: "Sort by A to Z" }, { type: "Sort by Z to A" }, { type: "Sort by low to high" }, { type: "Sort by high to low" }]
    const location = useLocation()
    const [value, setValue] = React.useState();
    function valuetext(value) {
        return `${value}°C`;
    }
    const handleChangepp = (event, newValue) => {
        setValue(newValue);
    };
    const HandleOpenSortedData = (Id, name) => {
        if (catname2 === name) {
            SetOpenSortedData(null)
            setcatname2(null)
            return false;
        } else {
            SetOpenSortedData(Id)

            setcatname2(name)
        }
    }
    const HandleOpenEvent = (Id, Name) => {
        SetFilter([])
        SetSubCategory([])

        if (catname === Name) {
            SetOpenEvent(null)
            setcatname(null)
            return false;
        } else {
            SetOpenEvent(Id)

            setcatname(Name)
        }
        if (Name === "Category") {
            setloading(true)
            Axios.post("https://api.cannabaze.com/UserPanel/Get-CategoryByStore/ ",
                {

                    "Store_Id": parseInt(Store_id)

                }
            ).then(async response => {
                const d = []
                response.data.map((data) => {
                    d.push(data[0])
                    var uniqueUsersByID = _.uniqBy(d, 'id'); //removed if had duplicate id

                    SetFilter(uniqueUsersByID)
                    return data
                })
                setloading(false)
            }).catch(
                function (error) {
                })


        }
        else if (Name === "Brand") {
            setloading(true)
            Axios(`https://api.cannabaze.com/UserPanel/Get-BrandByStore/${Store_id}`).then(response => {

                SetFilter(_.uniqBy(response.data, 'name'))
                setloading(false)
            }).catch(
                function (error) {
                    alert("SomeThing Goes wrong")
            })

        }
        else if (Name === "Strain"){
          
            SetFilter([{ id: "I", name: "Indica", }, { id: "Sativa", name: "Sativa", }, { id: "hybrid", name: "hybrid", }, { id: "CBD", name: "CBD", }])

        } else if (Name === "Weight") {
            setloading(true)
            Axios.get("https://api.cannabaze.com/UserPanel/Get-Net_Weight/").then((res) => {

                let newArr = res.data.data.map((item) => {

                    return {
                        id: item.id,
                        name: item.Weight
                    }
                })

                SetFilter(newArr)
                setloading(false)
            })
        }else if(Name === "Unit"){
            SetFilter([{ id: "unite", name: "Product By Units", }])
        }
        SetOpenSortedData(null)
        setweightitems([])
    }
    function Category_Drop(i, name , values={}){
     
        if (name === "Category") {

            Axios.post(`https://api.cannabaze.com/UserPanel/Get-filterSubcategorybyStoreandCategory/`, {

                "Store_Id": Store_id,
                "Category_Id": i

            }).then(response => {
                SetSubCategory(_.uniqBy(response.data, "id"))
            }).catch(
                function (error) {
                })
        } else if (name === "Brand") {
            dispatch({ type: 'Loading', Loading: true })
            Axios(`https://api.cannabaze.com/UserPanel/Get-ProductByStoreAndBrand/${id}/${i}`, {


            }).then(response => {
                Setarr1(response.data)
                dispatch({ type: 'Loading', Loading: false })
            }).catch(
                function (error) {

                })
        } else if (name === "Weight") {
            if (weightitems.includes(values.name)) {
                let newerr = weightitems.filter((item) => {
                    return item !== values.name
                })
                setweightitems(newerr)
            } else {
                setweightitems([...weightitems, values.name])
            }
        } else if (name === "Strain") {
            if (stainitems.includes(values.name)) {
                let newerr = stainitems.filter((item) => {
                    return item !== values.name
                })
                setstainitems(newerr)
            } else {
                setstainitems([...stainitems, values.name])
            }
        } 
    }
    React.useEffect(() => {
        if (weightitems.length !== 0) {
            Axios.post('https://api.cannabaze.com/UserPanel/WeightFilter/', {
                "store": Store_id,
                "weight": weightitems,
            }).then((res) => {
                Setarr1(res.data)
            })
        } else {
            Axios.get(`https://api.cannabaze.com/UserPanel/Get-ProductAccordingToDispensaries/${id}`, {
            }).then(response => {
                Setarr1(response.data)
            })
        }
    }, [weightitems])
    React.useEffect(() => {
        if (stainitems.length !== 0) {
            Axios.post('https://api.cannabaze.com/UserPanel/StrainFilterProduct/', {
                "store": Store_id,
                "strain": stainitems,
            }).then((res) => {
                Setarr1(res.data)
            })
        } else {
            Axios.get(`https://api.cannabaze.com/UserPanel/Get-ProductAccordingToDispensaries/${id}`, {
            }).then(response => {
                Setarr1(response.data)
            })
        }
    }, [stainitems])
    function FilterSubCategorydata(SubCategoryid, SubCategory_name, categoryName) {
        dispatch({ type: 'Loading', Loading: true })
        Axios.post(`https://api.cannabaze.com/UserPanel/Get-filterProductbyStoreandSubCategory/`, {
            "Store_Id": Store_id,
            "SubCategory_Id": SubCategoryid
        }).then(async response => {
            dispatch({ type: 'Loading', Loading: false })
            Setarr1(response.data)
            // navigate(`${location.pathname.slice(0, 16) === "/weed-deliveries" ? "/weed-deliveries" : "/weed-dispensaries"}/${StoreName.replace(/\s/g, '-').toLowerCase()}/${"menu"}/${categoryName?.toLowerCase()}/${SubCategory_name?.toLowerCase().replace(/\s/g, '-')}/${SubCategoryid}`)
        }).catch(
            function (error) {
                alert("Something Goes Wrong")
            })
    }
    const handleChange = (event) => {

        setselect(event.target.value)
        if (event.target.value === 'Sort by A to Z') {
            Axios.get(`https://api.cannabaze.com/UserPanel/Get-SortingFilterAtoZ/${id}`).then((response) => {
                let newdata = response.data.map((res) => {

                    return res
                })
                Setarr1(newdata)
            }).catch((error) => {
                console.trace(error)

            })
        } else if (event.target.value === 'Sort by Z to A') {
            Axios.get(`https://api.cannabaze.com/UserPanel/Get-SortingFilterAtoZ/${id}`).then((response) => {
                let newdata = response.data.map((res) => {

                    return res
                })
                Setarr1(newdata.reverse())
            }).catch((error) => {
                console.trace(error)

            })
        } else if (event.target.value === 'Price low to high') {
            Axios.get(`https://api.cannabaze.com/UserPanel/HighPriceToLowPrice/${id}`).then((response) => {
                let newdata = response.data.map((res) => {

                    return res[0]
                })
                Setarr1(newdata)

            }).catch((error) => {
                console.trace(error)
            })
        } else {
            Axios.get(`https://api.cannabaze.com/UserPanel/HighPriceToLowPrice/${id}`).then((response) => {
                let newdata = response.data.map((res) => {

                    return res[0]
                })
                Setarr1(newdata.reverse())

            }).catch((error) => {
                console.trace(error)
            })
        }
    };
  
    const [searchtext, setsearchtext] = React.useState("")
    function searchHnadelchange(e) {

        let timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
            if (searchtext !== '') {

                dispatch({ type: 'Loading', Loading: true })
                Axios.post(`https://api.cannabaze.com/UserPanel/Get-SearchFilter/`, 
                {
                    search:e,
                    store:Store_id
                }).then(response => {
                    let newdata = response.data.filter((item) => {
                        return item.Store_id === Store_id
                    })
                    Setarr1(newdata)
                    dispatch({ type: 'Loading', Loading: false })
                }).catch(
                    function (error) {
                    })
            } else {

                Setarr1(arr)
            }

        }, 1500);

    };

    React.useEffect(() => {


        const timer = setTimeout(() => {
            value !== undefined && dispatch({ type: 'Loading', Loading: true })
            value !== undefined &&

                PriceFilter(value, Store_id).then((res) => {
                    Setarr1(res.data)
                    dispatch({ type: 'Loading', Loading: false })
                }).catch(() => {
                    // navigate('/fourzerothree')   
                    dispatch({ type: 'Loading', Loading: false });
                })
        }, 1500);

        return () => clearTimeout(timer)
    }, [value])

    return (
        <>
            <div className="col-12  p-0 mt-4 product_search_and_select">
                <div className="col-2 product_search_bar">
                   
                    <div  className="form-outline" data-mdb-input-init>
                        <input value={searchtext} onChange={(e) => {
                            searchHnadelchange(e.target.value)
                            setsearchtext(e.target.value) }}
                        placeholder="Search.."
                         type="search" 
                         id="form1" 

                         className={searchtext.length !== 0 ? "form-control customSearchBar" : "form-control customSearchBar customSearchBarsearchicon"} />
                         <label className="form-label" for="form1">Search</label> 
                    </div>
                </div>
                <div className="col-10 product_select">
                    <Grid container display={{ xs: "none", md: "contents", lg: "contents" }}>

                        <FormControl className={classes.muiSelect}  >
                            <Select
                                labelId="demo-simple-select-label"
                                value={select}
                                onChange={handleChange}

                                size="small"
                                defaultValue={'Sort by A to Z'}
                                style={{ width: "160px", height: "36px" }}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >

                                <MenuItem value={"Sort by A to Z"}>  Sort by A to Z </MenuItem>
                                <MenuItem value={"Sort by Z to A"}>Sort by Z to A</MenuItem>
                                <MenuItem value={"Price low to high"}>Price low to high</MenuItem>
                                <MenuItem value={"Price hight to low"}>Price high to low</MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>
                </div>
            </div>
            <div className="col-lg-2 col-md-12 gap-sm-0 gap-2 prod_cat_left_sec  center">

                {ProductFilterData.map((ele, index) => {
                    const { Id, Name, Icons } = ele;
                    return (
                        <div key={index} className="filter_manu_items">
                            <div className="col-12 d-flex align-items-center prodCat_gap product_category_border " onClick={() => HandleOpenEvent(Id, Name)}>


                                <p className="m-0 prod_filter_icon" >{Icons}</p>


                                <p className="m-0 product_filter_name">{Name}</p>



                                <p className="m-0 brand_right_arrow">{(Id === OpenEvent) ? <IoIosArrowDown className={classes.muiIcons} /> : <FiChevronRight className={classes.muiIcons} />}</p>


                            </div>

                            {(Id === OpenEvent) ?
                                (
                                    <ClickAwayListener onClickAway={() => {
                                        SetOpenEvent(null)
                                    }}>
                                        {
                                            loading ?  (location.pathname.includes('/menu-integration') ? <React.Fragment></React.Fragment>:<Loader/>)
                                                :
                                                <div className=" product_category_border product_category_dropdown" id="Related_Brand_Data" >

                                                    {
                                                        Filter.length !== 0 ?
                                                            Filter?.map((data) => {

                                                                return (
                                                                    <div>
                                                                        <div className="col-10 product_category_dropdown_cursor">
                                                                            {ele.Name === "Category" ? <p className="m-0" onClick={() => { Category_Drop(data.id, ele.Name) }}>{data.name}</p> : <div>  <input type="checkbox" onChange={() => { Category_Drop(data.id, ele.Name, data) }} id={data.name} name={data.name} value={data.name} /> <label htmlFor={data.name} className="m-0" >{data.name}</label> </div>}
                                                                        </div>
                                                                        {
                                                                            SubCategory?.map((SubCategory) => {
                                                                                return (
                                                                                    SubCategory.CatgoryId === data.id
                                                                                    &&
                                                                                    <div className="col-10 px-2 py-0 product_sub_category_dropDown_cursor"  >
                                                                                        <input type="checkbox" id={data.name} name={data.name} value={data.name} />  <label htmlFor={data.name} onClick={() => { FilterSubCategorydata(SubCategory.id, SubCategory.SubCategory_name, data.name, SubCategory.Store_id) }}>{SubCategory.SubCategory_name}</label>

                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                )
                                                            })
                                                            :
                                                            Id === 4 ?
                                                                <Box >
                                                                    <Slider
                                                                        getAriaLabel={() => "Price range"}
                                                                        sx={{
                                                                            '& .MuiSlider-thumb': {
                                                                                color: "#31B665"
                                                                            },
                                                                            '& .MuiSlider-track': {
                                                                                color: "#31B665"
                                                                            },
                                                                            '& .MuiSlider-rail': {
                                                                                color: "black"
                                                                            },
                                                                            '& .MuiSlider-active': {
                                                                                color: "green"
                                                                            }
                                                                        }}
                                                                        value={value}
                                                                        onChange={handleChangepp}
                                                                        getAriaValueText={valuetext}
                                                                        valueLabelDisplay="auto"
                                                                        min={1}
                                                                        max={1000}
                                                                        defaultValue={[100, 500]}
                                                                    />
                                                                </Box> :
                                                                <p className="m-0">No Category Found</p>
                                                    }
                                                </div>
                                        }
                                    </ClickAwayListener>
                                )
                                :
                                ""
                            }
                        </div>
                    )


                })

                }
                <Grid container display={{ xs: "inlineBlock", md: "none", lg: "none" }} style={{ width: 'auto', borderWidth: '1px', borderStyle: 'solid', borderColor: 'gainsboro' }}>

                    {SortedArrayData.map((ele, index) => {
                        const { Id, name } = ele
                        return (
                            <div key={index} onClick={() => HandleOpenSortedData(Id, name)}>

                                <ol className="productFilter_sortedList prodfilterSortedListGap">
                                    <li>
                                        {(Id === OpenSortedData) ? <FiChevronLeft /> : ""}

                                    </li>
                                    <li className="fontStyle">{name}</li>
                                    <li>
                                        {(Id === OpenSortedData) ? "" : <FiChevronRight />}

                                    </li>
                                </ol>



                                {(Id === OpenSortedData) ?
                                    (
                                        <ClickAwayListener onClickAway={() => { SetOpenSortedData(null) }}>
                                            <div className="border product_Sorted_filter_dropdown">
                                                <ol className="productFilter_sortedList">{SortedData.map((ele, index) => {
                                                    return (
                                                        <li key={index}>{ele.type}</li>
                                                    )
                                                })}</ol>
                                            </div>
                                        </ClickAwayListener>
                                    ) : ""
                                }


                            </div>

                        )
                    })}
                </Grid>

            </div>
        </>
    )

}
export default ProductFilter