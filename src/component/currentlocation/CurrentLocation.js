import React from "react";
import Createcontext from "../../hooks/context";
import Cookies from 'universal-cookie';
import { useGeolocated } from "react-geolocated";
import { modifystr } from "../../hooks/utilis/commonfunction";

const Currentlocation = () => {
  const { state, dispatch } = React.useContext(Createcontext);
  const cookies = new Cookies();
  const [loca, setLoca] = React.useState(null);
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 500,
    watchLocationPermissionChange: true,
  });

  React.useEffect(() => {
    if (coords) {
      setLoca(coords.longitude);
    }
  }, [coords]);

  React.useEffect(() => {
    const fetchLocationData = async (latitude, longitude) => {
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBRchIzUTBZskwvoli9S0YxLdmklTcOicU`);
        const data = await response.json();
        if (data.error_message) {
          dispatch({ type: 'Location', Location: 'New York, NY, USA' });
          dispatch({ type: 'Country', Country: "United-States" });
          dispatch({ type: 'State', State: 'New-York' });
          dispatch({ type: 'City', City: "New-York" });
          const setLocation = {
            country: "United-States",
            state: 'New-York',
            city: 'New-York',
               formatted_address:'New York, NY, USA'
          };
          cookies.remove('setlocation');
          const date = new Date();
          date.setTime(date.getTime() + 60 * 60 * 24 * 365);
          cookies.set('setlocation', JSON.stringify(setLocation), { expires: date });
        } else {
          const location = data.plus_code?.compound_code.slice(9) || '';
          dispatch({ type: 'Location', Location: location });
          
          let country1, state1, city1;
          data.results.forEach(result => {
            result.address_components.forEach(component => {
              if (component.types.includes('country')) {
                country1 = modifystr(component.long_name.replace(/\s/g, '-'));
                dispatch({ type: 'Country', Country: country1 });
              }
              if (component.types.includes('administrative_area_level_1')) {
                state1 = modifystr(component.long_name.replace(/\s/g, '-'));
                dispatch({ type: 'State', State: state1 });
              }
              if (component.types.includes('administrative_area_level_3') || component.types.includes('locality')) {
                city1 = modifystr(component.long_name.replace(/\s/g, '-'));
                dispatch({ type: 'City', City: city1 });
              }
            });
          });

          const setLocation = {
            country: country1,
            state: state1,
            city: city1,
            formatted_address:location
          };
          console.log(setLocation)
          cookies.remove('setlocation');
          const date = new Date();
          date.setTime(date.getTime() + 60 * 60 * 24 * 365);
          cookies.set('setlocation', JSON.stringify(setLocation), { expires: date });
        }
      } catch (error) {
        console.error('GeoCode API error:', error);
      }
    };

    if (coords) {
      fetchLocationData(coords.latitude, coords.longitude);
    } else {
      const location = cookies.get("Location") || "New York";
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyBRchIzUTBZskwvoli9S0YxLdmklTcOicU`)
        .then(res => res.json())
        .then(data => {
          if (data.error_message) {
            dispatch({ type: 'Location', Location: 'New York, NY, USA' });
            dispatch({ type: 'Country', Country: "United-States" });
            dispatch({ type: 'State', State: 'New-York' });
            dispatch({ type: 'City', City: "New-York" });
          } else {
            const location = data.results[0]?.formatted_address || '';
            dispatch({ type: 'Location', Location: location });

            let country1, state1, city1;
            data.results[0]?.address_components.forEach(component => {
              if (component.types.includes('country')) {
                country1 = modifystr(component.long_name.replace(/\s/g, '-'));
                dispatch({ type: 'Country', Country: country1 });
              }
              if (component.types.includes('administrative_area_level_1')) {
                state1 = modifystr(component.long_name.replace(/\s/g, '-'));
                dispatch({ type: 'State', State: state1 });
              }
              if (component.types.includes('administrative_area_level_3') || component.types.includes('locality')) {
                city1 = modifystr(component.long_name.replace(/\s/g, '-'));
                dispatch({ type: 'City', City: city1 });
              }
            });

            const setLocation = {
              country: country1,
              state: state1,
              city: city1,
              formatted_address:location
            };
            cookies.remove('setlocation');
            const date = new Date();
            date.setTime(date.getTime() + 60 * 60 * 24 * 365);
            cookies.set('setlocation', JSON.stringify(setLocation), { expires: date });
          }
        })
        .catch(error => {
          console.error('GeoCode API error:', error);
        });
    }
  }, [loca, state.DefalutLocation]);

  return null; // Your component may not need to render anything
};

export default Currentlocation;
