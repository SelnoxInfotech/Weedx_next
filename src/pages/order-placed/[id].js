import PlaceOrder from '@/component/Checkout/PlaceOrder';
import React from 'react';
import Createcontext from '@/hooks/context';
import Currentlocation from '@/component/currentlocation/CurrentLocation';

const Orderplaced = (props) => {
const {state} = React.useContext(Createcontext)
    return (
      <>
        {state.permission === false && <Currentlocation></Currentlocation>}
        <PlaceOrder orderid={props.params.id}></PlaceOrder>
      </>
    );
};



export default Orderplaced;


export async function getServerSideProps(context) {
 

 return {
   props: {
     params: {
       id: context.query.id

     }
   }
 };
}