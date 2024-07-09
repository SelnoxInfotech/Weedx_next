import React, { useContext } from 'react';
import Createcontext from "../../hooks/context";
import { useRouter } from 'next/router';
import RoutingSearch from "../utilis/RoutingSearch";

export default function RoutingDespen({ children }) {
    const { state, dispatch } = useContext(Createcontext);
    const params = useRouter();
    const Location = useRouter();
    const location = params?.query?.location;

    return (
        <div>
            {(state.permission === false && location &&
                (location[3]?.toLowerCase() !== state?.City?.toLowerCase() ||
                    location[2]?.toLowerCase() !== state?.State?.toLowerCase() ||
                    location[1]?.toLowerCase() !== state?.Country?.toLowerCase() ||
                    location[4]?.toLowerCase() !== state?.route?.toLowerCase())) &&
                <RoutingSearch
                    city={location[3]}
                    State={location[2]}
                    country={location[1]}
                    route={location[4]}
                    pathname={Location.pathname.slice(0, 18) === '/weed-dispensaries' ? "/weed-dispensaries" : "/weed-deliveries"}
                />
            }
            <main>{children}</main>  
        </div>
    );
}
