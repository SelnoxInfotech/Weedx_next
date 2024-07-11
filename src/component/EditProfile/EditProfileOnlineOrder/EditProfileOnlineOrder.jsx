import EditUserName from './EditProfileOnlineOrderComponent/EditUserName';
import AddMobileNumberPopup from './EditProfileOnlineOrderComponent/AddMobileNumerPopup';
import AddDeliveryAddressPopup from './EditProfileOnlineOrderComponent/AddDeliveryAddressPopup';
import AddPhotoId from './EditProfileOnlineOrderComponent/AddPhotoId';
import MedicalCardDetailsPopup from './EditProfileOnlineOrderComponent/MedicalCardDetailsPopup';
import AddDateOfBirth from './EditProfileOnlineOrderComponent/AddDateOfBirth';
const EditProfileOnlineOrder = ({Profile,Api,SetApi}) => {
   
    return (
        <div className="col-12 EditProfileOnlineOrder_main_column mt-4">
          
            <h2 className="email_notification_headings">{`Online Order`}</h2>
            <div className="row mx-0">
                <div className="col-12 col-lg-8 EditProfileOnlineOrder_container">
                    <div className="row mt-4 mx-0">
                        <div className="col-6 EditProfilOnlineOrder_name_flelds">
                            <div className='EditProfileOnline_name'>
                                <span className='editProfile_name'>{`Name`}</span>
                            </div>
                            <div className="EditProfileOnlineOrder">
                                <p className="editProfileLoginParaStyle ellipsis">{Profile.username}</p>
                            </div>

                        </div>
                        <div className="col-6 EditProfilOnlineEdit_icons_flelds">
                            <div className='EditProfileOnline_name'>
                                <EditUserName Username={Profile.username} Api={Api} SetApi={SetApi} />

                            </div>
                        </div>

                    </div>
                    <div className="row mt-4 mx-0">
                        <div className="col-6 EditProfilOnlineOrder_name_flelds">
                            <div className='EditProfileOnline_name'>
                                <span className='editProfile_name'>{`Mobile Number`}</span>
                            </div>
                            <div className="EditProfileOnlineOrder">
                                <p className="editProfileLoginParaStyle">{Profile.MobilePhone}</p>
                            </div>

                        </div>
                        <div className="col-6 EditProfilOnlineEdit_icons_flelds">
                            <div className='EditProfileOnline_name'>
                                <AddMobileNumberPopup  Mobile={Profile.MobilePhone} Api={Api} SetApi={SetApi}/>

                            </div>
                        </div>

                    </div>
                    <div className="row mt-4 mx-0">
                        <div className="col-6 EditProfilOnlineOrder_name_flelds">
                            <div className='EditProfileOnline_name'>
                                <span className='editProfile_name'>{`Delivery Address`}</span>
                            </div>
                            <div className="EditProfileOnlineOrder">
                                <p className="editProfileLoginParaStyle ellipsis">{Profile.DeliveryAddress !== null ? Profile.DeliveryAddress :'Delivery Address'}</p>
                            </div>
                        </div>
                        <div className="col-6 EditProfilOnlineEdit_icons_flelds">
                            <div className='EditProfileOnline_name'>
                                <AddDeliveryAddressPopup   DeliveryAddress={Profile.DeliveryAddress} Api={Api} SetApi={SetApi}/>

                            </div>
                        </div>

                    </div>
                    <div className="row mt-4 mx-0">
                        <div className="col-6 EditProfilOnlineOrder_name_flelds">
                            <div className='EditProfileOnline_name'>
                                <span className='editProfile_name'>{`Photo Id`}</span>
                            </div>
                            <div className="EditProfileOnlineOrder">
                                <p className="editProfileLoginParaStyle">{`Photo Id`}</p>
                            </div>

                        </div>
                        <div className="col-6 EditProfilOnlineEdit_icons_flelds">
                            <div className='EditProfileOnline_name'>
                                <AddPhotoId  image={Profile.PhotoId} Api={Api} SetApi={SetApi}/>

                            </div>
                        </div>

                    </div>
                    <div className="row mt-4 mx-0">
                        <div className="col-6 EditProfilOnlineOrder_name_flelds">
                        <div className='EditProfileOnline_name'>
                                <span className='editProfile_name'>{`Medical Card Details`}</span>
                            </div>
                            <div className="EditProfileOnlineOrder">
                                <p className="editProfileLoginParaStyle ellipsis">{`Medical Card Details`}</p>
                            </div>
                           
                        </div>
                        <div className="col-6 EditProfilOnlineEdit_icons_flelds">
                            <div className='EditProfileOnline_name'>
                                <MedicalCardDetailsPopup   Profile={Profile} Api={Api} SetApi={SetApi}/>
                            </div>
                        </div>

                    </div>

                    <div className="row mt-4 mx-0">
                        <div className="col-6 EditProfilOnlineOrder_name_flelds">
                        <div className='EditProfileOnline_name'>
                                <span className='editProfile_name'>{`Add Date Of Birth`}</span>
                            </div>
                            <div className="EditProfileOnlineOrder">
                              
                                {Boolean(Profile.DateOfBirth) ? <p className="editProfileLoginParaStyle">{Profile.DateOfBirth}</p> : <p className="editProfileLoginParaStyle">{`Add Date Of Birth`}</p>}
                            </div>
                        </div>
                        <div className="col-6 EditProfilOnlineEdit_icons_flelds">
                            <div className='EditProfileOnline_name'>
                                <AddDateOfBirth  Profile={Profile} Api={Api} SetApi={SetApi}/>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}
export default EditProfileOnlineOrder