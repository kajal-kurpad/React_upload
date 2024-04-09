import React, { useContext, useState } from "react";
import './ProductDisplay.css'
import star_dull_icon from '../Assets/star_dull_icon.png'
import star_icon from '../Assets/star_icon.png'
import { ShopContext } from "../../Context/ShopContext";
import Cart from "../../Pages/Cart";
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProductsSuccess } from "../../Redux/actions";
import { addToCart } from "../../Redux/actions";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDisplay = ({ product, addToCart }) => {
    const [selectedSize, setSelectedSize] = useState('');

    const handleAddToCart = () => {
        if (selectedSize !== '') {
            addToCart(product.id);
            toast.success("Product is Added in Cart.")

            console.log(selectedSize);
        } else {
            toast.error("Please select a size before adding to cart")
        }
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    A lightweight, usually kintted, pullover shirt, close-fitting,
                    a round neckline and short sleeves, worn as an undershirt.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div className={`size-button ${selectedSize === "S" ? "selected" : ""}`} onClick={() => handleSizeSelect("S")}>S</div>
                        <div className={`size-button ${selectedSize === "M" ? "selected" : ""}`} onClick={() => handleSizeSelect("M")}>M</div>
                        <div className={`size-button ${selectedSize === "L" ? "selected" : ""}`} onClick={() => handleSizeSelect("L")}>L</div>
                        <div className={`size-button ${selectedSize === "XL" ? "selected" : ""}`} onClick={() => handleSizeSelect("XL")}>XL</div>
                        <div className={`size-button ${selectedSize === "XXL" ? "selected" : ""}`} onClick={() => handleSizeSelect("XXL")}>XXL</div>
                    </div>
                </div>
                <button onClick={() => handleAddToCart(product.id)}>ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category :</span>Women, T-shirt, Crop Top </p>
                <p className='productdisplay-right-category'><span>Tags :</span>Modern, Latest </p>
            </div>
            <ToastContainer autoClose={2000} />
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (productId) => dispatch(addToCart(productId)),
    };
};

export default connect(null, mapDispatchToProps)(ProductDisplay);








//export default ProductDisplay;


// const ProductDisplay = (props) => {
//     const { product } = props;
//     const { addToCart } = useContext(ShopContext);
//     const [selectedSize, setSelectedSize] = useState("");
//     const navigate = useNavigate();

//     const handleAddToCart = (productId) => {
//         if (selectedSize !== "") {
//             console.log(selectedSize);
//             addToCart(productId, selectedSize);
//         } else {
//             console.log("Please select a size before adding to cart.");
//         }
//     };




// import React from "react";
// import './ProductDisplay.css';
// import star_dull_icon from '../Assets/star_dull_icon.png';
// import star_icon from '../Assets/star_icon.png';
// import { connect } from 'react-redux';
// import { addToCart } from "../../Redux/actions";

// const ProductDisplay = ({ product, addToCart, cartItems }) => {
//     const handleAddToCart = () => {
//         addToCart(product.id);
//         if (localStorage.getItem('auth-token')) {
//             fetch('http://localhost:4000/addtocart', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'auth-token': localStorage.getItem('auth-token')
//                 },
//                 body: JSON.stringify({ itemId: product.id })
//             })
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data);
//             })
//             .catch(error => {
//                 console.error('Error adding to cart:', error);
//             });
//         } else {
//             console.error('User not authenticated.');
//         }
//     };

//     const getTotalCartItems = () => {
//         let totalItem = 0;
//         for (const item in cartItems) {
//             if (cartItems[item] > 0) {
//                 totalItem += cartItems[item];
//             }
//         }
//         return totalItem;
//     }

