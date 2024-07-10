import axios from "axios";
import Cookies from 'universal-cookie';

async function product_OverAllGet_Review (id) {
    let res = await axios.get(` https://api.cannabaze.com/UserPanel/Get-AverageReviewAndRating/${id}`,
    );
    return res;
}

function Product_Add_Review(data) {
    const cookies = new Cookies();
       let token_data = cookies.get('User_Token_access')
    let accessToken = localStorage.getItem('User_Token_access');
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
    let res = axios.post(` https://api.cannabaze.com/UserPanel/Add-Review/`,
      data,
      {
        headers: { Authorization: `Bearer ${token_data}` }
      },
    );
    return res;
  }
  
  async function Product_Get_UserComment(id,ProductId) {
    const cookies = new Cookies();
       let token_data = cookies.get('User_Token_access')
    let accessToken = localStorage.getItem('User_Token_access');
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
    let res = await axios.get(`https://api.cannabaze.com/UserPanel/Get-getReviewbyId/${id}/${ProductId}`,
    {
     headers: { Authorization: `Bearer ${token_data}` }
    },
  
    );
    return res;
  }
  async function Product_Get_Review(id) {
    let res = await axios.get(` https://api.cannabaze.com/UserPanel/Get-Review/${id}`,
    );
    return res;
  }
  async function Delete_Review(id) {
    const cookies = new Cookies();
       let token_data = cookies.get('User_Token_access')
    let accessToken = localStorage.getItem('User_Token_access');
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
    let res = await axios.delete(` https://api.cannabaze.com/UserPanel/Delete-Review/${id}`,
    {
      headers: { Authorization: `Bearer ${token_data}` }
     },
    );
    return res;
  }
   function ProductHelpFull(ReviewID, USerID) {
    const cookies = new Cookies();
       let token_data = cookies.get('User_Token_access')
    let accessToken = localStorage.getItem('User_Token_access');
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
    const config = {
      headers: { Authorization: `Bearer ${token_data}` }
  };
    return (
        axios.post(`https://api.cannabaze.com/UserPanel/Add-ProductHelpfull/`,
        
         {
          "review":ReviewID,
          "userid": USerID
      },
      config

        ).then((res) => {
            return (res)
        })
    )

}


export {product_OverAllGet_Review ,  Product_Add_Review , Product_Get_UserComment , Product_Get_Review ,Delete_Review , ProductHelpFull}