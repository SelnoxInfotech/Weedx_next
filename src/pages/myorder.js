import React from "react"
import { AiOutlineLeft } from "react-icons/ai"
import AllOrder from "@/component/Myorder/allorder";
import useStyles from "@/styles/style";
import { IconButton, InputAdornment, MenuItem, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GetCancelOrder, PendingOrder, Cancel, order, GetDeliveredOrder } from "./api/hello";
import { HiArrowsUpDown } from "react-icons/hi2";
import axios from "axios"
import Autocomplete from '@mui/material/Autocomplete';
import Cookies from 'universal-cookie';
// import {MyOrderSeo} from "../../Component/ScoPage/CommenpageSeo"
const MyOrder = () => {
    const cookies = new Cookies();
    let token_data = cookies.get('User_Token_access')
    let accessToken = localStorage.getItem('User_Token_access');
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
    const [Getsearch, SetSearch] = React.useState("")
    const navigate = useNavigate()
    const classes = useStyles()
    const [AllOrder_data, SetAllOrder_data] = React.useState([])
    const [ordertype, Setordertype] = React.useState('')
    const [GetFilter, SetFilter] = React.useState('')
    const [loading, SetLoading] = React.useState(false)
    React.useEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", // Optional if you want to skip the scrolling animation
        });
        SetLoading(true)
        if (GetFilter === "") {
            order().then((res) => {
                SetFilter("All Order")
                SetAllOrder_data(res?.data?.reverse())
                SetLoading(false)
            }).catch()
        }
    }, [])
    const Swal = require('sweetalert2')
    function CencelOrder(id) {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
        
            imageUrl: "/image/warning.png",
            imageClass: "loginsweetimg",
            imageWidth: 60,
            imageHeight: 60,
            showCancelButton: true,
            confirmButtonColor: "#31B655",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                SetLoading(true)
                Cancel(id).then((res) => {

                    PendingOrder().then((res) => {
                        SetAllOrder_data(res.data)
                        SetLoading(false)
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }).catch((error) => {
                   
                        SetLoading(false)
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong!",
                            footer: '<a href="#">Why do I have this issue?</a>'
                        });
                    })





                }).catch(SetLoading(false))
                SetLoading(false)

            }
        });

    }
    React.useEffect(() => {
        const getData = setTimeout(() => {
            Getsearch !== "" && axios.post(`https://api.cannabaze.com/UserPanel/OrderSearch/`,
                {
                    search: Getsearch
                },
                {
                    headers: { Authorization: `Bearer ${token_data}` }
                },
            )
                .then((response) => {
                   
                });
        }, 2000)
        return () => clearTimeout(getData)
    }, [Getsearch])

    function filter(e) {
        SetLoading(true)
        SetFilter(e.target.value)
        Setordertype(e.target.value)
        if (e.target.value === "All Order") {
            order().then((res) => {
                SetAllOrder_data(res?.data?.reverse())
                SetLoading(false)
            }).catch()
        }
        else if (e.target.value === "Pending Order") {
            PendingOrder().then((res) => {
                SetAllOrder_data(res.data)
                SetLoading(false)
            }).catch((error) => {
               
                SetLoading(false)
            })
        }
        else if (e.target.value === "Delivered Order") {
            GetDeliveredOrder().then((res) => {
                SetAllOrder_data(res.data)
                SetLoading(false)
            }).catch((error) => {
           
                SetLoading(false)
            })
        }

        else if (e.target.value === "Cancelled Order") {
            GetCancelOrder().then((res) => {
                SetAllOrder_data(res.data)
                SetLoading(false)
            }).catch((error) => {
              
                SetLoading(false)
            })
        }
        else {
            SetLoading(false)
            SetAllOrder_data([])
        }
    }

    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
        {
            title: 'The Lord of the Rings: The Return of the King',
            year: 2003,
        },
        { title: 'The Good, the Bad and the Ugly', year: 1966 },
        { title: 'Fight Club', year: 1999 },
        {
            title: 'The Lord of the Rings: The Fellowship of the Ring',
            year: 2001,
        },
        {
            title: 'Star Wars: Episode V - The Empire Strikes Back',
            year: 1980,
        },
        { title: 'Forrest Gump', year: 1994 },
        { title: 'Inception', year: 2010 },
        {
            title: 'The Lord of the Rings: The Two Towers',
            year: 2002,
        },
        { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
        { title: 'Goodfellas', year: 1990 },
        { title: 'The Matrix', year: 1999 },
        { title: 'Seven Samurai', year: 1954 },
        {
            title: 'Star Wars: Episode IV - A New Hope',
            year: 1977,
        },
        { title: 'City of God', year: 2002 },
        { title: 'Se7en', year: 1995 },
        { title: 'The Silence of the Lambs', year: 1991 },
        { title: "It's a Wonderful Life", year: 1946 },
        { title: 'Life Is Beautiful', year: 1997 },
        { title: 'The Usual Suspects', year: 1995 },
        { title: 'Léon: The Professional', year: 1994 },
        { title: 'Spirited Away', year: 2001 },
        { title: 'Saving Private Ryan', year: 1998 },
        { title: 'Once Upon a Time in the West', year: 1968 },
        { title: 'American History X', year: 1998 },
        { title: 'Interstellar', year: 2014 },
        { title: 'Casablanca', year: 1942 },
        { title: 'City Lights', year: 1931 },
        { title: 'Psycho', year: 1960 },
        { title: 'The Green Mile', year: 1999 },
        { title: 'The Intouchables', year: 2011 },
        { title: 'Modern Times', year: 1936 },
        { title: 'Raiders of the Lost Ark', year: 1981 },
        { title: 'Rear Window', year: 1954 },
        { title: 'The Pianist', year: 2002 },
        { title: 'The Departed', year: 2006 },
        { title: 'Terminator 2: Judgment Day', year: 1991 },
        { title: 'Back to the Future', year: 1985 },
        { title: 'Whiplash', year: 2014 },
        { title: 'Gladiator', year: 2000 },
        { title: 'Memento', year: 2000 },
        { title: 'The Prestige', year: 2006 },
        { title: 'The Lion King', year: 1994 },
        { title: 'Apocalypse Now', year: 1979 },
        { title: 'Alien', year: 1979 },
        { title: 'Sunset Boulevard', year: 1950 },
        {
            title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
            year: 1964,
        },
        { title: 'The Great Dictator', year: 1940 },
        { title: 'Cinema Paradiso', year: 1988 },
        { title: 'The Lives of Others', year: 2006 },
        { title: 'Grave of the Fireflies', year: 1988 },
        { title: 'Paths of Glory', year: 1957 },
        { title: 'Django Unchained', year: 2012 },
        { title: 'The Shining', year: 1980 },
        { title: 'WALL·E', year: 2008 },
        { title: 'American Beauty', year: 1999 },
        { title: 'The Dark Knight Rises', year: 2012 },
        { title: 'Princess Mononoke', year: 1997 },
        { title: 'Aliens', year: 1986 },
        { title: 'Oldboy', year: 2003 },
        { title: 'Once Upon a Time in America', year: 1984 },
        { title: 'Witness for the Prosecution', year: 1957 },
        { title: 'Das Boot', year: 1981 },
        { title: 'Citizen Kane', year: 1941 },
        { title: 'North by Northwest', year: 1959 },
        { title: 'Vertigo', year: 1958 },
        {
            title: 'Star Wars: Episode VI - Return of the Jedi',
            year: 1983,
        },
        { title: 'Reservoir Dogs', year: 1992 },
        { title: 'Braveheart', year: 1995 },
        { title: 'M', year: 1931 },
        { title: 'Requiem for a Dream', year: 2000 },
        { title: 'Amélie', year: 2001 },
        { title: 'A Clockwork Orange', year: 1971 },
        { title: 'Like Stars on Earth', year: 2007 },
        { title: 'Taxi Driver', year: 1976 },
        { title: 'Lawrence of Arabia', year: 1962 },
        { title: 'Double Indemnity', year: 1944 },
        {
            title: 'Eternal Sunshine of the Spotless Mind',
            year: 2004,
        },
        { title: 'Amadeus', year: 1984 },
        { title: 'To Kill a Mockingbird', year: 1962 },
        { title: 'Toy Story 3', year: 2010 },
        { title: 'Logan', year: 2017 },
        { title: 'Full Metal Jacket', year: 1987 },
        { title: 'Dangal', year: 2016 },
        { title: 'The Sting', year: 1973 },
        { title: '2001: A Space Odyssey', year: 1968 },
        { title: "Singin' in the Rain", year: 1952 },
        { title: 'Toy Story', year: 1995 },
        { title: 'Bicycle Thieves', year: 1948 },
        { title: 'The Kid', year: 1921 },
        { title: 'Inglourious Basterds', year: 2009 },
        { title: 'Snatch', year: 2000 },
        { title: '3 Idiots', year: 2009 },
        { title: 'Monty Python and the Holy Grail', year: 1975 },
    ];
    return (
        <React.Fragment>
            {/* <MyOrderSeo></MyOrderSeo> */}
            <div className="container-fluid">
                <div className="row px-2 center">
                    <div className="col-10 myOrder_columns px-0">
                        <h1 className="myorderHeadings">
                            <IconButton >
                                <AiOutlineLeft onClick={() => navigate(-1)} className="myOrderSpanIcons" size={20} color="#000000" style={{ marginLeft: "-6px" }} /></IconButton>
                            <span onClick={(() => navigate('/'))} className="My_order_span_name">Back</span>
                        </h1>
                    </div>
                    <div className="col-lg-10   searchBar_container  px-0">
                        <section className="MyOrder_searchBar center">
                            <span className="yourOrder_search">{GetFilter}</span>
                        </section>
                    </div>
                    <div className="col-lg-10 d-flex mt-4 " style={{ padding: "0" }}>
                        <div className="col-8 col-lg-6">
                           

                            <Autocomplete
                                freeSolo
                                id="free-solo-2-demo"
                                disableClearable
                                options={top100Films.map((option) => option.title)}
                                onInputChange={(e)=>SetSearch(e.target.value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search Order..."
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-4 col-lg-6 OrderSearchFiter">
                            <TextField
                                default={'All Order'}
                                value={GetFilter}
                                size="small"
                                onChange={filter}
                                name="cls"
                                select
                                sx={{
                                    '.MuiSvgIcon-root-393': {
                                        visibility: 'hidden'
                                    }
                                }}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.texttoselect,
                                    },
                                    renderValue: (option) => option,
                                }}
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start"><HiArrowsUpDown color="#31B665" /></InputAdornment>
                                    )
                                }}
                                className={classes.texttoselect}
                            >
                                <MenuItem value={"All Order"}> All Order</MenuItem>
                                <MenuItem value={"Pending Order"}>Pending Order</MenuItem>
                                <MenuItem value={"Shipped Order"}>Shipped Order</MenuItem>
                                <MenuItem value={"Delivered Order"}>Delivered Order</MenuItem>
                                <MenuItem value={"Cancelled Order"} >Cancelled Order</MenuItem>
                            </TextField>
                        </div>

                    </div>


                    <div className="Order_Text col-10 mt-4">
                        <div className=" center mt-2" >
                            <p style={{ color: "#707070" }}>
                                Welcome to your personalized order hub! Easily track and manage yourpurchases with the convenience of organized sections. Explore the status of your orders under the following categories
                            </p>

                        </div>
                        <div className="mt-3">
                            <p style={{ color: "black" }}>

                                Keep tabs on every purchase journey seamlessly.

                            </p>

                        </div>
                    </div>

                    { 
                       
                        Boolean(AllOrder_data[0]) ?  <AllOrder AllOrder_data={AllOrder_data} loading={loading} CencelOrder={CencelOrder} ordertype={ordertype} />:
                        <div className="col-10 NODataInOrderPage center mt-3">
                        <div className="col-8 nodataAlie">
                            <p className="nodatainOderText">{GetFilter}</p>
                            <p className="nodatainOderTextp">
                                No orders to display at the moment. Start shopping to see your order history here!
                            </p>
                            <div className="col-4 nodataAlie mt-5">
                                <button onClick={()=>navigate("/products")} className="noorderbtn"> Shop Now </button>
                            </div>
                        </div>

                        </div>
                    }



                </div>
            </div>

        </React.Fragment>
    )
}
export default MyOrder