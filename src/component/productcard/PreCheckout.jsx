import React from "react"
import Createcontext from "../../hooks/context"
import Link from "next/link"
import { useRouter } from "next/router"

const PreCheckout = () => {
    const { state } = React.useContext(Createcontext)
    const params = useRouter()
    return (
        <>
            {
                (state.AllProduct?.length !== 0 && params.pathname.slice(0 ,  17) !== "/menu-integration") &&

                <div className="row">
                    <div className="col-12">
                        <div className="row justify-content-center">
                            <Link href={params.pathname.includes('menu-integration') ? '/carts' :"/cart"} className="">
                                <div className="col-lg-3 col-md-6 col-sm-8 col-8  mx-auto border preCheckout_container">
                                    <div className=" preCheck_heading">
                                        <h6>CHECKOUT</h6>
                                    </div>

                                    <div className=" preCheck_price">
                                        {
                                            state.LoadingApi ? <div className="loader"></div> : <p>{state.AllProduct?.length} products ${state.Cart_subTotal}</p>
                                        }
                                    </div>

                                </div>
                            </Link>
                        </div>

                    </div>


                </div>
            }
        </>
    )
}
export default PreCheckout