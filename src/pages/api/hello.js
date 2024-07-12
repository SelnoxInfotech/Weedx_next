// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import Cookies from 'universal-cookie';


export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}

function order() {
  const cookies = new Cookies();
      let token_data = cookies.get('User_Token_access')
   let accessToken 
       if (typeof window !== 'undefined') {
   
            accessToken = localStorage.getItem('User_Token_access');
   
       }
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
  const config = {
    headers: { Authorization: `Bearer ${token_data}` }
  };

  let data = axios.get(`https://api.cannabaze.com/UserPanel/Get-Order/`,
    config,
  );
  return data;
}
function PendingOrder() {
  const cookies = new Cookies();
      let token_data = cookies.get('User_Token_access')
   let accessToken 
       if (typeof window !== 'undefined') {
   
            accessToken = localStorage.getItem('User_Token_access');
   
       }
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
  const config = {
    headers: { Authorization: `Bearer ${token_data}` }
  };

  let data = axios.get(`https://api.cannabaze.com/UserPanel/Get-GetPendingOrder/`,
    config,
  );
  return data;
}

function OrderBYID(id) {
  const cookies = new Cookies();
      let token_data = cookies.get('User_Token_access')
   let accessToken 
       if (typeof window !== 'undefined') {
   
            accessToken = localStorage.getItem('User_Token_access');
   
       }
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
  const config = {
    headers: { Authorization: `Bearer ${token_data}` }
  };

  let data = axios.get(`https://api.cannabaze.com/UserPanel/Get-GetOrderBYID/${id}`, config);
  return data;
}
function Cancel(id) {
  const cookies = new Cookies();
      let token_data = cookies.get('User_Token_access')
   let accessToken 
       if (typeof window !== 'undefined') {
   
            accessToken = localStorage.getItem('User_Token_access');
   
       }
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
  const config = {
    headers: { Authorization: `Bearer ${token_data}` }
  };

  let data = axios.post(`https://api.cannabaze.com/UserPanel/Update-Order/${id}`, { Order_Status: 'Cancel' }, config);
  return data;
}

function GetCancelOrder() {
  const cookies = new Cookies();
      let token_data = cookies.get('User_Token_access')
   let accessToken 
       if (typeof window !== 'undefined') {
   
            accessToken = localStorage.getItem('User_Token_access');
   
       }
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
  const config = {
    headers: { Authorization: `Bearer ${token_data}` }
  };

  let data = axios.get(`https://api.cannabaze.com/UserPanel/Get-GetCancelOrder/`,
    config,
  );
  return data;
}
function GetDeliveredOrder() {
  const cookies = new Cookies();
      let token_data = cookies.get('User_Token_access')
   let accessToken 
       if (typeof window !== 'undefined') {
   
            accessToken = localStorage.getItem('User_Token_access');
   
       }
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
  const config = {
    headers: { Authorization: `Bearer ${token_data}` }
  };

  let data = axios.get(`https://api.cannabaze.com/UserPanel/Get-GetDeliveredOrder/`,
    config,
  );
  return data;
}







// https://api.cannabaze.com/UserPanel/Get-GetCancelOrder/ 
