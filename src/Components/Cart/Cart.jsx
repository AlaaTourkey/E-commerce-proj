import React, { useContext, useEffect, useState } from 'react';
import Style from './Cart.module.css';
import { CartContext } from '../Context/cartContext';
import { Bars } from 'react-loader-spinner';
import axios from 'axios';
import toast from 'react-hot-toast';

function Cart() {
  const { getLoggedUserCart, removeItem, updateQuantity, clearCart, numOfCartItem, setNumOfCartItem } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  const [cartData, setCartData] = useState(null);
  let [totalCartPrice, setTotalCartPrice] = useState(0)

  // Function to fetch cart information
  async function fetchCartInfo() {
    setIsLoading(true);
    let { data } = await getLoggedUserCart()
    setCartData(data.data.products);
    setIsLoading(false);
    setTotalCartPrice(data?.data.totalCartPrice);
    setNumOfCartItem(data?.numOfCartItems)
  }

  // Load cart data on component mount
  useEffect(() => {
    fetchCartInfo();
  }, []);

  // Function to remove item from cart
  async function removeItemFromCart(id) {
    let { data } = await removeItem(id);
    setCartData(data);
    setTotalCartPrice(data?.data.totalCartPrice);
    setNumOfCartItem(data.numOfCartItems)

  }

  // function to update product quantity
  async function updateProductQuantity(id, count) {
    if (count > 0) {
      let { data } = await updateQuantity(id, count)
      setCartData(data);
      setTotalCartPrice(data?.data.totalCartPrice);
      console.log(data.data.products);

      // toast.error('Error updating product quantity');
    } else {
      removeItem(id)
        .then(() => fetchCartInfo())
        .catch(error => {
          console.error('Error removing item from cart:', error);
          toast.error('Error removing item from cart');
        });
    }
  }

  // Function to clear all data from the cart
  async function clearCartData() {
    let { data } = await clearCart()
    if (data.message == 'success') {
      setTotalCartPrice(0);
      setCartData([])
      setNumOfCartItem(0)
      console.log(data);
    }
    
  }



  return (
    <>
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center my-5">
          <Bars height="100" width="100" color="#0aad0a" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
        </div>
      ) : (
        <>
        <h2 className=' text-center' >carrrrrt</h2>
          {cartData ? (
            <div className="m-5 bg-main-light p-4">
              <div className=" d-flex justify-content-between">
                <div className="">
                  <h3 className="fw-bolder">Shop Cart: {cartData.numOfCartItems}</h3>
                  <h5 className="fw-bolder text-main">Total Cart Price: {totalCartPrice} EGP</h5>
                </div>
                <div className="">
                  <button onClick={clearCartData} className="btn btn-danger">
                    Clear Cart
                  </button>
                </div>
              </div>
              {cartData?.data.products?.map((product) => (
                <div key={product.product.id} className="row my-2 py-2 border-2 border-bottom">
                  <div className="col-3 col-md-1">
                    <img src={product.product.imageCover} alt="" className="w-100" />
                  </div>
                  <div className="col-9 col-md-11">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h3 className="h5">{product.product.title.split(' ').slice(0, 3).join(' ')}</h3>
                        <h6 className="text-main">price: {product.price}</h6>
                      </div>
                      <div>
                        <button onClick={() => updateProductQuantity(product.product.id, product.count + 1)} className="btn main-border">
                          +
                        </button>
                        <span className="m-2">{product.count}</span>
                        <button onClick={() => updateProductQuantity(product.product.id, product.count - 1)} className="btn main-border">
                          -
                        </button>
                      </div>
                    </div>
                    <button onClick={() => removeItemFromCart(product.product.id)} className="btn text-danger">
                      <i className="fas fa-trash-can"></i> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ' '
          )}
        </>
      )}
    </>
  );
}

export default Cart;
