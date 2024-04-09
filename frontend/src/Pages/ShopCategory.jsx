import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../Redux/actions";
import './CSS/ShopCategory.css';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import bannerImageMen from '../Components/Assets/banner_mens.png'
import bannerImageWomen from '../Components/Assets/banner_women.png'
import bannerImageKids from '../Components/Assets/banner_kids.png'

import Item from "../Components/Item/Item";

const ShopCategory = ({ category, products, fetchProducts }) => {
    useEffect(() => {
        fetchProducts(category);
    }, [category, fetchProducts]);

    const getBannerImage = () => {
        switch (category) {
            case "men":
                return bannerImageMen;
            case "women":
                return bannerImageWomen;
            case "kid":
                return bannerImageKids;
            default:
                return bannerImageMen;
        }
    };

    return (
        <div className="shop-category">
            <img src={getBannerImage()} className="shopcategory-banner" alt="Banner" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1-12</span> out of 36 products
                </p>
                <div className="shopcategory-sort">
                    Sort by <img src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className="shopcategory-products">
                {products.map((item, i) => (
                    <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                ))}
            </div>
            <div className="shopcategory-loadmore">
                Explore More
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    const { category } = ownProps;
    const products = state.products[category] || [];
    return {
        products,
    };
};

const mapDispatchToProps = {
    fetchProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopCategory);






// import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import { fetchProducts } from "../Redux/actions";
// import './CSS/ShopCategory.css';
// import dropdown_icon from '../Components/Assets/dropdown_icon.png';
// import bannerImage from '../Components/Assets/banner_mens.png'
// import bannerImages from '../Components/Assets/banner_women.png'
// import bannerImagess from '../Components/Assets/banner_kids.png'

// import Item from "../Components/Item/Item";

// const ShopCategory = ({ category, products, fetchProducts }) => {
//     useEffect(() => {
//         fetchProducts(category);
//     }, [category, fetchProducts]);

//     return (
//         <div className="shop-category">
//             <img src={bannerImage} className="shopcategory-banner" alt="Banner" />
//             <div className="shopcategory-indexSort">
//                 <p>
//                     <span>Showing 1-12</span> out of 36 products
//                 </p>
//                 <div className="shopcategory-sort">
//                     Sort by <img src={dropdown_icon} alt="" />
//                 </div>
//             </div>
//             <div className="shopcategory-products">
//                 {products.map((item, i) => (
//                     <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
//                 ))}
//             </div>
//             <div className="shopcategory-loadmore">
//                 Explore More
//             </div>
//         </div>
//     );
// }

// const mapStateToProps = (state, ownProps) => {
//     const { category } = ownProps;
//     const products = state.products[category] || [];

//     return {
//         products,
//     };
// };

// const mapDispatchToProps = {
//     fetchProducts,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ShopCategory);





// import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import { fetchProductsSuccess } from "../Redux/actions";
// import './CSS/ShopCategory.css';
// import dropdown_icon from '../Components/Assets/dropdown_icon.png';
// import bannerImage from '../Components/Assets/banner_mens.png'
// import Item from "../Components/Item/Item";

// const ShopCategory = ({ category, products, fetchProductsSuccess }) => {
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const authToken = localStorage.getItem('auth-token');
//                 if (!authToken) {
//                     throw new Error('Authentication token not found');
//                 }
//                 const response = await fetch(`http://localhost:4000/products/${category}`, {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'auth-token': authToken
//                     }
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch data');
//                 }

//                 const data = await response.json();
//                 console.log(`Data for category '${category}':`, data);
//                 fetchProductsSuccess(category, data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, [category, fetchProductsSuccess]);


//     console.log(`Products for category '${category}':`, products);
//     return (
//         <div className="shop-category">
//             <img src={bannerImage} className="shopcategory-banner" alt="Banner" />

//             <div className="shopcategory-indexSort">
//                 <p>
//                     <span>Showing 1-12</span> out of 36 products
//                 </p>
//                 <div className="shopcategory-sort">
//                     Sort by <img src={dropdown_icon} alt="" />
//                 </div>
//             </div>

//             <div className="shopcategory-products">
//                 {products.map((item, i) => (
//                     <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
//                 ))}
//             </div>

//             <div className="shopcategory-loadmore">
//                 Explore More
//             </div>
//         </div>
//     )
// }

// const mapStateToProps = (state, ownProps) => {
//     const { category } = ownProps;
//     const products = state.products[category] || [];

//     return {
//         products,
//     };
// };

// const mapDispatchToProps = {
//     fetchProductsSuccess
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ShopCategory);







