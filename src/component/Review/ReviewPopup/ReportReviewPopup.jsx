import React from "react"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import useStyles from "../../../styles/style";
import { RiCloseCircleFill } from "react-icons/ri"
import { IconButton } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { LoadingButton } from "@mui/lab";
import Box from "@mui/material/Box";
const ReportReviewPopup = () => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button className={classes.WriteReviewBtn_Color} variant="outlined" onClick={handleClickOpen}>
                Report
            </Button>
            <Dialog open={open} onClose={handleClose} className={classes.WriteReviewDialog}>
                <div className="container-fluid py-5">
                    <div className="row">
                        <div className="col-12 reportReviewContainer px-0">
                            <div className="col-12 closeBtnAndHeading">
                                <div className="col-8 ReportHeadAlignCenter">
                                    <h2 className="reportPopupHeading">Report Review</h2>
                                </div>
                                <div className="col-4 reportReviewCloseIcons">
                                    <IconButton onClick={handleClose}><RiCloseCircleFill /></IconButton>
                                </div>
                            </div>
                            <form>
                                <div className="col-12 reportReviewContentContainer">

                                    <div className="col-12">
                                        <FormGroup>
                                            <FormControlLabel
                                           
                                                control={<Checkbox
                                                    className={classes.reportCheckBox}
                                                />}
                                                label={<div className="reportReviewFirstLAbelDiv">
                                                    <h5 className="reportReviewfirstLabel">Review is from a bot, a fake account or contains ads and promotions</h5>
                                                </div>} />
                                            <FormControlLabel
                                                control={<Checkbox
                                                    className={classes.reportCheckBox}
                                                />}
                                                label={
                                                    <div className="headingTypeLabelContainer">
                                                        <h5 className="HeadingTypeLabel">Bullying or harassment</h5>
                                                        <h5 className="HeadingTypeReview_subLabel">Review personally attacks a specific individual</h5>
                                                    </div>

                                                } />
                                            <FormControlLabel
                                                className={classes.reportCheckBox}
                                                control={<Checkbox />}
                                                label={
                                                    <div className="headingTypeLabelContainerThirdFourth">
                                                        <h5 className="HeadingTypeLabel">Discrimination or hate speech</h5>
                                                        <h5 className="HeadingTypeReview_subLabel"> Review has harmful language about an individual or group based on identity</h5>
                                                    </div>
                                                } />
                                            <FormControlLabel
                                                className={classes.reportCheckBox}
                                                control={<Checkbox />}
                                                label={
                                                    <div className="headingTypeLabelContainerThirdFourth">
                                                        <h5 className="HeadingTypeLabel">Personal information</h5>
                                                        <h5 className="HeadingTypeReview_subLabel">Review contains personal information, such as an address or phone number</h5>
                                                    </div>
                                                } />
                                            <FormControlLabel
                                                className={classes.reportCheckBox}
                                                control={<Checkbox />}
                                                label={
                                                    <div className="headingTypeLabelContainer">
                                                        <h5 className="HeadingTypeLabel">Not helpful</h5>
                                                        <h5 className="HeadingTypeReview_subLabel">Review doesn’t help people decide whether to go to this place</h5>
                                                    </div>
                                                } />
                                        </FormGroup>
                                    </div>
                                    <div>
                                        <Box
                                            className={`mt-4 ${classes.reportReviewPopupCancelBtn}`}
                                        >
                                            <LoadingButton variant="outlined" onClick={handleClose}> Cancel</LoadingButton>
                                        </Box>
                                        <Box
                                            className={`mt-4 ${classes.reportSubmitBtn}`}
                                        >
                                            <LoadingButton variant="outlined" type="submit"> Submit</LoadingButton>
                                        </Box>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>
            </Dialog>

        </React.Fragment>
    )
}
export default ReportReviewPopup