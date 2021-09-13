import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';

function App() {
    const mapStyles = {
        width: '100%',
        height: '100%'
    };

    const [location, setLocation] = useState({lat: 0, lng: 0});

    useEffect(() => {
        if ("geolocation" in navigator) {
            console.log("Available");
        } else {
            console.log("Not Available");
        }
    }, [])

    function getMyLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
                setLocation({lat: position.coords.latitude, lng: position.coords.longitude})
            });
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <input type="button" onClick={getMyLocation} value="Get My Current Location"/>
                <div>
                    Lat = {location.lat}<br/>
                    Long = {location.lng}
                </div>
                <div>
                    <Map
                        google={window.google}
                        zoom={3}
                        style={mapStyles}
                        initialCenter={{
                            lat: 0,
                            lng: 0
                        }}
                        center={{
                            lat: location.lat,
                            lng: location.lng
                        }}
                    >
                        <Marker
                            name={'Current location'}
                            position={{
                                lat: location.lat,
                                lng: location.lng
                            }}
                        />
                    </Map>
                </div>
            </header>
        </div>
    );
}

export default GoogleApiWrapper({
    apiKey: 'API_KEY'
})(App);
