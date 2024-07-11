import { MdEmail } from "react-icons/md";
import React from "react";
import { FaUser } from "react-icons/fa"
import { AiFillEye } from "react-icons/ai"
import EditEmailPopup from "./EditEmailPopup";
import EditUserPopup from "./EditUserPopup";
import EditPasswordPopup from "./EditPasswordPopup";
const EditProfileLogin = ({Profile, Api, SetApi}) => {
    
    return (
        <div className="col-12 EditProfileLogin_mainColumns">
            <div className="w-100">
                <h2 className=" email_notification_headings">{`Login`}</h2>
            </div>
            <div className="row mx-0">
                <div className="col-12 col-lg-8 EditProfileOnlineOrder_container py-4">
                    <form>
                        <div className="row">
                            <div className="col-6 editProfileLogin_emailField_container">
                                <div className="EditEmail_inner_container ">
                                    <span><MdEmail color="#707070" size={20} /></span><span className="editProfileLogin_padding_left editProfile_label"><label>{`Email`}</label></span>
                                </div>
                                <div className="EditProfileLoginParagraph">
                                    <p className="editProfileLoginParaStyle ellipsis">{Profile?.email}</p>
                                </div>
                            </div>
                            <div className="col-6  editProfileLogin_emailField_container_edit">
                                <div className="editSpan_div">
                                   <EditEmailPopup email={Profile?.email} Api={Api}  SetApi = {SetApi}/>
                                </div>
                            </div>

                        </div>
                        <div className="row mt-2">
                            <div className="col-6 editProfileLogin_emailField_container">
                                <div className="EditEmail_inner_container ">
                                    <span><FaUser color="#707070" size={20} /></span>
                                    <span className="editProfileLogin_padding_left editProfile_label"><label>{`User Name`}</label></span>
                                </div>
                                <div className=" EditProfileLoginParagraph">
                                    <p className="editProfileLoginParaStyle ellipsis">{Profile?.username}</p>
                                </div>
                            </div>
                            <div className="col-6  editProfileLogin_emailField_container_edit">
                                <div className="editSpan_div">

                                    <EditUserPopup username={Profile?.username} Api={Api}  SetApi = {SetApi}></EditUserPopup>
                                </div>
                            </div>

                        </div>
                        <div className="row mt-2">
                            <div className="col-6 editProfileLogin_emailField_container">
                                <div className="EditEmail_inner_container ">
                                    <span><AiFillEye color="#707070" size={20} /></span>
                                    <span className="editProfileLogin_padding_left editProfile_label"><label>{`Password`}</label></span>
                                </div>
                                <div className=" EditProfileLoginParagraph">
                                    <p className="editProfileLoginParaStyle">{`Password`}</p>
                                </div>
                            </div>
                            <div className="col-6  editProfileLogin_emailField_container_edit">
                                <div className="editSpan_div">
                                    <EditPasswordPopup/>
                                </div>
                            </div>

                        </div>
                    </form>

                </div>
            </div>

        </div>
    )
}
export default EditProfileLogin