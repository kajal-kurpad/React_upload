// import React, { useState ,useEffect} from "react";
// import './ListProduct.css'
// import cross_icon from '../../assets/cross_icon.png'

// const ListProduct = () => {

//     const [allproducts, setAllproducts] = useState([]);

//     const fetchInfo = async () => {
//         await fetch('http://localhost:4000/allproducts')
//             .then((res) => res.json())
//             .then((data) => { setAllproducts(data) });
//     }

//     useEffect(() => {
//         fetchInfo();
//     }, [])

//     const remove_product = async (id) => {
//         await fetch('http://localhost:4000/removeproduct', {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/json',
//                 'content-Type': 'application/json',
//             },
//             body: JSON.stringify({ id: id })
//         })
//         await fetchInfo();
//     }

//     return (
//         <div className='list-product'>
//             <h1>All Products List</h1>
//             <div className="listproduct-format-main">
//                 <p>Products</p>
//                 <p>Title</p>
//                 <p>Old Price</p>
//                 <p>New Price</p>
//                 <p>Category</p>
//                 <p>Remove</p>
//             </div>

//             <div className="listproduct-allproducts">
//                 <hr />
//                 {allproducts.map((product, index) => {
//                     return <><div key={index} className="listproduct-format-main listproduct-format">
//                         <img src={product.image} alt="" className="listproduct-product-icon" />
//                         <p>{product.name}</p>
//                         <p>{product.old_price}</p>
//                         <p>{product.new_price}</p>
//                         <p>{product.category}</p>
//                         <img onClick={() => { remove_product(product.id) }} className='listproduct-remove-icon' src={cross_icon} alt="" />
//                     </div>
//                         <hr />
//                     </>
//                 })}
//             </div>
//         </div>
//     )
// }

// export default ListProduct;



import React, { useState, useEffect } from "react";
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListProduct = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/allproducts')
            .then((res) => res.json())
            .then((data) => { setAllProducts(data) });
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    const removeProduct = async (id) => {
        await fetch('http://localhost:4000/removeproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        });
        toast.success("Product is Removed.")
        await fetchInfo();
    }

    // Logic to calculate current products to display
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Logic for page navigation
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='list-product'>
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>

            <div className="listproduct-allproducts">
                <hr />
                {currentProducts.map((product, index) => (
                    <div key={index} className="listproduct-format-main listproduct-format">
                        <img src={product.image} alt="" className="listproduct-product-icon" />
                        <p>{product.name}</p>
                        <p>{product.old_price}</p>
                        <p>{product.new_price}</p>
                        <p>{product.category}</p>
                        <img onClick={() => { removeProduct(product.id) }} className='listproduct-remove-icon' src={cross_icon} alt="" />
                    </div>
                ))}
                <hr />
            </div>

            {/* Pagination */}
            <div>
                {Array.from({ length: Math.ceil(allProducts.length / productsPerPage) }, (_, i) => (
                    <button key={i} onClick={() => paginate(i + 1)} className="pagination-button">{i + 1}</button>
                ))}
            </div>
            <ToastContainer autoClose={2000} />

        </div>
    );
}

export default ListProduct;
