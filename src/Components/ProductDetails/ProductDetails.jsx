import React from 'react'
import Style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';


function ProductDetails() {

  let { id } = useParams();
  console.log(id);

  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { data, isLoading, isError } = useQuery('productDetails', () => getProductDetails(id));
  console.log(data?.data.data);

  return (
    <>
      <div className="container">
        {data?.data.data ? <div className="row d-flex align-items-center">
          <div className="col-md-4">
            <img className='w-100 p-2' src={data?.data.data.imageCover} alt={data?.data.data.title} />
          </div>
          <div className="col-md-8">
            <h2 className='fw-bold'>{data?.data.data.title}</h2>
            <p className='h5 text-black-50 p-2'>{data?.data.data.description}</p>
            <h4 className='h6'>{data?.data.data.category.name}</h4>
            <div className="d-flex justify-content-between">
              <h6 className='text-main'>{data?.data.data.price} EGP</h6>
              <h6><i class="fa fa-star rating-color" ></i> {data?.data.data.ratingsAverage}</h6>
            </div>
            <button className='btn text-white bg-main form-control my-2'>+ add to cart </button>

          </div>
        </div> : " "}

      </div>
    </>
  )
}

export default ProductDetails