// import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import { fetchProducts } from "../Redux/actions";
// import './CSS/ShopCategory.css';
// import dropdown_icon from '../Components/Assets/dropdown_icon.png';
// import bannerImage from '../Components/Assets/banner_mens.png'
// import Item from "../Components/Item/Item";

// const ShopCategory = ({ category, products, fetchProducts }) => {
//   useEffect(() => {
//     fetchProducts(category);
//   }, [category, fetchProducts]);

//   return (
//     <div className="shop-category">
//       <img src={bannerImage} className="shopcategory-banner" alt="Banner" />
//       <div className="shopcategory-indexSort">
//         <p>
//           <span>Showing 1-12</span> out of 36 products
//         </p>
//         <div className="shopcategory-sort">
//           Sort by <img src={dropdown_icon} alt="" />
//         </div>
//       </div>
//       <div className="shopcategory-products">
//         {products.map((item, i) => (
//           <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
//         ))}
//       </div>
//       <div className="shopcategory-loadmore">
//         Explore More
//       </div>
//     </div>
//   );
// }

// const mapStateToProps = (state, ownProps) => {
//   const { category } = ownProps;
//   const products = state.products[category] || [];

//   return {
//     products,
//   };
// };

// const mapDispatchToProps = {
//   fetchProducts,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ShopCategory);



// ShopCategory.js
// import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import { fetchProducts } from "../Redux/actions";
// import './CSS/ShopCategory.css';
// import dropdown_icon from '../Components/Assets/dropdown_icon.png';
// import bannerImage from '../Components/Assets/banner_mens.png'
// import Item from "../Components/Item/Item";

// const ShopCategory = ({ category, products, fetchProducts }) => {
//     useEffect(() => {
//         fetchProducts(category);
//     }, [category, fetchProducts]);


//     console.log(`Products for category '${category}':`, products);
//     return (
//           <div className="shop-category">
//            <img src={bannerImage} className="shopcategory-banner" alt="Banner" />

//            <div className="shopcategory-indexSort">
//                 <p>
//                     <span>Showing 1-12</span> out of 36 products                </p>
//                <div className="shopcategory-sort">
//                      Sort by <img src={dropdown_icon} alt="" />
//                 </div>             </div>

//             <div className="shopcategory-products">
//                 {products.map((item, i) => (
//                     <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
//                 ))}
//             </div>

//             <div className="shopcategory-loadmore">
//                 Explore More
//             </div>
//         </div>
//     );
// }

// const mapStateToProps = (state, ownProps) => {
//     const { category } = ownProps;
//     const products = state.products[category] || [];

//     return {
//         products,
//     };
// };

// const mapDispatchToProps = {
//     fetchProducts,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ShopCategory);



// import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import { fetchProductsSuccess } from "../Redux/actions";
// import './CSS/ShopCategory.css';
// import dropdown_icon from '../Components/Assets/dropdown_icon.png';
// import bannerImage from '../Components/Assets/banner_mens.png'
// import Item from "../Components/Item/Item";

// const ShopCategory = ({ category, products, fetchProductsSuccess }) => {
//     useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const authToken = localStorage.getItem('auth-token');
//             if (!authToken) {
//                 throw new Error('Authentication token not found');
//             }

//             const response = await fetch(`http://localhost:4000/products/${category}`, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'auth-token': authToken
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to fetch data');
//             }

