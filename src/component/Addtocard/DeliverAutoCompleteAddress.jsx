import { InputAdornment, TextField } from '@mui/material';
import React from 'react'
import { usePlacesWidget } from "react-google-autocomplete";
import { IoCheckmarkSharp } from "react-icons/io5"
import { RiUserLocationLine } from "react-icons/ri"
import { BiErrorCircle } from "react-icons/bi"
import useStyles from '@/styles/style';
import Createcontext from "@/hooks/context"
import Axios from 'axios';
export default function DeliverAutoCompleteAddress({ OpenDelivery, Store }) {
  const classes = useStyles()
  const { state, dispatch } = React.useContext(Createcontext)
  const [Address, SetAddress] = React.useState(() => {
    const g = state.DeliveryAddress
    return g === "" ? '' : g
  })

  const [error, Seterror] = React.useState()
  const { ref } = usePlacesWidget({
    apiKey: 'AIzaSyBRchIzUTBZskwvoli9S0YxLdmklTcOicU',
    onPlaceSelected: (place) => {
    
      if (place.address_components) {
       
        try {
          for (var i = 0; i < place?.address_components.length; i++) {
            var component = place.address_components[i];
            if (component.types.indexOf('postal_code') !== -1) {
              CheckPostal(component.long_name, place.formatted_address , place.address_components)
              SetAddress(place.formatted_address)
              dispatch({ type: 'DeliveryAddress', DeliveryAddress: place.formatted_address })
              i = place?.address_components.length;
              Seterror("")
              // break;
            }
            else {
              dispatch({ type: 'DeliveryAddress', DeliveryAddress: '' })
              Seterror("Street Address Missing")
              SetAddress(place.formatted_address)
            }

          }
        } catch (error) {

          Seterror("Street Address Missing")
        }
      }
      else {
        Axios(`https://maps.googleapis.com/maps/api/geocode/json?address=${place.name}&key=${"AIzaSyBRchIzUTBZskwvoli9S0YxLdmklTcOicU"}`)
          .then(response => {
          
            try {
              if (response.data.results.length !== 0) {
                response.data.results[0]?.address_components?.map((data) => {
                  return (
                    data.types.map((data1) => {
                      if (data1 === "postal_code" || data1 === "street_number") {

                        return CheckPostal(data.long_name, place.name)

                      }
                      else {
                        dispatch({ type: 'DeliveryAddress', DeliveryAddress: '' })
                        return data1
                      }
                    }
                    )
                  )

                })
              }
              else {
                Seterror('Street Address Missing')
                dispatch({ type: 'DeliveryAddress', DeliveryAddress: '' })
              }
            } catch (error) {
              dispatch({ type: 'DeliveryAddress', DeliveryAddress: '' })

              Seterror('Street Address Missing')
            }
          })
      }

    },
    options: {

      fields: ["address_components", "geometry", "icon", "formatted_address", "name",],

      types: ["point_of_interest"],
    },
  });

  function CheckPostal(data, name , alldata) {
    Axios.post(`https://api.cannabaze.com/UserPanel/Get-GetDeliveryCheck/`,
      {
        "PinCode": data,
        Store: Store
      }
    )

      .then(response => {
        if (response.data === "Not Found") {
          SetAddress(name)
          Seterror('Out Of Delivery Zone')
          dispatch({ type: 'DeliveryAddress', DeliveryAddress: '' })
        }
        else {
          SetAddress((name) => {
            return name
          })
          dispatch({ type: 'DeliveryAddress', DeliveryAddress: name })
          Seterror(response.data)
          alldata.map((data) => {
            if (data.types.indexOf('country') !== -1) {
           
              dispatch({ type: 'DeliveryCountry', DeliveryCountry: data.long_name })
            }
            if ((data.types.indexOf('locality') !== -1 && data.types.indexOf('administrative_area_level_3' !== -1)) || data.types.indexOf("postal_town") !== -1
            || data.types.indexOf("establishment") !== -1) {
              dispatch({ type: 'DeliveryCity', DeliveryCity: data.long_name })

            }
            if (data.types.indexOf('administrative_area_level_1') !== -1) {
              dispatch({ type: 'DeliveryState', DeliveryState: data.long_name })
           
            }
          })

        }
      })
  }

  function handlechnage(e) {
    SetAddress(e.target.value)
  }


  return (
    <React.Fragment>
      <TextField
        onChange={handlechnage}
        value={Address}
        className={classes.textFieldcartsummeryPage}
        inputRef={ref}
        placeholder="Enter Your Delivery Location"
        variant="outlined"
        fullWidth size='small'
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <RiUserLocationLine />
            </InputAdornment>
          ),
          endAdornment: <InputAdornment position="end">

            {error === 'Street Address Missing' || error === 'Out Of Delivery Zone' ? <BiErrorCircle className='help-block'></BiErrorCircle> : <IoCheckmarkSharp />}

          </InputAdornment>
        }}
        error={Boolean(error === 'Street Address Missings' || error === 'Out Of Delivery Zone')}
      />
      {
        error !== "" && <span className="help-block" style={{ color: error === "Success" && "green" }}>{error}</span>
      }
    </React.Fragment>
  )

}
