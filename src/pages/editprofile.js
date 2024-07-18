import React, { useContext } from "react"
import { IoChevronBackSharp } from "react-icons/io5"
import EditProfileLogin from "@/component/EditProfile/EditProfileComponent/EditProfileLogin"
import EditProfileOnlineOrder from "@/component/EditProfile/EditProfileOnlineOrder/EditProfileOnlineOrder"
import Notification from "@/component/EditProfile/EditProfileComponent/Notification"
import { IconButton } from "@mui/material"
import Resizer from 'react-image-file-resizer';
import { AiFillCamera } from "react-icons/ai";
import Link from "next/link"
import Cookies from 'universal-cookie';
import Image from "next/image"
import Axios from 'axios';
import Createcontext from "../hooks/context"
const EditProfile = () => {
    const { state, dispatch } = useContext(Createcontext)
    const cookies = new Cookies();
    const [Profile, SetProfile] = React.useState({})
    let token_data = cookies.get('User_Token_access')
    let accessToken
    if (typeof window !== 'undefined') {

        accessToken = localStorage.getItem('User_Token_access');

    }
    if(  Boolean(accessToken) ){ token_data  =  accessToken};
   React.useEffect(()=>{
    SetProfile((prevProfile) => { return  state.Profile  });
   },[])
    const [Api, SetApi] = React.useState(false)
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [Error, SetError] = React.useState('')
    React.useEffect(() => {
        if (Boolean(token_data)) {
            const config = {
                headers: { Authorization: `Bearer ${token_data}` }
            };

            Axios.get(`https://api.cannabaze.com/UserPanel/Get-GetUserProfile/`,
                config,

            )
                .then((res) => {
                    SetProfile(res.data)
                    dispatch({ type: 'Profile', Profile: res.data })
                })
                .catch((error) => {
                    console.error("error")
                })
        }  
    }, [Api, token_data])
    const handleImage = (event) => {
        const file = event.target.files[0];
        compressImage(file)
    }
    const compressImage = (file) => {
        Resizer.imageFileResizer(
            file,
            300, // max width
            300, // max height
            'webp', // compress format
            70, // quality
            0, // rotation
            (uri) => {
                setSelectedImage(URL.createObjectURL(uri))
                SetError('')
                Submit(uri)
            },
            'file' // output type
        );
    };
    const Submit = (w) => {
        const formdata = new FormData();
        formdata.append('image', w);
        formdata.append('googlelink', '');
        Axios.post(`https://api.cannabaze.com/UserPanel/Update-UpdateUserProfile/`,
            formdata,
            {
                headers: {
                    'Authorization': `Bearer ${token_data}`
                }
                ,
            }
        ).then((res) => {
            dispatch({ type: 'Profile', Profile: res.data.data })
        }).catch((error) => {

            setError("Username", {
                type: "manual",
                message: error.response.data.error.username[0],
            })
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 profile_setting_container mt-4">
                    <div className="EditProfile_heading_cont d-lg-none d-block">
                        <Link href="/Profile"><span><IconButton><IoChevronBackSharp color="#707070" size={18} /></IconButton></span><span className="editProfile_backBtn">Back Profile</span></Link>
                    </div>
                    <div className="EditProfile_heading_cont">
                        <h1 className="EditProfile_heading">{`Profile Setting`}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="profileImage">
                            <div className="ProfileImageWrapper">

                                {
                                    selectedImage !== null ? <Image unoptimized={true} width={100} height={100} src={selectedImage} alt='profile_image'
                                        title='profile_image'
                                        className="profile_images" />
                                        :
                                        <Image
                                        unoptimized={true}
                                            width={100}
                                            height={100}
                                            src={state.Profile.googlelink === null ? `${state.Profile.image} ` : state.Profile.googlelink}
                                            alt='profile_image'
                                            title='profile_image'
                                            className="profile_images"
                                        />
                                }
                            </div>
                            <div className="w-100 profileInput_container">
                                <label for="profile image" className="change_profile_container_padding">
                                    <input onChange={(event) => { handleImage(event) }} type="file" capture="environment" hidden id="profile image" />
                                    <AiFillCamera color="#707070" size={22} /><span className="nameChangeProfile">{`Change profile`}</span>
                                    {Error !== '' && <p style={{ color: "red", fontSize: 'x-small' }}>{Error}</p>}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <EditProfileLogin Profile={Profile} Api={Api} SetApi={SetApi} />
                <EditProfileOnlineOrder Profile={Profile} Api={Api} SetApi={SetApi} />
                <Notification Profile={Profile} Api={Api} SetApi={SetApi} />
            </div>

        </div>
    )
}
export default EditProfile