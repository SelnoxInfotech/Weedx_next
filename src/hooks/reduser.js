
const reducer = (state, action) => {
    switch (action.type) {
      case 'Login':
        return { ...state, login: action.login }
  
      case 'ApiProduct':
        return { ...state, ApiProduct: action.ApiProduct }
      case "CartCount":
        {
          return { ...state, CartCount: action.CartCount }
  
        }
      case "AllProduct":
        {
  
          return { ...state, AllProduct: action.AllProduct }
        }
  
      case "DeliveryOption":
        {
          return { ...state, DeliveryOption: action.DeliveryOption }
        }
      case "DeliveryInformation":
        {
          return { ...state, DeliveryInformation: action.DeliveryInformation }
        }
      case "Cart_subTotal":
        {
          return { ...state, Cart_subTotal: action.Cart_subTotal }
        }
      case "LoadingApi":
        {
          return { ...state, LoadingApi: action.LoadingApi }
        }
      case "Order_place":
        {
          return { ...state, Order_place: action.Order_place }
        }
      case "Dispensories":
        {
          return { ...state, Dispensories: action.Dispensories }
        }
      case "Location":
        {
          return { ...state, Location: action.Location }
        }
      case "DefalutLocation":
        {
          return { ...state, DefalutLocation: action.DefalutLocation }
        }
      case "LocationData":
        {
          return { ...state, LocationData: action.LocationData }
        }
  
      case "Cookies":
        {
          return { ...state, Cookies: action.Cookies }
        }
      case "locationchange":
        {
  
          return { ...state, locationFocus: action.focus }
        }
      case "DeliveryAddress":
        {
          return { ...state, DeliveryAddress: action.DeliveryAddress }
        }
      case "selectDeliveryoptions":
        {
          return { ...state, selectDeliveryoptions: action.selectDeliveryoptions }
        }
      case "CookiesMarketing":
        {
          return { ...state, CookiesMarketing: action.CookiesMarketing }
        }
      case "CookiesAnalytical":
        {
          return { ...state, CookiesAnalytical: action.CookiesAnalytical }
        }
      case "Profile":
        {
          return { ...state, Profile: action.Profile }
        }
      case "WishList":
        {
          return { ...state, WishList: action.WishList }
        }
      case "Country":
        {
          return { ...state, Country: action.Country }
        }
      case "State":
        {
          return { ...state, State: action.State }
        }
      case "City":
        {
          return { ...state, City: action.City }
        }
      case "permission":
        {
          return { ...state, permission: action.permission }
        }
      case "Loading":
        {
          return { ...state, Loading: action.Loading }
        }
      case "StaticImage":
        {
          return { ...state, StaticImage: action.StaticImage }
        }
      case "route":
        {
          return { ...state, route: action.route }
        }
      case "Coupoun":
        {
          return { ...state, Coupoun: action.Coupoun }
        }
      case "PromoCode":
        {
          return { ...state, PromoCode: action.PromoCode }
        }
      case "CoupounAmount":
        {
          return { ...state, CoupounAmount: action.CoupounAmount }
        }
      case "DeliveryCountry":
        {
          return { ...state, DeliveryCountry: action.DeliveryCountry }
        }
  
      case "DeliveryCity":
        {
          return { ...state, DeliveryCity: action.DeliveryCity }
        }
  
      case "DeliveryState":
        {
          return { ...state, DeliveryState: action.DeliveryState }
        }
      case "coupoun_code":
        {
          return { ...state, coupoun_code: action.coupoun_code }
        }
      case "DeliveryPrice":
        {
          return { ...state, DeliveryPrice: action.DeliveryPrice }
        }
      case "MinimumOrderPrice":
        {
          return { ...state, MinimumOrderPrice: action.MinimumOrderPrice }
        }
      case "Embeddedstore":
        {
          return { ...state, Embeddedstore: action.Embeddedstore }
        }
      case "havecountry":
        {
          return { ...state, havecountry: action.havecountry }
        }
  
      case "havestate":
        {
          return { ...state, havestate: action.havestate }
        }
  
      case "havecity":
        {
          return { ...state, havecity: action.havecity }
        }
        case "countrycode":
          {
            return { ...state, countrycode: action.countrycode }
          }
    
        case "citycode":
          {
            return { ...state, citycode: action.citycode }
          }
    
        case "statecode":
          {
            return { ...state, statecode: action.statecode }
          }
          case "location_Api":
            {
              return { ...state, location_Api: action.location_Api }
            }
      
  
      default: return state
    }
  };
  
  export default reducer
  
  
  
  
  
  