//             const data = await response.json();
//             console.log(`Data for category '${category}':`, data);
//             fetchProductsSuccess(category, data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     fetchData();
// }, [category, fetchProductsSuccess]);


//     console.log(`Products for category '${category}':`, products);
//     return (
//         <div className="shop-category">
//             <img src={bannerImage} className="shopcategory-banner" alt="Banner" />

//             <div className="shopcategory-indexSort">
//                 <p>
//                     <span>Showing 1-12</span> out of 36 products
//                 </p>
//                 <div className="shopcategory-sort">
//                     Sort by <img src={dropdown_icon} alt="" />
//                 </div>
//             </div>

//             <div className="shopcategory-products">
//                 {products.map((item, i) => (
//                     <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
//                 ))}
//             </div>

//             <div className="shopcategory-loadmore">
//                 Explore More
//             </div>
//         </div>
//     )
// }

// const mapStateToProps = (state, ownProps) => {
//     const { category } = ownProps;
//     const products = state.products[category] || [];

//     return {
//         products,

//     };
// };

// const mapDispatchToProps = {
//     fetchProductsSuccess
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ShopCategory);






// import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import { fetchProductsSuccess } from "../Redux/actions";
// import './CSS/ShopCategory.css';
// import dropdown_icon from '../Components/Assets/dropdown_icon.png';
// import bannerImage from '../Components/Assets/banner_mens.png'
// import Item from "../Components/Item/Item";

// const ShopCategory = ({ category, products, fetchProductsSuccess }) => {
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const authToken = localStorage.getItem('auth-token');
//                 if (!authToken) {
//                     throw new Error('Authentication token not found');
//                 }

//                 const response = await fetch(`http://localhost:4000/products/${category}`, {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'auth-token': authToken
//                     }
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch data');
//                 }

//                 const data = await response.json();
//                 console.log(`Data for category '${category}':`, data);
//                 fetchProductsSuccess(category, data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, [category, fetchProductsSuccess]);


//     console.log(`Products for category '${category}':`, products);
//     return (
//         <div className="shop-category">
//             <img src={bannerImage} className="shopcategory-banner" alt="Banner" />

//             <div className="shopcategory-indexSort">
//                 <p>
//                     <span>Showing 1-12</span> out of 36 products
//                 </p>
//                 <div className="shopcategory-sort">
//                     Sort by <img src={dropdown_icon} alt="" />
//                 </div>
//             </div>

//             <div className="shopcategory-products">
//                 {products.map((item, i) => (
//                     <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
//                 ))}
//             </div>

//             <div className="shopcategory-loadmore">
//                 Explore More
//             </div>
//         </div>
//     )
// }

// const mapStateToProps = (state, ownProps) => {
//     const { category } = ownProps;
//     const products = state.products[category] || [];

//     return {
//         products,
//     };
// };

// const mapDispatchToProps = {
//     fetchProductsSuccess
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ShopCategory);









// import React, { useContext } from "react";
// import './CSS/ShopCategory.css'
// import { ShopContext } from "../Context/ShopContext";
// import dropdown_icon from '../Components/Assets/dropdown_icon.png'
// import Item from "../Components/Item/Item";
// import ShopContextProvider from "../Context/ShopContext";

// const ShopCategory = (props) => {
//     const { all_product } = useContext(ShopContext);
//     return (
//         <div className="shop-category">
//             <img className="shopcategory-banner" src={props.banner} alt="" />
//             <div className="shopcategory-indexSort">
//                 <p>
//                     <span>Showing 1-12</span> out of 36 products
//                 </p>
//                 <div className="shopcategory-sort">
//                     Sort by <img src={dropdown_icon} alt="" />
//                 </div>
//             </div>
//             <div className="shopcategory-products">
//                 {all_product.map((item, i) => {
//                     if (props.category === item.category) {
//                         return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
//                     }
//                     else {
//                         return null;
//                     }
//                 })}
//             </div>
//             <div className="shopcategory-loadmore">
//                 Explore More</div>
//         </div>
//     )
// }

// export default ShopCategory;

