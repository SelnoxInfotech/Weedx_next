import React from "react"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import Button from "@mui/material/Button"
import { AiFillEye } from "react-icons/ai"
import { BsFillEyeSlashFill } from "react-icons/bs"
import { Box } from "@mui/material";
import useStyles from "@/styles/style"
import { InputAdornment } from "@material-ui/core"
import LoadingButton from "@mui/lab/LoadingButton"
import { MdEdit } from "react-icons/md"
import { RiCloseCircleFill } from "react-icons/ri"
import IconButton from '@mui/material/IconButton';
const EditPasswordPopup = () => {
    const classes = useStyles()
    const [Open, SetOpen] = React.useState(false)
    const handleClickOpen = () => {
        SetOpen(true)
    }
    const handleClose = () => {
        SetOpen(false)
    }
    const [ShowPassword, SetShowPassword] = React.useState(false)
    const [NewPassword, SetNewPassword] = React.useState(false)
    const [ShowConfirmPassword, SetShowConfirmPassword] = React.useState(false)

    const handleShowHidePwd = () => {
        SetShowPassword((show) => {
            return !show
        })
    }
    const handleShowHideConfirmPwd = () => {
        SetShowConfirmPassword((show) => {
            return !show
        })
    }
    const handleNewPassword = () => {
        SetNewPassword((newPassword) => {
            return !newPassword
        })
    }
    return (
        <div>
            <Button className={`${classes.EditProfileBtn_Color}`} startIcon={<MdEdit color="#707070" size={18} />} onClick={handleClickOpen}>
                {`Edit`}
            </Button>
            <Dialog open={Open} onClose={handleClose} className={classes.editPwd_Popup_dialog}>
                <div className="container-fluid px-4">
                    <div className="row ">
                        <div className="col-12 text-end mt-4 editPassword_Col">
                            <IconButton onClick={handleClose} aria-label="closebutton"><RiCloseCircleFill color='#949494' size={24} /></IconButton>
                        </div>
                        <div className="col-12 mt-4 editPassword_Col">
                            <h2 className="editPassword_heading">{`Edit password`}</h2>
                        </div>

                    </div>
                    <form>
                        <div className="row">
                            <div className="col-12 editPassword_Col">
                                <label className="editPassword_label" htmlFor="current password">{`Current Password`}</label>
                            </div>
                            <div className="col-12 editPassword_Col_textfield mt-2">
                                <TextField id="current password"
                                    type={ShowPassword ? "text" : "password"}
                                    className={`${classes.FilledTextFieldStyle}`}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleShowHidePwd}>
                                                    {ShowPassword ? <BsFillEyeSlashFill /> : <AiFillEye color="#707070" size={22} />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    variant="filled" placeholder="Password" fullWidth />
                            </div>
                            <div className="col-12 mt-2">
                                <p className="forgotPwdLink">{`Forgot Password`}</p>
                            </div>
                            <div className="col-12 editPassword_Col">
                                <label className="editPassword_label" htmlFor="NewPassword">{`New Password`}</label>
                            </div>
                            <div className="col-12 editPassword_Col_textfield mt-2">
                                <TextField id="NewPassword"
                                    type={NewPassword ? "text" : "password"}
                                    className={`${classes.FilledTextFieldStyle}`}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleNewPassword}>
                                                    {NewPassword ? <BsFillEyeSlashFill /> : <AiFillEye color="#707070" size={22} />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    variant="filled" placeholder="Password" fullWidth />
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-12 mt-4">
                                <label className="editPassword_label" htmlFor="ConfirmPassword">{`Confirm Password`}</label>
                            </div>
                            <div className="col-12 editPassword_Col_textfield mt-2">
                                <TextField id="ConfirmPassword"
                                    type={ShowConfirmPassword ? "text" : "password"}

                                    className={`${classes.FilledTextFieldStyle}`}
                                    InputProps={{

                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleShowHideConfirmPwd}>
                                                    {ShowConfirmPassword ? <BsFillEyeSlashFill /> : <AiFillEye color="#707070" size={22} />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    placeholder="Password" variant="filled" fullWidth />
                            </div>
                            <div className="col-12 mt-2">
                                <p className="pwdAtLeastChar">{`Atleast 8 characters.`}</p>

                            </div>

                        </div>
                        <Box className={`mt-4 ${classes.editEmail_loadingBtn}`}>
                            <LoadingButton onClick={handleClose}>{`Save`}</LoadingButton>
                        </Box>
                        <Box className={`mt-4 ${classes.editEmail_loadingBtn_cancel}`}>
                            <LoadingButton onClick={handleClose}>{`Cancel`}</LoadingButton>
                        </Box>
                    </form>
                </div>
            </Dialog>
        </div>
    )
}
export default EditPasswordPopup