import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from './Constants'

// ItemCarrinho com estado inicial nulo
const cartItems = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            // Adds a new item to the cart
            return [...state, action.payload]
        case REMOVE_FROM_CART:
            // Removes only one item from the cart, which matches the payload
            return state.filter(cartItem => cartItem.id !== action.payload.id)
        case CLEAR_CART:
            // Clears all items from the cart
            return state = []
    }
    return state;
}


export default cartItems;
