var path = require('path');
var webpack = require('webpack');
const tsconfig = path.resolve('./tsconfig.json');

module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['jasmine', 'jasmine-matchers'],
        files: [
            './lib/tests.ts',
            './lib/**/*.spec.ts'
        ],
        preprocessors: {
            './lib/**/*.ts': ['webpack']
        },
        reporters: [
            'mocha'
        ],
        colors: true,
        autoWatch: false,
        browsers: ['PhantomJS'],
        captureTimeout: 60000,
        browserNoActivityTimeout: 30000,
        webpack: {
            devtool: 'source-map',
            resolve: {
                root: [
                    path.join(__dirname, './lib'),
                    path.join(__dirname, './node_modules')
                ],
                extensions: ['', '.ts', '.js', '.json']
            },
            module: {
                loaders: [
                    {
                        test: /\.(ts|js)$/,
                        exclude: [/node_modules/],
                        loader: 'awesome-typescript?tsconfig=' + tsconfig
                    }
                ]
            }
        },
        logLevel: config.LOG_INFO,
        client: {
            captureConsole: true
        },
        webpackMiddleware: {
            stats: 'errors-only',
            colors: true
        },
        singleRun: false,
        plugins: [
            'karma-jasmine',
            'karma-jasmine-matchers',
            'karma-webpack',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher',
            'karma-coverage'
        ]
    });
};
