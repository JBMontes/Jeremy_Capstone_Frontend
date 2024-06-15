import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useLoginDataProvider } from "../Components/LoginProvider"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/UserLocation.css';

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const UserLocation = () => {
    const { userAddress, setUserAddress, userLocation, setUserLocation } = useLoginDataProvider()

    const [loading, setLoading] = useState(true);
    const [map, setMap] = useState(null);
    const [places, setPlaces] = useState([]);
    const [currentMarkers, setCurrentMarkers] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [route, setRoute] = useState(null);
    const [directions, setDirections] = useState(null);

    const getUserLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                },
                (err) => {
                    console.error('Error getting user location:', err);
                }
            );
        } else {
            console.log('Geolocation is not supported in this browser.');
        }
    };

    const getAddressFromCoordinates = async (latitude, longitude) => {
        try {
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_ACCESS_TOKEN}`);
            const data = await response.json();
            if (data.features && data.features.length > 0) {
                const address = data.features[0].place_name;
                setUserAddress(address);
                setLoading(false);
            }
        } catch (err) {
            console.error('Error fetching address:', err);
        }
    };

    const searchPlaces = async (category) => {
        if (!userLocation) return;

        try {
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${category}.json?bbox=${userLocation.longitude - 0.1},${userLocation.latitude - 0.1},${userLocation.longitude + 0.1},${userLocation.latitude + 0.1}&access_token=${MAPBOX_ACCESS_TOKEN}`);
            const data = await response.json();
            if (data.features && data.features.length > 0) {
                setPlaces(data.features);
                removeMarkers();
                addMarkers(data.features);
            }
        } catch (err) {
            console.error(`Error fetching ${category}:`, err);
        }
    };

    const handleSearch = (category) => {
        setRoute(null)
        setDirections(null)
        searchPlaces(category);
    };

    const removeMarkers = () => {
        if (currentMarkers.length > 0) {
            currentMarkers.forEach(marker => marker.remove());
        }
    };

    const addMarkers = (places) => {
        const markers = places.map(place => {
            const popupContent = `
                <div>
                    <p>${place.place_name}</p>
                    <button class="get-directions-btn" data-lng="${place.geometry.coordinates[0]}" data-lat="${place.geometry.coordinates[1]}">
                        Driving
                    </button>
                    <button class="get-directions-walking-btn" data-lng="${place.geometry.coordinates[0]}" data-lat="${place.geometry.coordinates[1]}">
                   Walking
                </button>
                </div>
            `;

            const popup = new mapboxgl.Popup({
                className: 'custom-popup',
            }).setHTML(popupContent);

            const marker = new mapboxgl.Marker()
                .setLngLat(place.geometry.coordinates)
                .setPopup(popup)
                .addTo(map);
            marker.getElement().addEventListener('click', () => {
                setSelectedPlace(place);
            })
            // Add event listener for the "Get Directions" button in the popup
            popup.on('open', () => {
                const btn = document.querySelector('.get-directions-walking-btn');
                btn.addEventListener('click', () => {
                    handleWalkingDirection(place, popup);
                });
            });

            popup.on('open', () => {
                const btn = document.querySelector('.get-directions-btn');
                btn.addEventListener('click', () => {
                    handleDirections(place, popup);
                });
            });
            return marker;
        });

        setCurrentMarkers(markers);
    };

    const fetchRouteAndDirections = async (destination) => {
        try {
            const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.longitude},${userLocation.latitude};${destination.geometry.coordinates[0]},${destination.geometry.coordinates[1]}?geometries=geojson&steps=true&access_token=${MAPBOX_ACCESS_TOKEN}`);
            const data = await response.json();
            setRoute(data.routes[0].geometry);
            setDirections(data.routes[0].legs[0].steps);
        } catch (err) {
            console.error('Error fetching route and directions:', err);
        }
    }

    const fetchWalkingRouteAndDirections = async (destination) => {
        try {
            const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${userLocation.longitude},${userLocation.latitude};${destination.geometry.coordinates[0]},${destination.geometry.coordinates[1]}?geometries=geojson&steps=true&access_token=${MAPBOX_ACCESS_TOKEN}`);
            const data = await response.json();
            setRoute(data.routes[0].geometry);
            setDirections(data.routes[0].legs[0].steps);
        } catch (err) {
            console.error('Error fetching route and directions:', err);
        }
    }

    const handleDirections = (destination, popup) => {
        fetchRouteAndDirections(destination);
        popup.remove(); // Close the popup
    }

    const handleWalkingDirection = (destination, popup) => {
        fetchWalkingRouteAndDirections(destination);
        popup.remove(); // Close the popup
    }

    useEffect(() => {
        if (map) {
            if (route) {
                // Add or update route on the map
                if (map.getSource('route')) {
                    // If source exists, update data
                    map.getSource('route').setData({
                        type: 'Feature',
                        properties: {},
                        geometry: route,
                    });
                } else {
                    // Otherwise, add new source and layer
                    map.addSource('route', {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry: route,
                        },
                    });
                    map.addLayer({
                        id: 'route',
                        type: 'line',
                        source: 'route',
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round',
                        },
                        paint: {
                            'line-color': '#007cbf',
                            'line-width': 8,
                        },
                    });
                }
            } else {
                // Remove route layer and source from the map
                if (map.getLayer('route')) {
                    map.removeLayer('route');
                }
                if (map.getSource('route')) {
                    map.removeSource('route');
                }
            }
        }
    }, [map, route]);


    useEffect(() => {
        getUserLocation();
    }, []);

    useEffect(() => {
        if (userLocation) {
            getAddressFromCoordinates(userLocation.latitude, userLocation.longitude);
        }
    }, [userLocation]);

    useEffect(() => {
        if (map && userLocation) {
            const userMarker = new mapboxgl.Marker({
                color: '#E87400'
                
            }).setLngLat([userLocation.longitude, userLocation.latitude]).addTo(map);
        }
    }, [map, userLocation]);

    useEffect(() => {
        const initializeMap = () => {
            if (!userLocation || !MAPBOX_ACCESS_TOKEN) return;

            mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
            const newMap = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [userLocation.longitude, userLocation.latitude],
                zoom: 12,
            });

            if (map) {
                map.remove();
            }

            setMap(newMap);
        };

        if (!map) {
            initializeMap();
        }

        return () => {
            if (map) {
                map.remove();
            }
        };
    }, [userLocation]);

    const closeDirections = () => {
        setRoute(null);
        setDirections(null);
    }

    const handleEmergencyButtonClick = (emergencyType) => {
        if (emergencyType === 'fire_station') {
            emergencyType = "Fire"
        } else if (emergencyType === 'police') {
            emergencyType = 'Police'
        } else if (emergencyType === 'hospital') {
            emergencyType = 'Hospital'
        }

        toast.info(`${emergencyType} button clicked`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <div className='userLocation'>
            <ToastContainer className='toastify' />
            {loading ? <img className="userAddress" src="https://cdn.pixabay.com/animation/2023/11/29/03/37/03-37-06-789_512.gif" alt="loading" style={{ width: '100px', height: '110px', borderRadius: '80px', padding: "30px", border: "none" }} />: <h2 className='userAddress'> <img className='pinImg' src='/MapMarker2.svg'/> {userAddress}</h2>}
            
            <h3 className="directionHeader">Route & Direction</h3>
            <div className="mapButtons">

                <div className="mapButtonDiv">
                    <h5 onClick={() => { handleSearch('fire_station'), handleEmergencyButtonClick('fire_station') }}>Fire</h5>
                    <img onClick={() => { handleSearch('fire_station'), handleEmergencyButtonClick('fire_station') }} className="fireStation" src="/fireStationsvg.svg" alt="Fire Station Button" />
                </div>
                <div className="mapButtonDiv">
                    <h5 onClick={() => { handleSearch('police'), handleEmergencyButtonClick('police') }}>Police</h5>
                    <img onClick={() => { handleSearch('police'), handleEmergencyButtonClick('police') }} className="policeStation" src="/policeStation.svg" alt="Police Station Button" />
                </div>
                <div className="mapButtonDiv">
                    <h5 onClick={() => { handleSearch('hospital'), handleEmergencyButtonClick('hospital') }}>Hospital</h5>
                    <img onClick={() => { handleSearch('hospital'), handleEmergencyButtonClick('hospital') }} className="hospitalStation" src="/hospitalStation.svg" alt="Hospital Button" />
                </div>
            </div>
            <div className="mapDivBody">
                {/* <div className="mapBoxDiv"> */}
                <div id="map"></div>
                {/* <div id="map" style={{ width: '40vw', height: '400px', borderRadius: '60px' }}></div> */}
                {/* </div> */}

                {directions && (
                    <div className="mapDirections">
                        <div className="closeDirections">
                            <button className="closeDirectionsChar" onClick={closeDirections}>❌</button>
                        </div>
                        <h2 className="h2Directions">Directions</h2>
                        {directions.map((step, index) => (
                            <p key={index}>{step.maneuver.instruction}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserLocation;