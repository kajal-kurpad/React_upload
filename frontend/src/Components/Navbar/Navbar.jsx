import React, { useRef, useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import nav_arrow from '../Assets/nav_arrow.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotalCartItems } from '../../Redux/actions';

const Navbar = () => {
    const dispatch = useDispatch();
    const [menu, setMenu] = useState(" ");

    const totalCartItems = useSelector(state => state.cart.totalCartItems);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    useEffect(() => {
        dispatch(calculateTotalCartItems());
    }, [dispatch]);

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>TRENDS</p>
            </div>
            <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_arrow} alt="" />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("mens") }}><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>{menu === "mens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("womens") }}><Link style={{ textDecoration: 'none' }} to='/womens'>Women</Link>{menu === "womens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>{menu === "kids" ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token') ?
                    <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>
                        Logout</button> : <Link to='/login'><button>Login</button></Link>}
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{totalCartItems}</div>
            </div>
        </div>
    );
}

export default Navbar;


// import React, { useContext, useRef } from 'react'
// import './Navbar.css'
// import logo from '../Assets/logo.png'
// import cart_icon from '../Assets/cart_icon.png'
// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { ShopContext } from '../../Context/ShopContext'
// import nav_arrow from '../Assets/nav_arrow.png'
// import { connect } from 'react-redux';
// import { addToCart, removeFromCart } from '../../Redux/actions';
// import { useSelector, useDispatch } from 'react-redux';
// import { calculateTotalCartItems } from '../../Redux/actions';

// const Navbar = () => {
//     const [menu, setMenu] = useState(" ");
//     const { getTotalCartItems } = useContext(ShopContext);
//     const dropdown_toggle = (e) => {
//         menuRef.current.classList.toggle('nav-menu-visible');
//         e.target.classList.toggle('open');
//     }

//     return (
//         <div className='navbar'>
//             <div className="nav-logo">
//                 <img src={logo} alt="" />
//                 <p>TRENDS</p>
//             </div>
//             <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_arrow} alt="" />
//             <ul ref={menuRef} className="nav-menu">
//                 <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
//                 <li onClick={() => { setMenu("mens") }}><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>{menu === "mens" ? <hr /> : <></>}</li>
//                 <li onClick={() => { setMenu("womens") }}><Link style={{ textDecoration: 'none' }} to='/womens'>Women</Link>{menu === "womens" ? <hr /> : <></>}</li>
//                 <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>{menu === "kids" ? <hr /> : <></>}</li>

//             </ul>
//             <div className="nav-login-cart">
//                 {localStorage.getItem('auth-token') ?
//                     <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>
//                         Logout</button> : <Link to='/login'><button>Login</button></Link>}

//                 <Link to='/cart'><img src={cart_icon} alt="" /></Link>
//                 <div className="nav-cart-count">{getTotalCartItems()}</div>
//             </div>
//         </div>
//     )
// }

// export default Navbar;









//  import React, { useRef,useState } from 'react';
//  import nav_arrow from '../Assets/nav_arrow.png'

// import './Navbar.css';
// import logo from '../Assets/logo.png';
// import cart_icon from '../Assets/cart_icon.png';
// import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { addToCart, removeFromCart } from '../../Redux/actions';

// const Navbar = () => {
//   const totalCartItems = useSelector(state => state.cart.totalCartItems);
//   const dispatch = useDispatch();
//   const menuRef = useRef();
//   const [menu, setMenu] = useState("");

//   // Function to toggle dropdown menu visibility
//   const dropdown_toggle = (e) => {
//     menuRef.current.classList.toggle('nav-menu-visible');
//     e.target.classList.toggle('open');
//   }

//   // Function to handle adding item to cart
//   const handleAddToCart = (itemId) => {
//     dispatch(addToCart(itemId));
//   }

//   // Function to handle removing item from cart
//   const handleRemoveFromCart = (itemId) => {
//     dispatch(removeFromCart(itemId));
//   }

//   return (
//     <div className='navbar'>
//       <div className="nav-logo">
//         <img src={logo} alt="" />
//         <p>TRENDS</p>
//       </div>
//       <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_arrow} alt="" />
//       <ul ref={menuRef} className="nav-menu">
//         <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
//         <li onClick={() => { setMenu("mens") }}><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>{menu === "mens" ? <hr /> : <></>}</li>
//         <li onClick={() => { setMenu("womens") }}><Link style={{ textDecoration: 'none' }} to='/womens'>Women</Link>{menu === "womens" ? <hr /> : <></>}</li>
//         <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>{menu === "kids" ? <hr /> : <></>}</li>
//       </ul>
//       <div className="nav-login-cart">
//         {localStorage.getItem('auth-token') ?
//           <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>
//             Logout</button> : <Link to='/login'><button>Login</button></Link>}
//         <Link to='/cart'><img src={cart_icon} alt="" /></Link>
//         <div className="nav-cart-count">{totalCartItems}</div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;


//  const mapStateToProps = (state) => {
//     return {
//         cartCount: getTotalCartItems(state), // Map cartCount from Redux store state
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addToCart: (itemId) => dispatch(addToCart(itemId)), // Map addToCart action creator
//         removeFromCart: (itemId) => dispatch(removeFromCart(itemId)), // Map removeFromCart action creator
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Navbar); // Connect component to Redux store


// const mapStateToProps = (state) => {
//   return {
//     cartCount: state.cart.cartCount,
//   };
// };

// export default connect(mapStateToProps)(Navbar);


// Navbar.js
// Navbar.js

// import React from 'react';
// import './Navbar.css';
// import logo from '../Assets/logo.png';
// import cart_icon from '../Assets/cart_icon.png';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux'; // Import connect from 'react-redux'
// import { getTotalCartItems } from '../../Redux/selectors';

// const Navbar = ({ totalCartItems }) => { // Destructure totalCartItems from props
//     return (
//         <div className='navbar'>
//             <div className="nav-logo">
//                 <img src={logo} alt="" />
//                 <p>TRENDS</p>
//             </div>
//             <ul className="nav-menu">
//                 <li><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link></li>
//                 <li><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link></li>
//                 <li><Link style={{ textDecoration: 'none' }} to='/womens'>Women</Link></li>
//                 <li><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link></li>
//             </ul>

//             <div className="nav-login-cart">
//                 {localStorage.getItem('auth-token') ?
//                     <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>
//                         Logout</button> : <Link to='/login'><button>Login</button></Link>}

//                 <Link to='/cart'><img src={cart_icon} alt="" /></Link>
//                 <div className="nav-cart-count">{totalCartItems}</div> {/* Use totalCartItems from props */}
//             </div>
//         </div>
//     );
// }

// const mapStateToProps = (state) => {
//     return {
//         totalCartItems: getTotalCartItems(state),
//     };
// };

// export default connect(mapStateToProps)(Navbar);
