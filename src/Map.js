import React from "react";
import {
  Map,
  TileLayer,
  Tooltip,
  ZoomControl,
  ScaleControl
} from "react-leaflet";
import { SemiCircleMarker } from "react-leaflet-semicircle";
import { BoxZoomControl } from "react-leaflet-box-zoom";
import "./Maps.css";

class Maps extends React.Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13
  };

  positionLabel(azimuth) {
    azimuth = Number(azimuth);
    if (azimuth <= 45) {
      return "bottom";
    } else if (azimuth > 45 && azimuth <= 135) {
      return "left";
    } else if (azimuth > 135 && azimuth <= 225) {
      return "top";
    } else if (azimuth > 225 && azimuth <= 315) {
      return "right";
    } else if (azimuth > 315) {
      return "bottom";
    }
    return "auto";
  }

  renderSites() {
    const items = this.props.pins.map(item => {
      //console.log(this.positionLabel(item.azimuth));
      if (item.latitude && item.longitude) {
        return (
          <SemiCircleMarker
            position={[item.latitude, item.longitude]}
            radius={item.size}
            startAngle={
              Number(item.beamwidth) === 360
                ? 0
                : Number(item.azimuth) - Number(item.beamwidth / 2)
            }
            stopAngle={
              Number(item.beamwidth) === 360
                ? 0
                : Number(item.azimuth) + Number(item.beamwidth / 2)
            }
            color="magenta"
            fillColor="magenta"
            fillOpacity="1"
          >
            <Tooltip
              permanent
              direction={this.positionLabel(item.azimuth)}
              offset={[item.size / 10, item.size / 10]}
              draggable={true}
            >
              <span>{item.siteID}</span>
            </Tooltip>
          </SemiCircleMarker>
        );
      }
    });
    return items;
  }

  render() {
    // const position = [this.state.lat, this.state.lng];
    var position = [];
    if (this.props.pins[0]) {
      position = [this.props.pins[0].latitude, this.props.pins[0].longitude];
    } else {
      position = [47.579398, -122.165448];
    }
    return (
      <Map center={position} zoom={this.state.zoom} closePopupOnClick={false}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <BoxZoomControl position="topleft" sticky />
        <ScaleControl />
        {this.renderSites()}
      </Map>
    );
  }
}

export default Maps;

// return (
//     <Map center={position} zoom={this.state.zoom} closePopupOnClick={false}>
//       <TileLayer
//         attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={position}>
//         <Popup>
//           A pretty CSS3 popup. <br /> Easily customizable.
//         </Popup>
//       </Marker>
//       <Marker position={[51.504, -0.09]}>
//         <Popup>
//           A pretty CSS3 popup. <br /> Easily customizable.
//         </Popup>
//       </Marker>
//       <SemiCircleMarker
//         position={[51.503, -0.09]}
//         radius={50}
//         startAngle={90}
//         stopAngle={180}
//         html={{ backgroundColor: "black" }}
//         color="magenta"
//         fillColor="magenta"
//         fillOpacity="1"
//       >
//         <Tooltip permanent>
//           <span>HN1285BA</span>
//         </Tooltip>
//       </SemiCircleMarker>
//     </Map>
//   );
// }
// }
