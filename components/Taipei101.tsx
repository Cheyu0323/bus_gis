"use client";

import * as cesium from "cesium";

import React, { useRef, useState } from "react";
import { CesiumComponentRef, Entity, ModelGraphics, useCesium } from "resium";
import { track } from "@vercel/analytics";

const Taipei101: React.FC = () => {
    const modelRef = useRef<CesiumComponentRef<cesium.Entity>>(null);
    const [isHover, setIsHover] = useState<boolean>(false);
    const { viewer } = useCesium();
    const handleClick = () => {
        if (viewer == null) return;
        if (modelRef.current == null) return;
        viewer.trackedEntity = modelRef.current.cesiumElement;
        window.gtag("event", "click", {
            event_category: "模型",
            event_label: "台北 101",
        });
        track("模型_台北 101");
    };
    return (
        <>
            <Entity
                ref={modelRef}
                name="台北101"
                position={cesium.Cartesian3.fromDegrees(121.5648, 25.0337, -3)}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onMouseUp={() => setIsHover(false)}
                onClick={handleClick}
                viewFrom={new cesium.Cartesian3(-200, -2000, 1000)}
            >
                <ModelGraphics
                    uri="/assets/101.gltf"
                    scale={40}
                    colorBlendMode={cesium.ColorBlendMode.MIX}
                    color={cesium.Color.fromAlpha(cesium.Color.WHITE, 1)}
                    silhouetteColor={
                        isHover ? cesium.Color.BLACK : cesium.Color.GRAY
                    }
                    silhouetteSize={3}
                    shadows={cesium.ShadowMode.RECEIVE_ONLY}
                />
            </Entity>
        </>
    );
};

export default Taipei101;
