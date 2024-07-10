
import React from "react"
import useStyles from "../../../../Style"
import Createcontext from "../../../../Hooks/Context"
import { Link, NavLink } from "react-router-dom";
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Aos from "aos";
import "aos/dist/aos.css"
import IconButton from '@mui/material/IconButton';
import { FaBars } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import { MdOutlineShoppingCart } from "react-icons/md"
import Grid from '@mui/system/Unstable_Grid';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { TbLogout } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import Cookies from 'universal-cookie';
import { Menuintegration_login } from "../../Login/menu-integration_login";
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import { modifystr } from "../../../../Hooks/Function";
const Menuintregrate = ({tab = "Menu" }) => {
    const navigate = useNavigate()
    const { state, dispatch } = React.useContext(Createcontext)

    function SelectionTab(item) {
        Boolean(state.Embeddedstore[0]) && navigate (`/menu-integration/${modifystr(state.Embeddedstore[0]?.Store_Name)}/${modifystr(item)}/${state.Embeddedstore[0].id}`)
    }
    const cookies = new Cookies();
    const [open, setOpen] = React.useState(false);
    const classes = useStyles()
    const profileRef = React.useRef(null)
    const [DropDownState, SetDropDownState] = React.useState(false);
    const [navactive, Setnavactive] = React.useState(false);
    const StoreDetailMenuItem = [{ item: "Menu", color: "#31B665" }, { item: "Store Details", color: "#31B665" },
    { item: "Review", color: "#31B665" }, { item: "Deals", color: "#31B665" },
    ]
    const handleClickDropdown = () => {
        SetDropDownState((DropDownState) => {
            return !DropDownState;
        })
    }
    React.useEffect(() => {
        const handleClickOutsideprofile = (event) => {
          if (profileRef.current && !profileRef.current.contains(event.target)) {
            if (DropDownState) {
              SetDropDownState((DropDownState) => !DropDownState)
            }
          }
        };
        document.addEventListener('click', handleClickOutsideprofile, true);
        return () => {
          document.removeEventListener('click', handleClickOutsideprofile, true);
        };
      }, [DropDownState]);
    
    async function Logout() {
        localStorage.removeItem('User_Token_access');
        await cookies.remove('User_Token_access')
            await dispatch({ type: 'Login', login: false })
        await dispatch({ type: 'ApiProduct' })
        await dispatch({ type: 'Profile' , Profile :[] })
    }
    React.useEffect(function () {
        Aos.init({ duration: 1000 });
      }, []);

    return (
       <div className="integratedheader"> 
                        <div className="container-fluid">
                            <div className="StoreDetailMenuItem_container">
                            
                                {
                                    navactive?
                                    <ol className={"store_detail_order_list"} >
                                    {StoreDetailMenuItem.map((ele, index) => {
                                        return (
                                            <li className=" store_detail_list"
                                            onClick={() => { SelectionTab(ele.item);Setnavactive(false) }}
                                                style={{ color: tab === ele.item.toLowerCase().replace(" ", "-")
                                                    && ele.color }}
                                                key={index}><span className="storeDetalMenuItemCursor">{ele.item}</span></li>
                                        )
                                    })}
                                   <li className="crossbtn"><GrFormClose color="#000" size={32} onClick={()=>{Setnavactive(false)}} /></li>
                                </ol>
                                :
                                <ol className="store_detail_order_list d-none d-md-flex">
                                {StoreDetailMenuItem.map((ele, index) => {
                                    return (
                                        <li className=" store_detail_list"
                                        onClick={() => { SelectionTab(ele.item);Setnavactive(false) }}
                                            style={{ color: tab === ele.item.toLowerCase().replace(" ", "-")
                                                && ele.color }}
                                            key={index}><span className="storeDetalMenuItemCursor">{ele.item}</span></li>
                                    )
                                })}
                            <li className="crossbtn d-inline d-md-none "><GrFormClose color="#000" size={32} onClick={()=>{Setnavactive(false)}} /></li>
                                </ol>
                                }
                                <div className="d-flex gap-4">
                                    <div style={{ display: "contents" }}>
                                        <Link to="/carts">
                                            <Badge badgeContent={state.AllProduct?.length > 0 ? state.AllProduct?.length : null} className={`state.LoadingApi ? "animated bounce" : " " ${classes.sliderLink_badge}`}>
                                                <IconButton className={classes.navBarButton_icons} aria-label='shopping-cart'><MdOutlineShoppingCart color="#858585" size={22}></MdOutlineShoppingCart></IconButton>
                                            </Badge>
                                        </Link>
                                    </div>
                                    <div>
                                        {
                                            state.login === true
                                                ?
                                                <div className='navbarProfileDropDown_container' ref={profileRef}>
                                                    <Grid display={{ md: "flex" }} justifyContent="flex-end">
                                                        <div className='Navbar_profile_logo_container'>
                                                            <LazyLoadImage
                                                                onError={event => {
                                                                    event.target.src = "/image/user.webp"
                                                                    event.onerror = null
                                                                }}
                                                                src={state.Profile.googlelink === null ? `${state.Profile.image} ` : state.Profile.googlelink}
                                                                alt='Profile'
                                                                title='Profile'
                                                                className="Navbar_logo_imgs"
                                                                onClick={handleClickDropdown}
                                                            />
                                                        </div>
                                                    </Grid>
                                                    {DropDownState && (
                                                        <div className='profileDropdown_container'>
                                                            <section className='Navbar_proflie_image_name_section'>

                                                                <div className='profile_name_container'>
                                                                    <p className='profile_names ellipsis'>{state.Profile.username}</p>

                                                                </div>

                                                            </section>
                                                            <hr />
                                                            <section className=' navbarProfileDropDownSection'>
                                                                <ol className='navbar_profile_orderList px-0'>

                                                                    
                                                                    <li className='profile_list' onClick={() => { Logout() }}>  <span><TbLogout /></span> LOGOUT</li>



                                                                </ol>

                                                            </section>

                                                        </div>
                                                    )}

                                                </div>
                                                :
                                                <div className='Login_Sigup_button justify-content-end  Sapceing'>
                                                
                                                        <Grid >
                                                            <span  onClick={()=>setOpen(()=>true)}>
                                                                <Tooltip title="Login">
                                                                    <IconButton>
                                                                    <FaRegUserCircle size={22} color="#858585"/>
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </span>
                                                        </Grid>
                                                </div>
                                        }
                                    </div>
                                    <div className="d-flex align-items-center d-md-none">
                                      <FaBars color="858585" size={18} onClick={()=>{Setnavactive(true)}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {
                        open && <Menuintegration_login open={open} setOpen={setOpen}></Menuintegration_login>
                    }
          </div>
    )
}
export default Menuintregrate