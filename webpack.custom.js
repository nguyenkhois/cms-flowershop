module.exports = {
    entryPoints: {
        index: './src/index.js', // default
        home: './src/components/home.js', // change to your another-module.js here
        product: './src/components/product.js',
        productlist: './src/components/product-list.js',
        cart: './src/components/cart.js',
        order: './src/components/order.js',
        review: './src/components/review.js'
    },
    htmlTemplate: './src/index.html',
    distDir: './dist', // Distribution directory
}