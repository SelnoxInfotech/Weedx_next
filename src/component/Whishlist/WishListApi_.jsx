import axios from 'axios'
import Cookies from 'universal-cookie';



function WishListPost(id) {
  const cookies = new Cookies();
     let token_data = cookies.get('User_Token_access')
     let accessToken 
     if (typeof window !== 'undefined') {
 
          accessToken = localStorage.getItem('User_Token_access');
 
     }
    if(  Boolean(accessToken) ){ token_data  =  accessToken}


  let data = axios.post(` https://api.cannabaze.com/UserPanel/Add-Wishlist/`,
    { product: id },
    {
      headers: { Authorization: `Bearer ${token_data}` }
    },
  );
  return data;
}
async function WishListget() {
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

  let data = await axios.get(`https://api.cannabaze.com/UserPanel/Get-Wishlist/`,
  config
  );
  return data;
}
export { WishListPost ,WishListget }