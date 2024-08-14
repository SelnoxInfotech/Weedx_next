

import { IoLocationSharp } from "react-icons/io5"
import { MdOutlineMyLocation } from "react-icons/md"
import { IconButton, InputAdornment, TextField } from "@mui/material";
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import useStyles from "../../../styles/style"
import Createcontext from "../../../hooks/context"
// import { use  navigate.replace } from "react-router-dom";
import { useRouter } from 'next/router';
// import 'dns-polyfill';
import Cookies from 'universal-cookie';
export default function SearchingLocation({ openLocation, SearchBarWidth, open1, setOpenLocation, path }) {
  const classes = useStyles()
  const cookies = new Cookies();
  const navigate = useRouter();
  const router = useRouter();
  const [formatted_address, Setformatted_address] = React.useState('')
  const { state, dispatch } = React.useContext(Createcontext)
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
  } = useGoogle({
    debounce: 500,
    language: 'en',
    apiKey: 'AIzaSyBRchIzUTBZskwvoli9S0YxLdmklTcOicU'
  });




  React.useEffect(() => {
    Setformatted_address(state?.Location)
  }, [state])

  const navigateToPath = (path) => {
    if (typeof window !== 'undefined') {
      const isWeedDispensaries = window.location.pathname.startsWith('/weed-dispensaries/in');
      const isWeedDeliveries = window.location.pathname.startsWith('/weed-deliveries/in');
      if (isWeedDispensaries || isWeedDeliveries) {
        router.push(path);
      }
    }
  };
  function handlechnage(e, value) {
    placesService?.getDetails({ placeId: value?.place_id }, (placeDetails) => {
      Setformatted_address(placeDetails.formatted_address);
      dispatch({ type: 'permission', permission: true })
      var Coun
      var sta
      var ci
      var route
      const object = {}
      const short = {}
      placeDetails?.address_components.map((data) => {
        let l = data.types[0] === "political" ? data.types[1] : data.types[0]
        object[l] = data.long_name
        short[l] = data?.short_name
      })


      if (Boolean(object.country)) {
        Coun = object.country.replace(/\s/g, '-');
        dispatch({ type: 'Country', Country: Coun });
        dispatch({ type: 'countrycode', countrycode: short.country });
      }
      else if (Object.keys(object).length === 1) {
        Coun = Object.values(object)[0].replace(/\s/g, '-');
        dispatch({ type: 'Country', Country: Coun });
        dispatch({ type: 'countrycode', countrycode: short.country });
      }
      if (Boolean(object.administrative_area_level_1)) {
        sta = object.administrative_area_level_1.replace(/\s/g, '-');
        dispatch({ type: 'State', State: sta });
        dispatch({ type: 'statecode', statecode: short.administrative_area_level_1 });
      }
      if (Boolean(object.administrative_area_level_3) || Boolean(object.establishment) || Boolean(object.locality) || Boolean(object.sublocality) || Boolean(object.administrative_area_level_2)) {
        if (Boolean(object.administrative_area_level_3)) {
          ci = object.administrative_area_level_3.replace(/\s/g, '-')
          dispatch({ type: 'City', City: ci })
          dispatch({ type: 'citycode', citycode: short.administrative_area_level_3 });
        }
        if (Boolean(object.sublocality) && Boolean(object.locality)) {
          ci = object.sublocality.replace(/\s/g, '-')
          dispatch({ type: 'City', City: ci })
          dispatch({ type: 'citycode', citycode: short.sublocality });
        }
        else if (Boolean(object.locality)) {
          ci = object.locality.replace(/\s/g, '-')
          dispatch({ type: 'City', City: ci })
          dispatch({ type: 'citycode', citycode: short.locality });
        }
        else if (Object.keys(object).length !== 1 && Boolean(object.establishment)) {
          ci = object.establishment.replace(/\s/g, '-')
          dispatch({ type: 'City', City: ci })
          dispatch({ type: 'citycode', citycode: short.establishment });
        }
        else if (Boolean(object.sublocality_level_1)) {
          ci = object.sublocality_level_1.replace(/\s/g, '-')
          dispatch({ type: 'City', City: ci })
        }

        if (Boolean(object.sublocality_level_1) && Boolean(object.locality)) {
          ci = object.sublocality_level_1.replace(/\s/g, '-')
          dispatch({ type: 'City', City: ci })
          dispatch({ type: 'citycode', citycode: short.sublocality_level_1 });
        }
        if (Boolean(object.sublocality_level_1) && Boolean(object.locality)) {
          ci = object.sublocality_level_1.replace(/\s/g, '-')
          dispatch({ type: 'City', City: ci })
          dispatch({ type: 'citycode', citycode: short.sublocality_level_1 });
        }
        if ((Boolean(object.administrative_area_level_3) && Boolean(object.locality)) && (Boolean(object.administrative_area_level_1) && Boolean(object.locality))) {
          ci = object.locality.replace(/\s/g, '-')
          dispatch({ type: 'City', City: ci })
          dispatch({ type: 'citycode', citycode: short.locality });
        }
        else {
          if (!Boolean(object.administrative_area_level_3) && !Boolean(object.establishment) && !Boolean(object.locality) && !Boolean(object.sublocality) && Boolean(object.administrative_area_level_2)) {
            if (!ci) {
              ci = object.administrative_area_level_2.replace(/\s/g, '-')
              dispatch({ type: 'City', City: ci })
              dispatch({ type: 'citycode', citycode: short.administrative_area_level_2 });
            }
          }
        }
      }
      if (Boolean(object.route) || Boolean(object.sublocality_level_2) || Boolean(object.neighborhood) || Boolean(object.establishment)) {
        if (Boolean(object.route)) {
          route = object.route.replace(/\s/g, '-');
          dispatch({ type: 'route', route: route });
        }
        else if (Boolean(object.sublocality)) {
          route = object.sublocality.replace(/\s/g, '-');
          dispatch({ type: 'route', route: route });
        }
        else if (Boolean(object.neighborhood)) {
          route = object.neighborhood.replace(/\s/g, '-');
          dispatch({ type: 'route', route: route });
        }
        else if (Boolean(object.establishment)) {
          route = object.establishment.replace(/\s/g, '-');
          dispatch({ type: 'route', route: route });
        }
        else if (Boolean(object.sublocality_level_2)) {
          route = object.sublocality_level_2.replace(/\s/g, '-');
          dispatch({ type: 'route', route: route });
        }

      }
      if (ci && sta && Coun && route) {
        navigateToPath(`${Coun.toLowerCase()}/${sta.toLowerCase()}/${ci.toLowerCase()}/${route.toLowerCase()}`);
        dispatch({ type: 'havecity', havecity: true });
      } else if (ci && sta && Coun) {
        dispatch({ type: 'route', route: '' });
        navigateToPath(`${Coun.toLowerCase()}/${sta.toLowerCase()}/${ci.toLowerCase()}`);
        dispatch({ type: 'havecity', havecity: true });
      } else if (sta && Coun) {
        dispatch({ type: 'route', route: '' });
        navigateToPath(`${Coun.toLowerCase()}/${sta.toLowerCase()}`);
        dispatch({ type: 'havestate', havestate: true });
        dispatch({ type: 'havecity', havecity: false });
      } else if (Coun) {
        dispatch({ type: 'route', route: '' });
        navigateToPath(`${Coun.toLowerCase()}`);
        dispatch({ type: 'havecountry', havecountry: true });
        dispatch({ type: 'havestate', havestate: false });
        dispatch({ type: 'havecity', havecity: false });
      } else {
        Setformatted_address(state.Location);
      }

      if (!ci) {
        dispatch({ type: 'City', City: '' });
      }
      if (!sta) {
        dispatch({ type: 'State', State: '' });
      }
      const setLocation = {
        country: Coun || '',
        state: sta || "",
        city: ci || '',
        route: route || '',
        formatted_address: placeDetails.formatted_address
      }
      cookies.remove('fetchlocation');
      const date = new Date();
      date.setTime(date.getTime() + 60 * 60 * 24 * 365);
      cookies.set('fetchlocation', JSON.stringify(setLocation), {
        expires: date,
        path: '/' // Set the path where the cookie is accessible
      });
      if (router.asPath === '/products' || router.asPath === '/') {
        router.replace(router.asPath);
    }
      dispatch({ type: 'location_Api', location_Api: false })
      dispatch({ type: 'Location', Location: placeDetails?.formatted_address })
    })
  }
  function OnBlur() {

    setOpenLocation(false)
    Setformatted_address(state.Location)

  }
  function onFocus() {
    setOpenLocation(true)
    Setformatted_address('')
  }

  const [open, setOpen] = React.useState(false);
  function current(event) {
    navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {

      if (permissionStatus.state === 'denied') {
        alert('Please allow location access.');
      } else {
        navigator.geolocation.getCurrentPosition(function (position) {
          fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${"AIzaSyBRchIzUTBZskwvoli9S0YxLdmklTcOicU"}`)
            .then(res => res.json())
            .then((response) => {

              dispatch({ type: 'Location', Location: response?.results[0]?.formatted_address });
              Setformatted_address(response?.results[0]?.formatted_address)
              var Coun
              var sta
              var ci
              var route
              response?.results[0]?.address_components?.map((data) => {
                if (data.types.indexOf('country') !== -1) {
                  Coun = data?.long_name?.replace(/\s/g, '-')
                  return dispatch({ type: 'Country', Country: data?.long_name?.replace(/\s/g, '-') })
                }
                if (data.types.indexOf('administrative_area_level_1') !== -1) {
                  sta = data?.long_name?.replace(/\s/g, '-')
                  return dispatch({ type: 'State', State: data?.long_name?.replace(/\s/g, '-') })
                } else {
                  dispatch({ type: 'State', State: '' })
                }
                if ((data.types.indexOf('locality') !== -1 && data.types.indexOf('administrative_area_level_3' !== -1)) || data.types.indexOf("postal_town") !== -1
                  || data.types.indexOf('sublocality') !== -1) {
                  ci = data?.long_name?.replace(/\s/g, '-')
                  dispatch({ type: 'City', City: data?.long_name?.replace(/\s/g, '-') })
                } else {
                  dispatch({ type: 'City', City: '' })
                }
                if (data.types.indexOf('route') !== -1 || data.types.indexOf('sublocality_level_2') !== -1 || data.types.indexOf("establishment") !== -1) {
                  route = data?.long_name?.replace(/\s/g, '-')
                  dispatch({ type: 'route', route: data?.long_name?.replace(/\s/g, '-') })
                } else {
                  dispatch({ type: 'route', route: '' })
                }
                if (ci === undefined) {
                  if (data.types.indexOf('administrative_area_level_2') !== -1 || data.types.indexOf('political') !== -1) {
                    ci = data?.long_name.replace(/\s/g, '-')
                    dispatch({ type: 'City', City: data?.long_name.replace(/\s/g, '-') })
                  }
                }

              })
              if (sta !== undefined && ci !== undefined && route !== undefined) {
                window.location.pathname.slice(0, 18) === '/weed-dispensaries' && navigate.replace(`${Coun?.toLowerCase()}/${sta?.toLowerCase()}/${ci?.toLowerCase()}/${route?.toLowerCase()}`)
                window.location.pathname.slice(0, 16) === '/weed-deliveries' && navigate.replace(`${Coun?.toLowerCase()}/${sta?.toLowerCase()}/${ci?.toLowerCase()}/${route?.toLowerCase()}`)

              }
              else {
                if (sta !== undefined && ci !== undefined && Coun !== undefined) {
                  window.location.pathname.slice(0, 18) === '/weed-dispensaries' && navigate.replace(`${Coun?.toLowerCase()}/${sta?.toLowerCase()}/${ci?.toLowerCase()}`)
                  window.location.pathname.slice(0, 16) === '/weed-deliveries' && navigate.replace(`${Coun?.toLowerCase()}/${sta?.toLowerCase()}/${ci?.toLowerCase()}`)

                }
                else if (Coun !== undefined && sta !== undefined) {

                  window.location.pathname.slice(0, 18) === '/weed-dispensaries' && navigate.replace(`${Coun?.toLowerCase()}/${sta?.toLowerCase()}`)
                  window.location.pathname.slice(0, 16) === '/weed-deliveries' && navigate.replace(`${Coun?.toLowerCase()}/${sta?.toLowerCase()}`)
                }
                else if (Coun !== undefined) {

                  window.location.pathname.slice(0, 18) === '/weed-dispensaries' && navigate.replace(`${Coun?.toLowerCase()}`)
                  window.location.pathname.slice(0, 16) === '/weed-deliveries' && navigate.replace(`${Coun?.toLowerCase()}`)
                }
                else {
                  Setformatted_address(state.Location)
                }
              }
              dispatch({ type: 'Location', Location: response?.results[0]?.formatted_address })
            }

            )

        });
      }
    });
  }
  React.useEffect(() => {


    if (state.locationFocus) {
      onFocus()
    }
  }, [state.locationFocus])
  return (
    <>

      <Autocomplete
        freeSolo
        disableClearable
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        id="autocomplete-demo"
        onFocus={onFocus}
        className={`sec_input_search SearchBar ${classes.SearchBar_Text}`}
        style={{ width: "100%", height: "45px", borderRadius: (openLocation && SearchBarWidth) ? " 16px 16px 16px 16px" : " 0px 16px 16px 0px", top: "0px", display: open1 && SearchBarWidth ? "none" : "inline-flex", }}
        onBlur={OnBlur}
        sx={{ width: "100%" }}
        options={placePredictions}
        inputValue={formatted_address}
        value={formatted_address}
        onChange={((element, value) => { handlechnage(element, value) })}
        renderOption={(props, value, index) => {
          return (
            <li  {...props} >  <IoLocationSharp />{value?.description}</li>
          )
        }}
        // getOptionSelected={(option, value) => option?.description === value?.description}
        getOptionLabel={(option) => (option?.description ? option?.description : '')}
        renderInput={(params) => (
          <TextField
            {...params}

            onChange={(e) => {
              Setformatted_address(e.target.value);
              getPlacePredictions({
                input: e.target.value
              })
              setOpen(true)
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <IoLocationSharp />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              ),
              endAdornment: (
                <IconButton onClick={current}>
                  <MdOutlineMyLocation color="inherit" size={16} style={{ cursor: 'pointer' }} />
                </IconButton>

              ),
            }}


          />
        )}
      />
    </>
  );
}