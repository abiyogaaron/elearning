import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toaster = () => (
  <ToastContainer
    position="bottom-center"
    hideProgressBar={false}
    autoClose={5000}
    closeOnClick
    draggable
    pauseOnFocusLoss
    pauseOnHover
    rtl={false}
  />
);

export default toaster;
