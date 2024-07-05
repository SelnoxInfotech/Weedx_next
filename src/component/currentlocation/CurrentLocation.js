import React from "react";
import Createcontext from "../../hooks/context"
import Cookies from 'universal-cookie';
import { useGeolocated } from "react-geolocated";
import { modifystr } from "../../hooks/utilis/commonfunction";
const Currentlocation = () => {
  const { state, dispatch } = React.useContext(Createcontext)
  const cookies = new Cookies();
  const [loca, Setloca] = React.useState()
  const { coords } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 500,
      watchLocationPermissionChange: true,

    });
  React.useEffect(() => {
    if (coords !== undefined) {
      Setloca(coords?.longitude)
    }
  }, [coords])


  React.useEffect(() => {
    dispatch({ type: 'permission', permission: coords === undefined ? false : true })
      Boolean(coords) ?

      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords?.latitude},${coords?.longitude}&key=${"AIzaSyBRchIzUTBZskwvoli9S0YxLdmklTcOicU"}`)
        .then(res => res.json() )
        .then(response => {
           if(response.error_message){
            dispatch({ type: 'Location', Location: 'New York, NY, USA'})
            dispatch({ type: 'Country', Country: "United-States" })
            dispatch({ type: 'State', State: 'New-York' })
            dispatch({ type: 'City', City: "New-York" })
           }
           else{
          dispatch({ type: 'Location', Location: response?.plus_code?.compound_code.slice(9) })
          response?.results?.map((data) => {
            if (data.types.indexOf('country') !== -1) {
              dispatch({ type: 'Country', Country: modifystr(data?.formatted_address.replace(/\s/g, '-')) })
            }
            if (data.types.indexOf('administrative_area_level_1') !== -1) {
              data.address_components.map((state) => {
                if (state.types.indexOf('administrative_area_level_1') !== -1) {
                  dispatch({ type: 'State', State: modifystr(state?.long_name.replace(/\s/g, '-')) })
                }
              })
            }
            if (data.types.indexOf('administrative_area_level_3') !== -1) {
              data.address_components.map((city) => {
                if (city.types.indexOf('administrative_area_level_3') !== -1 || city.types.indexOf('locality') !== -1) {
                  dispatch({ type: 'City', City: modifystr(city?.long_name?.replace(/\s/g, '-')) })
                }
              })
            }
          })
           }

        }).catch((error) => {
          console.trace(error, 'GeoCode Api')
        })

      :
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${cookies.get("Location") ? cookies.get("Location") : "New York"}&key=${"AIzaSyBRchIzUTBZskwvoli9S0YxLdmklTcOicU"}`)
        .then(res => res.json())
        .then(response => {

          if (response.error_message) {
            dispatch({ type: 'Location', Location: 'New York, NY, USA' })
            dispatch({ type: 'Country', Country: "United-States" })
            dispatch({ type: 'State', State: 'New-York' })
            dispatch({ type: 'City', City: "New-York" })
          }
          else {
            dispatch({ type: 'Location', Location: response?.results[0]?.formatted_address })
            response?.results[0]?.address_components?.map((data) => {
              if (data.types.indexOf('country') !== -1) {
                dispatch({ type: 'Country', Country: data?.long_name.replace(/\s/g, '-') })
              }
              if (data.types.indexOf('administrative_area_level_1') !== -1) {
                if (data.types.indexOf('administrative_area_level_1') !== -1) {
                  dispatch({ type: 'State', State: data?.long_name.replace(/\s/g, '-') })
                }
              }
              if (data.types.indexOf('administrative_area_level_3') !== -1) {
                if (data.types.indexOf('administrative_area_level_3') !== -1 || data.types.indexOf('locality') !== -1) {
                  dispatch({ type: 'City', City: data?.long_name?.replace(/\s/g, '-') })

                }
              }
            })
          }
        }).catch((error) => {
          console.trace(error, 'GeoCode Api')
        })
  }, [loca, state.DefalutLocation])

}

export default Currentlocation

















// navigator.geolocation.getCurrentPosition(
//   function (position) { /** won't be executed for such short timeout */

