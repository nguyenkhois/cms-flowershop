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
            const productList = {
                ...state,
                productList: action.payload
            };
            return productList
        case 'STORE_ALL_PRODUCTS':
            const productFullList = {
                ...state,
                productFullList: action.payload
            }
            return productFullList
        default:
            return state
    }
}