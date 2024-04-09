// reducers.jsx
import { combineReducers } from 'redux';
import { ADD_TO_CART_SUCCESS, UPDATE_CART_COUNT } from './actions';
import { CALCULATE_TOTAL_CART_ITEMS } from './actions';
import { FETCH_PRODUCTS_SUCCESS, FETCH_ALL_PRODUCTS, FETCH_CART_ITEMS_SUCCESS, REMOVE_FROM_CART_SUCCESS } from './actions';

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const initialState = {
    items: [],
    totalCartItems: 0,
    cartItems: getDefaultCart(),
    cartCount: 0,
};

const productsReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_SUCCESS:
            const { category, products } = action.payload;
            return {
                ...state,
                [category]: products,
            };

        case FETCH_ALL_PRODUCTS:
            return {
                ...state,
                all: action.payload,

            };
        default:
            return state;
    }
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CART_ITEMS_SUCCESS:
            return {
                ...state, items: action.payload || []
            };
        case REMOVE_FROM_CART_SUCCESS:
            const itemId = action.payload;
            const updatedItems = { ...state.items };
            if (updatedItems[itemId] > 0) {
                updatedItems[itemId] -= 1;
            }
            return {
                ...state,
                items: updatedItems,

                cartItems: {
                    ...state.cartItems,
                    [updatedItems]: (state.cartItems[updatedItems] || 0) - 1,
                },
                cartCount: state.cartCount - 1,
            };

        case ADD_TO_CART_SUCCESS:
            const itemIdToAdd = action.payload;
            return {
                ...state,
                cartItems: {
                    ...state.cartItems,
                    [itemIdToAdd]: (state.cartItems[itemIdToAdd] || 0) + 1,
                },
                cartCount: state.cartCount + 1,
            };

        case CALCULATE_TOTAL_CART_ITEMS:
            let totalItems = 0;
            for (const item in state.cartItems) {
                totalItems += state.cartItems[item];
            }
            return {
                ...state,
                totalCartItems: totalItems,
            };

        case UPDATE_CART_COUNT:
            return {
                ...state,
                cartCount: action.payload,
            };

        default:
            return state;
    }
};

export default combineReducers({
    products: productsReducer,
    cart: cartReducer,
});








// case CALCULATE_TOTAL_AMOUNT:
// return {
//     ...state,
//     totalCartAmount: action.payload,
// };

// case CALCULATE_TOTAL_AMOUNT:
//     return {
//         ...state,
//         totalCartAmount: calculateTotalAmount(state.all, state.items)
//     };

//     case CALCULATE_TOTAL_AMOUNT:
//     let subtotal = 0;
//     for (const item in state.items) {
//         if (state.items[item] > 0 && state.all) {
//             let itemInfo = state.all.find(product => product.id === Number(item));
//             if (itemInfo) {
//                 subtotal += itemInfo.new_price * state.items[item];
//             }
//         }
//     }
//     return {
//         ...state,
//         subtotal: subtotal,
//     };

// const calculateTotalAmount = (products, cartItems) => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//         if (cartItems[item] > 0 && products) {
//             let itemInfo = products.find(product => product.id === Number(item));
//             if (itemInfo) {
//                 totalAmount += itemInfo.new_price * cartItems[item];
//             }
//         }
//     }
//     return totalAmount;
// };

//         case CALCULATE_TOTAL_AMOUNT:
//             let totalAmount = 0;
//             for (const item in state.items) {
//                 if (state.items[item] > 0 && state.all) {
//                     let itemInfo = state.all.find(product => product.id === Number(item));
//                     if (itemInfo) {
//                         totalAmount += itemInfo.new_price * state.items[item];
//                     }
//                 }
//             }
//             return { ...state, totalCartAmount: totalAmount };
//         default:
//             return state;
//     }
// };