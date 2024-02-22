import React, { useContext } from 'react'
import Style from './Cart.module.css'
import { CartContext } from '../Context/cartContext';
import { useQuery } from 'react-query';

function Cart() {

  const { getLoggedUserCart } = useContext(CartContext);

  async function getCartInfo() {
    let response = await getLoggedUserCart()
    return response.data
  }
  let { isLoading, data, isError, status } = useQuery('getCartInfo', getCartInfo);
  console.log(data?.data);

  return (
    <>
      {data ? <div className=" m-5 bg-main-light p-4 ">
        <h3 className='fw-bolder'> Shop Cart : {data.numOfCartItems}</h3>
        <h5 className='fw-bolder text-main'> Total Cart Price : {data.data.totalCartPrice} EGP</h5>
        {data.data.products.map( (product)=>
          <div className="row my-2 py-2 border-2 border-bottom">
            <div className=" col-3 col-md-1">
              <img src={product.product.imageCover} alt="" className='w-100' />
            </div>
            <div className="col-9 col-md-11 ">
              <div className=" d-flex justify-content-between">
                <div className="">
                  <h3 className='h5'>{product.product.title.split(' ').slice(0,3).join(' ')}</h3>
                  <h6 className='text-main'>price : {product.price}</h6>
                </div>
                <div className="">
                  <button className='btn main-border'>+</button>
                  <span className='m-2'>{product.count}</span>
                  <button className='btn main-border'>-</button>
                </div>
              </div>
              <button className='btn text-danger'><i class="fas fa-trash-can  "></i> Remove</button>
            </div>
          </div> 
          )}
      
      </div> : ' '}


    </>
  )
}

export default Cart
