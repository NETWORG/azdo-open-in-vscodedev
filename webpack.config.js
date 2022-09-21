const path = require("path");

module.exports = {
    entry: [
        "./src/open-in-vscodedev.ts"
    ],
    output: {
        filename: "open-in-vscodedev.js"
    },
    resolve: {
        extensions: [".ts"],
        alias: {
            "azure-devops-extension-sdk": path.resolve("node_modules/azure-devops-extension-sdk")
        },
    },
    stats: {
        warnings: false
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: "ts-loader"
            },
        ]
    },
    plugins: [
    ]
};