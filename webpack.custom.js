module.exports = {
    entryPoints: {
        index: './src/index.js', // default
        home: './src/components/home.js', // change to your another-module.js here
        product: './src/components/product.js',
    },
    htmlTemplate: './src/index.html',
    distDir: './dist', // Distribution directory
}