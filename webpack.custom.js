module.exports = {
    entryPoints: {
        index: './src/index.js', // default
        home: './src/components/home.js',
        productlist: './src/components/product-list.js', // change to your another-module.js here
        cart: './src/components/cart.js'
    },
    htmlTemplate: './src/index.html',
    distDir: './dist', // Distribution directory
}