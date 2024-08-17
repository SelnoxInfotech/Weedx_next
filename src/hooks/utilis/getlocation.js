import React from 'react';

async function location(value, type) {
  // console.log(value)
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=AIzaSyBRchIzUTBZskwvoli9S0YxLdmklTcOicU`);
    const data = await response.json();
    if (data.error_message) {
      return {
        city: type.city || "",
        state: type.state || "",                                    
        country: type.country|| "",
        route: type.route || '',
        formatted_address: "New York, NY, USA",
        citycode: "",
        statecode: "NY",
        countrycode: "US",
        api: false

      };
    }

    const addressComponents = data.results[0].address_components || [];
    let city = "", state = "", country = "", route = "", formatted_address = data?.results[0]?.formatted_address;
    let citycode = "", statecode = "", countrycode = "";
    let ci = ""

    const object = {}
    const short = {}
    addressComponents.map((data) => {
      let l = data.types[0]
      if (data.types[0] === "political") {
        let rever = data.types.reverse()
        let l = rever[0] === "political" ? rever[1] : rever[0]
        object[l] = data.long_name
        short[l] = data?.short_name
      }
      else {

        object[l] = data.long_name
        short[l] = data?.short_name
      }
    })
    if (Boolean(object.country)) {
      let Coun = object.country.replace(/\s/g, '-');
      // dispatch({ type: 'Country', Country: Coun });
      // dispatch({ type: 'countrycode', countrycode: short.country });
      country = Coun
      countrycode = short.country
    }
    else if (Object.keys(object).length === 1) {
      let Coun = Object.values(object)[0].replace(/\s/g, '-');
      country = Coun
      countrycode = short.country
    }
    if (Boolean(object.administrative_area_level_1)) {

      let sta = object.administrative_area_level_1.replace(/\s/g, '-');
      // dispatch({ type: 'State', State: sta });
      // dispatch({ type: 'statecode', statecode: short.administrative_area_level_1 });
      statecode = short.administrative_area_level_1
      state = sta

    }
    if (Boolean(object.administrative_area_level_3) || Boolean(object.establishment) || Boolean(object.locality) || Boolean(object.sublocality) || Boolean(object.administrative_area_level_2)) {

      if (Boolean(object.administrative_area_level_3)) {
        ci = object.administrative_area_level_3.replace(/\s/g, '-')
        // dispatch({ type: 'City', City: ci })
        // dispatch({ type: 'citycode', citycode: short.administrative_area_level_3});
        citycode = short.administrative_area_level_3
        city = ci
      }
      if (Boolean(object.sublocality) && Boolean(object.locality)) {
        ci = object.sublocality.replace(/\s/g, '-')
        citycode = short.sublocality
        city = ci
      }
      else if (Boolean(object.locality)) {
        ci = object.locality.replace(/\s/g, '-')
        // dispatch({ type: 'City', City: ci })
        // dispatch({ type: 'citycode', citycode: short.locality});
        citycode = short.locality
        city = ci
      }
      else if (Object.keys(object).length !== 1 && Boolean(object.establishment)) {
        ci = object.establishment.replace(/\s/g, '-')
        // dispatch({ type: 'City', City: ci })
        // dispatch({ type: 'citycode', citycode: short.establishment});
        citycode = short.establishment
        city = ci
      }
      else if (Boolean(object.sublocality_level_1)) {
        ci = object.sublocality_level_1.replace(/\s/g, '-')
        // dispatch({ type: 'City', City: ci })
        // dispatch({ type: 'citycode', citycode: short.sublocality_level_1});
        citycode = short.sublocality_level_1
        city = ci
      }

      if (Boolean(object.sublocality_level_1) && Boolean(object.locality)) {
        ci = object.sublocality_level_1.replace(/\s/g, '-')
        // dispatch({ type: 'City', City: ci })
        // dispatch({ type: 'citycode', citycode: short.sublocality_level_1});
        citycode = short.sublocality_level_1
        city = ci
      }
      if (Boolean(object.sublocality_level_1) && Boolean(object.locality)) {
        ci = object.sublocality_level_1.replace(/\s/g, '-')
        // dispatch({ type: 'City', City: ci })
        // dispatch({ type: 'citycode', citycode: short.sublocality_level_1});
        citycode = short.sublocality_level_1
        city = ci
      }
      if ((Boolean(object.administrative_area_level_3) && Boolean(object.locality)) && (Boolean(object.administrative_area_level_1) && Boolean(object.locality))) {
        ci = object.locality.replace(/\s/g, '-')
        // dispatch({ type: 'City', City: ci })
        // dispatch({ type: 'citycode', citycode: short.locality});
        citycode = short.locality
        city = ci
      }
      else {
        if (!Boolean(object.administrative_area_level_3) && !Boolean(object.establishment) && !Boolean(object.locality) && !Boolean(object.sublocality) && Boolean(object.administrative_area_level_2)) {
          if (!ci) {
            ci = object.administrative_area_level_2.replace(/\s/g, '-')
            // dispatch({ type: 'City', City: ci })
            // dispatch({ type: 'citycode', citycode: short.administrative_area_level_2});
            citycode = short.administrative_area_level_2
            city = ci
          }
        }
      }

    }
    if (Boolean(object.route) || Boolean(object.sublocality_level_2) || Boolean(object.neighborhood) || Boolean(object.establishment)) {
      if (Boolean(object.route)) {
        route = object.route.replace(/\s/g, '-');
        // dispatch({ type: 'route', route: route });
      }
      else if (Boolean(object.sublocality)) {
        route = object.sublocality.replace(/\s/g, '-');
        // dispatch({ type: 'route', route: route });
      }
      else if (Boolean(object.neighborhood)) {
        route = object.neighborhood.replace(/\s/g, '-');
        // dispatch({ type: 'route', route: route });
      }
      else if (Boolean(object.establishment)) {
        route = object.establishment.replace(/\s/g, '-');
        // dispatch({ type: 'route', route: route });
      }
      else if (Boolean(object.sublocality_level_2)) {
        route = object.sublocality_level_2.replace(/\s/g, '-');
        // dispatch({ type: 'route', route: route });
      }

    }
    
    return {
      city,
      state,
      country,
      route,
      citycode,
      statecode,
      countrycode,
      formatted_address,
      api: true
    };
  } catch (error) {
    return {
      city: '',
      state: '',
      country: '',
      route: ''
    };
  }
}

export default location;  