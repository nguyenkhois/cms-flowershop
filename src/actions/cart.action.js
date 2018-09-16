export const cartActions = {
    addToCart: (item) => ({ type: 'ADD_TO_CART', payload: item }),
    updateQuantity: (item) => ({type: 'UPDATE_QUANTITY', payload: item}),
    removeFromCart: (productId) => ({type:'REMOVE_FROM_CART', payload: productId}),
    clearCart: () => ({type: 'CLEAR_CART'})
};