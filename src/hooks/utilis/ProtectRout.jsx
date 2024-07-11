
import React from "react"
import Createcontext from "@/hooks/context"
import { useRouter } from "next/router";
import Cookies from 'universal-cookie';
import Currentlocation from "@/component/currentlocation/CurrentLocation";
export default function ProtectRout({children}) {

    const cookies = new Cookies();
    let login = cookies.get("User_Token_access")
    let accessToken 
    if (typeof window !== 'undefined') {

         accessToken = localStorage.getItem('User_Token_access');

    }
    // logi  =  accessToken
    if(  Boolean(accessToken) ){ login  =  accessToken}
    const Navigate = useRouter()
 
    const { state, dispatch } = React.useContext(Createcontext)
    React.useEffect(() => {
        if (!login) {

            Navigate.push("/login")
            dispatch({ type: 'Login', login: false });


        }
        else {

            if (Navigate.pathname === "/CheckOutMainPage") {
                if ( state.AllProduct.length === 0) {
                    dispatch({ type: 'Login', login: true })
                    Navigate.push("/cart")
                }
            }
            else {

                dispatch({ type: 'Login', login: true })
            }


        }




    }, [])
    return (

        <div>
           
           
              {state.permission === false && <Currentlocation></Currentlocation>}
              {children}
           
          

        </div>
    )
}