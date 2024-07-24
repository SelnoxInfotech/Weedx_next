import React from 'react'
import Createcontext from "../context"
import { useRouter } from 'next/router';
import _ from "lodash";
const  RoutingSearch = ({ city, State, country, pathname, route, com }) => {
  const { dispatch } = React.useContext(Createcontext)
  const navigate = useRouter()

  React.useEffect(() => {
    if (route !== undefined) {
      location(route + " " + city + " " + State + " " + country, "route")
    }
    else {
      if (city === undefined) {
        if (State !== undefined) {
          if (State === "new-york")
            location(State + "state " + country, "state")
          else {
            location(State + " " + country, "state")
          }
        }
        else {
          location(country, "Country")
        }
      }
      else {
        location(city + " " + State + " " + country, "city")
      }
    }
    dispatch({ type: 'permission', permission: true })
  }, [])


  async function location(value, type) {
    // var ci, sta, Coun , route;    
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${"AIzaSyBRchIzUTBZskwvoli9S0YxLdmklTcOicU"}`)
      .then(res => res.json())
      .then(async response => {
        let Coun;
        let sta;
        let ci;
        let route;
        const object = {}
        const short = {}
        if (response?.error_message) {
          dispatch({ type: 'Location', Location: 'New York, NY, USA' })
          dispatch({ type: 'Country', Country: "United-States" })
          dispatch({ type: 'State', State: 'New-York' })
          dispatch({ type: 'City', City: "New-York" })
        }
        else {
          if (response?.results?.length !== 0) {
            await dispatch({ type: 'permission', permission: true });
            await dispatch({ type: 'Location', Location: response?.results[0]?.formatted_address })
            const firstResult = response.results[0];
            const addressComponents = firstResult.address_components || [];

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
                dispatch({ type: 'citycode', citycode: short.administrative_area_level_3});
              }
              if (Boolean(object.sublocality) && Boolean(object.locality)) {
                ci = object.sublocality.replace(/\s/g, '-')
                dispatch({ type: 'City', City: ci })
                dispatch({ type: 'citycode', citycode: short.sublocality});
              }
              else if (Boolean(object.locality)) {
                ci = object.locality.replace(/\s/g, '-')
                dispatch({ type: 'City', City: ci })
                dispatch({ type: 'citycode', citycode: short.locality});
              }
              else if (Object.keys(object).length !== 1 && Boolean(object.establishment)) {
                ci = object.establishment.replace(/\s/g, '-')
                dispatch({ type: 'City', City: ci })
                dispatch({ type: 'citycode', citycode: short.establishment});
              }
              else if (Boolean(object.sublocality_level_1)) {
                ci = object.sublocality_level_1.replace(/\s/g, '-')
                dispatch({ type: 'City', City: ci })
                dispatch({ type: 'citycode', citycode: short.sublocality_level_1});
              }

              if (Boolean(object.sublocality_level_1) && Boolean(object.locality)) {
                ci = object.sublocality_level_1.replace(/\s/g, '-')
                dispatch({ type: 'City', City: ci })
                dispatch({ type: 'citycode', citycode: short.sublocality_level_1});
              }
              if (Boolean(object.sublocality_level_1) && Boolean(object.locality)) {
                ci = object.sublocality_level_1.replace(/\s/g, '-')
                dispatch({ type: 'City', City: ci })
                dispatch({ type: 'citycode', citycode: short.sublocality_level_1});
              }
              if ((Boolean(object.administrative_area_level_3) && Boolean(object.locality)) && (Boolean(object.administrative_area_level_1) && Boolean(object.locality))) {
                ci = object.locality.replace(/\s/g, '-')
                dispatch({ type: 'City', City: ci })
                dispatch({ type: 'citycode', citycode: short.locality});
              }
              else {
                if (!Boolean(object.administrative_area_level_3) && !Boolean(object.establishment) && !Boolean(object.locality) && !Boolean(object.sublocality) && Boolean(object.administrative_area_level_2)) {
                  if (!ci) {
                    ci = object.administrative_area_level_2.replace(/\s/g, '-')
                    dispatch({ type: 'City', City: ci })
                    dispatch({ type: 'citycode', citycode: short.administrative_area_level_2});
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

            if (ci !== undefined && sta !== undefined && Coun !== undefined && route !== undefined) {

              navigate.push(pathname + `/${'in'}/${Coun.toLowerCase()}/${sta.toLowerCase()}/${ci.toLowerCase()}/${route.toLowerCase()}`)
              dispatch({ type: 'havecity', havecity: true });
            }
            else {
              if (sta !== undefined && Coun !== undefined && ci !== undefined) {
                navigate.push(pathname + `/${'in'}/${Coun.toLowerCase()}/${sta.toLowerCase()}/${ci.toLowerCase()}`)
                dispatch({ type: 'havecity', havecity: true });
              }
              else {
                if (Coun !== undefined && sta !== undefined) {
                  navigate.push(pathname + `/${'in'}/${Coun.toLowerCase()}/${sta.toLowerCase()}`)
                  dispatch({ type: 'havestate', havestate: true });
                  dispatch({ type: 'havecity', havecity: false });
                }
                else {
                  if (Coun !== undefined) {
                    navigate.push(pathname + `/${'in'}/${Coun.toLowerCase()}`)
                    dispatch({ type: 'havecountry', havecountry: true });
                  }
                }

              }
            }
          }
          else {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${type === 'city' ? city + " " + State + " " + country : type === "state" && country}&key=${"AIzaSyBRchIzUTBZskwvoli9S0YxLdmklTcOicU"}`)
              .then(res => res.json())
              .then(response => {
                if (response?.results?.length !== 0) {
                  dispatch({ type: 'permission', permission: true })
                  dispatch({ type: 'Location', Location: response?.results[0]?.formatted_address })
                  response?.results[0]?.address_components?.map((data) => {
                    if (data.types.indexOf('country') !== -1) {
                      dispatch({ type: 'Country', Country: data?.long_name.replace(/\s/g, '-') })
                      Coun = data?.long_name.replace(/\s/g, '-')
                    }
                    if (data.types.indexOf('administrative_area_level_1') !== -1) {
                      if (data.types.indexOf('administrative_area_level_1') !== -1) {
                        dispatch({ type: 'State', State: data?.long_name.replace(/\s/g, '-') })
                        sta = data?.long_name.replace(/\s/g, '-')
                      }
                    }
                    if (data.types.indexOf('administrative_area_level_3') !== -1) {
                      if (data.types.indexOf('administrative_area_level_3') !== -1 || data.types.indexOf('locality') !== -1) {
                        dispatch({ type: 'City', City: data?.long_name?.replace(/\s/g, '-') })
                        ci = data?.long_name.replace(/\s/g, '-')

                      }
                    }

                  })
                  if (ci !== undefined && sta !== undefined && Coun !== undefined) {

                    navigate.push(pathname + `/${'in'}/${Coun.toLowerCase()}/${sta.toLowerCase()}/${ci.toLowerCase()}/`)
                  }
                  else {
                    if (sta !== undefined && Coun !== undefined) {
                      navigate.push(pathname + `/${'in'}/${Coun.toLowerCase()}/${sta.toLowerCase()}/`)
                    }
                    else {
                      if (Coun !== undefined) {
                        navigate.push(pathname + `/${'in'}/${Coun.toLowerCase()}/`)
                      }

                    }
                  }
                }
                else {
                  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${"AIzaSyBRchIzUTBZskwvoli9S0YxLdmklTcOicU"}`)
                    .then(res => res.json())
                    .then(response => {
                      if (response.results.length !== 0) {
                        dispatch({ type: 'permission', permission: true })
                        dispatch({ type: 'Location', Location: response?.results[0]?.formatted_address })
                        response?.results[0]?.address_components?.map((data) => {
                          if (data.types.indexOf('country') !== -1) {
                            dispatch({ type: 'Country', Country: data?.long_name.replace(/\s/g, '-') })
                            Coun = data?.long_name.replace(/\s/g, '-')
                          }
                          if (data.types.indexOf('administrative_area_level_1') !== -1) {
                            if (data.types.indexOf('administrative_area_level_1') !== -1) {
                              dispatch({ type: 'State', State: data?.long_name.replace(/\s/g, '-') })
                              sta = data?.long_name.replace(/\s/g, '-')
                            }
                          }
                          if (data.types.indexOf('administrative_area_level_3') !== -1) {
                            if (data.types.indexOf('administrative_area_level_3') !== -1 || data.types.indexOf('locality') !== -1) {
                              dispatch({ type: 'City', City: data?.long_name?.replace(/\s/g, '-') })
                              ci = data?.long_name.replace(/\s/g, '-').toLowerCase()

                            }
                          }

                        })



                        if (ci !== undefined && sta !== undefined && Coun !== undefined) {

                          navigate.push(pathname + `/${'in'}/${Coun.toLowerCase()}/${sta.toLowerCase()}/${ci.toLowerCase()}/`)
                        }
                        else {
                          if (sta !== undefined && Coun !== undefined) {
                            navigate.push(pathname + `/${'in'}/${Coun.toLowerCase()}/${sta.toLowerCase()}/`)
                          }
                          else {
                            if (Coun !== undefined) {
                              navigate.push(pathname + `/${'in'}/${Coun.toLowerCase()}/`)
                            }

                          }
                        }
                      }
                      else {
                        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${"new-york"}&key=${"AIzaSyBRchIzUTBZskwvoli9S0YxLdmklTcOicU"}`)
                          .then(res => res.json())
                          .then(response => {
                            dispatch({ type: 'permission', permission: true })
                            dispatch({ type: 'Location', Location: response?.results[0]?.formatted_address })
                            response?.results[0]?.address_components?.map((data) => {
                              if (data.types.indexOf('country') !== -1) {
                                dispatch({ type: 'Country', Country: data?.long_name.replace(/\s/g, '-') })
                                Coun = data?.long_name.replace(/\s/g, '-')
                              }
                              if (data.types.indexOf('administrative_area_level_1') !== -1) {
                                if (data.types.indexOf('administrative_area_level_1') !== -1) {
                                  dispatch({ type: 'State', State: data?.long_name.replace(/\s/g, '-') })
                                  sta = data?.long_name.replace(/\s/g, '-')
                                }
                              }
                              if (data.types.indexOf('administrative_area_level_3') !== -1) {
                                if (data.types.indexOf('administrative_area_level_3') !== -1 || data.types.indexOf('locality') !== -1) {
                                  dispatch({ type: 'City', City: data?.long_name?.replace(/\s/g, '-') })
                                  ci = data?.long_name.replace(/\s/g, '-')

                                }
                              }

                            })
                            if (ci !== undefined && sta !== undefined && Coun !== undefined) {

                              navigate.push(pathname + `/${'in'}/${Coun.toLowerCase()}/${sta.toLowerCase()}/${ci.toLowerCase()}/`)
                            }
                            else {
                              if (sta !== undefined && Coun !== undefined) {
                                navigate.push(pathname + `/${'in'}/${Coun.toLowerCase()}/${sta.toLowerCase()}/`)
                              }
                              else {
                                if (Coun !== undefined) {
                                  navigate.push(pathname + `/${'in'}/${Coun.toLowerCase()}/`)
                                }

                              }
                            }

                          }
                          ).catch((error) => {
                            console.trace(error)
                          })

                      }
                    }
                    ).catch((error) => {
                      console.trace(error)
                    })
                }
              }
              ).catch((error) => {
                console.trace(error)
              })

          }

        }

      }
      ).catch((error) => {
        console.trace(error)
      })
  }
  // return com

}



export  default RoutingSearch