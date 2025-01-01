"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    CesiumComponentRef,
    ScreenSpaceCameraController,
    Viewer,
} from "resium";
import * as cesium from "cesium"
import { getRandomInt } from "@/utils/common";
import MainMenu from "./MainMenu";
import BusRoadPointList from "./BusRoadPointList";
import BusStationPointList from "./BusStationPointList";
import Taipei101 from "./Taipei101";
import FocusOutline from "./FocusOutline";
import "cesium/Build/Cesium/Widgets/widgets.css";

export const VIEWCENTERPOSITION = cesium.Cartesian3.fromDegrees(
    121.5361925,
    25.0403944,
    7000
);

const CesiumView: React.FC = () => {
    const cesiumRef = useRef<CesiumComponentRef<cesium.Viewer>>(null);
    const [key, setKey] = useState<number>(getRandomInt(200));

    useEffect(() => {
        if (
            cesiumRef.current == null ||
            cesiumRef.current.cesiumElement == null
        ) {
            setKey(getRandomInt(200));
            return;
        }
        const viewer = cesiumRef.current.cesiumElement;
        viewer.camera.setView({
            destination: VIEWCENTERPOSITION,
            orientation: {
                heading: cesium.Math.toRadians(0),
                pitch: cesium.Math.toRadians(-90),
                roll: 0,
            },
        });
        // load google map image
        viewer.imageryLayers.addImageryProvider(
            new cesium.UrlTemplateImageryProvider({
                url: "https://mt{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
                subdomains: ["0", "1", "2", "3"],
            })
        );
        console.log("-", cesiumRef.current);
    }, [key]);

    return (
        <Viewer
            ref={cesiumRef}
            full
            selectionIndicator={false}
            infoBox={false}
            geocoder={false}
            homeButton={false}
            sceneModePicker={false}
            projectionPicker={false}
            baseLayerPicker={false}
            navigationHelpButton={false}
            animation={false}
            timeline={false}
            fullscreenButton={false}
            vrButton={false}
        >
            <ScreenSpaceCameraController minimumZoomDistance={20} />
            <MainMenu />
            <BusRoadPointList />
            <BusStationPointList />
            <FocusOutline />
            <Taipei101 />
        </Viewer>
    );
};

export default CesiumView;
