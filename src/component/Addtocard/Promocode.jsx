import React from "react"
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import useStyles from "@/styles/style";
import InputAdornment from '@mui/material/InputAdornment';
import { RxCross1 } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai"
import Createcontext from "@/hooks/context"
import Cookies from 'universal-cookie';
import axios from "axios";
import { useRouter } from "next/router";
const PromoCode = () => {
    const { state, dispatch } = React.useContext(Createcontext);
    const classes = useStyles()
    const navigate = useRouter()
    const [promocode, Setpromocode] = React.useState(state.coupoun_code || '')
    const [error, SetError] = React.useState('')
    const cookies = new Cookies();
       let token_data = cookies.get('User_Token_access')
       let accessToken 
       if (typeof window !== 'undefined') {
   
            accessToken = localStorage.getItem('User_Token_access');
   
       }
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
    const [success, Setsuccess] = React.useState('')

    function formatDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    function getCurrentTime() {
        // Create a new Date object to get the current date and time
        var currentTime = new Date();

        // Extract hours, minutes, and seconds
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var seconds = currentTime.getSeconds();

        // Add leading zeros if necessary
        hours = (hours < 10 ? "0" : "") + hours;
        minutes = (minutes < 10 ? "0" : "") + minutes;
        seconds = (seconds < 10 ? "0" : "") + seconds;

        // Construct the time string
        var timeString = hours + ":" + minutes;
        return timeString
    }


    function handlechnage() {
        if (state.login) {
            dispatch({ type: 'coupoun_code', coupoun_code: promocode })

            const data = {
                "promocode": promocode,
                "store": state.AllProduct[0].Store_id,
                "date": formatDate(),
                "Time": getCurrentTime()
            }
            axios.post(` https://api.cannabaze.com/UserPanel/PromoCodeCheck/`,
                data,
                {
                    headers: { Authorization: `Bearer ${token_data}` }
                },
            ).then((res) => {
                Setsuccess(res.data)
                SetError('')
                dispatch({ type: 'ApiProduct', ApiProduct: !state.ApiProduct })
            }).catch((error) => {
                Setsuccess('')
                SetError(error.response.data)
                dispatch({ type: 'ApiProduct', ApiProduct: !state.ApiProduct })

            })
        } else {
            navigate.push('/login')

        }
        // return res;
    }

    function clear() {
        axios.get(`https://api.cannabaze.com/UserPanel/RemovePromocode/`, {
            headers: { Authorization: `Bearer ${token_data}` }
        }).then((res) => {
            dispatch({ type: 'ApiProduct', ApiProduct: !state.ApiProduct })
        }).catch((error) => {
            if (!state.login) {
                navigate.push('/login')
            }
        })
        Setpromocode('')
        SetError('')
    }

    return (
        <React.Fragment>
            <div className="col-12 promocode_container">
                <div className="col-12 promocodeLabelCol">
                    <label htmlFor="promocode" className="promoCode_label">Enter a promo code</label>
                </div>
                <div className="row promoCode_textfield_btn_Col">
                    <div className="col-8 promoCode_textfield_col">
                        <TextField
                            className={classes.textFieldFocusBorderColor}
                            placeholder="Enter a promo code"
                            size="small"
                            id="promocode"
                            onChange={(e) => Setpromocode((prevCode) => e.target.value)}
                            value={promocode}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">

                                        {Boolean(success) && <AiOutlineCheck color={"#31B655"} />}
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment onClick={() => clear()} style={{ cursor: 'pointer', display: !promocode ? 'none' : 'flex' }} position="end">
                                        <RxCross1 />
                                    </InputAdornment>
                                )
                            }}
                            error={Boolean(error)}
                            helperText={Boolean(error) && error}
                            variant="outlined" fullWidth />
                    </div>
                    <div className="col-4 px-2 promoCodeBtn_Col">
                        <Box>
                            <LoadingButton className={`${classes.promoapplybtn}`} onClick={handlechnage} variant="outlined">Apply</LoadingButton>
                        </Box>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}
export default PromoCode