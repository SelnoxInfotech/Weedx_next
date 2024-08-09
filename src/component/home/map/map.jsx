import { Map, GoogleApiWrapper } from 'google-maps-react';

// import {Fa500Px } from "react-icons/fa";
export   function MapContainer(props) {
  // const locations = [
  //   { latitude: 40.727019, longitude: -74.037536, name: 'First Marker' },
  //   { latitude: 40.719941, longitude: -74.049308, name: 'First Marker' },
  //   { latitude: 40.726186, longitude: -74.042616, name: 'First Marker' },
  //   { latitude: 40.724494, longitude: -74.041242, name: 'First Marker' },
  //   { latitude: 40.72283, longitude: -74.036, name: 'First Marker' }]

  // const displayMarkers = () => {

  //   return locations.map((store, index) => {
  //     return (
  //       <Marker key={index} id={index}
  //         position={{
  //           lat: store.latitude,
  //           lng: store.longitude,
  //         }}
  //         title="title"
  //         icon={Fa500Px}
  //       />
  //       )
  //   })
  // }
  function _mapLoaded(mapProps, map) {
    map.setOptions({
      styles: props.Theme
    });
    map.setOptions({ draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true , alt:"map" });
  }


  return (

    // <div className='container'>
    //   <div className='row'>
    //     <div className='col-12  ' >
          <Map
            style={{ height: props?.height, width: props.width ,backgroundColor: 'black' }}
            google={window.google}
            zoom={15}
            initialCenter={{ lat: 40.719074, lng: -74.050552 }}
            fullscreenControl={false}
            onReady={(mapProps, map) => _mapLoaded(mapProps, map)}
            streetViewControl={false}
            mapTypeControl={false}
          >
            {/* {displayMarkers()} */}
          </Map>
    //     </div>
    //   </div>   
    // </div>

  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBRchIzUTBZskwvoli9S0YxLdmklTcOicU'
})(MapContainer);