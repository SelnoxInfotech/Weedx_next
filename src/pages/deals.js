import MainDeals from '@/component/MainDealsFolder/MainDeals';
import React from 'react';
import Createcontext from '@/hooks/context';
import Currentlocation from '@/component/currentlocation/CurrentLocation';
const Deals = () => {
    const { state } = React.useContext(Createcontext)
    return (
        <div>
               {state.permission && <Currentlocation></Currentlocation>}
            <MainDeals></MainDeals>
        </div>
    );
};

export default Deals;