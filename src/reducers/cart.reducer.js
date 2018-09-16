/**
 * 
 * state 
 * action = {
 *      type: 'STRING',
 *      payload: {}
 * }
 * 
 */
export const cartReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const cartItem = [];
            cartItem.push(action.payload)
            return state.concat(cartItem); // Using none mutating method

        case 'UPDATE_QUANTITY':
            return state.map((item) => item.productId === action.payload.productId ?
                                        {...item, quantity: item.quantity + action.payload.quantity } :
                                        item)

        case 'REMOVE_FROM_CART':
            return state.filter(item => item.productId !== action.payload)

        case 'CLEAR_CART':
            return []

        default:
            return state
    }
}