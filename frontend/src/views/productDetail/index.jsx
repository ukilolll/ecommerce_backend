import styles from "./style";
import Header from "../../components/header"
import Footer from "../../components/footer"


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
                console.log(res.data)
                setProducData(res.data)
            } catch (error) {
                console.error("Error fetching:", error);
            }

        }
        fetchData();
        console.log(productData)
    }, [param]);

  const addToCart = async() =>{
    try{
      const res = await axios.post(`/api/carts/addcartdtl`,{
        cartId,
        "productId":param.id,
        quantity
      });
      reload()
      alert("success")
    } catch (error) {
      console.error("Error fetching:", error);
    }
  }
  
  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <>
      <Header />
      <div style={styles.container}>
        <div style={styles.imageSection}>
          <img
            src={`/api/product/image/${productData.image_name}`}
            alt={productData.name}
            style={styles.image}
          />
        </div>
        <div style={styles.detailSection}>
          <h2>{productData.name}</h2>

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

          <h3>Price: {productData.price}฿</h3>

          <div style={styles.quantitySection}>
            <button onClick={decreaseQty}>-</button>
            <span style={styles.qtyText}>{quantity}</span>
            <button onClick={increaseQty}>+</button>
          </div>

          <button style={styles.addButton} onClick={addToCart}>
            🛒 Add to Cart
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
