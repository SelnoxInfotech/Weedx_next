import { Map, GoogleApiWrapper } from 'google-maps-react';
import Image from 'next/image'
import logo from '../../../../public/weedx.iologo.png'
export   function MapContainer(props) {
  function _mapLoaded(mapProps, map) {
    map.setOptions({
      styles: props.Theme
    });
    map.setOptions({ draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true , alt:"map" });
  }


  return (

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
          </Map>
  );
}

 export default  GoogleApiWrapper ({
  apiKey: 'AIzaSyBRchIzUTBZskwvoli9S0YxLdmklTcOicU'
})(MapContainer);