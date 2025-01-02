"use client";

import React, { useRef } from "react";
import roadPoint from "@/public/roadPoint.json";
import { Clock, Entity, ModelGraphics } from "resium";
import * as cesium from "cesium";

const start = cesium.JulianDate.fromDate(new Date());
const stop = cesium.JulianDate.addSeconds(start, 638, new cesium.JulianDate());

const creatTimeline = () => {
    const property = new cesium.SampledPositionProperty();
    roadPoint.map((point, i) => {
        const time = cesium.JulianDate.addSeconds(
            start,
            i,
            new cesium.JulianDate()
        );
        const position = cesium.Cartesian3.fromDegrees(point.lat, point.lon);

        property.addSample(time, position);
    });
    return property;
};

const BusRoadPointList = () => {
    const positionRef = useRef(creatTimeline());
    const handleClick = () => {
        window.gtag("event", "click", {
            event_category: "模型",
            event_label: "雙層巴士",
        });
    };
    return (
        <>
            <Clock
                shouldAnimate={true}
                startTime={start.clone()}
                stopTime={stop.clone()}
                currentTime={start.clone()}
                clockRange={cesium.ClockRange.LOOP_STOP}
                multiplier={1}
            />
            {positionRef.current != null && (
                <Entity
                    name="觀光雙層巴士"
                    position={positionRef.current}
                    path={{
                        resolution: 0,
                        material: cesium.Color.RED,
                        width: 2,
                    }}
                    availability={
                        new cesium.TimeIntervalCollection([
                            new cesium.TimeInterval({
                                start: start,
                                stop: stop,
                            }),
                        ])
                    }
                    orientation={
                        new cesium.VelocityOrientationProperty(
                            positionRef.current
                        )
                    }
                    viewFrom={new cesium.Cartesian3(0, 0, 300)}
                    onClick={handleClick}
                >
                    <ModelGraphics
                        uri="/assets/bus.gltf"
                        scale={3}
                        minimumPixelSize={30}
                    />
                </Entity>
            )}
        </>
    );
};

export default BusRoadPointList;
