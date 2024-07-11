import * as React from 'react';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import { AiFillPlusCircle } from "react-icons/ai"
import IconButton from '@mui/material/IconButton';
import { RiCloseCircleFill } from "react-icons/ri"
import { Box } from '@mui/system';
import useStyles from '@/styles/style';
// import { LazyLoadImage } from "react-lazy-load-image-component";
import Image from 'next/image';
import { AiFillCamera } from "react-icons/ai"
import LoadingButton from "@mui/lab/LoadingButton"
import Cookies from 'universal-cookie';
import Axios from 'axios';
const AddPhotoId = ({ image, Api, SetApi }) => {
    const classes = useStyles()
    const cookies = new Cookies();
       let token_data = cookies.get('User_Token_access')
       let accessToken 
       if (typeof window !== 'undefined') {
   
            accessToken = localStorage.getItem('User_Token_access');
   
       }
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [image1, Setimage] = React.useState(null)
    const [Open, SetOpen] = React.useState(false)
    const [Error, SetError] = React.useState('')
    const handleClick = () => {
        SetOpen(true)
    }
    const handleClose = () => {
        SetOpen(false)
    }


    const handleImage = (event) => {
        const file = event?.target?.files[0];
        if (file?.size <  1048576) {

            Setimage(event.target.files[0]);
            setSelectedImage(URL.createObjectURL(event.target.files[0]))
            SetError('')
        }
        else {
            SetError('File size large')
        }

    }
    const Submit = () => {
        const formdata = new FormData();
        formdata.append('PhotoId', image1);
        Axios.post(`https://api.cannabaze.com/UserPanel/Update-UpdateUserProfile/`,
            formdata,
            {
                headers: {
                    'Authorization': `Bearer ${token_data}`
                }
                ,
            }
        )
            .then((res) => {
                // reset(Address)
                SetOpen(false);
                SetApi(!Api)
            })
            .catch((error) => {
             
                // setError("Username", {
                //     type: "manual",
                //     message: error.response.data.error.username[0],
                // })
            })
    }
    return (
        <div>
            <Button className={`${classes.EditProfileBtn_Color}`} onClick={handleClick} startIcon={<AiFillPlusCircle color='#707070' size={20} />}>
                Add
            </Button>
            <Dialog open={Open} onClose={handleClose} className={classes.addPhotoPopup} >
                <div className='container-fluid my-4 px-4'>
                    <div className='row'>
                        <div className='col-12 text-end AddPhotoIdPoppup_col'>
                            <IconButton onClick={handleClose} aria-label="closebutton"><RiCloseCircleFill color='#949494' size={24} /></IconButton>
                        </div>
                        <div className='col-12 AddPhotoIdPoppup_col'>
                            <h2 className='photoId_heading'>Photo Id Upload</h2>
                        </div>

                    </div>
                    <form>
                        <div className='row'>
                            <div className='col-12 add_photos_col_container mt-4'>
                                <section className='addphoto_section'>
                                    <div className='add_photo_container'>
                                        {
                                            selectedImage !== null ? <Image src={selectedImage} alt='user Image' title={'User Image'} className='add_photo_size' />
                                                :
                                                <Image
                                                    onError={event => {
                                                        event.target.src = "./image/user.webp"
                                                        event.onerror = null
                                                    }}
                                                    src={`${image}`}
                                                    // src={image}
                                                    alt='User Image'
                                                    title={'User Image'}
                                                    className='add_photo_size'
                                                />
                                        }

                                    </div>
                                    <div className="add_photo_label_div">
                                        <label htmlFor="Add photo" className="add_photo_label">
                                            <div className='center'>
                                                <AiFillCamera color="#707070" size={22} />
                                            </div>
                                            <div className="changePhoto_title mx-0">Change photo</div>

                                            <input
                                                type="file"
                                                accept="image/*"
                                                hidden
                                                id="Add photo"
                                                name="myImage"
                                                onChange={(event) => { handleImage(event)}}
                                            />
                                        </label>
                                    </div>

                                </section>

                            </div>

                        </div>
                        {Error !== '' && <p style={{color:"red"}}>{Error}</p>}
                        <Box className={` mt-4 ${classes.editEmail_loadingBtn}`}>
                            <LoadingButton onClick={Submit}>Save</LoadingButton>
                        </Box>
                        <Box className={`mt-5 ${classes.editEmail_loadingBtn_cancel}`}>
                            <LoadingButton onClick={handleClose}>Cancel</LoadingButton>
                        </Box>
                    </form>
                </div>
            </Dialog>

        </div>
    )
}
export default AddPhotoId