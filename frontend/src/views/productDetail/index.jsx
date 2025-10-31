import  "./style.css";
import Header from "../../components/header"
import Footer from "../../components/footer"

import cart from "/images/cart.png"
import React, { useState ,useEffect } from "react";
import { useParams   } from 'react-router-dom';
import axios from "axios";
import {useCart} from "../../cartContext"

export default function ProductDetail() {
    const [quantity, setQuantity] = useState(1);
    const [productData, setProducData] = useState({});
    const {reload,addCart, cartId , cartDetail} = useCart()
    let param = useParams()

    useEffect(() => {
        const fetchData = async()=>{
            let serchId = param.id
            try{
                const res = await axios.get(`/api/product/${serchId}`);

                setProducData(res.data)
            } catch (error) {
                console.error("Error fetching:", error);
            }

          cartDetail.forEach((obj) => {
            if (String(obj.product_id) === String(serchId)) {
              setQuantity(obj.quantity);
            }
          });

      }

      fetchData();
    }, [param]);

  const addToCart = async() =>{
    console.log(quantity ,Number(param.id) ,cartId)
    try{
      const res = await addCart({
        cartId,
        "productId":Number(param.id),
        quantity
      });
      reload()
      alert("success")
    } catch (error) {
      console.error("Error fetching:", error);
    }
  }
  
  const min = 1;
  const max = 10;

  const handleDecrease = () => {
    setQuantity(prev => Math.max(prev - 1, min));
  };

  const handleIncrease = () => {
    setQuantity(prev => Math.min(prev + 1, max));
  };

  const handleChange = (e) => {
    const value = Number(e.target.value);
      if (value >= min && value <= max) {
        setQuantity(value);
      } else if (value < min) {
        setQuantity(min);
      } else if (value > max) {
        setQuantity(max);
    }
  }
  
  return (
    <>
    <Header />

      <div className={'container-detail-product'}>

        <div className={'box-show-detail-product'}>

          <div className={'box-show-image-price-cart-product'}>
            <div className={'box-show-images-product'}>
              <div className={'main-image-product'}>
                <img className={'image-product'} src={`/api/product/image/${productData.image_name}`} alt="" /> 
              </div>
              <div className={'box-sub-image-product'}>
                <div className={'sub-image'}>
                  <img className={'item-sub-image'} src={`/api/product/image/${productData.image_name}`} alt="" /> 
                </div>
                <div className={'sub-image'}>
                  <img className={'item-sub-image'} src={`/api/product/image/${productData.image_name}`} alt="" /> 
                </div>
                <div className={'sub-image'}>
                  <img className={'item-sub-image'} src={`/api/product/image/${productData.image_name}`} alt="" /> 
                </div>
              </div>
            </div>

            <div className={'box-show-price-cart-product'}>
              <div className={'box-name-product'}>
                <h1 className='nameproduct'>{ productData.name }</h1> 
                <p >ID Product: {productData.id} </p> 
              </div>
              <div className={'box-sub-detail-product'}>
                <h1>Description</h1>
                
                <ul>
                  {(() => {
                    // guard against null / undefined
                    if (!productData.description) return <li>No details available</li>;

                    let descObj = {};

                    try {
                      // Case 1: description is JSON-like string → parse it
                      if (typeof productData.description === "string") {
                        // Try to fix formats like {color:red,ram:8} → {"color":"red","ram":"8"}
                        const fixed = productData.description
                          .replace(/(\w+)\s*:/g, '"$1":') // add quotes around keys
                          .replace(/:(\w+)/g, ':"$1"')    // add quotes around values
                          .replace(/'/g, '"');             // single → double quotes
                        descObj = JSON.parse(fixed);
                      }
                      // Case 2: already an object
                      else if (typeof productData.description === "object") {
                        descObj = productData.description;
                      }
                    } catch (err) {
                      console.warn("Could not parse description:", err);
                      return <li>Invalid description format</li>;
                    }

                    // render list
                    return Object.entries(descObj).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong> {value}
                      </li>
                    ));
                  })()}
          </ul>

              </div>

              <div className={'box-price-cart-product'}>

                <div className={'box-price-product'}>
                  <span className={'price-product'}>฿ {productData.price}</span> 
                </div>

                <div className={'box-quantity-product'}>
                  <p className={'number-product'}>Number</p>

                    <div className={'quantity-selector'}>
                      <button type="button" className={'minus-btn'} onClick={handleDecrease}>-</button> 
                      <input
                    type="number"
                    id="item-quantity"
                    name="item-quantity"
                    value={quantity}
                    min={min}
                    max={max}
                    onChange={handleChange}
                  />
                      <button type="button" className={'plus-btn'} onClick={handleIncrease}>+</button> 
                    </div>

                  </div>

                <div className={'box-cart-product'} onClick={addToCart} >
                  <button className={'btn-add-cart-product'}>
                    <img src={cart} alt="cart" className={'icon-cart'} /> 
                    Add to Cart
                  </button>
                  {/* <button className={'btn-buy-cart-product'}>
                    Buy Now
                  </button> */}
                </div>

              </div>

            </div>
          </div> 
        </div>
      </div>

    <Footer />
    </>
  )
}
