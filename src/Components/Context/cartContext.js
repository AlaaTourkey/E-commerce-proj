import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext()

export default function CartContextProvider(props) {



  let headers = {
    token: localStorage.getItem('userToken')
  }

  // add products to cart function 
  async function addToCart(id) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: id
      },
      {
        headers: headers
      })
      .then((response) => response)
      .catch((error) => error);
  }

  // get info from logged cart 
  async function getLoggedUserCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: headers
    })
      .then((response) => response)
      .catch((error) => error);

  }

  // remove item from cart
  async function removeItem(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      headers: headers
    })
      .then((response) => response)
      .catch((error) => error);
  }

  // update product countity 
  async function updateQuantity(id, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      count: count
    },
      {
        headers: headers
      })
      .then((response) => response)
      .catch((error) => error);
  }

  // clear all cart products 
  async function clearCart() {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: headers
    });
  }

  const [cartId, setCartId] = useState(null)
  const [numOfCartItem, setNumOfCartItem] = useState(0)

  async function getInitialCart() {
    let {data} = await getLoggedUserCart()
    setNumOfCartItem(data.numOfCartItem);
  }

  useEffect(() => {
    getInitialCart()
  }, [])

  return <CartContext.Provider value={{ addToCart, getLoggedUserCart, removeItem, updateQuantity, clearCart ,numOfCartItem, setNumOfCartItem }}>
    {props.children}
  </CartContext.Provider>
}