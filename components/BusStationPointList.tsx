'use client'

import React, { useState } from "react";
import busStationList from "@/public/bus_station.json";
import { StationItemType } from "@/type/common";
import {
    Cartesian2,
    Cartesian3,
    Color,
    NearFarScalar,
    VerticalOrigin,
    Math as MathImps,
    EasingFunction,
} from "cesium";
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
            easingFunction: EasingFunction.CUBIC_OUT,
            destination: Cartesian3.fromDegrees(
                position.lon,
                position.lat,
                1500
            ),
            orientation: {
                heading: MathImps.toRadians(0),
                pitch: MathImps.toRadians(-90),
                roll: 0,
            },
        });
    };

    return (
        <Entity
            position={Cartesian3.fromDegrees(position.lon, position.lat, 1)}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onMouseDown={() => setIsHover(false)}
            onClick={handleClickPoint}
        >
            <LabelGraphics
                text={name.toString()}
                show={isHover}
                scaleByDistance={new NearFarScalar(0, 3, 5000, 0.7)}
                font="12px"
                showBackground={true}
                backgroundColor={Color.WHITE}
                pixelOffset={new Cartesian2(0, -10)}
                pixelOffsetScaleByDistance={new NearFarScalar(0, 4, 5000, 1.2)}
                backgroundPadding={new Cartesian2(10, 10)}
                fillColor={Color.BLACK}
                verticalOrigin={VerticalOrigin.BOTTOM}
                // eyeOffset={new Cartesian3(0, 0, -3000)}
            />
            <BillboardGraphics
                image={`/assets/bus_station_${id}.svg`}
                scaleByDistance={new NearFarScalar(0, 0.8, 5000, 0.2)}

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
