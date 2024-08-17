import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useStyles from '@/styles/style';
import Cookies from 'universal-cookie';
import Createcontext from "@/hooks/context"
import {ImNotification} from "react-icons/im"
const CheckAgeEligbilityPopup = ({value}) => {
    const cookies = new Cookies();
    const [open, setOpen] = React.useState(value);
    const [Country, SetCountry] = React.useState('USA');
    const [NotAgepop, SetNotAge] = React.useState('')
    const { dispatch } = React.useContext(Createcontext)
    const classes = useStyles()

    const get = () => {
        setOpen(false);
        let date = new Date();
        // Set time to one year (in milliseconds)
        date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
        cookies.set('CheckAge', 0, { expires: date });
        if (Country === "USA") {
            const setLocation = {
                country: 'United-States',
                state: 'New-York',
                city: 'New-York',
                formatted_address: 'New York, NY, USA'
              };
            cookies.set('fetchlocation', JSON.stringify(setLocation), { 
        expires: date, 
        path: '/' // Set the path where the cookie is accessible
      });
            dispatch({ type: 'DefalutLocation', DefalutLocation: 'New York' });
        } else {
            const setLocation = {
                country: 'Canada',
                state: '',
                city: '',
                formatted_address: 'Canada'
              };
            cookies.set('fetchlocation', JSON.stringify(setLocation), { 
        expires: date, 
        path: '/' // Set the path where the cookie is accessible
      });
            dispatch({ type: 'DefalutLocation', DefalutLocation: "Canada" });
        }
    }
    
    const handleChange = (event) => {
        // cookies.set('CheckAge', false)

        SetCountry(event.target.value);
    };
    const NotAge = () => {
        SetNotAge("You're not old enough to visit Weedx.io")
    }
    return (
        <div>
            <Dialog open={open}
               overlayStyle={{backgroundColor: 'red'}}
                className={`${classes?.checkAgeEligibility} ${classes?.checAgeEligibiltyHeight}`}
                role="dialog" aria-labelledby="dialog-label"
            >
                <div className='container-fluid'>
                    <div className='row'>

                        <div className='col-12 checkAgeEligiblityPop_container px-3'>
                            {NotAgepop !== "" &&
                                <div className='col-12 AgeSetPOpup' >
                                    <ImNotification ></ImNotification>  {NotAgepop}
                                </div>
                            }
                            <div className='row  mt-4'>
                                <div className='col-12 checkAgeEligibilty_label'>
                                    <label className='askCountry'>{'Where are you from'}</label>
                                </div>
                                <div className='col-12 checkAgeEligibility_Select'>
                                    <FormControl sx={{ m: 1, }} className={`${classes?.checkAge_eligibility_Select}`}>
                                        <Select
                                            defaultValue='USA'
                                            value={Country}
                                            id="SelectAge"
                                            onChange={handleChange}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            <MenuItem value={"USA"}>{'USA'}</MenuItem>
                                            <MenuItem value={"CANADA"}>{'CANADA'}</MenuItem>
                                        </Select>
                                    </FormControl>

                                </div>

                            </div>
                            <div className="row px-2">

                                <div className='col-12 checkAgeEligibilty_label'>
                                    <label>Are you 21 year older</label>
                                </div>
                                <div className='col-12 checkAgeEligibilty_btn_container'>
                                    <Button className={`${classes?.checAgeEliigiblityPopup}`} onClick={get} >{`Yes, I am`}</Button>
                                </div>
                                <div className='col-12 checkAgeEligibilty_btn_container'>
                                    <Button className={`${classes?.checkAgeEligibiltyAge_SecBtn}`} onClick={NotAge}>{`No,I'm not`}</Button>
                                </div>

                            </div>
                          

                        </div>
                    </div>
                    <div className='row checkEligbiltyMarginTop'>
                                <div className='col-12 checkEligibiltypopCol'>
                                            <p className='checkAgeEligibility_footer'>
                                                {`If you kee seeing this age prompt whenever you visit the Weedx.io.
                                                Please enable the cookies in your web browser`}
                                            </p>
                                            <p className='checkAge_thankP'>{`Thank you`}</p>


                                </div>

                    </div>

                </div>
            </Dialog>
        </div>

    )
}
export default CheckAgeEligbilityPopup