'use client'

import React, { useRef } from "react";
import roadPoint from "@/public/roadPoint.json";
import { Clock, Entity, ModelGraphics } from "resium";
import {
    Cartesian3,
    ClockRange,
    Color,
    JulianDate,
    SampledPositionProperty,
    TimeInterval,
    TimeIntervalCollection,
    VelocityOrientationProperty,
} from "cesium";

const start = JulianDate.fromDate(new Date());
const stop = JulianDate.addSeconds(start, 638, new JulianDate());

const creatTimeline = () => {
    const property = new SampledPositionProperty();
    roadPoint.map((point, i) => {
        const time = JulianDate.addSeconds(start, i, new JulianDate());
        const position = Cartesian3.fromDegrees(point.lat, point.lon);

        property.addSample(time, position);
    });
    return property;
};

const BusRoadPointList = () => {
    const positionRef = useRef(creatTimeline());

    return (
        <>
            <Clock
                shouldAnimate={true}
                startTime={start.clone()}
                stopTime={stop.clone()}
                currentTime={start.clone()}
                clockRange={ClockRange.LOOP_STOP}
                multiplier={1}
            />
            {positionRef.current != null && (
                <Entity
                    name="觀光雙層巴士"
                    position={positionRef.current}
                    path={{
                        resolution: 0,
                        material: Color.RED,
                        width: 2,
                    }}
                    availability={
                        new TimeIntervalCollection([
                            new TimeInterval({
                                start: start,
                                stop: stop,
                            }),
                        ])
                    }
                    orientation={
                        new VelocityOrientationProperty(positionRef.current)
                    }
                    viewFrom={new Cartesian3(0, 0, 300)}
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
