import TextField from '@mui/material/TextField';
import useStyles from "../../../styles/style"
import InputAdornment from '@material-ui/core/InputAdornment';
import { BsSearch } from "react-icons/bs"
import AutoComplete from '@mui/material/Autocomplete';
import Axios from "axios"
import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import { useRouter } from 'next/router';
import _, { remove } from "lodash"
import AddressSearchapi from "./AddressSearchapi"
// import { LazyLoadImage } from "react-lazy-load-image-component";
import { modifystr } from '../../../hooks/utilis/commonfunction';
import Image from 'next/image';
const SearchBar = ({ path }) => {
    const router = useRouter();
    const [SearchData, SetSearchData] = React.useState([])

    const classes = useStyles()
    const [input, Setinput] = React.useState('')
    const [loading, Setloading] = React.useState(false)
    const Search = (event) => {
        event.preventDefault()
        Setinput(event.target.value)
    }

    React.useEffect(() => {

        const getdata = setTimeout(() => {
            Setloading(false)
            if (input !== '') {
                // loading = true
                Setloading(true)
                Axios.post(`https://api.cannabaze.com/UserPanel/Get-HomePageFilter/`,
                    {
                        search: input
                    }
                ).then(response => {
                    SetSearchData([])
                    if (response.status === 200) {
                        const o = Object?.entries(response?.data).map((data, index, value) => {
                            return (data)
                        })
                        const y = o?.map((data) => {
                            return data
                        });
                        y.map((data1) => {
                            return (
                                data1[1].map((data) => {

                                    return SetSearchData(SearchData => [...SearchData, {
                                        type: data1[0], value: data.name || data.Product_Name || data.Store_Name, id: data.id, image: data?.Brand_Logo || data?.categoryImages || data?.Store_Image || data?.SubCategoryImage || data.images[0]?.image, StoreName: data.Store_Name, Category: data.category_name, SubCategory_id: data.Sub_Category_id,
                                        SubcategoryName: data.SubcategoryName, Store_Type: data.Store_Type
                                    }]);
                                }
                                )
                            )
                        })
                    }
                    else (
                        SetSearchData([])

                    )

                }).catch(
                    function (error) { }
                )
            }
        }, 500)
        return () => clearTimeout(getdata);
    }, [input]);
    const [open, setOpen] = React.useState(false);
    const [openLocation, setOpenLocation] = React.useState(false);


    const [searchBarWidth, setSearchBarWidth] = React.useState(false);
    const [windowSize, setWindowSize] = React.useState();
    const [optionWidth, setOptionWidth] = React.useState();

    React.useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        };

        // Initial setup on mount
        handleResize();
        window.addEventListener('resize', handleResize);

        // Clean up the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array ensures this effect runs only on mount and unmount

    React.useEffect(() => {
        // Function to calculate option width based on window size
        const calculateOptionWidth = () => {
            const navSearchContainer = document.getElementById('navsearchConntainer');
            if (navSearchContainer) {
                const containerWidth = navSearchContainer.clientWidth;
                if (windowSize <= 900) {
                    setSearchBarWidth(true);
                    setOptionWidth(containerWidth);
                } else {
                    setSearchBarWidth(false);
                    setOptionWidth(containerWidth / 2);
                }
            }
        };

        // Call the function initially and whenever windowSize changes
        calculateOptionWidth();

        // Note: Accessing DOM elements directly should be avoided in most cases in React/Next.js
        // Consider using refs or state updates instead

    }, [windowSize]); // Dependency on windowSize to recalculate on resize

    React.useEffect(() => {
        // Calculate option width based on initial screen width (on component mount)
        const windowWidth = window.screen.availWidth;
        const navSearchContainer = document.getElementById('navsearchConntainer');

        if (navSearchContainer) {
            const containerWidth = navSearchContainer.clientWidth;
            if (windowWidth <= 900) {
                setOptionWidth(containerWidth);
            } else {
                setOptionWidth(containerWidth / 2);
            }
        }

    }, []); // Empty dependency array ensures this effect runs only on mount



    function SearchAPi(id, type, t) {
        Setloading(false)
        if (type === 'Product') {
            router.push(`/products/${modifystr(t.Category)}/${modifystr(t.SubcategoryName)}/${modifystr(t.value)}/${t.id}`);
        }
        else if (type === "Store") {
            if (t.Store_Type === "delivery") {
                router.push(`/weed-deliveries/${modifystr(t.StoreName)}/${t.id}`);
            }
            else {
                router.push(`/weed-dispensaries/${modifystr(t.StoreName)}/${t.id}`);
            }
        }
        else if (type === "Brand") {
            router.push(`/brands/${t.value}/${t.id}`);
        }
        else if (type === "Sub Category") {
            router.push(`/Products/${modifystr(t.Category)}/${modifystr(t.value)}/${t.id}`);
        }
        else if (type === "Category") {
            router.push(`/Products/${modifystr(t.value)}/${t.id}`);

        }





        // Axios.post(`https://api.cannabaze.com/UserPanel/Get-ResultHomeSearchFilter/`,
        //     {
        //         id: id,
        //         type: type
        //     }
        // ).then((response) => {

        // })
    }
    const handleImageError = (event) => {
        event.target.src = "/image/blankImage.jpg"; // Fallback image on error
    };
    return (
        <React.Fragment>
            <div className="col_Search">
                <div className={` nav_search_bar_div center`} id='navsearchConntainer' style={{ display: (openLocation && searchBarWidth) && "block" }}>
                    <AutoComplete
                        id="SearchBar"
                        disableClearable
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        classes={{ paper: classes.paper }}
                        // onClick={Search}
                        filterOptions={x => x}

                        // ListboxProps={{ style: { width: '100%' } }}
                        componentsProps={{ popper: { style: { height: '100%', width: `${optionWidth}px` } } }}
                        onChange={(event, value) => SearchAPi(value?.id, value?.type, value, event)}
                        // onClick={(event, value) => SearchAPi(value?.id, value?.type, value, event)}
                        // getoptionselected={(option, value) => option?.description === value?.description}
                        getOptionLabel={(option) => option?.value}
                        options={SearchData}
                        groupBy={(option) => option.type}
                        renderOption={(props, t) => {
                            return (
                                <div {...props} style={{ color: "black" }} >
                                    <ul className='PopperLIst'>
                                        {/* <div> */}
                                        <li onClick={(event, value) => SearchAPi(t?.id, t?.type, t)} className='searchBarListStyles' key={t.value}>
                                            <Image
                                            unoptimized={true}
                                                onError={handleImageError}
                                                className={"searchBarImageStyles"} // Apply CSS module class
                                                src={t.image}
                                                alt={t.value}
                                                title={t.value}
                                                width={35}
                                                height={35}
                                            />
                                            <span className='searchBarSpanValue'> {`${t.value}`}</span>
                                        </li>
                                        {/* </div> */}


                                    </ul>
                                </div>
                            )
                        }}
                        // loading={loading}
                        sx={{ width: open && searchBarWidth ? "100%" : "100%" }}
                        renderInput={(params) => <TextField
                            {...params}
                            onChange={Search}
                            placeholder="Products Brands Retailers and more"
                            className={` ${classes.Bar_padding} SearchBar nav_search_bar_div  ${classes.SearchBar_Text}`}
                            style={{ borderRadius: (open && searchBarWidth) ? " 16px 16px 16px 16px" : " 16px 0px 0px 16px", top: "0px", display: openLocation && searchBarWidth ? "none" : "inline-flex", width: open && searchBarWidth ? "100%" : "100%" }}
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BsSearch color="#858585" size={16} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? (
                                            <CircularProgress color="inherit" size={20} />
                                        ) : null}
                                    </React.Fragment>
                                ),
                            }}
                        />
                        }
                    />
                    {
                        searchBarWidth && !open &&
                        <div id="Boder_left"></div>
                    }
                    {
                        !searchBarWidth && <div id="Boder_left"></div>
                    }
                    <AddressSearchapi
                        openLocation={openLocation}
                        SearchBarWidth={searchBarWidth}
                        setOpenLocation={setOpenLocation}
                        open1={open}
                        path={path}
                    ></AddressSearchapi>

                </div>
            </div>

        </React.Fragment>
    )
}
export default SearchBar


// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyC_MQE9O7OW5sM2Pvyzs5zjotWyqdshhjA




// ,key[1].map((data) => {
// return data.name || data.Product_Name
// })
// (data[1]?.map((g)=>  data[0]+(g.name || g.Product_Name)))) 