//     return (
//         <div className="productdisplay">
//             <div className="productdisplay-left">
//                 <div className="productdisplay-img-list">
//                     <img src={product.image} alt="" />
//                     <img src={product.image} alt="" />
//                     <img src={product.image} alt="" />
//                     <img src={product.image} alt="" />
//                 </div>
//                 <div className="productdisplay-img">
//                     <img className='productdisplay-main-img' src={product.image} alt="" />
//                 </div>
//             </div>
//             <div className="productdisplay-right">
//                 <h1>{product.name}</h1>
//                 <div className="productdisplay-right-star">
//                     <img src={star_icon} alt="" />
//                     <img src={star_icon} alt="" />
//                     <img src={star_icon} alt="" />
//                     <img src={star_icon} alt="" />
//                     <img src={star_dull_icon} alt="" />
//                     <p>(122)</p>
//                 </div>
//                 <div className="productdisplay-right-prices">
//                     <div className="productdisplay-right-price-old">${product.old_price}</div>
//                     <div className="productdisplay-right-price-new">${product.new_price}</div>
//                 </div>
//                 <div className="productdisplay-right-description">
//                     A lightweight, usually kintted, pullover shirt, close-fitting,
//                     a round neckline and short sleeves, worn as an undershirt.
//                 </div>
//                 <div className="productdisplay-right-size">
//                     <h1>Select Size</h1>
//                     <div className="productdisplay-right-sizes">
//                         <div>S</div>
//                         <div>M</div>
//                         <div>L</div>
//                         <div>XL</div>
//                         <div>XXl</div>
//                     </div>
//                 </div>
//                 <button onClick={handleAddToCart}>ADD TO CART</button>

//                 <p className='productdisplay-right-category'><span>Category :</span>Women, T-shirt, Crop Top </p>
//                 <p className='productdisplay-right-category'><span>Tags :</span>Modern, Latest </p>

//                 <p>Total Cart Items: {getTotalCartItems()}</p>
//             </div>
//         </div>
//     );
// }

// const mapStateToProps = (state) => {
//     return {
//         cartItems: state.cart,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addToCart: (productId) => dispatch(addToCart(productId)),
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ProductDisplay);












// import React from "react";
// import './ProductDisplay.css';
// import star_dull_icon from '../Assets/star_dull_icon.png';
// import star_icon from '../Assets/star_icon.png';
// import { connect } from 'react-redux';
// import { addToCart } from "../../Redux/actions";

// const ProductDisplay = ({ product, addToCart, cartItems }) => {
//     const handleAddToCart = () => {
//         addToCart(product.id); // Dispatch the action to add the product to the cart
//     };

//     // Calculate total cart items
//     const getTotalCartItems = () => {
//         let totalItem = 0;
//         for (const item in cartItems) {
//             if (cartItems[item] > 0) {
//                 totalItem += cartItems[item];
//             }
//         }
//         return totalItem;
//     }

//     return (
//         <div className="productdisplay">
//             <div className="productdisplay-left">
//                 <div className="productdisplay-img-list">
//                     <img src={product.image} alt="" />
//                     <img src={product.image} alt="" />
//                     <img src={product.image} alt="" />
//                     <img src={product.image} alt="" />
//                 </div>
//                 <div className="productdisplay-img">
//                     <img className='productdisplay-main-img' src={product.image} alt="" />
//                 </div>
//             </div>
//             <div className="productdisplay-right">
//                 <h1>{product.name}</h1>
//                 <div className="productdisplay-right-star">
//                     <img src={star_icon} alt="" />
//                     <img src={star_icon} alt="" />
//                     <img src={star_icon} alt="" />
//                     <img src={star_icon} alt="" />
//                     <img src={star_dull_icon} alt="" />
//                     <p>(122)</p>
//                 </div>
//                 <div className="productdisplay-right-prices">
//                     <div className="productdisplay-right-price-old">${product.old_price}</div>
//                     <div className="productdisplay-right-price-new">${product.new_price}</div>
//                 </div>
//                 <div className="productdisplay-right-description">
//                     A lightweight, usually kintted, pullover shirt, close-fitting,
//                     a round neckline and short sleeves, worn as an undershirt.
//                 </div>
//                 <div className="productdisplay-right-size">
//                     <h1>Select Size</h1>
//                     <div className="productdisplay-right-sizes">
//                         <div>S</div>
//                         <div>M</div>
//                         <div>L</div>
//                         <div>XL</div>
//                         <div>XXl</div>
//                     </div>
//                 </div>
//                 <button onClick={handleAddToCart}>ADD TO CART</button>

//                 <p className='productdisplay-right-category'><span>Category :</span>Women, T-shirt, Crop Top </p>
//                 <p className='productdisplay-right-category'><span>Tags :</span>Modern, Latest </p>

//                 {/* Display total cart items */}
//                 <p>Total Cart Items: {getTotalCartItems()}</p>
//             </div>
//         </div>
//     );
// }

// const mapStateToProps = (state) => {
//     return {
//         cartItems: state.cart, // Assuming you have cart state in your Redux store
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addToCart: (productId) => dispatch(addToCart(productId)),
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ProductDisplay);

