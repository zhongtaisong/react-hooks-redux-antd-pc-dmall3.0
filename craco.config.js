const CracoLessPlugin = require('craco-less');
const path = require('path');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#1890ff' },
                        javascriptEnabled: true
                    }
                }
            }
        }
    ],
    webpack: {
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@config': path.resolve(__dirname, 'src/config'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@router': path.resolve(__dirname, 'src/router'),
            '@com': path.resolve(__dirname, 'src/components'),
            '@img': path.resolve(__dirname, 'src/img'),
            '@axios': path.resolve(__dirname, 'src/axios'),
            '@store': path.resolve(__dirname, 'src/store'),
            '@service': path.resolve(__dirname, 'src/service')
        }
    }
};