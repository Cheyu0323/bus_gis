"use client";

import * as cesium from "cesium";
import React from "react";
import { Entity, ModelGraphics } from "resium";

const TaipeiMainStation: React.FC = () => {
    return (
        <Entity
            name="台北車站"
            position={cesium.Cartesian3.fromDegrees(121.5170991, 25.04764, -10)}
        >
            <ModelGraphics uri="/assets/taipeimainstation.gltf" scale={60} />
        </Entity>
    );
};

export default TaipeiMainStation;
