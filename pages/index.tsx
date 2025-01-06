import React, { Suspense } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import dynamic from "next/dynamic";

const CesiumView = dynamic(() => import("@/components/CesiumView"), {
    ssr: false,
});

const Home = () => {
    return (
        <>
            <style jsx global>{`
                .cesium-viewer-bottom {
                    display: none !important;
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
