import React from 'react';
import Modal from '@mui/material/Modal';
import useStyles from '@/styles/style';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Createcontext from "../../../hooks/context"
import { GiShoppingCart } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import Cookies from 'universal-cookie';
import axios from "axios";
import { useRouter } from 'next/router';
const AddToCartPopUp = ({ CartClean, SetCartClean, NewData, SetAddToCard }) => {
    const classes = useStyles()
    const Navigate = useRouter()
    const cookies = new Cookies();
    let token_data = cookies.get('User_Token_access')
    let accessToken 
    if (typeof window !== 'undefined') {

        accessToken = localStorage.getItem('User_Token_access');

    }
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
    const { state ,dispatch } = React.useContext(Createcontext)
    const [Loading, SetLoading] = React.useState(false)
    const [layout, setLayout] = React.useState(CartClean);
    function CleanData() {
        if (state.login) {
            SetLoading(true)
            const config = {
                headers: { Authorization: `Bearer ${token_data}` }
            };
            axios.post("https://api.cannabaze.com/UserPanel/ClearAddtoCart/",
            NewData,
            config,
            ).then(response => {
                dispatch({ type: 'ApiProduct' })
                SetLoading(false)
                SetCartClean(false)
            }).catch(
                function (error) {
                    SetLoading(false)
                })
        }
        else {
            
            SetLoading(true)
            setTimeout(function () {
                localStorage.clear();
                dispatch({ type: 'ApiProduct' , ApiProduct:!state.ApiProduct })
                SetAddToCard([NewData])
                SetLoading(false)
                SetCartClean(false)
            }, 2000)

        }

    }
    function Redirect (){
    SetCartClean(false)
    Navigate("/cart")
    
    }
    return (
        <Modal open={!!layout} onClose={() => {  SetCartClean(false) }}>
            <div className='differentstorepopup'>
                <ClickAwayListener onClickAway={()=>{SetCartClean(false)}}>
                    <div className='popupbox'>
                        <div className='col-12 AddToCartImageContainer'>
                            <div className='addToCartPopUpImage_background mx-auto'>
                            <GiShoppingCart size={72} color='#31B655' />
                            </div>


                        </div>
                        <div className='col-12 AddToCartHeading'>
                            <p>Start a new Cart</p>

                        </div>
                        <div className='col-12 AddToCartParagraphHeight'>
                            <p>You have currently have a items in  you cart from other menu.You may  only add items from one menu. <br/>
                                Would you like to finish your previous order,or start a new cart
                            </p>
                        </div>
                        <div className='col-12'>
                            <Box
                                className={`  ${classes.differstoreaddtocartbtn}`}
                            >
                                <LoadingButton variant="outlined" loading={Loading} onClick={CleanData} type={'submit'}>Start a new cart</LoadingButton>
                            </Box>
                        </div>
                        <div className='col-12 my-2'>
                            <Box
                                className={`  ${classes.differstoreaddtocartbtn}`}
                            >
                                <LoadingButton variant="outlined" loading={false} onClick={Redirect} type={'submit'}>Complete  previous order</LoadingButton>
                            </Box>
                        </div>
                        <span className='popupctrossbtn' onClick={()=>{SetCartClean(false)}}><RxCross2 size={22} color='red' /></span>
                    </div>
                </ClickAwayListener>
            </div>
        </Modal>
    )
}
export default AddToCartPopUp