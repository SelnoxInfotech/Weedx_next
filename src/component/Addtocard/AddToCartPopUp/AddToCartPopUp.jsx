import * as React from 'react';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
// import ModalClose from '@mui/material/ModalClose';
// import ModalDialog from '@mui/material/ModalDialog';
import useStyles from '@/styles/style';
// import ModalDialog from '@mui/joy/ModalDialog';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Createcontext from "../../../hooks/context"
import Cookies from 'universal-cookie';
import axios from "axios";
// import "./Cartpopup.css";
import { useRouter } from 'next/router';
import Image from 'next/image';
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
        <React.Fragment>
            <Stack direction="row" spacing={1}>


            </Stack>
            <Modal open={!!layout} onClose={() => {  SetCartClean(false) }}>
            {/* <ModalDialog
                    aria-labelledby="layout-modal-title"
                    aria-describedby="layout-modal-description"
                    layout={layout}
                    sx={{ width: "32rem", height: "40rem" }}
                > */}
                
                    <div className='container-fluid marginRow'>
                        <div className='row '>
                            <div className='col-12 AddToCartImageContainer'>
                                <div className='addToCartPopUpImage_background mx-auto'>
                                    <Image 
                                        src='/image/addtocart1.jpg'
                                        alt='not avail'
                                        title='not avail'
                                        height={100}
                                        width={100}
                                    />

                                </div>


                            </div>
                            <div className='col-12 AddToCartHeading'>
                                <p>Start a new Cart</p>

                            </div>
                            <div className='col-12 AddToCartParagraphHeight'>
                                <p>You have currently have a items in  you cart from other menu.You may  only add items from one menu.
                                    Would you like to finish your previous order,or start anew cart
                                </p>
                            </div>
                            <div className='col-12'>
                                <Box
                                    className={`  ${classes.loadingBtnTextAndBack}`}
                                >
                                    <LoadingButton variant="outlined" loading={Loading} onClick={CleanData} type={'submit'}>Start a new cart</LoadingButton>
                                </Box>
                            </div>
                            <div className='col-12 my-2'>
                                <Box
                                    className={`  ${classes.loadingBtnTextAndBack}`}
                                >
                                    <LoadingButton variant="outlined" loading={false} onClick={Redirect} type={'submit'}>Complete  previous order</LoadingButton>
                                </Box>
                            </div>

                        </div>

                    </div>
                    
                    {/* </ModalDialog> */}

            
            </Modal>
        </React.Fragment>
    )
}
export default AddToCartPopUp