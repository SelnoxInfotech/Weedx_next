import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import style from "@/styles/style";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Createcontext from "@/hooks/context";


import ookies from 'universal-cookie';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function CookieSetting() {
    const { state, dispatch } = React.useContext(Createcontext)
    const classes =  style()
    const cookies = new ookies();
    const [open, setOpen] = React.useState(false);
   const [Cookies, SetCookies] =  React.useState({
    Marketing: state.CookiesMarketing ==="0"?true:false,
    Analytical:state.CookiesAnalytical ==="0"?true:false,
})
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
      ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: 2,
          transitionDuration: '300ms',
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#00b96a',
              opacity: 1,
              border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            color:
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[600],
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: 22,
          height: 22,
        },
        '& .MuiSwitch-track': {
          borderRadius: 26 / 2,
          backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
          opacity: 1,
          transition: theme.transitions.create(['background-color'], {
            duration: 500,
          }),
        },
      }));
      
  const handlechnage =(event)=>{
    if(event.target.name === "Marketing"){
    SetCookies({...Cookies , [event.target.name] :!Cookies.Marketing})
    }
    else{
        SetCookies({...Cookies , [event.target.name] :!Cookies.Analytical}) 
    }
  }


  const SaveCookies =()=>{
    let date = new Date();
    date.setTime(date.getTime() + (30*24*60*60*1000))
     const Analytical =  Cookies.Analytical === true ? 1 : 0
     const Marketing =  Cookies.Marketing === true ? 1 : 0
    cookies.set('Marketing', Marketing, { expires:  date })
    cookies.set('Analytical', Analytical, { expires:  date })
    cookies.set('CookiesAcceptAll', 1, { expires: date })
    dispatch({ type: 'CookiesMarketing', CookiesMarketing:  cookies.get('Marketing') })
    dispatch({ type: 'CookiesAnalytical', CookiesAnalytical:  cookies.get('Analytical') })
    dispatch({ type: 'Cookies', Cookies:  cookies.get('CookiesAcceptAll') })
    setOpen(false);
  }
    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
            <Box className={classes.CookiesSetting}>
                <LoadingButton onClick={handleClickOpen} >COOKIES SETTINGS</LoadingButton>
            </Box>
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                   <h3> Cookie Settings </h3>
                    <p className='Cookiessetting'>
                        This website uses cookies to improve your browsing experience and to show you personalized content. Some cookies are necessary for the site to function in its intended form. Others are grouped by category and could be disabled. You can get more information about the cookies we use, by reading our Privacy Policy and Terms of Use
                    </p>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box sx={{ display: "grid", alignItems: "center", gap: "2rem" }}>
                        <Typography gutterBottom>
                            <div className='col-12 d-flex'>
                                <div className='col-9'>

                                    <span className='cookiesSetting_Typography'>Necessary Cookies</span> – <span className='Cookiessetting'> These cookies are used to make the website function properly, remember your preferences (e.g. dark mode/light mode), and maintain security.</span>
                                </div>
                                <div className='col-3 CookiesA'>
                                    Always Enabled
                                </div>
                            </div>
                        </Typography>
                        <Typography gutterBottom>
                            <div className='col-12 d-flex'>
                                <div className='col-9'>

                                    <span className='cookiesSetting_Typography'>Marketing Cookies</span> – <span className='Cookiessetting'>These cookies track your journey across the web (e.g. the websites you visit, when you visit them) in order to deliver targeted advertising.</span>
                                </div>
                                <div className='col-3 CookiesA'>
                                <FormControlLabel
                                        control={<IOSSwitch  checked={Cookies.Marketing}  onClick={handlechnage} sx={{ m: 1 }}  name="Marketing" />}
                                        
                                    />
                                </div>
                            </div>
                        </Typography>
                        <Typography gutterBottom>
                            <div className='col-12 d-flex'>
                                <div className='col-9'>

                                    <span className='cookiesSetting_Typography'>Analytical Cookies</span> – <span className='Cookiessetting'>These cookies collect information about the user’s device, IP address, location, language settings, and user interactions (e.g. mouse movements, clicks, and keyboard input).</span>
                                </div>
                                <div className='col-3 CookiesA'>
                                    <FormControlLabel
                                        control={<IOSSwitch checked={Cookies.Analytical} onClick={handlechnage} sx={{ m: 1 , color:"#00b96a" }}   name="Analytical"/>}
                                        
                                    />
                                </div>
                            </div>
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                <Box >
                <LoadingButton sx={{color:"#00b96a"}}  onClick={SaveCookies} >SAVE & ACCEPT</LoadingButton>
            </Box>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}