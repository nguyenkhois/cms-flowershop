/**
 * 
 * state 
 * action = {
 *      type: 'STRING',
 *      payload: [{}, {}]
 * }
 * 
 */

export const productReducer = (state = {}, action) => {
    switch (action.type) {
        case 'STORE_PRODUCTS':
            return {
                ...state,
                productList: action.payload
            }
            
        default:
            return state
    }
}