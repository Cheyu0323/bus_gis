'use client'

import {
    Cartesian2,
    defined,
    Entity,
    ScreenSpaceEventHandler,
    ScreenSpaceEventType,
} from "cesium";
import React, { useEffect, useState } from "react";
import { useCesium } from "resium";

const FocusOutline: React.FC = () => {
    const { viewer } = useCesium();
    const [selectedEntity, setSelectedEntity] = useState<Entity | null>();
    useEffect(() => {
        if (viewer == null) return;

        const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);

        handler.setInputAction((click: { position: Cartesian2 }) => {
            const pickedObject = viewer.scene.pick(click.position);

            if (defined(pickedObject)) {
                const entity = pickedObject.id;
                setSelectedEntity(entity);
            } else {
                setSelectedEntity(null);
            }
        }, ScreenSpaceEventType.LEFT_CLICK);

        return () => {
            handler.destroy();
        };
    }, [viewer]);

    return (
        <div
            className={`absolute top-0 left-0 w-full h-full border-white/90 pointer-events-none duration-300 ${
                selectedEntity?.name == null
                    ? "border-0"
                    : "border-[10px] md:border-[30px]"
            }`}
        >
            <div
                className={`absolute bottom-2 left-2 text-white/90 font-black tracking-wider text-7xl drop-shadow-[1px_4px_1px_rgba(0,0,0,0.8)] duration-300 ${
                    selectedEntity?.name == null ? "opacity-0" : "opacity-100"
                }`}
            >
                {selectedEntity != null && selectedEntity.name}
            </div>
        </div>
    );
};

export default FocusOutline;
