import React, { useEffect, useState } from 'react';
import L from "leaflet";
import "./CanvasWithExtraStyles";
import "leaflet/dist/leaflet.css";
import Grass1 from '../Imgs/Grass1.png';
import Grass2 from '../Imgs/Grass2.png';
import Farm from '../Imgs/Farm.png';
import CameraSyb from '../Imgs/Camera.png';
import SensorSyb from '../Imgs/Sensor.png';
import CowsSyb from '../Imgs/Cows.png';
import SheepSyb from '../Imgs/Sheep.png';
import CropSyb from '../Imgs/Crop.png';
import PloughSyb from '../Imgs/Ploughed.png';
import GrazingSyb from '../Imgs/Grazing.png';
// import { handleAnalyticClick } from '../Utils/tensorML.js';
import { getSpreadsheet } from '../Utils/sheets.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppMap ({ }) {

    useEffect(async () => {
        const coords = [54.4722607, -6.1231681];

        const mapView = L.map("mapView", {
			center: coords,
			zoom: 15,
			renderer: new L.Canvas.WithExtraStyles()
		});

        new L.tileLayer(
			'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			{
				attribution: `attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`,
				detectRetina: true,
				maxZoom: 30
			}
		).addTo(mapView);

        const errorOverlayUrl = '';
        const altText = 'Farm test Layer';
        const latLngBounds = L.latLngBounds([[54.476332, -6.123165], [54.467190, -6.104734]]);
    
        const imageOverlay = L.imageOverlay(Farm, latLngBounds, {
            opacity: 0.8,
            errorOverlayUrl,
            alt: altText,
            interactive: true
        }).addTo(mapView);
    
        // L.rectangle(latLngBounds).addTo(mapView);
        // mapView.fitBounds(latLngBounds);

        const geoJson = {
            "type": "FeatureCollection",
            "features": []
        };
        const spread = await getSpreadsheet();
        // get farm location
        let dataStore = [];
        for (let r = 0; r < spread.farmLocation.length; r++) {
            const latlng = spread.farmLocation[r].split(',');
            dataStore.push([parseFloat(latlng[1]), parseFloat(latlng[0])]);
        }
        geoJson.features.push(
            {
                "type": "Feature",
                "properties": {
                    "name": "Farm Location"
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [ dataStore ]
                }
            }
        );
        // get field data and notes
        for (let r = 0; r < spread.fieldData.length; r++) {
            let dataStore = [];
            let dataName = '';
            for (let i = 0; i < spread.fieldData[r].length; i++) {
                if (i === 0) {
                    dataName = spread.fieldData[r][i];
                } else {
                    const latlng = spread.fieldData[r][i].split(',');
                    dataStore.push([parseFloat(latlng[1]), parseFloat(latlng[0])]);
                }
            }
            let fieldNotesStore = {};
            if (spread.fieldNotes[r][0] === dataName) {
                fieldNotesStore = {
                    "type": spread.fieldNotes[r][1],
                    "description": spread.fieldNotes[r][2],
                    "timeOfUse": spread.fieldNotes[r][3],
                    "reset": spread.fieldNotes[r][4]
                };
            }
            geoJson.features.push(
                {
                    "type": "Feature",
                    "properties": {
                        "name": dataName,
                        ...fieldNotesStore
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [ dataStore ]
                    }
                }
            );
        }
        // get field sensors
        for (let r = 0; r < spread.fieldSensors.length; r++) {
            const latlng = spread.fieldSensors[r][2].split(',');
            geoJson.features.push(
                {
                  "type": "Feature",
                  "properties": {
                    "name": spread.fieldSensors[r][0],
                    "type": spread.fieldSensors[r][1]
                  },
                  "geometry": {
                      "type": "Point",
                      "coordinates": [parseFloat(latlng[1]), parseFloat(latlng[0])]
                  }
                }
            );
        }

        // console.log(geoJson);
        
        let polygonsWithCenters = L.layerGroup();

        L.geoJson(geoJson, {
			style: function(feature) {
				// const type = feature.geometry.type;
				// switch (type) {
				// 	case "Point":
				// 		// return pointStyle;
				// 		break;
				// 	case "Polygon":
				// 		return polyStyle;
				// 		break;
				// }
			},
			pointToLayer: function (feature, latlng) {
				const type = feature.geometry.type;
				switch (type) {
					case "Point":
                        if (feature.properties.type === 'Camera') {
                            const styleIcon = L.icon({
                                iconUrl: CameraSyb,
                                iconSize: [20, 25]
                            });
                            return L.marker(latlng, {icon: styleIcon}).addTo(mapView);
                        } else if (feature.properties.type === 'Sensor') {
                            const styleIcon = L.icon({
                                iconUrl: SensorSyb,
                                iconSize: [20, 25]
                            });
                            return L.marker(latlng, {icon: styleIcon}).addTo(mapView);
                        }
					break;
				}
		    },
            onEachFeature: function (feature, layer) {
                if (feature.geometry.type === "Polygon") {
                    var center = layer.getBounds().getCenter();
                    let imgSrc = '';

                    if (feature?.properties?.type) {
                        switch (feature.properties.type) {
                            case "For Grazing":
                                imgSrc = GrazingSyb;
                                layer.setStyle({
                                    fillColor: "green",
                                    fillOpacity: 0.4,
                                    weight: 0.5
                                });
                            break;
                            case "Livestock - Sheep":
                                imgSrc = SheepSyb;
                                layer.setStyle({
                                    fillColor: "blue",
                                    fillOpacity: 0.4,
                                    weight: 0.5
                                });
                            break;
                            case "Livestock - Cows":
                                imgSrc = CowsSyb;
                                layer.setStyle({
                                    fillColor: "purple",
                                    fillOpacity: 0.4,
                                    weight: 0.5
                                });
                            break;
                            case "Crops":
                                imgSrc = CropSyb;
                                layer.setStyle({
                                    fillColor: "yellow",
                                    fillOpacity: 0.4,
                                    weight: 0.5
                                });
                            break;
                            case "Ploughed": 
                                imgSrc = PloughSyb;
                                layer.setStyle({
                                    fillColor: "brown",
                                    fillOpacity: 0.4,
                                    weight: 0.5
                                });
                            break;
                        }
                    }
                    var marker = new L.Marker(center, {
                        icon: new L.DivIcon({
                            className: 'my-div-icon',
                            html: imgSrc ? `<img class="my-div-image" src="${imgSrc}" style="width:25px;height:25px;position:absolute;top:-10px;" />
                                <div class="my-div-span" style="position:absolute;top:16px;font-size:8px;font-weight:bold;width:80px;border:0px solid red">${feature.properties.name}</div>` :
                                `<div class="my-div-span" style="position:absolute;top:16px;font-size:8px;font-weight:bold;width:80px;border:0px solid red">${feature.properties.name}</div>`
                        })
                    });
                    var polygonAndItsCenter = L.layerGroup([layer, marker]);
                    polygonAndItsCenter.addTo(polygonsWithCenters);
                }
            },
			// onEachFeature: onEachFeature
		}).addTo(mapView);
        polygonsWithCenters.addTo(mapView);

        let intCount = 0;
        setInterval(() => {
            const arr = [
                "Soil Sensor: 12% (Hum) 13 (Temp)",
                "Current Weather: 8 (Temp) 20% (Precip) 58% (Hum)",
                "Tracking: [Field 4 - 42 Cows counted]"
            ]; 
            toast(arr[intCount]);
            if (intCount >= arr.length-1) {
                intCount = 0;
            } else {
                intCount++;
            }
        }, 30000);
    }, []);

    const getIframeVidImg = (e, id) => {
        e.preventDefault();
        alert(`Running analytics: ${id}`);
    };

    return (
        <div style={{ position: 'absolute', left: 0, backgroundColor: '#808080', overflowX: 'hidden' }}>
            <div id="mapView" style={{ position: 'relative', height: '92vh', width: '100vw', border: '0px solid red' }}>
                <div style={{position: 'absolute', bottom: 10, left: 10, width: '40%', height: '80%', border: '1px solid #000000', zIndex: 1000, overflow: 'auto', backgroundColor: '#272822'}}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', padding: '0px', height: '100%', overflowY: 'hidden' }}>
                        <div style={{ border: '1px solid black', height: '100%', position: 'relative' }}>
                            <iframe id="cam1" src="https://video.nest.com/embedded/live/nPgREoqps7?autoplay=1" width='100%' height='100%'></iframe>
                            <div style={{ backgroundColor: '#9BC5F8', position: 'absolute', bottom: 0, left: 0, fontWeight: 'bold' }}> Camera 1 </div>
                            <div style={{ backgroundColor: '#9BC5F8', position: 'absolute', bottom: 0, right: 0, fontWeight: 'bold' }} onClick={(e) => getIframeVidImg(e, 'cam1')}> Run Analytic </div>
                        </div>
                        <div style={{ border: '1px solid black', height: '100%', position: 'relative' }}>
                            <img src={Grass1} width="100%" height="60%" style={{ paddingTop: 50 }} />
                            <div style={{ backgroundColor: '#9BC5F8', position: 'absolute', bottom: 0, left: 0, fontWeight: 'bold' }}> Camera 3 </div>
                        </div>
                        <div style={{ border: '1px solid black', height: '100%', position: 'relative' }}>
                            <img src={Grass2} width="100%" height="60%" style={{ paddingTop: 50 }} />
                            <div style={{ backgroundColor: '#9BC5F8', position: 'absolute', bottom: 0, left: 0, fontWeight: 'bold' }}> Camera 2 </div>
                        </div>
                        <div style={{ border: '1px solid black', height: '100%', position: 'relative' }}>
                            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/XhV3Mhgi6Ck?controls=0&autoplay=1&mute=1" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                            <div style={{ backgroundColor: '#9BC5F8', position: 'absolute', bottom: 0, left: 0, fontWeight: 'bold' }}> Camera 4 </div>
                            <div style={{ backgroundColor: '#9BC5F8', position: 'absolute', bottom: 0, right: 0, fontWeight: 'bold' }} onClick={(e) => getIframeVidImg(e, 'cam2')}> Run Analytic </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AppMap;