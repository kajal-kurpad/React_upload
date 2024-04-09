import React, { useEffect } from "react";
import './CartItems.css'
import remove_icon from '../Assets/cart_cross_icon.png';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeFromCart, fetchAllData } from '../../Redux/actions';

const CartItems = ({ cartItems, removeFromCart, fetchAllData, products }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    const handleRemoveFromCart = (itemId) => {
        console.log('Removing item with ID:', itemId);
        removeFromCart(itemId);
    };

    const calculateTotalAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0 && products) {
                const item = products.all.find(product => product.id === Number(itemId));
                if (item) {
                    totalAmount += item.new_price * cartItems[itemId];
                }
            }
        }
        return totalAmount;
    };
    const totalAmount = calculateTotalAmount();

    return (
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {products && products.all && products.all.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt="" className="carticom-product-icon" />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                                <p>{e.new_price * cartItems[e.id]}</p>
                                <img className="carticom-remove-icon" onClick={() => handleRemoveFromCart(e.id)} src={remove_icon} alt="" />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}

            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${totalAmount}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${totalAmount}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder="Promo code" />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.cart.items,
        products: state.products,
    };
};

const mapDispatchToProps = {
    fetchAllData,
    removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);












// import React, { useContext } from "react";
// import './CartItems.css'
// import { ShopContext } from "../../Context/ShopContext";
// import remove_icon from '../Assets/cart_cross_icon.png';
// import { connect } from 'react-redux';

// const CartItems = () => {
//     const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

//     return (
//         <div className="cartitems">
//             <div className="cartitems-format-main">
//                 <p>Products</p>
//                 <p>Title</p>
//                 <p>Price</p>
//                 <p>Quantity</p>
//                 <p>Total</p>
//                 <p>Remove</p>
//             </div>
//             <hr />
//             {all_product.map((e) => {
//                 if (cartItems[e.id] > 0) {
//                     return (
//                         <div key={e.id}>
//                             <div className="cartitems-format cartitems-format-main">
//                                 <img src={e.image} alt="" className="carticom-product-icon" />
//                                 <p>{e.name}</p>
//                                 <p>${e.new_price}</p>
//                                 <button className="cartitems-quantity">{cartItems[e.id]}</button>
//                                 <p>{e.new_price * cartItems[e.id]}</p>
//                                 <img className="carticom-remove-icon" src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
//                             </div>
//                             <hr />
//                         </div>
//                     );
//                 }
//                 return null;
//             })}
//             <div className="cartitems-down">
//                 <div className="cartitems-total">
//                     <h1>Cart Totals</h1>
//                     <div>
//                         <div className="cartitems-total-item">
//                             <p>Subtotal</p>
//                             <p>${getTotalCartAmount()}</p>
//                         </div>
//                         <hr />
//                         <div className="cartitems-total-item">
//                             <p>Shipping Fee</p>
//                             <p>Free</p>
//                         </div>
//                         <hr />
//                         <div className="cartitems-total-item">
//                             <h3>Total</h3>
//                             <h3>${getTotalCartAmount()}</h3>
//                         </div>
//                     </div>
//                     <button>PROCEED TO CHECKOUT</button>
//                 </div>
//                 <div className="cartitems-promocode">
//                     <p>If you have promo code, Enter it here</p>
//                     <div className="cartitems-promobox">
//                         <input type="text" placeholder="promo code" />
//                         <button>Submit</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default CartItems;

// import React, { useEffect } from "react";
// import './CartItems.css'
// import remove_icon from '../Assets/cart_cross_icon.png';
// import { connect } from 'react-redux';
// import { removeFromCartSuccess, removeFromCart, fetchAllData, } from '../../Redux/actions';

// const CartItems = ({ cartItems, removeFromCart, fetchAllData, products, totalCartAmount}) => {
//     useEffect(() => {
//         fetchAllData();
//     }, [fetchAllData]);

// const handleRemoveFromCart = (itemId) => {
//         removeFromCart(itemId); // Dispatch action to remove item from cart
//     };

//     return (
//         <div className="cartitems">
//             <div className="cartitems-format-main">
//                 <p>Products</p>
//                 <p>Title</p>
//                 <p>Price</p>
//                 <p>Quantity</p>
//                 <p>Total</p>
//                 <p>Remove</p>
//             </div>
//             <hr />
//             {products && products.all && products.all.map((e) => { // Access products.all
//                 if (cartItems[e.id] > 0) {
//                     return (
//                         <div key={e.id}>
//                             <div className="cartitems-format cartitems-format-main">
//                                 <img src={e.image} alt="" className="carticom-product-icon" />
//                                 <p>{e.name}</p>
//                                 <p>${e.new_price}</p>
//                                 <button className="cartitems-quantity">{cartItems[e.id]}</button>
//                                 <p>{e.new_price * cartItems[e.id]}</p>
//                                 <img className="carticom-remove-icon" onClick={() => removeFromCart(e.id)} src={remove_icon} alt="" />
//                             </div>
//                             <hr />
//                         </div>
//                     );
//                 }
//                 return null;
//             })}

//             <div className="cartitems-down">
//                 <div className="cartitems-total">
//                     <h1>Cart Totals</h1>
//                     <div>
//                         <div className="cartitems-total-item">
//                             <p>Subtotal</p>
//                             <p>${totalCartAmount}</p>
//                         </div>
//                         <hr />
//                         <div className="cartitems-total-item">
//                             <p>Shipping Fee</p>
//                             <p>Free</p>
//                         </div>
//                         <hr />
//                         <div className="cartitems-total-item">
//                             <h3>Total</h3>
//                             <h3>${totalCartAmount}</h3>
//                         </div>
//                     </div>
//                     <button>PROCEED TO CHECKOUT</button>
//                 </div>


//                 <div className="cartitems-promocode">
//                     <p>If you have a promo code, enter it here</p>
//                     <div className="cartitems-promobox">
//                         <input type="text" placeholder="Promo code" />
//                         <button>Submit</button>
//                     </div>
//                 </div>
//                 </div>
//             </div>
//     );
// }

// const mapStateToProps = (state) => {
//     return {
//         cartItems: state.cart.items,
//         products: state.products, // Access products directly
//       totalCartAmount: state.cart.totalCartAmount, // Access total cart amount from Redux state

//     };
// };

// const mapDispatchToProps = {
//     // removeFromCart: removeFromCartSuccess,
//     fetchAllData,
//      removeFromCart,

// };
// export default connect(mapStateToProps, mapDispatchToProps)(CartItems);

