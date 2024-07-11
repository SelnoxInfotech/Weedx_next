import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import useStyles from "@/styles/style"
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { AiFillHeart } from "react-icons/ai"
import { FaCannabis } from "react-icons/fa"
import Grid from '@mui/system/Unstable_Grid';
import Link from 'next/link';
import { BsFillTagFill } from "react-icons/bs"
import {GrMail} from "react-icons/gr"  
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    '&, .MuiDialog-container ': {
        // maxWidth: '413px' // 100% is for full height or anything else what you need
    },
    "& .MuiDialog-container": {
        "& .MuiPaper-root": {
          width: "50%",
          height: "auto",  // Set your width here
          borderRadius: "20px",
          background: "#FFFFFF",
          padding:"10px"
        },
      },
      "@media(max-width:800px)": {
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            minWidth: "70%",
          },
        },
      },
      "@media(max-width:500px)": {
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            minWidth: "90%",
          },
        },
      }
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

export function WhisList({ open1, SetWishList }) {
    const classes = useStyles()
    // const [open, setOpen] = React.useState(open1);
    const handleClose = () => {
        SetWishList(false);
    };

    return (

        <div style={{ width: 500 }}>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open dialog
            </Button> */}
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open1}
                PaperProps={{
                    style: { borderRadius: '1rem' }   }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <div className='col-12 WhisListTop' >
                        <AiFillHeart size={50}></AiFillHeart>
                    </div>
                </BootstrapDialogTitle>
                <div>
                    <DialogContent >
                        <Typography gutterBottom>
                            <span className='TypographyWishList'>  Save your favorites in one place</span>
                        </Typography>
                        <Typography gutterBottom  >
                            <span className='TypographyWishList1'>
                                Log in or sign up to save your favorite products, brands,
                                strains and dispensaries across all devices
                            </span>
                        </Typography>
                        <Typography gutterBottom component={'div'}>
                            <h2 className='TypographyWishList2'> <span><FaCannabis></FaCannabis></span> <span>Save products to browse another time</span></h2>
                        </Typography>
                        <Typography gutterBottom component={'div'}>
                            <h2 className='TypographyWishList2' >
                                <span><BsFillTagFill></BsFillTagFill></span>
                                <span>Learn about latest deals on saved items</span>
                            </h2>

                        </Typography>
                        <Typography gutterBottom component={'div'}>
                            <h2 className='TypographyWishList2' >
                                <span><GrMail></GrMail></span>
                                <span> Get notified when saved items are back in stock</span>
                            </h2>
                        </Typography>
                        
                    </DialogContent>
                </div>
                <DialogActions>
                   <div className='col-12 center whislistLOginBtnCol' >
                   <Grid>
                      <Link href="/login" >   <Button className={classes.muiBtn} >Login</Button></Link>
                    </Grid>
                    <Grid>
                      <Link href="/signup" >    <Button   onClick={handleClose} sx={{ boxShadow: 3 }} className={classes.muiBtn_Signup} >Signup</Button></Link>
                    </Grid>
                    
                   </div>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );

}
