import React from "react";
import Createcontext from "../../hooks/context";
import Cookies from 'universal-cookie';
import { useGeolocated } from "react-geolocated";
import { modifystr } from "../../hooks/utilis/commonfunction";

const Currentlocation = () => {
  const { state, dispatch } = React.useContext(Createcontext);
  const cookies = new Cookies();
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 500,
    watchLocationPermissionChange: true,
  });

  const fetchLocationData = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${'AIzaSyBRchIzUTBZskwvoli9S0YxLdmklTcOicU'}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.error_message) {
        return {
          formatted_address: 'New York, NY, USA',
          country: 'United-States',
          state: 'New-York',
          city: 'New-York',
        };
      } else {
        let location = data.plus_code?.compound_code.slice(9) || '';
        let country = '', state = '', city = '';
        data.results.forEach(result => {
          result.address_components.forEach(component => {
            if (component.types.includes('country')) country = modifystr(component.long_name.replace(/\s/g, '-'));
            if (component.types.includes('administrative_area_level_1')) state = modifystr(component.long_name.replace(/\s/g, '-'));
            if (component.types.includes('administrative_area_level_3') || component.types.includes('locality')) city = modifystr(component.long_name.replace(/\s/g, '-'));
          });
        });
        return { location, country, state, city };
      }
    } catch (error) {
      console.error('GeoCode API error:', error);
      return null;
    }
  };

  React.useEffect(() => {

    const handleLocationUpdate = async () => {
      let locationData;
      const fetchedLocation = cookies.get('fetchlocation');
      if (fetchedLocation && !coords) {
        locationData = fetchedLocation
      }
      else {
        // If fetchlocation is not found, get location from coords or cookies
        if (coords) {
          locationData = await fetchLocationData(coords.latitude, coords.longitude);
        }
        else {
          const location = cookies.get("Location") || "New York";
          if (location) {
            const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${'AIzaSyBRchIzUTBZskwvoli9S0YxLdmklTcOicU'}`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.error_message) {
              locationData = {
                formatted_address: 'New York, NY, USA',
                country: 'United-States',
                state: 'New-York',
                city: 'New-York',
              };
            } else {
              const result = data.results[0];
              const location = result?.formatted_address || '';
              let country = '', state = '', city = '';

              result?.address_components.forEach(component => {
                if (component.types.includes('country')) country = modifystr(component.long_name.replace(/\s/g, '-'));
                if (component.types.includes('administrative_area_level_1')) state = modifystr(component.long_name.replace(/\s/g, '-'));
                if (component.types.includes('administrative_area_level_3') || component.types.includes('locality')) city = modifystr(component.long_name.replace(/\s/g, '-'));
              });
              locationData = { location, country, state, city };
            }
          }
        }
      }
      if (locationData) {
        dispatch({ type: 'Location', Location: locationData.location || locationData.formatted_address });
        dispatch({ type: 'Country', Country: locationData.country });
        dispatch({ type: 'State', State: locationData.state });
        dispatch({ type: 'City', City: locationData.city });
        dispatch({ type: 'permission', permission: false });
        const setLocation = {
          country: locationData.country,
          state: locationData.state,
          city: locationData.city,
          formatted_address: locationData.location || locationData.formatted_address

        };
        // cookies.remove('fetchlocation');
        const date = new Date();
        date.setTime(date.getTime() + 60 * 60 * 24 * 365); // 1 year expiry
        cookies.set('fetchlocation', JSON.stringify(setLocation), {
          expires: date,
          path: '/' // Set the path where the cookie is accessible
        });
      }
    };

    handleLocationUpdate();
  }, [coords, state.DefalutLocation , Cookies]);

  return null; // Your component may not need to render anything
};

export default Currentlocation;
