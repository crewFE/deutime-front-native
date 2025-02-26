module.exports = function(api) {
    api.cache(true);

    return {
        presets: [
            ['@babel/preset-react', {
                runtime: 'automatic' 
            }],
            "nativewind/babel",
            ["module:metro-react-native-babel-preset"]
        ],
        plugins: [
            ["module-resolver", {
                root: ["./"],
                alias: {
                    "@": "./",
                    "tailwind.config": "./tailwind.config.js"
                }
            }],
            ["module:react-native-dotenv", {
                moduleName: "@env",
                path: ".env",
                safe: false,
                allowUndefined: true
            }],
            ['@babel/plugin-transform-private-methods', { loose: true }],
            ['@babel/plugin-transform-class-properties', { loose: true }],
            ['@babel/plugin-transform-private-property-in-object', { loose: true }]
        ]
    };
};
