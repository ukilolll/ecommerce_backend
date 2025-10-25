import React from "react";
import styles from "./styles"
import AddCart from "/images/AddCart.png"; 

export default function ProductCard({ ProductData , onClick }) {
const image_url = `http://localhost:3000/product/image/${ProductData.image_name}`

  return (
    <div style={styles.card} key={ProductData.id} onClick={onClick}>
      <div style={styles.imageContainer}>
        <img src={image_url} alt={ProductData.name} style={styles.image} />
      </div>
      <div style={styles.name}>{ProductData.name}</div>
      <div style={styles.bottomRow}>
        <div style={styles.price}>฿ {ProductData.price}</div>
        <img src={AddCart} alt="Add to cart" style={styles.cartIcon} />
      </div>
    </div>
  );
}
