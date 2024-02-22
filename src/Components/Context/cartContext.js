import axios from "axios";
import { createContext } from "react";

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


  function getLoggedUserCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers:headers
    })
    .then((response) => response)
    .catch((error) => error);
  }

  return <CartContext.Provider value={{addToCart , getLoggedUserCart}}>
    {props.children}
  </CartContext.Provider>
}