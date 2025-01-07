"use client";

import React, { useState } from "react";
import busStationList from "@/public/bus_station.json";
import BusIcon from "./Icon/BusIcon";
import { StationItemType } from "@/type/common";
import EarthIcon from "./Icon/EarthIcon";
import MapIcon from "./Icon/MapIcon";
import { useCesium } from "resium";
import * as cesium from "cesium";
import { VIEWCENTERPOSITION } from "./CesiumView";
import PlusIcon from "./Icon/PlusIcon";
import MinusIcon from "./Icon/MinusIcon";
import { track } from "@vercel/analytics";

const BusStationItem: React.FC<StationItemType> = ({ id, name, position }) => {
    const { camera, viewer } = useCesium();
    const handleClick = () => {
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
            category: "清單",
            label: name,
        });
        track(`清單_${name}`);
    };

    return (
        <div
            className="bg-[#F3F3F3] hover:bg-[#E1E1E1] duration-150 flex items-center px-1 py-1 rounded-md cursor-pointer"
            onClick={handleClick}
        >
            <div className="w-6 h-6 border-main border-2 rounded-full text-center leading-5 text-xs">
                {id}
            </div>
            <div className="pl-2 pr-4">{name}</div>
            <BusIcon className="w-5 h-5 ml-auto my-auto" />
        </div>
    );
};

type TagProps = {
    icon: "Earth" | "Map" | "Bus" | "Plus" | "Minus";
};

const IconMap = {
    Earth: <EarthIcon className="w-5 h-8 m-auto" />,
    Plus: <PlusIcon className="w-5 h-8 m-auto" />,
    Minus: <MinusIcon className="w-5 h-8 m-auto" />,
    Map: <MapIcon className="w-5 h-8 m-auto" />,
    Bus: <BusIcon className="w-5 h-8 m-auto" />,
};
const TooltipMap = {
    Earth: "全景視角",
    Plus: "放大",
    Minus: "縮小",
    Map: "路線資訊",
    Bus: "跟隨巴士",
};

const Tag: React.FC<TagProps & React.HTMLAttributes<HTMLDivElement>> = ({
    icon,
    onClick,
}) => {
    return (
        <div
            className="border-3 group h-8 w-8 bg-white rounded-r hover:bg-[#E1E1E1] duration-100 cursor-pointer relative"
            onClick={onClick}
        >
            {IconMap[icon]}
            <span className="absolute bg-white left-full top-1/2 -translate-y-1/2 text-nowrap px-1 ml-3 rounded-sm duration-150 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
                {TooltipMap[icon]}
            </span>
        </div>
    );
};

const MainMenu: React.FC = () => {
    const [isExpand, setIsExpand] = useState<boolean>(false);
    const { camera, viewer, entityCollection } = useCesium();
    const handleClickMap = () => {
        setIsExpand((pre) => !pre);
        window.gtag("event", "click", {
            category: "操作",
            label: "路線資訊",
        });
        track("操作_路線資訊");
    };
    const handleClickEarth = () => {
        if (camera == null) return;
        if (viewer == null) return;
        viewer.trackedEntity = undefined;
        camera.flyTo({
            duration: 0.7,
            easingFunction: cesium.EasingFunction.CUBIC_OUT,
            destination: VIEWCENTERPOSITION,
            orientation: {
                heading: cesium.Math.toRadians(0),
                pitch: cesium.Math.toRadians(-90),
                roll: 0,
            },
        });

        window.gtag("event", "click", {
            category: "操作",
            label: "全景視角",
        });
        track("操作_全景視角");
    };
    const handleZoomIn = () => {
        if (camera == null) return;
        camera.zoomIn(1000);
        window.gtag("event", "click", {
            category: "操作",
            label: "縮小",
        });
        track("操作_縮小");
    };
    const handleZoomOut = () => {
        if (camera == null) return;
        camera.zoomOut(1000);
        window.gtag("event", "click", {
            category: "操作",
            label: "放大",
        });
        track("操作_放大");
    };
    const handleBus = () => {
        if (viewer == null) return;
        if (entityCollection == null) return;
        const findBusModel = entityCollection.values.find(
            (item) => item.name == "觀光雙層巴士"
        );
        if (findBusModel == null) return;
        viewer.trackedEntity = findBusModel;

        window.gtag("event", "click", {
            category: "操作",
            label: "雙層巴士",
        });
        track("操作_雙層巴士");
    };

    return (
        <div
            className={`border absolute top-1/2 -translate-y-1/2 bg-white rounded-r p-3 w-64 duration-150 ${
                isExpand ? "translate-x-0" : "-translate-x-64"
            }`}
        >
            <div className="font-bold tracking-wide text-md mb-5">
                台北市觀光雙層巴士路線
                <div
                    className="float-right duration-150 hover:bg-[#E1E1E1] cursor-pointer rounded"
                    onClick={handleClickMap}
                >
                    <PlusIcon className="w-6 h-6 m-auto rotate-45" />
                </div>
            </div>
            <div className="flex flex-col gap-y-1 max-h-[80vh] overflow-auto">
                {busStationList.map((station) => (
                    <BusStationItem key={station.id} {...station} />
                ))}
            </div>
            <div className="absolute top-12 left-full flex flex-col gap-y-1">
                <Tag icon="Earth" onClick={handleClickEarth} />
                <Tag icon="Plus" onClick={handleZoomIn} />
                <Tag icon="Minus" onClick={handleZoomOut} />
                <Tag icon="Map" onClick={handleClickMap} />
                <Tag icon="Bus" onClick={handleBus} />
            </div>
        </div>
    );
};

export default MainMenu;
