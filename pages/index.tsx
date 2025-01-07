import React, { Suspense } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import dynamic from "next/dynamic";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from "next/head";

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
            <Head>
                <title>台北雙層觀光巴士紅線路線圖 - Cesium 3D 互動展示</title>
                <meta
                    name="description"
                    content="探索台北市的美麗景點，搭乘台北雙層觀光巴士紅線，透過先進的 Cesium 3D 地圖技術，輕鬆了解完整的行駛路線。無論是經典的台北101、故宮博物院，還是熱鬧的士林夜市，這張互動式路線圖讓您直觀掌握每個景點的交通安排。隨時隨地查看巴士停靠站、行駛方向與精確位置，讓您的台北觀光旅程更加便捷、豐富。立即點擊，開啟您的台北雙層巴士之旅！"
                />
                <meta
                    property="og:title"
                    content="台北雙層觀光巴士紅線路線圖 - Cesium 3D 互動展示"
                />
                <meta
                    property="og:description"
                    content="探索台北市的美麗景點，搭乘台北雙層觀光巴士紅線，透過先進的 Cesium 3D 地圖技術，輕鬆了解完整的行駛路線。無論是經典的台北101、故宮博物院，還是熱鬧的士林夜市，這張互動式路線圖讓您直觀掌握每個景點的交通安排。隨時隨地查看巴士停靠站、行駛方向與精確位置，讓您的台北觀光旅程更加便捷、豐富。立即點擊，開啟您的台北雙層巴士之旅！"
                />
            </Head>
            <Analytics />
            <GoogleAnalytics gaId="G-F5R2FW96G7" />
            <SpeedInsights />
            <section className="h-svh w-full relative">
                <Suspense>
                    <CesiumView />
                </Suspense>
            </section>
        </>
    );
};

export default Home;
