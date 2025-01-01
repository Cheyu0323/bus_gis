const path = require('path');
const process = require('process');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const pathBuilder = (subpath) => path.join(process.cwd(), subpath);

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { webpack, isProduction }) => {
        if (isProduction) {
            config.optimization.minimizer = [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            toplevel: false,
                            keep_fnames: true,
                        }
                    }, output: {
                        beautify: false,
                    },
                }),
            ];
        }
        config.plugins.push(
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: pathBuilder('node_modules/cesium/Build/Cesium/Workers'),
                        to: '../public/cesium/Workers',
                        info: { minimized: true }
                    }
                ]
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: pathBuilder('node_modules/cesium/Build/Cesium/ThirdParty'),
                        to: '../public/cesium/ThirdParty',
                        info: { minimized: true }
                    }
                ]
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: pathBuilder('node_modules/cesium/Build/Cesium/Assets'),
                        to: '../public/cesium/Assets',
                        info: { minimized: true }
                    }
                ]
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: pathBuilder('node_modules/cesium/Build/Cesium/Widgets'),
                        to: '../public/cesium/Widgets',
                        info: { minimized: true }
                    }
                ]
            }),
            new webpack.DefinePlugin({ CESIUM_BASE_URL: JSON.stringify('/cesium') })
        );

        return config
    },
    output: 'standalone'
};

module.exports = nextConfig;