//   // if (Country === ''||Country === undefined) {
// fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${"AIzaSyBRchIzUTBZskwvoli9S0YxLdmklTcOicU"}`)
//   .then(res => res.json())
//   .then(response => {

//     // dispatch({ type: 'Location', Location: response?.plus_code?.compound_code.slice(9) })
//     // response?.results?.map((data) => {
//       if (data.types.indexOf('country') !== -1) {
//         dispatch({ type: 'Country', Country: data?.formatted_address.replace(/\s/g, '-') })
//       }
//       if (data.types.indexOf('administrative_area_level_1') !== -1) {
//         data.address_components.map((state) => {
//           if (state.types.indexOf('administrative_area_level_1') !== -1) {
//             dispatch({ type: 'State', State: state?.long_name.replace(/\s/g, '-') })
//           }
//         })
//       }
//       if (data.types.indexOf('administrative_area_level_3') !== -1) {
//         data.address_components.map((city) => {
//           if (city.types.indexOf('administrative_area_level_3') !== -1 || city.types.indexOf('locality') !== -1) {
//             dispatch({ type: 'City', City: city?.long_name?.replace(/\s/g, '-') })
//           }
//         })
//       }
//     })
//         })
//     // }
//     // else {
//     //   if (State1 !== "") {
//     //     if (city !== "") {
//     //       dispatch({ type: 'Location', Location: Country + "" + State1 + "" + city })
//     //       dispatch({ type: 'Country', Country: Country })
//     //       dispatch({ type: 'State', State: State1 })
//     //       dispatch({ type: 'City', City: city })
//     //     }
//     //     else {
//     //       dispatch({ type: 'Location', Location: Country + State1 })
//     //       dispatch({ type: 'Country', Country: Country })
//     //       dispatch({ type: 'State', State: State1 })
//     //     }
//     //   }
//     //   else {

//     //     dispatch({ type: 'Location', Location: Country })
//     //     dispatch({ type: 'Country', Country: Country })
//     //   }
//     // }
//   },

//   function (positionError) {
//     switch (positionError.code) {
//       // PERMISSION_DENIED

//       case 1:
//         if (Country === '') {
//           fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${cookies.get("Location")!== undefined ? cookies.get("Location") : "New York"}&key=${"AIzaSyBRchIzUTBZskwvoli9S0YxLdmklTcOicU"}`)
//             .then(res => res.json())
//             .then(response => {
//               dispatch({ type: 'Location', Location: response?.results[0]?.formatted_address })
//               response?.results[0]?.address_components?.map((data) => {
//                 if (data.types.indexOf('country') !== -1) {
//                   dispatch({ type: 'Country', Country: data?.long_name.replace(/\s/g, '-') })
//                 }
//                 if (data.types.indexOf('administrative_area_level_1') !== -1) {
//                   if (data.types.indexOf('administrative_area_level_1') !== -1) {
//                     dispatch({ type: 'State', State: data?.long_name.replace(/\s/g, '-') })
//                   }
//                 }
//                 if (data.types.indexOf('administrative_area_level_3') !== -1) {
//                   if (data.types.indexOf('administrative_area_level_3') !== -1 || data.types.indexOf('locality') !== -1) {
//                     dispatch({ type: 'City', City: data?.long_name?.replace(/\s/g, '-') })

//                   }
//                 }
//               })
//             }).catch((error) => {

//             })
//         }
//         else {
//           if (State1 !== "") {
//             if (city !== "") {
//               dispatch({ type: 'Location', Location: Country + "" + State1 + "" + city })
//               dispatch({ type: 'Country', Country: Country })
//               dispatch({ type: 'State', State: State1 })
//               dispatch({ type: 'City', City: city })
//             }
//             else {
//               dispatch({ type: 'Location', Location: Country + State1 })
//               dispatch({ type: 'Country', Country: Country })
//               dispatch({ type: 'State', State: State1 })
//             }
//           }
//           else {

//             dispatch({ type: 'Location', Location: Country })
//             dispatch({ type: 'Country', Country: Country })
//           }
//         }

//         break
//       case 2:


//         break
//       // TIMEOUT
//       case 3:

//         break
//     }
//   },

// )