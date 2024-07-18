import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import { BsStar, BsStarFill } from "react-icons/bs";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { GrFormSubtract } from "react-icons/gr"
import { MdAdd } from "react-icons/md"
import LoadingButton from '@mui/lab/LoadingButton';
import useStyles from '../../styles/style';
import { FormLabel } from '@mui/material';
import { FaShoppingCart } from "react-icons/fa";
const style = {
    borderRadius: '8px',
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "600px",
    "@media(max-width:800px)": {
        width: "80%",
        marginTop: '10%',

    },
    "@media(max-width:500px)": {
        width: "98%",
        marginTop: '30%',

    },

    bgcolor: 'background.paper',
    boxShadow: '0px 0px 15px 0px rgba(255,255,255,1)',
    p: 4,
};

const ProductIncDecQuantity = ({ popup, SetPopup, items, AddToCart, setadding, adding }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
        SetPopup(true)
        setadding(items.id)
    };
    const handleClose = () => setOpen(false);
    const [SelectWeight, SetSelectWeight] = React.useState(items?.Prices[0]?.Price[0]?.id);
    const [counter, setCounter] = React.useState(1);

    React.useEffect(() => {
        if (!popup) {

            setOpen(popup)
        }
    }, [popup])

    const handleChange = (event) => {
        SetSelectWeight(event.target.value);
        setCounter(count => count = 1);
    };
    const increase = () => {
        setCounter(count => count + 1);
    };
    const decrease = () => {
        if (counter > 1) {
            setCounter(count => count - 1);
        }
    };
    const classes = useStyles()
    return (
        <>
            <LoadingButton 
                onClick={handleOpen} >
               <span><FaShoppingCart  size={18} /> </span>  Add To Cart
            </LoadingButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-12 col-md-6  col-sm-6 productInc_dec_image_cont'>
                                <Image className='prod_inc_dec_image'
                                    src={`${items?.images[0].image}`}
                                     width={100}
                                     height={100}
                                    alt={items.Product_Name}
                                    unoptimized={true}
                                    title={items.Product_Name}
                                     />
                            </div>
                            <div className='col-12 col-md-6 col-sm-6 productInc_dec_content'>


                                <h1 className=' prod_inc_dec_quant_heading ellipsis'>{items.Product_Name}</h1>

                                <h2 className='prod_inc_dec_quant_subheading ellipsis'>by {items.StoreName}</h2>
                                <div className='product_inc_dec_quantity_btn_cont'>
                                    <button className='product_inc_dec_quantity_btn'>15% THC</button>
                                    <button className='product_inc_dec_quantity_btn'>0.2% CBD</button>
                                    <button className='product_inc_dec_quantity_btn_indica'>Indica</button>


                                </div>
                                <div className="product_cart_review my-3">
                                    { new Array(items.rating).fill(null).map((data, index) => (
                                        <BsStarFill key={index} size={16} color="#31B665" className="product_search_rating_star" />
                                    ))}

                                    {new Array(5 - items.rating).fill(null).map((data, index) => (
                                        <BsStar key ={index} size={16} color="#31B665" className="product_search_rating_star" />
                                    ))}
                                </div>
                                <div className='weight_font my-3'>
                                   <FormLabel sx={{ width: "100%", color: 'black' }}>weight</FormLabel>
                                    <FormControl sx={{ width: '100%' }} size="small" className={`${classes.reviewFilter}`}>
                                      
                                        <Select
                                            value={SelectWeight}
                                            onChange={handleChange}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            sx={{ width: "100%", color: 'black' }}
                                            // className={classes.}
                                        >
                                          
                                            {
                                                items?.Prices[0]?.Price.map((data) => {

                                                    if (data.Weight !== "") {
                                                        return (<MenuItem key={data.id} value={data.id}>{data.Weight}</MenuItem>)
                                                    } else {
                                                        return (<MenuItem key={data.id} value={data.id}>{data.Unit} Unit</MenuItem>)
                                                    }

                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className='prod_quant_num mt-4'>

                                    <FormLabel>Quantity</FormLabel>

                                    <div className='prod_inc_plus_minus d-flex'>

                                        <LoadingButton className='subBtn1' onClick={decrease}>
                                            <GrFormSubtract />

                                        </LoadingButton>

                                        <div className='prod_digit'>
                                            {counter}
                                        </div>

                                        <LoadingButton className='aaBtn2' onClick={increase}>
                                            <MdAdd  color='#000'/>

                                        </LoadingButton>

                                        <div>

                                        </div>
                                    </div>
                                </div>

                                {
                                    items?.Prices[0]?.Price.map((data, index) => {
                                        return (
                                            SelectWeight === data.id &&
                                            <h2><span className='prod_price_font'>${parseInt(data.SalePrice * counter)}</span><span className='mx-2 prod_quant_font  '>/ {data.Weight === '' ? "Unit" : data.Weight} </span></h2>
                                        )

                                    })
                                }

                                <Box  className={` boxWidth ${classes.loadingBtnTextAndBack}`} >
                                    {/* <LoadingButton style={{ width: "100%", height: "35px" }} variant="outlined" onClick={() => { AddToCart(items,counter , SelectWeight  , handleClose)  }} >Add to Cart</LoadingButton> */}
                                    {/* {items?.Prices[0].Price[0].Stock !== "IN Stock" ?
                                        <LoadingButton style={{ width: "100%", height: "30px", fontSize: "14px" }}
                                            onClick={() => { AddToCart(items, counter, SelectWeight, handleClose) }} >
                                            Add To Cart
                                        </LoadingButton>
                                        :
                                        <LoadingButton style={{ width: "100%", height: "30px", fontSize: "14px" }} >
                                            Out of Stock
                                        </LoadingButton>
                                    } */}
                                    {
                                        // SelectWeight === items.id &&
                                        items?.Prices[0].Price.map((data , index) => {
                                          if(data.id === SelectWeight){
                                            if (data.Stock === "IN Stock" && adding === items.id ) {

                                                return (
                                                    <LoadingButton key={index} style={{ width: "100%", height: "30px", fontSize: "14px" }}
                                                        onClick={() => { AddToCart(items, counter, SelectWeight, handleClose) }} >
                                                        Add To Cart
                                                    </LoadingButton>
                                                )
                                            }
                                            else {
                                                return (
                                                    <LoadingButton key={index} className={classes.outofstockbtn} >
                                                        Out of Stock
                                                    </LoadingButton>
                                                )
                                            }

                                          }

                                        })
                                    }
                                </Box>


                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}
export default ProductIncDecQuantity