export const cartActions = {
    addToCart: (item) => ({ type: 'ADD_TO_CART', payload: item }),
    updateQuantity: (item) => ({type: 'UPDATE_QUANTITY', payload: item})
};