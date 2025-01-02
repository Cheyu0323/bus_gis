import CesiumView from "@/components/CesiumView";
import React, { Suspense } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const Home = () => {
    return (
        <>
            <style jsx global>{`
                .cesium-viewer-bottom {
                    display: none;
                }
            `}</style>
            <title>BUS GIS</title>
            <GoogleAnalytics gaId="G-F5R2FW96G7" />
            <section className="h-svh w-full relative">
                <Suspense>
                    <CesiumView />
                </Suspense>
            </section>
        </>
    );
};

export default Home;
