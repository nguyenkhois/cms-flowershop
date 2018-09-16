/**
 * 
 * state 
 * action = {
 *      type: 'STRING',
 *      payload: []
 * }
 * 
 */
export const cartReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const cartItem = [];
            cartItem.push(action.payload)
            const cartAfterAdded = state.concat(cartItem); // Using none mutating method
            return cartAfterAdded
        case 'UPDATE_QUANTITY':
            const cartAfterEditQuantity = state.map((item) => 
                    item.productId === action.payload.productId ?
                    {...item, quantity: item.quantity + action.payload.quantity } :
                    item)
            return cartAfterEditQuantity
        default:
            return state
    }
}