const path = require('path');

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: {
        main: "./src/lavalamp.class.ts",
    },
    output: {
        path: path.resolve(__dirname, 'build/js'),
        filename: "lavalamp.js",
    },
    resolve: {
        // Add ".ts" and ".tsx" as resolvable extensions.
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {test: /\.tsx?$/, loader: "ts-loader"},
        ],
    },
};
