import React from "react"
import { AiOutlineLeft } from "react-icons/ai"
import AllOrder from "@/component/Myorder/allorder";
import useStyles from "@/styles/style";
import { IconButton, InputAdornment, MenuItem, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { GetCancelOrder, PendingOrder, Cancel, order, GetDeliveredOrder } from "../hooks/utilis/orderapi";
import { HiArrowsUpDown } from "react-icons/hi2";
import axios from "axios"
import Autocomplete from '@mui/material/Autocomplete';
import Cookies from 'universal-cookie';
import Swal  from'sweetalert2'
const MyOrder = () => {
    const cookies = new Cookies();
    let token_data = cookies.get('User_Token_access')
    if (typeof window !== 'undefined') {
        token_data = localStorage.getItem('User_Token_access');
   }
    const [Getsearch, SetSearch] = React.useState("")
    const navigate = useRouter()
    const classes = useStyles()
    const [AllOrder_data, SetAllOrder_data] = React.useState([])
    const [ordertype, Setordertype] = React.useState('')
    const [GetFilter, SetFilter] = React.useState('')
    const [loading, SetLoading] = React.useState(false)
    React.useEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
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
    const top100Films = []
    return (
        <React.Fragment>
            {/* <MyOrderSeo></MyOrderSeo> */}
            <div className="container-fluid">
                <div className="row px-2 center">
                    <div className="col-10 myOrder_columns px-0">
                        <h1 className="myorderHeadings">
                            <IconButton >
                                <AiOutlineLeft onClick={() => navigate.push(-1)} className="myOrderSpanIcons" size={20} color="#000000" style={{ marginLeft: "-6px" }} /></IconButton>
                            <span onClick={(() => navigate.push('/'))} className="My_order_span_name">Back</span>
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
                                // onChange={filter}
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
                                <MenuItem value={"All Order"}> {`All Order`}</MenuItem>
                                <MenuItem value={"Pending Order"}>{`Pending Order`}</MenuItem>
                                <MenuItem value={"Shipped Order"}>{`Shipped Order`}</MenuItem>
                                <MenuItem value={"Delivered Order"}>{`Delivered Order`}</MenuItem>
                                <MenuItem value={"Cancelled Order"} >{`Cancelled Order`}</MenuItem>
                            </TextField>
                        </div>

                    </div>


                    <div className="Order_Text col-10 mt-4">
                        <div className=" center mt-2" >
                            <p style={{ color: "#707070" }}>
                               {` Welcome to your personalized order hub! Easily track and manage yourpurchases with the convenience of organized sections. Explore the status of your orders under the following categories`}
                            </p>

                        </div>
                        <div className="mt-3">
                            <p style={{ color: "black" }}>

                               {` Keep tabs on every purchase journey seamlessly.`}

                            </p>

                        </div>
                    </div>

                    { 
                       
                        Boolean(AllOrder_data[0]) ?  <AllOrder AllOrder_data={AllOrder_data} loading={loading} CencelOrder={CencelOrder} ordertype={ordertype} />:
                        <div className="col-10 NODataInOrderPage center mt-3">
                        <div className="col-8 nodataAlie">
                            <p className="nodatainOderText">{GetFilter}</p>
                            <p className="nodatainOderTextp">
                              {`  No orders to display at the moment. Start shopping to see your order history here!`}
                            </p>
                            <div className="col-4 nodataAlie mt-5">
                                <button onClick={()=>navigate.push("/products")} className="noorderbtn"> {`Shop Now`} </button>
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