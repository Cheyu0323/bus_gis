'use client'

import {
    Cartesian3,
    Color,
    ColorBlendMode,
    Entity as EnitityImps,
    ShadowMode,
} from "cesium";
import React, { useRef, useState } from "react";
import { CesiumComponentRef, Entity, ModelGraphics, useCesium } from "resium";

const Taipei101: React.FC = () => {
    const modelRef = useRef<CesiumComponentRef<EnitityImps>>(null);
    const [isHover, setIsHover] = useState<boolean>(false);
    const { viewer } = useCesium();
    const handleClick = () => {
        if (viewer == null) return;
        if (modelRef.current == null) return;
        viewer.trackedEntity = modelRef.current.cesiumElement;
    };
    return (
        <>
            <Entity
                ref={modelRef}
                name="台北101"
                position={Cartesian3.fromDegrees(121.5648, 25.0337, -3)}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onMouseUp={() => setIsHover(false)}
                onClick={handleClick}
                viewFrom={new Cartesian3(-200, -2000, 1000)}
            >
                <ModelGraphics
                    uri="/assets/101.gltf"
                    scale={40}
                    colorBlendMode={ColorBlendMode.MIX}
                    color={Color.fromAlpha(Color.WHITE, 1)}
                    silhouetteColor={isHover ? Color.BLACK : Color.GRAY}
                    silhouetteSize={3}
                    shadows={ShadowMode.RECEIVE_ONLY}
                />
            </Entity>
        </>
    );
};

export default Taipei101;