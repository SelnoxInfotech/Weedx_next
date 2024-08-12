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
  LoadingContainer: () => <div className="loader_container">
  <span className="newloader shine"><Image src={logo.src} alt='weedx.io logo' width={100} height={100}  title='weedx.io logo'/></span>
</div>,
  apiKey: 'AIzaSyBRchIzUTBZskwvoli9S0YxLdmklTcOicU'
})(MapContainer);