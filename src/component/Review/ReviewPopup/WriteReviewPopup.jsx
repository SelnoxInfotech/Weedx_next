import * as React from "react";
import Dialog from "@mui/material/Dialog";
import useStyles from "../../../styles/style";
import { RiCloseCircleFill } from "react-icons/ri";
import Resizer from 'react-image-file-resizer';
import { IconButton } from "@mui/material";
import { Rating } from "@mui/material";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, FormControl } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Createcontext from "../../../hooks/context";
import { useRouter } from "next/router";
import CustomAlert from "../../CustomAlert/CustomAlert";
import { Menuintegration_login } from "../../../component/Login/menu-integration_login";
import Image from "next/image";
  const WriteReviewPopup = ({
    reviewloading,
    onSubmit,
    buttonclass,
    GetProductReview,
    SetGetProductReview,
  }) => {
  if (buttonclass === undefined) {
    buttonclass = "WriteReviewBtn_Color";
  }
  const navigate = useRouter();
  const { state } = React.useContext(Createcontext);
  const [images, setImages] = React.useState([])
  const [mediaurls, setmediaurls] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [alert, setalert] = React.useState({
        title:'',
        description:''
  })
  const location = useRouter()
  const [isvideo , setIsvideo] = React.useState(false)
  const [isalert , setisalert] = React.useState(false)
  const { register, handleSubmit, errors, getValues, control } = useForm();
  const classes = useStyles();
  const compressImage = (file) => {
    Resizer.imageFileResizer(
      file,
      300, // max width
      300, // max height
      'webp', // compress format
      70, // quality
      0, // rotation
      (uri) => {

        setImages([ ...images , uri]);
        setmediaurls([ ...mediaurls , URL.createObjectURL(uri)]);
      },
      'file' // output type
    );
  };
  const handleClickOpen = () => {
    if (state.login) {
      SetGetProductReview({ ...GetProductReview, popup: true });
    }else{
      if(location?.pathname?.includes('/menu-integration') ){
        setOpen(true)
      }else{
        navigate.push("/login");
      }
    }
  };
  const handleClose = () => {
    SetGetProductReview({ ...GetProductReview, popup: false });
  };
  const onImageChange = (event) => {
      if (event.target.files[0].type.includes('image')  ){
       
        compressImage(event.target.files[0])
      }else if (event.target.files[0].type.includes('video') && ( event.target.files[0].size < 10*1024*1024) ){
      
        if(isvideo){
        
          setalert({
            title:'Video Limit',
            description:'You can upload only one video file'
          })
          setisalert(true)
        }else{
          setImages([ ...images , event.target.files[0]]);
          setmediaurls([ ...mediaurls , URL.createObjectURL(event.target.files[0])]);
          setIsvideo(true)
        }
      }else if (event.target.files[0].type.includes('video') && ( event.target.files[0].size > 10*1024*1024) ){
      
        setalert({
          title:'Video Size',
          description:'Video Size should not be More than 10 MB'
        })
        setisalert(true)
      }
   } 
   
   function removemedia(index){
    let a= images.filter((item,indexx)=>{
      return indexx !== index
    })  
    setImages(a)
    let b= mediaurls.filter((item,indexx)=>{
      return indexx !== index
    })  
    setmediaurls(b)
   }
   React.useEffect(()=>{
    SetGetProductReview({ ...GetProductReview, media: images });
   },[images])
  return (
    <>
     <Box  className={`${classes.loadingBtnTextAndBack}`} >
       <LoadingButton variant="outlined" onClick={handleClickOpen}> Write a review </LoadingButton>
      </Box>
      <Dialog
        open={GetProductReview.popup}
        onClose={handleClose}
        className={classes.WriteReviewDialog}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 writeReviewContainer px-0">
              <div className="col-12 writeReviewCloseIconContainer">
                <IconButton onClick={handleClose} aria-label="closebutton">
                  <RiCloseCircleFill color="#949494" size={24} />
                </IconButton>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12 text-center">
                  <h2 className="writeReviewHeadings">Leave your Review</h2>
                  <h3 className="secRatingHeadings">How would you rate working at weedx.io?</h3>
                  <FormControl size={"small"}>
                    <Controller
                      render={() => (
                        <Rating
                          name="rating"
                          className={`mx-2 ${classes.WriteReviewStarIcons} ${errors.rating && 'customteatfsdfg'}` }
                          value={GetProductReview.value}
                          onChange={(e) => SetGetProductReview({ ...GetProductReview, 'value': e.target.value })}
                          precision={1}
                        />
                      )}
                      rules={{ required: GetProductReview.value === 0 }}
                      control={control}
                      name={'rating'}
                    />
                  </FormControl>
                </div>
                <div className="col-12 px-4 py-4">
                 
                  <div className="col-12">
                    <label className="writeReviewLabel" htmlFor="title">
                    Your Title at Work
                    </label>
                      <TextField
                        className={`${classes.reviewTextFieldStyle}`}
                        size="medium"
                        id="title"
                        value={GetProductReview.Title}
                        onChange={(e) => {
                          SetGetProductReview({
                            ...GetProductReview,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        name="Title"
                        placeholder="Enter your title at work"
                      
                        fullWidth
                        inputRef={register("Title",{
                          required: GetProductReview.comment !== '' ?  GetProductReview.Title === "" && "Title is required*." : false,
                          minLength: {
                            value: 5,
                            message: "Please enter valid Title",
                          },
                          maxLength: {
                            value: 150,
                            message: "Please enter shot valid Title",
                          },
                        })}
                        helperText={errors.Title?.message}
                        error={Boolean(errors?.Title)}
                      />
                  </div>
                  <div className="col-12 ">
                  
                    <TextField
                      className={classes.Reviewtextarea}
                      size="medium"
                      id="title"
                      value={GetProductReview.comment}
                      onChange={(e) => {
                        SetGetProductReview({
                          ...GetProductReview,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      name="comment"
                      placeholder="Write a review...."
                      fullWidth
                      multiline
                      rows={5}
                      inputRef={register("comment",{
                        minLength: {
                          value: 5,
                          message: "Please enter valid Review",
                        },
                        maxLength: {
                          value: 250,
                          message: "Please enter shot valid Review",
                        },
                      })}
                    />
                  </div>
                  <div className="col-12">
                     <div className="reviewImage">
                      <input type='file' id="Reviewimage" accept="image/*,video/*" className="d-none" onChange={onImageChange}  />
                        <label htmlFor="Reviewimage" className="Reviewimagebox">
                           <div className="text-center">
                               <p className="text-center"><IoCloudUploadOutline size={22} /> <span>Drop Image And Video here or click to upload</span>
                              </p>
                              <span className="reviewnote"><b>Note:-</b> Video Size should be less than 10 MB and Only One Video is allow</span>
                            </div>
                           
                        </label>
                     </div> 
                   
                      {
                          mediaurls.length !==0 && <div className="media_list">{
                            mediaurls.map((item, index)=>{
                              if(Boolean(images[index]?.type?.includes('image'))){
                                return <span key={index} className="uploadedImage"> <span onClick={()=>{removemedia(index)}} className="crossbtn"><RxCross2 />
                                </span> <Image unoptimized={true} width={100} height={100} src={item} alt="adkgfdg" /> </span>
                              }else{
                                return <span key={index}className="uploadedVideo"> <span onClick={()=>{removemedia(index)}} className="crossbtn"><RxCross2 />
                                </span> <video src={item} width="320" height="240" muted controls autoplay />   </span>
                              }
                            })}
                         </div>
                      }
                  
                    
                  </div>
                  <div className="col-12">
                      <LoadingButton loading={reviewloading} className={classes.submitreviewbtn}   type="submit" variant="outlined">Submit</LoadingButton>
                  </div>
                </div>
              </form>
             { isalert && <CustomAlert title={alert.title}  discription={alert.description} setisalert={setisalert}/>}
            </div>
          </div>
        </div>
      </Dialog >
      {
        open && <Menuintegration_login open={open} setOpen={setOpen}></Menuintegration_login>
      }
    </>
  );
};
export default WriteReviewPopup;
