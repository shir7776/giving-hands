import React, { Component } from "react";

import { withScriptjs, withGoogleMap, GoogleMap, Marker,InfoWindow } from "react-google-maps"

var getColorPin=(num)=>{
    let pinLst=[
        "http://maps.google.com/mapfiles/ms/micons/red-dot.png",
        "http://maps.google.com/mapfiles/ms/micons/blue-dot.png",
        "http://maps.google.com/mapfiles/ms/micons/green-dot.png",
        "http://maps.google.com/mapfiles/ms/micons/ltblue-dot.png",
        "http://maps.google.com/mapfiles/ms/micons/purple-dot.png",
        "http://maps.google.com/mapfiles/ms/micons/orange-dot.png",
        "http://maps.google.com/mapfiles/ms/micons/yellow-dot.png",
        "http://maps.google.com/mapfiles/ms/micons/pink-dot.png",
        "http://maps.google.com/mapfiles/ms/micons/blue.png",
        "http://maps.google.com/mapfiles/ms/micons/red.png",
        "http://maps.google.com/mapfiles/ms/micons/green.png",
        "http://maps.google.com/mapfiles/ms/micons/lightblue.png",
        "http://maps.google.com/mapfiles/ms/micons/yellow.png",
        "http://maps.google.com/mapfiles/ms/micons/purple.png",
        "http://maps.google.com/mapfiles/ms/micons/pink.png",
        "http://maps.google.com/mapfiles/ms/micons/orange.png",
        "http://maps.google.com/mapfiles/ms/micons/ylw-pushpin.png",
        "http://maps.google.com/mapfiles/ms/micons/ltblu-pushpin.png",
        "http://maps.google.com/mapfiles/ms/micons/purple-pushpin.png",
        "http://maps.google.com/mapfiles/ms/micons/grn-pushpin.png",
        "http://maps.google.com/mapfiles/ms/micons/red-pushpin.png",
        "http://maps.google.com/mapfiles/ms/micons/pink-pushpin.png",
        "http://maps.google.com/mapfiles/ms/micons/blue-pushpin.png",

    ]
    return pinLst[num%pinLst.length]

}
export class MyMapComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            locations: [],
            selectedMarker: false,
            markers:[]//props.markers
        }
    }
 handleClick = (marker, event) => {
    this.setState({ selectedMarker: marker })
}

    render() {
        setTimeout(()=>{

        this.setState({
            markers: this.props.markers
        })
        },1000);
        return (

                <GoogleMap
                    defaultZoom={8}
                    defaultCenter={{lat: 31.397, lng: 35.644}}
                >
                    {/*{props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}*/}
                    {this.state.markers.map(marker => {
                        const onClick = this.handleClick.bind(this, marker)
                        return (
                            <Marker
                                key={marker.id}
                                onClick={onClick}
                                position={{lat: Number(marker.lat), lng: Number(marker.lng)}}
                                icon={getColorPin(marker.area)}
                                visible={!marker.finished}
                            >
                                {this.state.selectedMarker === marker &&
                                <InfoWindow>
                                    <div>
                                        {marker.address + " || area key: " + marker.area}
                                    </div>
                                </InfoWindow>}

                            </Marker>
                        )
                    })}
                </GoogleMap>


        )
    }
}


export default withScriptjs(withGoogleMap(MyMapComponent));