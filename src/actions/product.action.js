export const productActions = {
    storeProducts: (productList) => ({ type: 'STORE_PRODUCTS', payload: productList }),
    storeAllProducts: (productList) => ({type: 'STORE_ALL_PRODUCTS', payload: productList})
};
