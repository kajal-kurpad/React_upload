// actions.js
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_CART_ITEMS_SUCCESS = 'FETCH_CART_ITEMS_SUCCESS';
export const FETCH_ALL_PRODUCTS = 'FETCH_ALL_PRODUCTS';
export const UPDATE_TOTAL_CART_ITEMS = 'UPDATE_TOTAL_CART_ITEMS';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const UPDATE_CART_COUNT = 'ADD_TO_CART_SUCCESS';
export const REMOVE_FROM_CART_SUCCESS = 'REMOVE_FROM_CART_SUCCESS';
export const CALCULATE_TOTAL_CART_ITEMS = 'CALCULATE_TOTAL_CART_ITEMS';

export const fetchProductsSuccess = (category, products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { category, products },
});

export const removeFromCartSuccess = (itemId) => ({
  type: REMOVE_FROM_CART_SUCCESS,
  payload: itemId,
});

export const fetchAllProductsSuccess = (products) => ({
  type: FETCH_ALL_PRODUCTS,
  payload: products,
});

export const fetchAllCartItemsSuccess = (cartItems) => ({
  type: FETCH_CART_ITEMS_SUCCESS,
  payload: cartItems,
})

export const updateCartCount = (count) => ({
  type: UPDATE_CART_COUNT,
  payload: count,
});

export const addToCartSuccess = (itemId) => ({
  type: ADD_TO_CART_SUCCESS,
  payload: itemId,
});

export const calculateTotalCartItems = () => ({
  type: CALCULATE_TOTAL_CART_ITEMS,
});

export const fetchProducts = (category) => {
  return async (dispatch) => {
    try {
      const authToken = localStorage.getItem('auth-token');
      if (!authToken) {
        throw new Error('Authentication token not found');
      }
      const response = await fetch(`http://localhost:4000/products/${category}`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
        }
      });
      if (!response.ok) {
        if (response.status === 401) {
          alert('You are unauthorized. Please login again.');
        } else {
          throw new Error('Failed to fetch data');
        }
      }
      const data = await response.json();
      dispatch(fetchProductsSuccess(category, data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
};

export const fetchAllData = () => {
  return async (dispatch) => {
    try {
      const [productsResponse, cartResponse] = await Promise.all([
        fetch('http://localhost:4000/allproducts').then((response) =>
          response.json()
        ),
        localStorage.getItem('auth-token')
          ? fetch('http://localhost:4000/getcart', {
            method: 'POST',
            headers: {
              Accept: 'application/form-data',
              'auth-token': `${localStorage.getItem('auth-token')}`,
              'Content-Type': 'application/json',
            },
            body: '',
          }).then((response) => response.json())
          : Promise.resolve([]),
      ]);

      dispatch(fetchAllProductsSuccess(productsResponse));
      dispatch(fetchAllCartItemsSuccess(cartResponse));

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
};

export const removeFromCart = (itemId) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:4000/removefromcart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
        body: JSON.stringify({ itemId }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
      dispatch(removeFromCartSuccess(itemId));
      dispatch(calculateTotalCartItems());

    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
};

export const addToCart = (itemId) => {
  return async (dispatch) => {
    if (localStorage.getItem('auth-token')) {
      try {
        const response = await fetch('http://localhost:4000/addtocart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token'),
          },
          body: JSON.stringify({ itemId }),
        });

        if (!response.ok) {
          throw new Error('Failed to add item to cart');
        }
        dispatch(addToCartSuccess(itemId));
        dispatch(calculateTotalCartItems());

      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    }
  };
};
