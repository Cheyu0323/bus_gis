"use client";

import React, { useState } from "react";
import busStationList from "@/public/bus_station.json";
import { StationItemType } from "@/type/common";
import * as cesium from "cesium";
import { BillboardGraphics, Entity, LabelGraphics, useCesium } from "resium";

const BusStationPoint: React.FC<StationItemType> = ({ id, name, position }) => {
    const [isHover, setIsHover] = useState<boolean>(false);
    const { camera, viewer } = useCesium();

    const handleClickPoint = () => {
        if (camera == null) return;
        if (viewer == null) return;
        viewer.trackedEntity = undefined;
        camera.flyTo({
            duration: 0.8,
            easingFunction: cesium.EasingFunction.CUBIC_OUT,
            destination: cesium.Cartesian3.fromDegrees(
                position.lon,
                position.lat,
                1500
            ),
            orientation: {
                heading: cesium.Math.toRadians(0),
                pitch: cesium.Math.toRadians(-90),
                roll: 0,
            },
        });

        window.gtag("event", "click", {
            event_category: "熱點",
            event_label: name,
        });
    };

    return (
        <Entity
            position={cesium.Cartesian3.fromDegrees(
                position.lon,
                position.lat,
                1
            )}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onMouseDown={() => setIsHover(false)}
            onClick={handleClickPoint}
        >
            <LabelGraphics
                text={name.toString()}
                show={isHover}
                scaleByDistance={new cesium.NearFarScalar(0, 3, 5000, 0.7)}
                font="12px"
                showBackground={true}
                backgroundColor={cesium.Color.WHITE}
                pixelOffset={new cesium.Cartesian2(0, -10)}
                pixelOffsetScaleByDistance={
                    new cesium.NearFarScalar(0, 4, 5000, 1.2)
                }
                backgroundPadding={new cesium.Cartesian2(10, 10)}
                fillColor={cesium.Color.BLACK}
                verticalOrigin={cesium.VerticalOrigin.BOTTOM}
                // eyeOffset={new Cartesian3(0, 0, -3000)}
            />
            <BillboardGraphics
                image={`/assets/bus_station_${id}.svg`}
                scaleByDistance={new cesium.NearFarScalar(0, 0.8, 5000, 0.2)}

                // eyeOffset={new Cartesian3(0, 0, -3000)}
            />
        </Entity>
    );
};

const BusStationPointList: React.FC = () => {
    return (
        <>
            {busStationList.map((station) => (
                <BusStationPoint key={station.id} {...station} />
            ))}
        </>
    );
};

export default BusStationPointList;
