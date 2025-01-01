import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const CesiumView = dynamic(() => import("@/components/CesiumView"), {
    ssr: false,
});

const Home = () => {
    return (
        <>
            <style jsx global>{`
                .cesium-viewer-bottom {
                    display: none;
                }
            `}</style>
            <title>BUS GIS</title>
            <section className="h-svh w-full relative">
                <Suspense>
                    <CesiumView />
                </Suspense>
            </section>
        </>
    );
};

export default Home;
