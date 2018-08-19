var path = require('path');

module.exports = {
    AppConfig: path.resolve(__dirname + '/src/appConfig/configuration.json'),
    ColorVariables: path.resolve(__dirname + './src/appConfig/ColorVariables.scss'),
    Components: path.resolve(__dirname + '/src/app/React/components/'),
    Containers: path.resolve(__dirname + '/src/app/Redux/containers/'),
    Modules: path.resolve(__dirname + '/src/app/Redux/modules/index.js'),
    Utility: path.resolve(__dirname + '/src/app/utility/index.js'),
    Variables: path.resolve(__dirname + './src/scss/Variables.scss'),
};