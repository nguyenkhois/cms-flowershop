module.exports = function (api) {
    api.cache.never();

    const presets = [
        ["@babel/preset-env", {
            "useBuiltIns": "entry",
            "targets": {
                "node": "10"
            },
        }],
        "@babel/preset-react"
    ];
    const plugins = [
        "@babel/plugin-proposal-class-properties",
    ];

    return {
        presets,
        plugins
    };
}
