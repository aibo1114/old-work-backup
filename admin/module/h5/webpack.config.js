const path= require('path');

const appName='h5';
const common= require('../../webpack.config');

const config= Object.assign(common, {
    entry : {
        // lib: ['jquery', 'bootstrap', 'angular', 'angular-route'],
        lib: ['jquery', 'bootstrap', 'angular', 'angular-route', 'bootstrap-datetimepicker'],
        main: [
            // 'es5-shim/es5-shim.js',
            // 'es5-shim/es5-sham.js',
            path.resolve(__dirname, './app/main.js')
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../../dist/'+appName)
    },

    devServer: {
        contentBase: path.resolve(__dirname, ''),
        host: '0.0.0.0',
        hot: false,
        lazy: false,
        port: 8088,
        stats: {
            colors: true
        },
        disableHostCheck: true
        // headers: {
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        // }

        // historyApiFallback: true
        // historyApiFallback: { rewrites: [{from: /\info&/, to: 'views/404.html' }, {...}] }
        // publicPath: '/',
    }
});


module.exports=config;