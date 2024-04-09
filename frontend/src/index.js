import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from './Context/ShopContext';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { useDispatch } from 'react-redux';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ShopContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ShopContextProvider>
  </React.StrictMode>
);

reportWebVitals();


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import ShopContextProvider from './Context/ShopContext';
// import { Provider } from 'react-redux';
// import store from './Redux/store';
// import { configureStore } from '@reduxjs/toolkit';
// import { createStore } from 'redux';
// import { createRoot } from 'react-dom/client';
// import cartReducer from './Redux/reducers';
// import ReactDOM from 'react-dom';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <ShopContextProvider>
//     <App />
//     </ShopContextProvider>
// );
// reportWebVitals();


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <ShopContextProvider>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </ShopContextProvider>
//   </React.StrictMode>
// );

// reportWebVitals();



// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import ShopContextProvider from './Context/ShopContext';
// import { Provider } from 'react-redux';
// import store from './Redux/store';

// const root = createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//     <ShopContextProvider>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </ShopContextProvider>
//   </React.StrictMode>
// );

// reportWebVitals();




